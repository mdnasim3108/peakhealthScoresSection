import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp} from "@fortawesome/free-solid-svg-icons";
const thumbsUp=(props)=>{
    return <FontAwesomeIcon icon={faThumbsUp} onClick={props.onClick} className="text-violet-500 hover:text-violet-600 mymodal text-2xl mr-4 cursor-pointer"/>;
}
export default thumbsUp;