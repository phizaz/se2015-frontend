import actions from '../actions';

export default {

  doctor(state = {
    toPharmacist: {
      loading: false,
      error: null,
    },

    drugAllergic: {}, //key: patientId
    editDrugAllergic: {
      loading: false,
      error: null,
    },

    symptoms: {}, //key: patientId
    addSymptom: {
      loading: false,
      error: null,
    },
    editSymptom: {
      loading: false,
      error: null,
    },
    deleteSymptom: {
      loading: false,
      error: null,
    },

    drugs: {}, //key: patientId
    addDrug: {
      loading: false,
      error: null,
    },
    editDrug: {
      loading: false,
      error: null,
    },
    deleteDrug: {
      loading: false,
      error: null,
    }
  }, action) {
    console.log('inspect action:', action);

    switch(action.type) {

      /*
      TO PHARMACIST
       */
      case actions.TO_PHARMACIST_REQUEST:
        return {
          ...state,
          toPharmacist: {
            ...state.toPharmacist,
            loading: true,
          }
        };

      case actions.TO_PHARMACIST_SUCCESS:
        return {
          ...state,
          toPharmacist: {
            ...state.toPharmacist,
            loading: false,
          }
        };

      case actions.TO_PHARMACIST_FAILURE:
        return {
          ...state,
          toPharmacist: {
            ...state.toPharmacist,
            loading: false,
            error: action.error,
          }
        };

      case actions.SYMPTOM_SET:
        return {
          ...state,
          symptoms: {
            ...state.symptoms,
            [action.patientId]: action.symptoms,
          }
        };

      case actions.DRUG_SET:
        return {
          ...state,
          drugs: {
            ...state.drugs,
            [action.patientId]: action.drugs,
          }
        };

      case actions.DRUG_ALLERGIC_SET:
        return {
          ...state,
          drugAllergic: {
            ...state.drugAllergic,
            [action.patientId]: action.drugAllergic,
          }
        };

      /*
      EDIT DRUG ALLERGIC
       */
      case actions.EDIT_DRUG_ALLERGIC_REQUEST:
        return {
          ...state,
          editDrugAllergic: {
            ...state.editDrugAllergic,
            loading: true,
          }
        };

      case actions.EDIT_DRUG_ALLERGIC_SUCCESS:
        return {
          ...state,
          editDrugAllergic: {
            ...state.editDrugAllergic,
            loading: false,
          },
          drugAllergic: {
            ...state.drugAllergic,
            [action.patientId]: action.drugAllergic,
          }
        };

      case actions.EDIT_DRUG_ALLERGIC_FAILURE:
        return {
          ...state,
          editDrugAllergic: {
            ...state.editDrugAllergic,
            loading: false,
            error: action.error,
          }
        };

      /*
      SYMPTOM ADD
       */
      case actions.SYMPTOM_ADD_REQUEST:
        return {
          ...state,
          addSymptom: {
            ...state.addSymptom,
            loading: true,
          }
        };

      case actions.SYMPTOM_ADD_SUCCESS:
        return {
          ...state,
          addSymptom: {
            ...state.addSymptom,
            loading: false,
          },
          symptoms: {
            ...state.symptoms,
            [action.patientId]:
              state.symptoms[action.patientId] ?
                [
                  ...state.symptoms[action.patientId],
                  action.symptom,
                ] :
                [ action.symptom ]
          }
        };

      case actions.SYMPTOM_ADD_FAILURE:
        return {
          ...state,
          addSymptom: {
            ...state.addSymptom,
            loading: false,
            error: action.error,
          }
        };

      /*
      SYMPTOM EDIT
       */
      case actions.SYMPTOM_EDIT_REQUEST:
        return {
          ...state,
          editSymptom: {
            ...state.editSymptom,
            loading: true,
          }
        };

      case actions.SYMPTOM_EDIT_SUCCESS:
        return {
          ...state,
          editSymptom: {
            ...state.editSymptom,
            loading: false,
          },
          symptoms: {
            ...state.symptoms,
            [action.patientId]: state.symptoms[action.patientId]
              .map(x => {
                if (x.symptom_id !== action.symptomId) {
                  return x;
                }

                return action.symptom;
              })
          }
        };

      case actions.SYMPTOM_EDIT_FAILURE:
        return {
          ...state,
          editSymptom: {
            ...state.editSymptom,
            loading: false,
            error: action.error,
          }
        };

      /*
      SYMPTOM DELETE
       */
      case actions.SYMPTOM_DELETE_REQUEST:
        return {
          ...state,
          deleteSymptom: {
            ...state.deleteSymptom,
            loading: true,
          }
        };

      case actions.SYMPTOM_DELETE_SUCCESS:
        return {
          ...state,
          deleteSymptom: {
            ...state.deleteSymptom,
            loading: false,
          },
          symptoms: {
            ...state.symptoms,
            [action.patientId]: state.symptoms[action.patientId]
              .filter(x => x.symptom_id !== action.symptomId)
          }
        };

      case actions.SYMPTOM_DELETE_FAILURE:
        return {
          ...state,
          deleteSymptom: {
            ...state.deleteSymptom,
            loading: false,
            error: action.error,
          }
        };


      /*
      DRUG ADD
       */
      case actions.DRUG_ADD_REQUEST:
        return {
          ...state,
          addDrug: {
            ...state.addDrug,
            loading: true,
          }
        };

      case actions.DRUG_ADD_SUCCESS:
        return {
          ...state,
          addDrug: {
            ...state.addDrug,
            loading: false,
          },
          drugs: {
            ...state.drugs,
            [action.patientId]:
              state.drugs[action.patientId] ?
                [
                  ...state.drugs[action.patientId],
                  action.drug,
                ] :
                [ action.drug ],
          }
        };

      case actions.DRUG_ADD_FAILURE:
        return {
          ...state,
          addDrug: {
            ...state.addDrug,
            loading: false,
            error: action.error,
          }
        };

      /*
      DRUG EDIT
       */
      case actions.DRUG_EDIT_REQUEST:
        return {
          ...state,
          editDrug: {
            ...state.editDrug,
            loading: true,
          }
        };

      case actions.DRUG_EDIT_SUCCESS:
        return {
          ...state,
          editDrug: {
            ...state.editDrug,
            loading: false,
          },
          drugs: {
            ...state.drugs,
            [action.patientId]: state.drugs[action.patientId]
              .map(x => {
                if (x.drug_id !== action.drugId) {
                  return x;
                }

                return action.drug;
              })
          }
        };

      case actions.DRUG_EDIT_FAILURE:
        return {
          ...state,
          editDrug: {
            ...state.editDrug,
            loading: false,
            error: action.error,
          }
        };

      /*
      DRUG DELETE
       */
      case actions.DRUG_DELETE_REQUEST:
        return {
          ...state,
          deleteDrug: {
            ...state.deleteDrug,
            loading: true,
          }
        };

      case actions.DRUG_DELETE_SUCCESS:
        return {
          ...state,
          deleteDrug: {
            ...state.deleteDrug,
            loading: false,
          },
          drugs: {
            ...state.drugs,
            [action.patientId]: state.drugs[action.patientId]
              .filter(x => x.drug_id !== action.drugId)
          }
        };

      case actions.DRUG_DELETE_FAILURE:
        return {
          ...state,
          deleteDrug: {
            ...state.deleteDrug,
            loading: false,
            error: action.error,
          }
        };

      default:
        return state;
    }
  },

};
