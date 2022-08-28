import {useState} from 'react'

const NUMBER = 0
, getFieldset = (item, setForm, options={inner:false,trigger:false}) => { 
    
    const allowedValues = ["text","password","number","checkbox", "radio", "color", "...à compléter..."]
    , allowedTypes  = {"name":"text"
        , "surname":"text"
        , "username":"text"
        , "pseudo":"text"
        , "age":"number"
        , "phone":"number"
        , "color":"color"
        , "password":"password"
        , "address":"text"
        , "image":"file"
        , "video":"file"
        , "music":"file"
        , "map":"text"
    }
    , input = <input type={allowedTypes[item]} name={item} onChange={setForm(getFormArray())} />
    


    return <fieldset>
        {options.trigger && <input type="checkbox" />}
        <label>{options.inner && input}</label>
        {!options.inner && input}
    </fieldset>
}
, handleSubmit = (e) => {
    e.preventDefault()
}
, getFormArray = () => Array.from(new FormData(document.forms[NUMBER]))

export default function Forms({base = [], datas = []}) {

    const [form, setForm] = useState(getFormArray(0))
    , baseForm = base.map(item => getFieldset(setForm, item))
    
    return (
        <form onSubmit={handleSubmit}>
            {baseForm}
            <fieldset>
                <input type="submit" />
            </fieldset>
        </form>
    )
}
