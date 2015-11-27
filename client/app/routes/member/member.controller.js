import _ from 'lodash';

/*@ngInject*/ class MemberController {
  constructor(userInfo) {

    _.extend(this, {
      userInfo: userInfo,
    });
  }
}
