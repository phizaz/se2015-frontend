import * as staffActions from './staff.actions';
import * as appointmentActions from './appointment.actions';
import * as doctorActions from './doctor.actions';
import * as nurseActions from './nurse.actions';
import * as pharmacistActions from './pharmacist.actions';

export default {
  ...staffActions,
  ...appointmentActions,
  ...doctorActions,
  ...nurseActions,
  ...pharmacistActions,
};
