import {types} from '../types/types';

//es importante asegurarnos de que el state no retorne undefine por que esto puede romper la aplicacion.
export const authReducer = (state={},action)=>{
    switch (action.type) {
        case types.login:
            return{
                uid:action.payload.uid,
                name: action.payload.displayName
            }
        case types.logout:
            return {}
        
        default: 
            return state;
    }
}