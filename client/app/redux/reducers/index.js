import * as appointment from './appointment.reducer';
import * as staff from './staff.reducer';
import * as doctor from './doctor.reducer';
import * as nurse from './nurse.reducer';
import * as pharmacist from './pharmacist.reducer';

export default {
  ...appointment,
  ...staff,
  ...doctor,
  ...nurse,
  ...pharmacist,
};
