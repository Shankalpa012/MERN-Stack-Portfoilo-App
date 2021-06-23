import { combineReducers } from "redux";
import alert from "./Alert"
import auth from "./Auth"


export default  combineReducers({
    alert,auth
}); 