import {
    REGISTER_SUCCESS,
    REGISTER_FAILED
} from "../actions/Types"

//this is the inital state 
const initialState = {
    token : localStorage.getItem("token"),
    isAuthenticated : null,
    user: null,
    loading : true
}

//this function determines what to do when the action is dispatched
export default function( state = initialState, action ){

    //type is the action is runed in the reduce
    //payload is the data that is changed
    const { type, payload } = action;

    switch(type){

        case REGISTER_SUCCESS:
            localStorage.getItem("token", payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading:false,
            }
            
        case REGISTER_FAILED:
            localStorage.removeItem("token")
            return {
                ...state,
                token:null,
                isAuthenticated: false,
                //even its failed its already loaded
                loading:false,
            }
        default:
            return state
            
            
    }

}