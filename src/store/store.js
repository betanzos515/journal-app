import { createStore,combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducers = combineReducers({
    auth: authReducer,
    ui:uiReducer,
    notes:notesReducer
});

//exportaremos este reducer en el punto mas alto de nuestra aplicacion. (Journal Appl)
export const store = createStore(
    reducers,
    //linea que nos sirve para configurar el store
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__  

    composeEnhancers(
        applyMiddleware(thunk)
    )
);

