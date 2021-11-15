import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type = "",
    message = ""
}
export const toastAlertSlice = createSlice({
    name: "toastAlert",
    initialState,
    reducers:{
        setToastAlert: (state, {payload}) => {
            return {
                type = payload.type,
                message = payload.message
            }

        }
    } 

})

export const {setToastAlert} = toastAlertSlice.actions;
export const selectToastApi = (state) => state.toastAlert;
export default toastAlertSlice.reducer;