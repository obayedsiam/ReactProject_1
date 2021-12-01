import { call, put, takeEvery } from "redux-saga/effects";
import fetcher from "../lib/fetcher";
import { failed, succeed } from "../Reducers/apiSlice";

export default function* Sagas() {
  yield takeEvery(({ payload: { operationId = null } }) => {
    return typeof operationId === "string" && operationId.length > 0;
  }, performApiAction);
}

function* performApiAction(action) {
  //    console.log("Entered into perform action");
  //  console.log(action,"action");

  const {
    payload: { output = "output", operationId = "", parameters = {} },
  } = action;
  //console.log(,"action");
  // console.log(parameters,"params");

  //console.log(fetcher, "printng fetcher");
  try {
    let ret = yield call(() => fetcher(operationId, parameters));
    //  console.log(ret, "ret in saga after fetch");

    let response = ret;

    if (response !== "") {
      response = JSON.parse(ret);
    }

    //  console.log(response, "response in saga after fetch");

    yield put(succeed({ response, output }));

    //  if(response = "undefined"){
    //   console.log(response, "entered into if condition");
    //   performApiAction(action);
    //  }
  } catch (error) {
    console.log(error, "printing error after fetcher call");
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
