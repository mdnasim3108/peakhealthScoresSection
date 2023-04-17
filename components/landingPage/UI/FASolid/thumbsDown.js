import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
const thumbsDown=(props)=>{
    return <FontAwesomeIcon icon={faThumbsDown} onClick={props.onClick} className="text-violet-500  mymodal text-2xl cursor-pointer"/>;
}
export default thumbsDown;
