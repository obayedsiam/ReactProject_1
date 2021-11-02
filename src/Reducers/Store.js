import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import createSagasMiddleware from 'redux-saga';
import ApiReducer from "./apiSlice";
import sagas from '../sagas';

const sagaMiddleware = createSagasMiddleware();

const middleware = [
    ...getDefaultMiddleware({
        serializableCheck: false,
    }), sagaMiddleware,
];
export default configureStore({
   reducer : {
       api : ApiReducer,
   }, middleware   
});

sagaMiddleware.run(sagas);


