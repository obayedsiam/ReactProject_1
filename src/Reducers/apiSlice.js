import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    response : false,
    error : null,
    operationId: null,
    parameters: null,
    success: null,
};

export const apiSlice = createSlice(
    {
        name: "api",
        initialState,
        reducer : {
            callApi : (state, {payload}) =>(
                {
                    loading: true,
                    operationId: payload.operationId,
                    parameters: payload.parameters || {}
                }
            ),
            succeed : (state, { payload }) => {
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

    export const {callApi, succeed, failed} = apiSlice.actions;
    export const selectApi = (state) => state.api;
    export default apiSlice.reducer;