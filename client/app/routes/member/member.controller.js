import _ from 'lodash';

export class MemberController {
  constructor(userInfo) {

    _.extend(this, {
      userInfo: userInfo,
    });
  }
}
