import * as staffActions from './staff.actions';
import * as appointmentActions from './appointment.actions';
import * as doctorActions from './doctor.actions';

export default {
  ...staffActions,
  ...appointmentActions,
  ...doctorActions,
};
