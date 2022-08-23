import { useContext, useParams, useEffect, useState, useRef } from 'react'
import { AuthContext } from '../../utils/auth'
import { Link, Navigate, useNavigate } from "react-router-dom"
import styled from 'styled-components'

function dataURLtoBlob( dataUrl, callback )
{
    var req = new XMLHttpRequest;

    req.open( 'GET', dataUrl );
    req.responseType = 'arraybuffer'; // Can't use blob directly because of https://crbug.com/412752

    req.onload = function fileLoaded(e)
    {
        // If you require the blob to have correct mime type
        var mime = this.getResponseHeader('content-type');

        callback( new Blob([this.response], {type:mime}) );
    };

    req.send();
}
const BlobToImageData = function(blob){
    let blobUrl = URL.createObjectURL(blob);

    return new Promise((resolve, reject) => {
                let img = new Image();
                img.onload = () => resolve(img);
                img.onerror = err => reject(err);
                img.src = blobUrl;
            }).then(img => {
                URL.revokeObjectURL(blobUrl);
                // Limit to 256x256px while preserving aspect ratio
                let [w,h] = [img.width,img.height]
                let aspectRatio = w/h
                // Say the file is 1920x1080
                // divide max(w,h) by 256 to get factor
                let factor = Math.max(w,h)/256
                w = w/factor
                h = h/factor

                // REMINDER
                // 256x256 = 65536 pixels with 4 channels (RGBA) = 262144 data points for each image
                // Data is encoded as Uint8ClampedArray with BYTES_PER_ELEMENT = 1
                // So each images = 262144bytes
                // 1000 images = 260Mb
                let canvas = document.createElement("canvas");
                canvas.width = w;
                canvas.height = h;
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                return ctx.getImageData(0, 0, w, h);    // some browsers synchronously decode image here
            })
}
const BlobToBase64 = function(blob){
    let blobUrl = URL.createObjectURL(blob);

    return new Promise((resolve, reject) => {
                let img = new Image();
                img.onload = () => resolve(img);
                img.onerror = err => reject(err);
                img.src = blobUrl;
            }).then(img => {
                URL.revokeObjectURL(blobUrl);
                // Limit to 256x256px while preserving aspect ratio
                let [w,h] = [img.width,img.height]
                let aspectRatio = w/h
                // Say the file is 1920x1080
                // divide max(w,h) by 256 to get factor
                let factor = Math.max(w,h)/256
                w = w/factor
                h = h/factor

                let canvas = document.createElement("canvas");
                canvas.width = w;
                canvas.height = h;
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                return canvas.toDataURL();
            })
}

const FormStyled = styled.form`
    padding: 3em;
    .form-group{padding: .5em;}
    .form-group>*{}
    input[type="file"]{display:none;}
    .heat-container{display:flex;
        >#heat{width:60%;}
        >input{width:5em;}
    }
`

export default function NewSauce() {
	let [Contents, setContents] = useState([])
	, [form, setForm] = useState([])
    , {token, setToken, user, setUser, datas, setPathname} = useContext(AuthContext)
    , imageRef = useRef()
    , navigate = useNavigate()
	, generateOutput = (contents) => {
		let { template } = contents || {}
		, contents_tmp = []
		console.log(contents)

		// contents_tmp.push(<Template data={template} bem="template" />)
		setContents(contents_tmp = <span>okok span</span>)
	}
    , getFormValues = ()=>Array.from(new FormData(document.forms[0]))
    , handleSubmit = (e) => {
        e.preventDefault()

        let body = {sauce:{}}

        getFormValues().forEach(async (i,k)=>{
            body.sauce[i[0]] = i[1]
        })

        body.sauce.userId = user.id
        body = JSON.stringify(body)

        fetch("http://localhost:3000/api/sauces", {
            method: "POST"
            , mode: "cors"
            , headers:{
                "Content-type": "application/json"
                , "Authorization": "Bearer "+token
            }
            , body
        }).then(res=>res.json())
        .then(json=>{
            console.log(json)
            navigate('/sauces')
        })
        .catch(e=>{console.log(e.message)})
    }
    , selectImage = e=>{
        document.getElementById('image').src = URL.createObjectURL(e.target.files[0])
    }
    
    useEffect(() => {
	    if(!token)navigate('/login')
        setForm(getFormValues())
        generateOutput(datas.home)
        setPathname(document.location.pathname)

        document.getElementById("image").onload = function() {
            URL.revokeObjectURL(document.getElementById("image").src) // free memory
        }

        // if(getFormValues().filter(i=>i[1]==="").length==0 && getFormValues()[3][1].name!=="")
        //     document.querySelector('button#send').disabled = false
        // else document.querySelector('button#send').disabled = true

	}, [datas, token])
    
    if(getFormValues()[3])
        if(getFormValues().filter(i=>i[1]==="").length==0 && getFormValues()[3][1].name!=="")
            document.querySelector('button#send').disabled = false
        else document.querySelector('button#send').disabled = true

    return (
        <FormStyled onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input value={form[0]?.[1]} onChange={e=>{setForm(getFormValues())}} type="text" className="form-control" id="name" name="name" />
            </div>
            <div className="form-group">
                <label htmlFor="manufacturer">Manufacturer</label>
                <input value={form[1]?.[1]} onChange={e=>{setForm(getFormValues())}} type="text" className="form-control" id="manufacturer" name="manufacturer" />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea value={form[2]?.[1]} onChange={e=>{setForm(getFormValues())}} className="form-control" id="description" rows="5" name="description"></textarea>
            </div>
            <div className="form-group">
                <input type="file" ref={imageRef} name="imageUrl" id="imageUrl" accept="image/*" onChange={e=>{selectImage(e)}} />
                <button type="button" onClick={e=>{imageRef.current.click()}}>ADD IMAGE</button>
                <img id="image" src="imagePreview" style={{maxHeight: "100px",display:"block",marginTop:"10px"}} />
            </div>
            <div className="form-group">
                <label htmlFor="main-pepper">Main Pepper Ingredient</label>
                <input value={form[4]?.[1]} onChange={e=>{setForm(getFormValues())}} type="text" className="form-control" id="main-pepper" name="mainPepper" />
            </div>
            <div className="form-group">
                <label htmlFor="heat">Heat</label>
                <div className="heat-container">
                    <input value={form[5]?.[1]} onChange={e=>{document.forms[0].heatValue.value=e.target.value;setForm(getFormValues().splice(5,1,e.target.value))}} type="range" className="custom-range heat-range" min="1" max="10" id="heat" name="heat" />
                    <input disabled type="number" className="form-control heat-reading" name="heatValue" />
                </div>
            </div>
            <button id="send" disabled>SUBMIT</button>
        </FormStyled>

    )
}
