import { SET_COMPANY, SCANNED, SAVE_HISTORY, SCANNING } from "../types";

const initialState = {
  scanned: false,
  scanType: "",
  history: []
};

const scanner = (state = initialState, action) => {
  switch (action.type) {
    case SCANNED:
      return {
        ...state,
        resultType: action.resultType,
        resultContent: action.resultContent,
        scannedDate: action.scannedDate,
        scanned: true
      };
    case SCANNING:
      return {
        ...state,
        scanned: action.status,
        resultType: "",
        resultContent: "",
        scannedDate: ""
      };
    case SAVE_HISTORY:
      const parentKey = "type";
      const { [parentKey]: parentValue, ...noChild } = action.history;
      let history = state.history;
      history.unshift(noChild);
      return {
        ...state,
        history
      };
    default:
      return state;
  }
};

export default scanner;
