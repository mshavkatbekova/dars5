import axios from "axios";
import { useEffect, useReducer } from "react";

const changeState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ISPENDING":
      return { ...state, isPending: payload };
    case "ERROR":
      return { ...state, error: payload };
    case "DATA":
      return { ...state, data: payload };
    default:
      return state;
  }
};

export function useFetch(url) {
  const [state, dispatch] = useReducer(changeState, {
    data: null,
    error: null,
    isPending: false,
  });

  useEffect(() => {
    const getData = async () => {
      dispatch({ type: "isPending", payload: true });
      try {
        const req = await axios(url);
        if (req.status != 200) {
          throw new Error(req.message);
        }
        dispatch({ type: "data", payload: req.data });
        dispatch({ type: "isPending", payload: false });
        dispatch({ type: "error", payload: null });
      } catch (error) {
        console.log(error);
        dispatch({type: 'error', payload: error});
        dispatch({type: 'isPending', payload: false})
      }
    };
    getData();
  }, [url]);
  return { ...state };
}
