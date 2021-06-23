//this is to makw api requrest to backend
import axios from "axios";

import  {
    REGISTER_SUCCESS,
    REGISTER_FAILED
} from "./Types"

import { setAlert } from "./Alert"

import

//this is to load the token

export const loadToken ()=> async dispatch =>{
    if(localStorage.token){

    }
}




//register the user
export const register =  ({username, email, password}) => async dispatch => {
    //this is creating a header for requres
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }

    //this is body of request, what data are we sending to the url or backend
    const body = JSON.stringify({username, email, password});

    try {
        //this is ther respond the we get
        //we get a token as a responce after user authentaction
        const res = await axios.post("./user", body, config);

        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })

    } catch (error) {

        const errors = error.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
        }

        dispatch({
            type:REGISTER_FAILED
        })
        
    }

}