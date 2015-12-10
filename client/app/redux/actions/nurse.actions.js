import $ from 'jquery';

export const NURSE_TOGGLE_VIEW = 'NURSE_TOGGLE_VIEW';
export function nurseToggleView(patientId) {
  return {
    type: NURSE_TOGGLE_VIEW,
    patientId
  };
}

/**
 * [NURSE_SEARCH_PATIENT_REQUEST description]
 * @type {String}
 */
export const NURSE_SEARCH_PATIENT_REQUEST = 'NURSE_SEARCH_PATIENT_REQUEST';
export const NURSE_SEARCH_PATIENT_SUCCESS = 'NURSE_SEARCH_PATIENT_SUCCESS';
export const NURSE_SEARCH_PATIENT_FAILURE = 'NURSE_SEARCH_PATIENT_FAILURE';

function nurseSearchPatientRequest() {
  return {
    type: NURSE_SEARCH_PATIENT_REQUEST,
  };
}

function nurseSearchPatientSuccess(patients) {
  return {
    type: NURSE_SEARCH_PATIENT_SUCCESS,
    patients,
  };
}

function nurseSearchPatientFailure(error) {
  return {
    type: NURSE_SEARCH_PATIENT_FAILURE,
    error,
  };
}

export function nurseSearchPatient(firstname, lastname) {
  return (dispatch) => {
    dispatch(nurseSearchPatientRequest());

    return new Promise(
      (resolve, reject) => {
        $.get('/api/nurse/get-patient',
          {
            firstname,
            lastname,
          })
          .done((res) => {
            console.log('res:', res);
            dispatch(nurseSearchPatientSuccess(res.data));
            resolve(res.data);
          })
          .fail((err) => {
            console.log('err:', err);
            dispatch(nurseSearchPatientFailure(err));
            reject(err);
          });
      });
  };
}


/**
 * [PATIENT_REPORT_ADD_REQUEST description]
 * @type {String}
 */
export const PATIENT_REPORT_ADD_REQUEST = 'PATIENT_REPORT_ADD_REQUEST';
export const PATIENT_REPORT_ADD_SUCCESS = 'PATIENT_REPORT_ADD_SUCCESS';
export const PATIENT_REPORT_ADD_FAILURE = 'PATIENT_REPORT_ADD_FAILURE';

function patientReportAddRequest(patientId, patientReport) {
  return {
    type: PATIENT_REPORT_ADD_REQUEST,
    patientId,
    patientReport,
  };
}

function patientReportAddSuccess(patientId, patientReport) {
  return {
    type: PATIENT_REPORT_ADD_SUCCESS,
    patientId,
    patientReport,
  };
}

function patientReportAddFailure(patientId, error) {
  return {
    type: PATIENT_REPORT_ADD_FAILURE,
    patientId,
    error,
  };
}

export function patientReportAdd(patientId, patientReport) {
  if (!patientReport.height || !patientReport.weight || !patientReport.pressure) {
    throw new Error('no height or weight or pressure');
  }

  return (dispatch) => {
    dispatch(patientReportAddRequest(patientId, patientReport));

    return new Promise(
      (resolve, reject) => {
        $.post(`/api/nurse/patient-report/${patientId}`, {
          ...patientReport
        })
          .done((res) => {
            console.log('patientReportAdd res:', res);
            dispatch(patientReportAddSuccess(patientId, res.data));
            resolve(res.data);
          })
          .fail((err) => {
            console.log('patientReportAdd err:', err);
            dispatch(patientReportAddFailure(patientId, err));
            reject(err);
          });
      });
  };
}


// export const PATIENT_REPORT_EDIT_REQUEST = 'PATIENT_REPORT_EDIT_REQUEST';
// export const PATIENT_REPORT_EDIT_SUCCESS = 'PATIENT_REPORT_EDIT_SUCCESS';
// export const PATIENT_REPORT_EDIT_FAILURE = 'PATIENT_REPORT_EDIT_FAILURE';

// function patientReportEditRequest(patientId, patientReportId, patientReport) {
//   return {
//     type: PATIENT_REPORT_EDIT_REQUEST,
//     patientId,
//     patientReportId,
//     patientReport,
//   };
// }

// function patientReportEditSuccess(patientId, patientReportId, patientReport) {
//   return {
//     type: PATIENT_REPORT_EDIT_SUCCESS,
//     patientId,
//     patientReportId,
//     patientReport,
//   };
// }

// function patientReportEditFailure(patientId, patientReportId, error) {
//   return {
//     type: PATIENT_REPORT_EDIT_FAILURE,
//     patientId,
//     patientReportId,
//     error,
//   };
// }

// export function patientReportEdit(patientId, patientReportId, patientReport) {
//   return (dispatch) => {
//     dispatch(patientReportEditRequest(patientId, patientReportId, patientReport));

//     return new Promise(
//       (resolve, reject) => {
//         $.post(`/api/patientReport-report/update/${patientReportId}`, {
//           report: patientReport,
//         })
//           .done((res) => {
//             console.log('patientReportEdit res:', res);
//             dispatch(patientReportEditSuccess(patientId, patientReportId, res.data));
//             resolve(res.data);
//           })
//           .fail((err) => {
//             console.log('patientReportEdit err:', err);
//             dispatch(patientReportEditFailure(patientId, patientReportId, err));
//             reject(err);
//           });
//       });
//   };
// }
