const { useState, useEffect } = require("react")

const App = ()=> {
    const [counter, setCounter] = useState(0)
    useEffect(()=> {
        if(counter === 10){
            console.log("Bravo scemo")
        }
    },[counter])
return(
    <div>
        <button onClick={()=> setCounter((current)=>counter+1)}>
            +1
        </button> 
        <button onClick={() => setCounter((current) => counter - 1)}>
            -1
        </button>
        <span>
            {counter}
        </span>
    </div>
)}
export default App