import $ from 'jquery';

export const STAFF_TOGGLE_EMP_VIEW = 'STAFF_TOGGLE_EMP_VIEW';
export function staffToggleEmpView(empId) {
  return {
    type: STAFF_TOGGLE_EMP_VIEW,
    empId,
  };
}

export const STAFF_TOGGLE_VIEW = 'STAFF_TOGGLE_VIEW';
export function staffToggleView(patientId) {
  return {
    type: STAFF_TOGGLE_VIEW,
    patientId
  };
}

/**
 * [STAFF_SEARCH_PATIENT_REQUEST description]
 * @type {String}
 */
export const STAFF_SEARCH_PATIENT_REQUEST = 'STAFF_SEARCH_PATIENT_REQUEST';
export const STAFF_SEARCH_PATIENT_SUCCESS = 'STAFF_SEARCH_PATIENT_SUCCESS';
export const STAFF_SEARCH_PATIENT_FAILURE = 'STAFF_SEARCH_PATIENT_FAILURE';

function staffSearchPatientRequest() {
  return {
    type: STAFF_SEARCH_PATIENT_REQUEST,
  };
}

function staffSearchPatientSuccess(patients) {
  return {
    type: STAFF_SEARCH_PATIENT_SUCCESS,
    patients,
  };
}

function staffSearchPatientFailure(error) {
  return {
    type: STAFF_SEARCH_PATIENT_FAILURE,
    error,
  };
}

export function staffSearchPatient(firstname, lastname) {
  return (dispatch) => {
    dispatch(staffSearchPatientRequest());

    return new Promise(
      (resolve, reject) => {
        $.get('/api/staff/get-patient',
          {
            firstname,
            lastname,
          })
          .done((res) => {
            console.log('res:', res);
            dispatch(staffSearchPatientSuccess(res.data));
            resolve(res.data);
          })
          .fail((err) => {
            console.log('err:', err);
            dispatch(staffSearchPatientFailure(err));
            reject(err);
          });
      });
  };
}

/**
 * [STAFF_FETCH_UNCONFIRMED_STAFF_REQUEST description]
 * @type {String}
 */
export const STAFF_FETCH_UNCONFIRMED_STAFF_REQUEST = 'STAFF_FETCH_UNCONFIRMED_STAFF_REQUEST';
export const STAFF_FETCH_UNCONFIRMED_STAFF_SUCCESS = 'STAFF_FETCH_UNCONFIRMED_STAFF_SUCCESS';
export const STAFF_FETCH_UNCONFIRMED_STAFF_FAILURE = 'STAFF_FETCH_UNCONFIRMED_STAFF_FAILURE';

function staffFetchUnconfirmedStaffRequest() {
  return {
    type: STAFF_FETCH_UNCONFIRMED_STAFF_REQUEST,
  };
}

function staffFetchUnconfirmedStaffSuccess(staffs) {
  return {
    type: STAFF_FETCH_UNCONFIRMED_STAFF_SUCCESS,
    staffs,
  };
}

function staffFetchUnconfirmedStaffFailure(error) {
  return {
    type: STAFF_FETCH_UNCONFIRMED_STAFF_FAILURE,
    error,
  };
}

export function staffFetchUnconfirmedStaff() {
  return (dispatch) => {
    dispatch(staffFetchUnconfirmedStaffRequest());

    return new Promise(
      (resolve, reject) => {
        $.get('/api/staff/get-unconfirmed-staff')
          .done((res) => {
            console.log('fetch unconfirmed staff res:', res);
            dispatch(staffFetchUnconfirmedStaffSuccess(res.data));
            resolve(res.data);
          })
          .fail((err) => {
            console.log('fetch unconfirmed staff err:', err);
            dispatch(staffFetchUnconfirmedStaffFailure(err));
            reject(err);
          });
      });
  };
}

/**
 * [STAFF_APPROVE_REQUEST description]
 * @type {String}
 */
export const STAFF_APPROVE_REQUEST = 'STAFF_APPROVE_REQUEST';
export const STAFF_APPROVE_SUCCESS = 'STAFF_APPROVE_SUCCESS';
export const STAFF_APPROVE_FAILURE = 'STAFF_APPROVE_FAILURE';

function staffApproveRequest(staffId) {
  return {
    type: STAFF_APPROVE_REQUEST,
    staffId,
  };
}

function staffApproveSuccess(staffId) {
  return {
    type: STAFF_APPROVE_SUCCESS,
    staffId,
  };
}

function staffApproveFailure(staffId, error) {
  return {
    type: STAFF_APPROVE_FAILURE,
    staffId,
    error,
  };
}

export function staffApprove(staffId) {
  return (dispatch) => {
    dispatch(staffApproveRequest());

    return new Promise(
      (resolve, reject) => {
        $.post(`/api/staff/approve-staff/${staffId}`)
          .done((res) => {
            console.log('staff approve res:', res);
            dispatch(staffApproveSuccess(staffId));
            resolve();
          })
          .fail((err) => {
            console.log('staff approve err:', err);
            dispatch(staffApproveFailure(staffId, err));
            reject(err);
          });
      });
  };
}

/**
 * [STAFF_DISMISS_REQUEST description]
 * @type {String}
 */
export const STAFF_DISMISS_REQUEST = 'STAFF_DISMISS_REQUEST';
export const STAFF_DISMISS_SUCCESS = 'STAFF_DISMISS_SUCCESS';
export const STAFF_DISMISS_FAILURE = 'STAFF_DISMISS_FAILURE';

function staffDismissRequest(staffId) {
  return {
    type: STAFF_DISMISS_REQUEST,
    staffId,
  };
}

function staffDismissSuccess(staffId) {
  return {
    type: STAFF_DISMISS_SUCCESS,
    staffId,
  };
}

function staffDismissFailure(staffId, error) {
  return {
    type: STAFF_DISMISS_FAILURE,
    staffId,
    error,
  };
}

export function staffDismiss(staffId) {
  return (dispatch) => {
    dispatch(staffDismissRequest());

    return new Promise(
      (resolve, reject) => {
        $.post(`/api/staff/discard-staff/${staffId}`)
          .done((res) => {
            console.log('staff dismiss res:', res);
            dispatch(staffDismissSuccess(staffId));
            resolve();
          })
          .fail((err) => {
            console.log('staff dismiss err:', err);
            dispatch(staffDismissFailure(staffId, err));
            reject(err);
          });
      });
  };
}
