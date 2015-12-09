import $ from 'jquery';

export const TO_PHARMACIST_REQUEST = 'TO_PHARMACIST_REQUEST';
export const TO_PHARMACIST_SUCCESS = 'TO_PHARMACIST_SUCCESS';
export const TO_PHARMACIST_FAILURE = 'TO_PHARMACIST_FAILURE';

function toPharmacistRequest(patientId) {
  return {
    type: TO_PHARMACIST_REQUEST,
    patientId,
  };
}

function toPharmacistSuccess(patientId) {
  return {
    type: TO_PHARMACIST_SUCCESS,
    patientId,
  };
}

function toPharmacistFailure(patientId, error) {
  return {
    type: TO_PHARMACIST_FAILURE,
    patientId,
    error,
  };
}

export function toPharmacist(patientId) {
  return (dispatch) => {
    dispatch(toPharmacistRequest(patientId));

    return new Promise(
      (resolve, reject) => {
        $.post(`/api/to-pharmacist/${patientId}`)
          .done((res) => {
            console.log('toPharmacist res:', res);
            dispatch(toPharmacistSuccess(patientId));
            resolve();
          })
          .fail((err) => {
            console.log('toPharmacist err:', err);
            dispatch(toPharmacistFailure(patientId, err));
            reject(err);
          });
      });
  };
}

export const SYMPTOM_SET = 'SYMPTOM_SET';
export function symptomSet(patientId, symptoms) {
  return {
    type: SYMPTOM_SET,
    patientId,
    symptoms,
  };
}

export const DRUG_SET = 'DRUG_SET';
export function drugSet(patientId, drugs) {
  return {
    type: DRUG_SET,
    patientId,
    drugs,
  };
}

export const DRUG_ALLERGIC_SET = 'DRUG_ALLERGIC_SET';
export function drugAllergicSet(patientId, drugAllergic) {
  return {
    type: DRUG_ALLERGIC_SET,
    patientId,
    drugAllergic,
  };
}


export const EDIT_DRUG_ALLERGIC_REQUEST = 'EDIT_DRUG_ALLERGIC_REQUEST';
export const EDIT_DRUG_ALLERGIC_SUCCESS = 'EDIT_DRUG_ALLERGIC_SUCCESS';
export const EDIT_DRUG_ALLERGIC_FAILURE = 'EDIT_DRUG_ALLERGIC_FAILURE';

function editDrugAllergicRequest(patientId, drugAllergic) {
  return {
    type: EDIT_DRUG_ALLERGIC_REQUEST,
    patientId,
    drugAllergic,
  };
}

function editDrugAllergicSuccess(patientId, drugAllergic) {
  return {
    type: EDIT_DRUG_ALLERGIC_SUCCESS,
    patientId,
    drugAllergic,
  };
}

function editDrugAllergicFailure(patientId, error) {
  return {
    type: EDIT_DRUG_ALLERGIC_FAILURE,
    patientId,
    error,
  };
}

export function editDrugAllergic(patientId, drugAllergic) {
  return (dispatch) => {
    dispatch(editDrugAllergicRequest(patientId, drugAllergic));

    return new Promise(
      (resolve, reject) => {
        $.post(`/api/drug-allergic/${patientId}`, {
          drugAllergic
        })
          .done((res) => {
            console.log('editDrugAllergic res:', res);
            dispatch(editDrugAllergicSuccess(patientId, drugAllergic));
            resolve();
          })
          .fail((err) => {
            console.log('editDrugAllergic err:', err);
            dispatch(editDrugAllergicFailure(patientId, err));
            reject(err);
          });
      });
  };
}

/**
 * [SYMPTOM_ADD_REQUEST description]
 * @type {String}
 */
export const SYMPTOM_ADD_REQUEST = 'SYMPTOM_ADD_REQUEST';
export const SYMPTOM_ADD_SUCCESS = 'SYMPTOM_ADD_SUCCESS';
export const SYMPTOM_ADD_FAILURE = 'SYMPTOM_ADD_FAILURE';

function symptomAddRequest(patientId, symptom) {
  return {
    type: SYMPTOM_ADD_REQUEST,
    patientId,
    symptom,
  };
}

