import { SET_COMPANY, SCANNED, SAVE_HISTORY, SCANNING } from "../types";

export function setCompany(company) {
  return {
    type: SET_COMPANY,
    company
  };
}

export function scanned(resultType, resultContent, scannedDate) {
  return {
    type: SCANNED,
    resultType,
    resultContent,
    scannedDate
  };
}

export function saveHistory(history) {
  return {
    type: SAVE_HISTORY,
    history
  };
}

export function scanning(status) {
  return {
    type: SCANNING,
    status
  };
}
