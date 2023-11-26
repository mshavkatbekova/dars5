import { useGlobalContext } from "./hooks/useGlobalContext";
import "./App.css";
import { useRef } from "react";
function App() {
  const inputNumber = useRef();
  const { counter, dispatch } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_ANY_NUMBER", payload: +inputNumber.current.value });
    inputNumber.current.value = "";
  };

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <form onSubmit={handleSubmit}>
        <input ref={inputNumber} type="number" placeholder="Enter number" />
        <br />
        <button>submit</button>
      </form>
    </div>
  );
}

export default App;
