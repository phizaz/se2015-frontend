import _ from 'lodash';

export /*@ngInject*/ class MemberController {
  constructor(userInfo) {

    _.extend(this, {
      userInfo: userInfo,
    });
  }
}