function symptomAddSuccess(patientId, symptom) {
  return {
    type: SYMPTOM_ADD_SUCCESS,
    patientId,
    symptom,
  };
}

function symptomAddFailure(patientId, error) {
  return {
    type: SYMPTOM_ADD_FAILURE,
    patientId,
    error,
  };
}

export function symptomAdd(patientId, symptom) {
  return (dispatch) => {
    dispatch(symptomAddRequest(patientId, symptom));

    return new Promise(
      (resolve, reject) => {
        $.post(`/api/symptom-report/create`, {
          patient_id: patientId,
          report: symptom,
        })
          .done((res) => {
            console.log('symptomAdd res:', res);
            dispatch(symptomAddSuccess(patientId, res.data));
            resolve(res.data);
          })
          .fail((err) => {
            console.log('symptomAdd err:', err);
            dispatch(symptomAddFailure(patientId, err));
            reject(err);
          });
      });
  };
}


export const SYMPTOM_EDIT_REQUEST = 'SYMPTOM_EDIT_REQUEST';
export const SYMPTOM_EDIT_SUCCESS = 'SYMPTOM_EDIT_SUCCESS';
export const SYMPTOM_EDIT_FAILURE = 'SYMPTOM_EDIT_FAILURE';

function symptomEditRequest(patientId, symptomId, symptom) {
  return {
    type: SYMPTOM_EDIT_REQUEST,
    patientId,
    symptomId,
    symptom,
  };
}

function symptomEditSuccess(patientId, symptomId, symptom) {
  return {
    type: SYMPTOM_EDIT_SUCCESS,
    patientId,
    symptomId,
    symptom,
  };
}

function symptomEditFailure(patientId, symptomId, error) {
  return {
    type: SYMPTOM_EDIT_FAILURE,
    patientId,
    symptomId,
    error,
  };
}

export function symptomEdit(patientId, symptomId, symptom) {
  return (dispatch) => {
    dispatch(symptomEditRequest(patientId, symptomId, symptom));

    return new Promise(
      (resolve, reject) => {
        $.post(`/api/symptom-report/update/${symptomId}`, {
          report: symptom,
        })
          .done((res) => {
            console.log('symptomEdit res:', res);
            dispatch(symptomEditSuccess(patientId, symptomId, res.data));
            resolve(res.data);
          })
          .fail((err) => {
            console.log('symptomEdit err:', err);
            dispatch(symptomEditFailure(patientId, symptomId, err));
            reject(err);
          });
      });
  };
}


export const SYMPTOM_DELETE_REQUEST = 'SYMPTOM_DELETE_REQUEST';
export const SYMPTOM_DELETE_SUCCESS = 'SYMPTOM_DELETE_SUCCESS';
export const SYMPTOM_DELETE_FAILURE = 'SYMPTOM_DELETE_FAILURE';

function symptomDeleteRequest(patientId, symptomId) {
  return {
    type: SYMPTOM_DELETE_REQUEST,
    patientId,
    symptomId,
  };
}

function symptomDeleteSuccess(patientId, symptomId) {
  return {
    type: SYMPTOM_DELETE_SUCCESS,
    patientId,
    symptomId,
  };
}

function symptomDeleteFailure(patientId, symptomId, error) {
  return {
    type: SYMPTOM_DELETE_FAILURE,
    patientId,
    symptomId,
    error,
  };
}

export function symptomDelete(patientId, symptomId) {
  return (dispatch) => {
    dispatch(symptomDeleteRequest(patientId, symptomId));

    return new Promise(
      (resolve, reject) => {
        $.post(`/api/symptom-report/delete/${symptomId}`)
          .done((res) => {
            console.log('symptomDelete res:', res);
            dispatch(symptomDeleteSuccess(patientId, symptomId));
            resolve();
          })
          .fail((err) => {
            console.log('symptomDelete err:', err);
            dispatch(symptomDeleteFailure(patientId, symptomId, err));
            reject(err);
          });
      });
  };
}

/**
 * DOCTOR DRUG
 */
