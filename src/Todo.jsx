import { useEffect, useState } from 'react';
import './todo.css'


function Todo(){
    
    function getLocalData(){
        const data=localStorage.getItem("todolist")
        return JSON.parse(data)
    }

    
    const [inputValue,setInputValue]=useState("")
    const [item,setItem]=useState(getLocalData())

    function add(){
       if(inputValue){
        setItem([...item,inputValue])
        setInputValue("")
       }
    }

    function dlt(n){
        const newItems=[...item]
        newItems.splice(n,1)
        setItem(newItems)
    }
    
    function editItem(key){
        const newItems=[...item]
        const val=prompt("Enter the Edited Task")
        if(val){
        newItems[key]=val
        setItem(newItems)
        }
    }

    useEffect(()=>{
        localStorage.setItem("todolist",JSON.stringify(item))
    },[item])

    return (
        <>
        <div className="main-div">
            <h1>Add Items to Todo List</h1>
            <input type="text" autoFocus placeholder='✍️ Add Items' value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />            
            <i className='fa fa-plus' onClick={add}> </i><br />

            <div className="showItems">
            {item.map((current,key) =>{
                return(
                <div className="eachItem">
                <p id='itemName'>{key+1}) {current}</p>
                
                <p id='icons'>
                    <i className='fa fa-edit' onClick={()=>editItem(key)}></i>
                    <i className='fa fa-trash' onClick={()=> dlt(key)}></i>
                </p>
            </div>
             )
            })}
            </div>
        </div>
        </>
    )
}

export default Todo;