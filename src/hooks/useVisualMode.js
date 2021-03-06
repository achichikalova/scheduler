import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      setMode(() => (mode) )
      setHistory([history[0], mode])
      } else {
      setMode(() => (mode) )
      setHistory([...history, mode])
    }
  };

  const back = () => {
    if (history.length > 1) {
      history.splice(history.length -1)
      setMode(() =>(history[history.length-1]))
    }
  };

  return {mode, transition, back };
}