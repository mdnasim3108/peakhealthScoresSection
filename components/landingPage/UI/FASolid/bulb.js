import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
const bulb=(props)=>{
    return <FontAwesomeIcon icon={faLightbulb} onClick={props.onClick} className="text-violet-500 hover:text-violet-600 mymodal text-2xl mr-4 cursor-pointer"/>;
}
export default bulb;