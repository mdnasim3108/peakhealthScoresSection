import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const heart=(props)=>{
    return <FontAwesomeIcon icon={faHeart} onClick={props.onClick} className="text-violet-500 hover:text-violet-600 mymodal text-2xl mr-4 cursor-pointer"/>;
}
export default heart;