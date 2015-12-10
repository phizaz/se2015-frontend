import actions from '../actions';

export default {

  pharmacist(state = {
    patients: [],
    fetch: {
      loading: false,
      error: null,
    },
    maximized: {}, //key: patientId,
    markedFinished: {}, //keys: patientId,
    finish: {
      loading: false,
      error: null,
    },
  }, action) {
    switch(action.type) {

      case actions.PHARMACIST_TOGGLE_VIEW:
        return {
          ...state,
          maximized: {
            ...state.maximized,
            [action.patientId]: !state.maximized[action.patientId]
          }
        };

      /*
      PHARMACIST FETCH
       */
      case actions.PHARMACIST_FETCH_REQUEST:
        return {
          ...state,
          fetch: {
            ...state.fetch,
            loading: true,
          }
        };

      case actions.PHARMACIST_FETCH_SUCCESS:
        return {
          ...state,
          fetch: {
            ...state.fetch,
            loading: false,
          },
          patients: action.patients,
        };

      case actions.PHARMACIST_FETCH_FAILURE:
        return {
          ...state,
          fetch: {
            ...state.fetch,
            loading: false,
            error: action.error,
          }
        };

      /*
      PHARMACIST FETCH
       */
      case actions.PHARMACIST_FINISH_REQUEST:
        return {
          ...state,
          finish: {
            ...state.finish,
            loading: true,
          }
        };

      case actions.PHARMACIST_FINISH_SUCCESS:
        return {
          ...state,
          finish: {
            ...state.finish,
            loading: false,
          },
          markedFinished: {
            ...state.markedFinished,
            [action.patientId]: true,
          },
          // patients: state.patients
          //   .map(x => {
          //     if (x.id !== action.patientId) {
          //       return x;
          //     }
          //     return {
          //       ...x,
          //       drugRecords: action.drugRecords,
          //     };
          //   })
        };

      case actions.PHARMACIST_FINISH_FAILURE:
        return {
          ...state,
          finish: {
            ...state.finish,
            loading: false,
            error: action.error,
          }
        };

      default:
        return state;
    }
  }

};
