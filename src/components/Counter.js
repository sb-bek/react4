import { useEffect, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleInc = () => {
    setCount((prev) => prev + 4);
    setCount((prev) => {
      return prev + 4;
    });
  };

  const handleDec = () => {
    setCount((prev) => prev - 4);
    setCount((prev) => {
      return prev - 4;
    });
  };

  function keydown(e) {
    if (e.key === "Escape") {
      console.log("PRESSED ESCAPE");
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keydown);

    return () => {
      window.removeEventListener("keydown", keydown);
      console.log("UNMOUNT");
    };
  }, [count]);

  return (
    <div>
      <button onClick={handleDec}>decr</button>
      <h2>{count}</h2>
      <button onClick={handleInc}>inc</button>
    </div>
  );
};

export default Counter;
