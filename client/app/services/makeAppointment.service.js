import angular from 'angular';
import _ from 'lodash';

const partial =
  angular
    .module('makeAppointmentServiceModule', []);

export default partial.name;

partial.service('MakeAppointment', ($http, $q) => {
  class MakeAppointment {
    constructor() {
      _.extend(this, {
        $http: $http,
        $q: $q,
      });
    }

    findOptionsByDoctor(doctor) {
      if (!doctor.id) {
        throw new Error('doctor no emp_id');
      }

      return this.$q(
        (resolve, reject) => {

          this.$http
            .get('/api/find-options/doctor/' + doctor.id)
            .then(
              (res) => {
                res = res.data;

                if (res.success) {
                  let data = res.data.map(x => {
                    return {
                      ...x,
                      datetime: x.datetime.date,
                    };
                  });

                  resolve(data);
                } else {
                  console.log(res);
                  throw new Error('find options by doctor');
                }

              })
            .catch(
              (res) => {
                console.log(res);
                throw new Error('find optinos by doctor');
              });

          // let possibleAppointments = [
          //   { datetime: new Date("2016-10-10T14:48:00"),
          //     doctor: 'นพ. กรพัฒน์ ปรีชากุล' },
          //   { datetime: new Date("2015-10-10T12:00:00"),
          //     doctor: 'นพ. กรพัฒน์ ปรีชากุล' },
          //   { datetime: new Date(),
          //     doctor: 'นพ. กรพัฒน์ ปรีชากุล' },
          //   { datetime: new Date(),
          //     doctor: 'นพ. กรพัฒน์ ปรีชากุล' },
          //   { datetime: new Date(),
          //     doctor: 'นพ. กรพัฒน์ ปรีชากุล' },
          // ];
          // setTimeout(() => resolve(possibleAppointments), 1000);
        });
    }

    findOptionsBySpecialty(specialty) {
      return this.$q(
        (resolve, reject) => {

          this.$http
            .get('/api/find-options/specialty/' + specialty.val)
            .then(
              (res) => {
                res = res.data;

                if (res.success) {
                  resolve(res.data);
                } else {
                  console.log(res);
                  throw new Error('find options by specialty');
                }
              })
            .catch(
              (res) => {
                console.log(res);
                throw new Error('find options by specialty');
              });

        });
    }

    bookAppointment(appointment) {
      return this.$q(
        (resolve, reject) => {
          setTimeout(() => resolve(), 150);
        });
    }

    unbookAppointment() {
      // the booked one
      return this.$q(
        (resolve, reject) => {
          setTimeout(() => resolve(), 150);
        });
    }

    submitAppointment(doctor, datetime, patient = undefined) {
      if (!doctor.emp_id || !datetime) {
        console.log('doctor:', doctor);
        console.log('datetime:', datetime);
        throw new Error('no doctor or datetime');
      }

      if (patient) {
        console.log('patient is present:', patient);
        if (!patient.id) {
          throw new Error('no patient id');
        }
      }

      // return this.$q(
      //   (resolve) => {

      //     setTimeout(() => resolve(), 500);

      //   });

      // the booked one
      return this.$q(
        (resolve, reject) => {

          // make appointment
          this.$http
            .post('/api/appointment/make',{
              doctor_id: doctor.emp_id,
              datetime: datetime,
              patient_id: patient ? patient.id : null,
            })
            .then(
              (res) => {
                res = res.data;
                if (res.success) {
                  resolve(res.data);
                } else {
                  if (!res.messages || !res.messages.length) {
                    console.log(res);
                    throw new Error('no messages');
                  }

                  reject(res.messages);
                }
              })
            .catch(
              (res) => {
                console.log(res);
                throw new Error('submit appointment');
              });

        });
    }


  }

  return new MakeAppointment();
});
