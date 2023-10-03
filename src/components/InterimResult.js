import React, { useEffect, useState } from "react";
import { Input } from "./InputFieldSimple";
import resultObject from "./ResultObject";
import convertToTime from "./ConvertToTime";




let Addbutton = ({ addinput }) => {
  return (
    <div>
      <button className="add-button" onClick={addinput}>+</button>
    </div>
  );
};

let SelectCoef = ({changeCoef, i, arrOfOptions, changeinputDisplay}) => {
  let [DD, SetDD] = useState('1');

  function toggleDropDown(event) {
    let target = event.target;
    if (event.target.tagName !== 'SPAN') {
      let par = target.parentElement;
      par.querySelector('.dropdown-content').classList.toggle("show");
      par.querySelector('.dropbtn').classList.toggle('bordered');

    }
}

  return (
    
    <div className="dropdown"  onClick={(e)=> toggleDropDown(e)}>
    <button  
      className="dropbtn">
      {DD}
      {/* <svg class="transformed"
        width="12"
        height="7"
        viewBox="0 0 12 7"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.251051 0.256282C0.585786 -0.0854272 1.1285 -0.0854272 1.46323 0.256282L6 4.88756L10.5368 0.256282C10.8715 -0.0854272 11.4142 -0.0854272 11.7489 0.256282C12.0837 0.59799 12.0837 1.15201 11.7489 1.49372L6.60609 6.74372C6.27136 7.08543 5.72864 7.08543 5.39391 6.74372L0.251051 1.49372C-0.0836838 1.15201 -0.0836838 0.59799 0.251051 0.256282Z"
         
        />
      </svg> */}
    </button>
    <div id="myDropdown" className="dropdown-content">
      {arrOfOptions.map((el, num)=> {
                return (
                    <span  onClick={() => {changeCoef(i, el)
                      changeinputDisplay(el)
                      SetDD(el)}
                  } key={num}>{el}</span>
                )
                
            })}
    </div>
  </div>
  )
}

/* let SelectCoef = ({changeCoef, i, arrOfOptions, changeinputDisplay}) => {
    return (
        <div className="select-div">
        <select onChange={(event) => {changeCoef(i, event.target.value)
        changeinputDisplay(event.target.value)}
      }>
            {arrOfOptions.map((el, i)=> {
                return (
                    <option value={el} key={i}>{el}</option>
                )
                
            })}
        </select>
        </div>

    )
}  */

let InputsBlock = ({coef, changeInput, changeSelect, changeWPH, i, arrOfOptions, wph, changeinputDisplay, quiz, withtimebelow}) => {
  let [Coefficient, SetCoefficient] = useState('1')


    if (coef === true) {
      

        return (
            <div className="InputWithDD">
                <Input i={i} change={changeInput} coef={Coefficient} withtimebelow={withtimebelow}/>
                <SelectCoef changeCoef={changeSelect} i={i} arrOfOptions={arrOfOptions} changeinputDisplay={SetCoefficient}/>
                </div>
        )
    }

    if (wph) {
      return (
        <>
       
        <Input i={i} change={changeInput} coef={parseFloat(3600/wph)} withtimebelow={withtimebelow}/>        
        </>
          

      )
    }

    else {
        return (
            <Input i={i} change={changeInput} coef={'1'} quiz={quiz} withtimebelow={withtimebelow}/>
        )
    }
}




