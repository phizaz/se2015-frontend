import actions from '../actions';

export default {

  nurse(state = {
    maximized: {}, //key: patientId
    patients: [], //search results
    search: {
      loading: false,
      error: null,
    },
    addReport: {
      loading: false,
      error: null,
    },
    editReport: {
      loading: false,
      error: null,
    },
  }, action) {

    console.log('inspect action:', action);

    switch(action.type) {

      case actions.NURSE_TOGGLE_VIEW:
        return {
          ...state,
          maximized: {
            ...state.maximized,
            [action.patientId]: !state.maximized[action.patientId]
          }
        };

      /*
      NURSE SEARCH PATIENT
       */
      case actions.NURSE_SEARCH_PATIENT_REQUEST:
        return {
          ...state,
          search: {
            ...state.search,
            loading: true,
          }
        };

      case actions.NURSE_SEARCH_PATIENT_SUCCESS:
        return {
          ...state,
          search: {
            ...state.search,
            loading: false,
          },
          patients: action.patients,
        };

      case actions.NURSE_SEARCH_PATIENT_FAILURE:
        return {
          ...state,
          search: {
            ...state.search,
            loading: false,
            error: action.error,
          }
        };

      /*
      PATIENT_REPORT ADD
       */
      case actions.PATIENT_REPORT_ADD_REQUEST:
        return {
          ...state,
          addReport: {
            ...state.addReport,
            loading: true,
          }
        };

      case actions.PATIENT_REPORT_ADD_SUCCESS:
        return {
          ...state,
          addReport: {
            ...state.addReport,
            loading: false,
          },
          patients: state.patients
            .map(x => {
              if (x.id !== action.patientId) {
                return x;
              }
              return {
                ...x,
                patientReports: [
                  ...x.patientReports,
                  action.patientReport
                ]
              };
            })
        };

      case actions.PATIENT_REPORT_ADD_FAILURE:
        return {
          ...state,
          addReport: {
            ...state.addReport,
            loading: false,
            error: action.error,
          }
        };

      // /*
      // PATIENT_REPORT EDIT
      //  */
      // case actions.PATIENT_REPORT_EDIT_REQUEST:
      //   return {
      //     ...state,
      //     editReport: {
      //       ...state.editReport,
      //       loading: true,
      //     }
      //   };

      // case actions.PATIENT_REPORT_EDIT_SUCCESS:
      //   return {
      //     ...state,
      //     editReport: {
      //       ...state.editReport,
      //       loading: false,
      //     },
      //     patients: state.patients
      //       .map(x => {
      //         if (x.id !== action.patientId) {
      //           return x;
      //         }
      //         return {
      //           ...x,
      //           patientReports: x.patientReports
      //             .map(y => {
      //               if (y.report_id !== action.patientReportId) {
      //                 return y;
      //               }
      //               return action.patientReport;
      //             })
      //         };
      //       })
      //   };

      // case actions.PATIENT_REPORT_EDIT_FAILURE:
      //   return {
      //     ...state,
      //     editReport: {
      //       ...state.editReport,
      //       loading: false,
      //       error: action.error,
      //     }
      //   };

      default:
        return state;
    }

  }

};
