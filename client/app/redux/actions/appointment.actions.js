import $ from 'jquery';

export const APPOINTMENT_DELETE_REQUEST = 'APPOINTMENT_DELETE_REQUEST';
export const APPOINTMENT_DELETE_SUCCESS = 'APPOINTMENT_DELETE_SUCCESS';
export const APPOINTMENT_DELETE_FAILURE = 'APPOINTMENT_DELETE_FAILURE';

function appointmentDeleteRequest() {
  return {
    type: APPOINTMENT_DELETE_REQUEST,
  };
}

function appointmentDeleteSuccess(appointmentId) {
  return {
    type: APPOINTMENT_DELETE_SUCCESS,
    appointmentId,
  };
}

function appointmentDeleteFailure(error) {
  return {
    type: APPOINTMENT_DELETE_FAILURE,
    error,
  };
}

export function appointmentDelete(appointmentId) {
  return (dispatch) => {
    dispatch(appointmentDeleteRequest());

    return new Promise(
      (resolve, reject) => {
        $.post(`/api/appointment/delete/${appointmentId}`)
          .done((res) => {
            console.log('delete appointment res:', res);
            dispatch(appointmentDeleteSuccess(appointmentId));
            resolve();
          })
          .fail((err) => {
            console.log('delete appointment err:', err);
            dispatch(appointmentDeleteFailure(err));
            reject(err);
          });
      });
  };
}
