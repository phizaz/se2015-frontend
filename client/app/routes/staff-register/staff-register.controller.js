import _ from 'lodash';

import specialtyList from '../../services/mocks/specialtyList.mock.json';

export class StaffRegisterController {
  constructor(Navigator, StaffRegister, $scope, $state) {
    Navigator.currentPage = 'register';

    _.extend(this, {
      StaffRegister: StaffRegister,
      form: {},
      error: {},
      $scope: $scope,
      $state: $state,
      loading: false,
      finished: false,
      specialtyList: specialtyList,
    });

    $scope.$watch('register.form.password', () => this.checkPasswordMatch());
    $scope.$watch('register.form.cpassword', () => this.checkPasswordMatch());

  }

  regis(form){
    console.log('form:', form);
    this.loading = true;
    this.StaffRegister
      .takeRegister(form)
      .then((res) => {
        this.loading = false;
        console.log('regis res:', res);
        this.finished = true;
      })
      .catch((res) => {
        this.loading = false;
        console.log(res);
        throw new Error('regis');
      });
  }

  goHome() {
    this.$state.go('navigator.home');
  }

  checkPasswordMatch() {
    let match = this.form.password === this.form.cpassword;
    delete this.error.passwordNotMatch;
    if (!match) {
      this.error.passwordNotMatch = true;
    }
  }

  isError() {
    let $scope = this.$scope;
    return !$scope.form.$valid;
  }
}

