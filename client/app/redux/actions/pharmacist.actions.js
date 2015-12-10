import $ from 'jquery';

export const PHARMACIST_TOGGLE_VIEW = 'PHARMACIST_TOGGLE_VIEW';
export function nurseToggleView(patientId) {
  return {
    type: PHARMACIST_TOGGLE_VIEW,
    patientId
  };
}

/**
 * [PHARMACIST_FETCH_REQUEST description]
 * @type {String}
 */
export const PHARMACIST_FETCH_REQUEST = 'PHARMACIST_FETCH_REQUEST';
export const PHARMACIST_FETCH_SUCCESS = 'PHARMACIST_FETCH_SUCCESS';
export const PHARMACIST_FETCH_FAILURE = 'PHARMACIST_FETCH_FAILURE';

function pharmacistFetchRequest() {
  return {
    type: PHARMACIST_FETCH_REQUEST,
  };
}

function pharmacistFetchSuccess(patients) {
  return {
    type: PHARMACIST_FETCH_SUCCESS,
    patients,
  };
}

function pharmacistFetchFailure(error) {
  return {
    type: PHARMACIST_FETCH_FAILURE,
    error,
  };
}

export function pharmacistFetch() {
  return (dispatch) => {
    dispatch(pharmacistFetchRequest());

    return new Promise(
      (resolve, reject) => {
        $.get('/api/pharmacist/get-patient')
          .done((res) => {
            console.log('res:', res);
            dispatch(pharmacistFetchSuccess(res.data));
            resolve(res.data);
          })
          .fail((err) => {
            console.log('err:', err);
            dispatch(pharmacistFetchFailure(err));
            reject(err);
          });
      });
  };
}

/**
 * [PHARMACIST_FINISH_REQUEST description]
 * @type {String}
 */
export const PHARMACIST_FINISH_REQUEST = 'PHARMACIST_FINISH_REQUEST';
export const PHARMACIST_FINISH_SUCCESS = 'PHARMACIST_FINISH_SUCCESS';
export const PHARMACIST_FINISH_FAILURE = 'PHARMACIST_FINISH_FAILURE';

function pharmacistFinishRequest(patientId) {
  return {
    type: PHARMACIST_FINISH_REQUEST,
    patientId,
  };
}

function pharmacistFinishSuccess(patientId) {
  return {
    type: PHARMACIST_FINISH_SUCCESS,
    patientId,
  };
}

function pharmacistFinishFailure(patientId, error) {
  return {
    type: PHARMACIST_FINISH_FAILURE,
    patientId,
    error,
  };
}

export function pharmacistFinish(patientId) {
  return (dispatch) => {
    dispatch(pharmacistFinishRequest(patientId));

    return new Promise(
      (resolve, reject) => {
        $.post(`/api/pharmacist/finish/${patientId}`)
          .done((res) => {
            console.log('pharmacistFinish res:', res);
            dispatch(pharmacistFinishSuccess(patientId));
            resolve(patientId);
          })
          .fail((err) => {
            console.log('pharmacistFinish err:', err);
            dispatch(pharmacistFinishFailure(patientId, err));
            reject(err);
          });
      });
  };
}
