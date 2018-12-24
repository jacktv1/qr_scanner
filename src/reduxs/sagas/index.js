import { fork } from "redux-saga/effects";
import { scannerSaga } from "./scanner";

export default function* sagas() {
  yield [fork(scannerSaga)];
}
