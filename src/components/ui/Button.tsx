import { useState } from "react";

interface ButtonProps{
    label:string;
    onClick:()=>void;
    type?: 'button' | 'submit' | 'reset';
    className?:string;
}
const Button: React.FC<ButtonProps>=({label,onClick,type,className})=>{
    const [clicked,setClicked]=useState(false);
    const HandleClicked=()=>{
        setClicked(!clicked);
        onClick();
    }
    return (
        <button type={type}
        onClick={HandleClicked}
        className={`btn ${className}`}>
            {label}
        </button>
    )
}
export default Button;