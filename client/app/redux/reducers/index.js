import * as appointment from './appointment.reducer';
import * as staff from './staff.reducer';
import * as doctor from './doctor.reducer';

export default {
  ...appointment,
  ...staff,
  ...doctor,
};
