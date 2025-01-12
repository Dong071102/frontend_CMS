interface InputProps{
    label?: string;
    type: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    placeholder?:string;
    className?: string;

}
const Input: React.FC<InputProps>=({label,type,value,onChange,placeholder,className})=>{
    return (<>
    <div className="form-group">
        <label htmlFor={label}>{label}</label>
        <input type={type}
        id={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={className}
         />
    </div>
    </>)
}
export default Input