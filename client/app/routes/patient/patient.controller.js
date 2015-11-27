import _ from 'lodash';
import moment from 'moment';

export /*@ngInject*/ class PatientController {

  constructor ($scope, userInfo, Login, $state) {

    _.extend(this, {
      today: moment().format('YYYY-MM-DD'),
      moment: moment,
      $scope: $scope,
      userInfo: userInfo,
      Login: Login,
      loggingOut: false,
      $state: $state,
      loadingUserInfo: false,
    });
  }

  isToday(time) {
    return moment(time).format('YYYY-MM-DD') === this.today;
  }

  logout() {
    this.loggingOut = true;

    this.Login
      .takeLogout()
      .then(
        (res) => {
          this.loggingOut = false;

          console.log('logout res:', res);
          this.$state.go('home');

        })
      .catch(
        (res) => {
          this.loggingOut = false;
          console.log(res);
          throw new Error('logout');
        });
  }

  onAppointmentMade() {
    this.loadingUserInfo = true;

    // refresh the list (userInfo)
    this.Login
      .isLoginFresh()
      .then(
        (res) => {
          console.log('on appointmentm made res:', res);

          this.loadingUserInfo = false;
          this.userInfo = res.data;
        })
      .catch(
        (res) => {
          console.log(res);
          throw new Error('onAppointmentMade');
        });

  }

}
