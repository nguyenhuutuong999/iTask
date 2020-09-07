import * as types from '../constants/ActionTypes';
var initialState = {  
    id: "",
    name: "",
    status: false,
};

var myReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.UPDATE_ITEM:{
            
            return action.task;
        }
        case types.CLEAR_FORM:{
            return {  
                id: "",
                name: "",
                status: false,
            };
        }
        default: return state;
    }
}
export default myReducer;