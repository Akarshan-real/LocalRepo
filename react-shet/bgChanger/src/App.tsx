import { useEffect, useState } from "react";
import Button from "./components/Button";

function App() {
  const obj = {
    color: [
      "Red",
      "Green",
      "Blue",
      "Yellow",
      "Purple",
      "Orange",
      "Pink"
    ],
    colorCode: [
      "#FF0000",
      "#00FF00",
      "#0000FF",
      "#FFFF00",
      "#800080",
      "#FFA500",
      "#FFC0CB"
    ]
  };

  const [bgColor, setBgColor] = useState("#FFFFFF");
//   let totalColors = obj.colorCode.length;
//   const [idx, setIdx] = useState(0);

//   useEffect(() => {
//   const interval = setInterval(() => {
//     setIdx(prev => {
//       const next = (prev + 1) % obj.colorCode.length;
//       setBgColor(obj.colorCode[next]);
//       return next;
//     });
//   }, 800);

//   return () => clearInterval(interval);
// }, []);


  return (
    <div className={`relative w-full min-h-screen`} style={{backgroundColor : bgColor}}>
      <div className="absolute px-4 py-2 bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5 rounded-2xl bg-gray-600 shadow">
        {obj.color.map((name,index) => (
          <Button key={index} color={name} colorCode={obj.colorCode[index]} setBgColor={setBgColor}/>
        ))}
      </div>
    </div>
  )
}

export default App


