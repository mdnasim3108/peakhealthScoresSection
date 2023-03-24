import { useEffect, useState } from "react";
const dynamicText = (props) => {
  // const [status, setStatus] = useState(0);
  // useEffect(() => {
  //   setInterval(() => {
  //     setStatus((prev) => {
  //       if (prev === props.texts.length - 1) return 0;
  //       return prev + 1;
  //     });
  //   }, 10000);
  // });

  return (
    <h1 className="sm:text-xl text-lg font-sans status">
   {props.texts[0]}
    </h1>
  );
};
export default dynamicText;
