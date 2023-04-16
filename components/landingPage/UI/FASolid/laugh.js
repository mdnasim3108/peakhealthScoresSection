import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaughSquint } from "@fortawesome/free-solid-svg-icons";
const laugh=(props)=>{
    return <FontAwesomeIcon icon={faFaceLaughSquint} onClick={props.onClick} className="text-violet-500 hover:text-violet-600 mymodal text-2xl mr-4 cursor-pointer"/>;
}
export default laugh;