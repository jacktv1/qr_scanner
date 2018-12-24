import { takeLatest, put } from "redux-saga/effects";
import { SCANNED } from "../types";
import { saveHistory } from "../actions";

function* scannedySaga(action) {
  try {
    console.log('saveHistory saga', action);
    yield put(saveHistory(action));
  } catch (error) {
    yield put(registerRequestError());
  }
}

export function* scannerSaga() {
  try {
    yield takeLatest(SCANNED, scannedySaga);
  } catch (error) {
    console.log(error);
  }
}
