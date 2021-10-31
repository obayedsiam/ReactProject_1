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
    const { payload: { output = "output", operationId = "", parameters = {} },} = action;

    try {
        let response = yield call(()=> fetcher (operationId, parameters));
    }catch (error) {
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