export const DRUG_ADD_REQUEST = 'DRUG_ADD_REQUEST';
export const DRUG_ADD_SUCCESS = 'DRUG_ADD_SUCCESS';
export const DRUG_ADD_FAILURE = 'DRUG_ADD_FAILURE';

function drugAddRequest(patientId, drug) {
  return {
    type: DRUG_ADD_REQUEST,
    patientId,
    drug,
  };
}

function drugAddSuccess(patientId, drug) {
  return {
    type: DRUG_ADD_SUCCESS,
    patientId,
    drug,
  };
}

function drugAddFailure(patientId, error) {
  return {
    type: DRUG_ADD_FAILURE,
    patientId,
    error,
  };
}

export function drugAdd(patientId, drug) {
  if(!drug.name || !drug.quantity) {
    throw new Error('no drug name or no drug quantity');
  }

  return (dispatch) => {
    dispatch(drugAddRequest(patientId, drug));

    return new Promise(
      (resolve, reject) => {
        $.post(`/api/drug-record/create`, {
          ...drug,
          patient_id: patientId,
        })
          .done((res) => {
            console.log('drugAdd res:', res);
            dispatch(drugAddSuccess(patientId, res.data));
            resolve(res.data);
          })
          .fail((err) => {
            console.log('drugAdd err:', err);
            dispatch(drugAddFailure(patientId, err));
            reject(err);
          });
      });
  };
}


export const DRUG_EDIT_REQUEST = 'DRUG_EDIT_REQUEST';
export const DRUG_EDIT_SUCCESS = 'DRUG_EDIT_SUCCESS';
export const DRUG_EDIT_FAILURE = 'DRUG_EDIT_FAILURE';

function drugEditRequest(patientId, drugId, drug) {
  return {
    type: DRUG_EDIT_REQUEST,
    patientId,
    drugId,
    drug,
  };
}

function drugEditSuccess(patientId, drugId, drug) {
  return {
    type: DRUG_EDIT_SUCCESS,
    patientId,
    drugId,
    drug,
  };
}

function drugEditFailure(patientId, drugId, error) {
  return {
    type: DRUG_EDIT_FAILURE,
    patientId,
    drugId,
    error,
  };
}

export function drugEdit(patientId, drugId, drug) {
  if(!drug.name || !drug.quantity) {
    throw new Error('no drug name or no drug quantity');
  }

  return (dispatch) => {
    dispatch(drugEditRequest(patientId, drugId, drug));

    return new Promise(
      (resolve, reject) => {
        $.post(`/api/drug-record/update/${drugId}`, {
          ...drug
        })
          .done((res) => {
            console.log('drugEdit res:', res);
            dispatch(drugEditSuccess(patientId, drugId, res.data));
            resolve(res.data);
          })
          .fail((err) => {
            console.log('drugEdit err:', err);
            dispatch(drugEditFailure(patientId, drugId, err));
            reject(err);
          });
      });
  };
}


export const DRUG_DELETE_REQUEST = 'DRUG_DELETE_REQUEST';
export const DRUG_DELETE_SUCCESS = 'DRUG_DELETE_SUCCESS';
export const DRUG_DELETE_FAILURE = 'DRUG_DELETE_FAILURE';

function drugDeleteRequest(patientId, drugId) {
  return {
    type: DRUG_DELETE_REQUEST,
    patientId,
    drugId,
  };
}

function drugDeleteSuccess(patientId, drugId) {
  return {
    type: DRUG_DELETE_SUCCESS,
    patientId,
    drugId,
  };
}

function drugDeleteFailure(patientId, drugId, error) {
  return {
    type: DRUG_DELETE_FAILURE,
    patientId,
    drugId,
    error,
  };
}

export function drugDelete(patientId, drugId) {
  return (dispatch) => {
    dispatch(drugDeleteRequest(patientId, drugId));

    return new Promise(
      (resolve, reject) => {
        $.post(`/api/drug-record/delete/${drugId}`)
          .done((res) => {
            console.log('drugDelete res:', res);
            dispatch(drugDeleteSuccess(patientId, drugId));
            resolve();
          })
          .fail((err) => {
            console.log('drugDelete err:', err);
            dispatch(drugDeleteFailure(patientId, drugId, err));
            reject(err);
          });
      });
  };
}
