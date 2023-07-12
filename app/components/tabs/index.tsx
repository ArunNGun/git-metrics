import { useState } from "react";

const Tabs = ({
    onChange,
    value,
    items=[]
}:any) =>{
   
    return (
         <div className="tab-container" style={{ border: '1px solid #7a828e', borderBottom:'none', backgroundColor: 'currentcolor' }}>
         {items.map((el:{label:string,id:string})=>(
            <div key={el.id} className={value === el.id ?"tab-active":"tab"} onClick={()=>onChange(el.id)}>
                {el.label}
            </div>
         ))}
         </div>

    )
}

export default Tabs