import { call, put, takeEvery } from "redux-saga/effects";
import fetcher from "../lib/fetcher";
import { failed , succeed} from "../Reducers/apiSlice";

export default function* Sagas(){
    yield takeEvery((
        {payload: {operationId = null }}) =>{
            return typeof operationId === "string" && operationId.length > 0;
        }, performApiAction)
}


function* performApiAction(action) {
    console.log("Entered into perform action");
    console.log(action,"action");
    const { payload: { output = "output", operationId = "", parameters = {} }} = action;
    //console.log(,"action");
   // console.log(parameters,"params");
    try {
       
        let response = yield call(()=>{ fetcher(operationId, parameters)});
        yield put(
          succeed({
            response,
            output,
          })
        );
    }
    catch (error) {
      alert("okk")
      console.log("printing response after fetcher call ttt");
        yield put(
          failed({
            error: error.response
              ? error.response.obj.error
              : {
                  message: "Api call failed or check your internet connection",
                },
          })
        );
      }

}

