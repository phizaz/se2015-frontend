import angular from 'angular';
import _ from 'lodash';

// import doctorTimeList from './mocks/doctorTimeList.mock.json';
// import doctorAppointmentList from './mocks/doctorAppointmentList.mock.json';

export class DoctorTime{
  constructor($http, $q) {
    this.private = {};
    _.extend(this.private, {
      $http: $http,
      $q: $q,
    });

    _.extend(this, {

    });
  }

  getDoctorAppointmentList(doctor) {
    if (!doctor.emp_id) {
      throw new Error('doctor.emp_id not found');
    }

    let $q = this.private.$q;

    return $q(
      (resolve, reject) => {

        this.private.$http
          .get('/api/doctor/' + doctor.emp_id + '/appointments')
          .then(
            (res) => {
              res = res.data;

              console.log('doctor appointment res:', res);

              if (res.success) {
                resolve(res.data);
              } else {
                if (!res.messages) {
                  console.log(res);
                  throw new Error('doctor appointment list');
                }

                reject(res.messages);
              }

            })
          .catch(
            (res) => {
              console.log(res);
              throw new Error('docotr appointment list');
            });

      });

    // return $q(
    //   (resolve, reject) => {
    //     let delay = 10;
    //     setTimeout(() => resolve(doctorAppointmentList), delay);
    //   });
  }

  getDoctorTimeList(doctor) {
    if (!doctor.emp_id) {
      throw new Error('doctor.emp_id not found');
    }

    let $q = this.private.$q;

    return $q(
      (resolve, reject) => {

        this.private.$http
          .get('/api/doctor/' + doctor.emp_id + '/doctor-time')
          .then(
            (res) => {
              res = res.data;

              console.log('doctor doctor time res:', res);

              if (res.success) {
                resolve(res.data);
              } else {
                if (!res.messages) {
                  console.log(res);
                  throw new Error('doctor doctor time list');
                }

                reject(res.messages);
              }

            })
          .catch(
            (res) => {
              console.log(res);
              throw new Error('docotr doctor time list');
            });

      });

    // return $q(
    //   (resolve, reject) => {
    //     let delay = 10;
    //     setTimeout(() => resolve(doctorTimeList), delay);
    //   });
  }

  updateDoctorTime(doctor, creates, deletes) {
    if (!doctor.emp_id) {
      throw new Error('no doctor id');
    }

    let $q = this.private.$q;

    return $q(
      (resolve, reject) => {

        this.private.$http
          .post('/api/doctor/update-doctor-time',
            {
              data: JSON.stringify({
                doctor_id: doctor.emp_id,
                create: creates,
                delete: deletes,
              })
            })
          .then(
            (res) => {
              res = res.data;

              console.log('update doctor time res:', res);

              if (res.success) {
                resolve(res.data);
              } else {
                if (!res.messages) {
                  console.log(res);
                  throw new Error('update doctor time list');
                }

                reject(res.messages);
              }

            })
          .catch(
            (res) => {
              console.log(res);
              throw new Error('update doctor time list');
            });

      });
  }

}

export let doctorTimeServiceModule =
  angular
    .module('doctorTimeServiceModule', [])
    .service('DoctorTime', DoctorTime);
