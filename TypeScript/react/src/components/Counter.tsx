import { useState } from "react";


const Counter = () => {

    const [count, setCount] = useState<number | null>(0);

  return (
    <div>
        <p>Cups ordered : {count}</p>
        <button onClick={() => setCount((prev) => typeof(prev) === "number" ? prev + 1 : null)}>Order one more</button>
    </div> 
  )
}

export default Counter