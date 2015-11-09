import {messagerServiceModule} from './messager.service';

describe('Messenger', () => {

  beforeEach(angular.mock.module(messagerServiceModule.name));

  let Messager;

  beforeEach(inject(
    (_Messager_) => {
      Messager = _Messager_;
    }));

  it('cannot broadcast if there is no listener', function () {
    function broadcast() {
      Messager.broadcast('abc', { test: 'test massage' });
    }

    expect(broadcast).toThrow();
  });

});
