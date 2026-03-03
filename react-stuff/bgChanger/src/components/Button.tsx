type props = {
    color : string,
    colorCode : string,
    setBgColor : (x:string) => void
}
const Button = ({color,colorCode,setBgColor} : props) => {
  return (
    <button className={`font-bold text-black px-4 py-2 z-50 rounded-3xl cursor-pointer`} style={{backgroundColor : colorCode}} onClick={() => {setBgColor(colorCode);console.log("Clicked ",color," ",colorCode)}}>
        {color}
    </button>
  )
}

export default Button
