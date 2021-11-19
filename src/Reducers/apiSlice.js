import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    response : "",
    error : null,
    operationId: null,
    parameters: null,
    success: null,
};

export const apiSlice = createSlice(
    {
        name: "api",
        initialState,
        reducers : {
            callApi: (state, {payload}) =>({
                    ...state,
                    loading: true,
                    operationId: payload.operationId,
                    parameters: payload.parameters || {}
                }),
            succeed: (state, {payload}) => {
                //console.log(payload,"printing payload in succeed");
                const output = payload.output || "output";

                return {
                  ...state,
                  loading: false,
                  [output]: payload.response,
                  success: true,
                }
              },

            failed: (state,action) =>{
                return {
                    ...state,
                    loading: false,
                    error: action.payload.error,
                    success: false,
                }
            }  
           
        }
    });

   // console.log(apiSlice.actions,"dfgdg");
    export const {callApi, succeed, failed} = apiSlice.actions;
    export const selectApi = (state) => {
         
       // console.log(state, "state print");
       return state.api};
    export default apiSlice.reducer;