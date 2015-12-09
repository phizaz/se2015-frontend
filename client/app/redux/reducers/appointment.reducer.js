import actions from '../actions';

export default {

  appointment(state = {
    delete: {
      loading: false,
      error: null,
    },
  }, action) {
    switch(action.type) {
      /*
      DELETE APPOINTMENT
       */
      case actions.APPOINTMENT_DELETE_REQUEST:
        return {
          ...state,
          delete: {
            ...state.delete,
            loading: true,
          },
        };
      case actions.APPOINTMENT_DELETE_SUCCESS:
        return {
          ...state,
          delete: {
            ...state.delete,
            loading: false,
          },
        };
      case actions.APPOINTMENT_DELETE_FAILURE:
        return {
          ...state,
          delete: {
            ...state.delete,
            loading: false,
            error: action.error,
          },
        };
      default:
        return state;
    }
  },

};
