//Tudo que esta comentado eh uma explicacao sobre usestate e props setando um contador
//import { useState } from "react";
//type ButtonProps = {
//text?: string; uma forma de tipar e trabalhar com as propriedades
//}
//dentro de Button eu colocaria props: ButtonProps
//sobre state eu trabalho com ele quando a propriedade em valores que mudam sempre e ficaria assim
//let counter = 0; eu posso testar assim primeiro e depois sim trabalho o state com uma const
//const [counter, setCounter] = useState(0);
// function increment() {
//   //counter += 1;
//   setCounter(counter + 1);
//   console.log(counter);
// }
//<button onClick={increment}>{counter}</button>
import { ButtonHTMLAttributes } from "react"
import '../styles/button.scss'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {

  return (
    <button className="button"{...props}></button>
  )
}
