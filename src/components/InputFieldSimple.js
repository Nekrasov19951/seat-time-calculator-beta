import React, { useState } from "react";
import convertToTime from "./ConvertToTime";
import { anotherFormat } from "./ConvertToTime";

export function Input ({change, i, coef, quiz, withtimebelow}) {
    
    let [inputValue, SetinputValue] = useState(0)

    return (
        <div className="Inputfield">
        <input onChange={(event) => {
            event.target.value ? change(i, event.target.value) : change(i, '0')
            SetinputValue(event.target.value)
            
            console.log('я таргет value ', event.target.value)
            }}/>
            {
                withtimebelow==true ? '' : <p style={{textAlign: 'right'}}>{quiz ? anotherFormat(parseFloat(coef*inputValue*60)) : anotherFormat(parseFloat(coef*inputValue))}</p>
            }
        
         </div>
    )
}