export function InterimResult({ obj, change, addButton, coef, arrofcoef, wph, ResultObjectComp, quiz, withtimebelow}) {

  let changedFiled = ResultObjectComp;
  let InterimArr = obj;
  
  let [ArrayForMap, SetArrayForMap] = useState(InterimArr.values);  
  let [arrcoef, Setarrcoef] = useState(InterimArr.coefs);
  


  let setCoef = (i, value) => {
    InterimArr.coefs[i] = value;
    Setarrcoef([...InterimArr.coefs])
  }

  let changeArr = (i, value) => {
    InterimArr.values[i] = value;
    SetArrayForMap([...InterimArr.values]);
  };



  

  let addfield = () => {
    InterimArr.values.push(0);
    SetArrayForMap([...InterimArr.values]);
    if(coef) {
      InterimArr.coefs.push(1);
      Setarrcoef([...InterimArr.coefs])
    }
  }

  useEffect(() => {
    if (coef) {
        let sum = ArrayForMap.reduce((sum, el, i) => {
          return (sum += parseInt(el) * parseFloat(arrcoef[i]));
        }, 0);
        change(sum);
        resultObject[changedFiled] = ArrayForMap.map(
          function (el, i) {
            return [
              {
                value: parseInt(el),
              },
              {
                value: parseFloat(arrcoef[i])
              },
              {
                value: convertToTime(parseInt(el * arrcoef[i]))
              }
            ]             
              
            
          }
        )
        resultObject[changedFiled].push(
          [{
            value: 'Total'
          },
        {
          value: ''
        },
      {
        value: convertToTime(sum), style: {fill: {patternType: "solid", fgColor: {rgb: "fef6b0"}}, font: {bold: true}} 
      }]             
            
            )  
        console.log(resultObject)
        

    }

    else if (wph) {
      let sum = ArrayForMap.reduce((sum, el, i) => {
        return (sum += (parseInt(el) * 60 * 60 /parseInt(wph)));
      }, 0);
      change(sum);
      resultObject[changedFiled] = ArrayForMap.map(
        function (el, i) {
          return [
            {
              value: parseInt(el),
            },
            {
              value: parseInt(wph)
            },
            {
              value: convertToTime(parseInt(el) * 60 * 60 /parseInt(wph))
            }
          ]             
            
          
        }
      )
      resultObject[changedFiled].push(
        [{
          value: 'Total'
        },
      {
        value: ''
      },
    {
      value: convertToTime(sum), style: {fill: {patternType: "solid", fgColor: {rgb: "fef6b0"}}, font: {bold: true}} 
    }]             
          
          )  
      console.log(resultObject)
    }

    else if(quiz) {
      let sum = ArrayForMap.reduce((sum, el) => {
        return (sum += parseInt(el*60));
      }, 0);
      change(sum);
      resultObject[changedFiled] = ArrayForMap.map(
        function (el, i) {
          return [
            {
              value: parseInt(el),
            },
            {
              value: ''
            },
            {
              value: convertToTime(parseInt(el*60))
            }
          ]             
            
          
        }
      )
      resultObject[changedFiled].push(
        [{
          value: 'Total'
        },
      {
        value: ''
      },
    {
      value: convertToTime(sum), style: {fill: {patternType: "solid", fgColor: {rgb: "fef6b0"}}, font: {bold: true}} 
    }]             
          
          )

      
      console.log(resultObject)

    }



    else {
        let sum = ArrayForMap.reduce((sum, el) => {
          return (sum += parseInt(el));
        }, 0);
        change(sum);
        resultObject[changedFiled] = ArrayForMap.map(
          function (el, i) {
            return [
              {
                value: parseInt(el),
              },
              {
                value: ''
              },
              {
                value: convertToTime(parseInt(el))
              }
            ]             
              
            
          }
        )
        resultObject[changedFiled].push(
          [{
            value: 'Total'
          },
        {
          value: ''
        },
      {
        value: convertToTime(sum), style: {fill: {patternType: "solid", fgColor: {rgb: "fef6b0"}}, font: {bold: true}} 
      }]             
            
            )

        
        console.log(resultObject)

    }
  });

  return (
    <div className="InputsBlock">
      

      <div className="InputsBlock-Input_container">
        <div className="Inputs">
            {
                ArrayForMap.map((el, i) => {
                    return (
                        <InputsBlock key={i} coef={coef} wph={wph} changeSelect={setCoef}  changeInput={changeArr} i={i} arrOfOptions={arrofcoef} quiz={quiz} withtimebelow={withtimebelow}/>
                    )
                })
            }
            
        </div>
        {addButton ? <Addbutton addinput={addfield} /> : ""}
      </div>
    </div>
  );
}
