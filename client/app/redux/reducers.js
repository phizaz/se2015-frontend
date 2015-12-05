import actions from './actions/';

export default {

  staff(state = {
    searchResults: [],
    search: {
      loading: false,
      error: null,
    },

    unconfirmedStaffs: [],
    fetch: {
      loading: false,
      error: null,
    },
    approve: {
      loading: false,
      error: null,
    },
    dismiss: {
      loading: false,
      error: null,
    },
  }, action) {

    console.log('inspect state:', state, 'action:', action);

    switch (action.type) {
      /*
      STAFF SERACH PATIENT
       */
      case actions.STAFF_SEARCH_PATIENT_REQUEST:
        return {
          ...state,
          search: {
            ...state.search,
            loading: true,
          },
        };
      case actions.STAFF_SEARCH_PATIENT_SUCCESS:
        return {
          ...state,
          search: {
            ...state.search,
            loading: false,
          },
          searchResults: action.patients,
        };
      case actions.STAFF_SEARCH_PATIENT_FAILURE:
        return {
          ...state,
          search: {
            ...state.search,
            loading: false,
            error: action.error,
          },
        };

      /*
      STAFF FETCH UNCONFIRMED STAFF
       */
      case actions.STAFF_FETCH_UNCONFIRMED_STAFF_REQUEST:
        return {
          ...state,
          fetch: {
            ...state.fetch,
            loading: true,
          },
        };
      case actions.STAFF_FETCH_UNCONFIRMED_STAFF_SUCCESS:
        return {
          ...state,
          fetch: {
            ...state.fetch,
            loading: false,
          },
          unconfirmedStaffs: action.staffs,
        };
      case actions.STAFF_FETCH_UNCONFIRMED_STAFF_FAILURE:
        return {
          ...state,
          fetch: {
            ...state.fetch,
            loading: false,
            error: action.error,
          },
        };

      /*
      STAFF APPROVE
       */
      case actions.STAFF_APPROVE_REQUEST:
        return {
          ...state,
          approve: {
            ...state.approve,
            loading: true,
          },
        };
      case actions.STAFF_APPROVE_SUCCESS:
        return {
          ...state,
          approve: {
            ...state.approve,
            loading: false,
          },
          unconfirmedStaffs:
            state.unconfirmedStaffs.filter(
              x => x.emp_id !== action.emp_id),
        };
      case actions.STAFF_APPROVE_FAILURE:
        return {
          ...state,
          approve: {
            ...state.approve,
            loading: false,
            error: action.error,
          },
        };

      /*
      STAFF DISMISS
       */
      case actions.STAFF_DISMISS_REQUEST:
        return {
          ...state,
          dismiss: {
            ...state.dismiss,
            loading: true,
          },
        };
      case actions.STAFF_DISMISS_SUCCESS:
        return {
          ...state,
          dismiss: {
            ...state.dismiss,
            loading: false,
          },
          unconfirmedStaffs:
            state.unconfirmedStaffs.filter(
              x => x.emp_id !== action.emp_id),
        };
      case actions.STAFF_DISMISS_FAILURE:
        return {
          ...state,
          dismiss: {
            ...state.dismiss,
            loading: false,
            error: action.error
          },
        };

      /*
      DEFAULT
       */
      default:
        return state;
    }
  },

};
