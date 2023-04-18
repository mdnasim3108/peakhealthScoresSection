import { useEffect, useState, useCallback } from "react";
const dynamicText = (props) => {
  const [status, setStatus] = useState(0);
  const shuffle = useCallback(() => {
      setStatus((prev) => {
        if (prev === props.texts.length - 1) return 0;
        return prev + 1;
      })
  }, [])

  useEffect(() => {
    // setInterval(() => {
    //   setStatus((prev) => {
    //     if (prev === props.texts.length - 1) return 0;
    //     return prev + 1;
    //   });
    // }, 10000);
    const id=setInterval(shuffle,10000)
    return ()=>clearInterval(id)
  },[]);


  return (
    <h1 className="sm:text-2xl text-lg font-sans status">
      {props.texts[status]}
    </h1>
  );
};
export default dynamicText;
