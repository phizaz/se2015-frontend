import angular from 'angular';
import _ from 'lodash';

export let messagerServiceModule = angular.module('messagerServiceModule', []);

export let Messager =
  class Messager {
    constructor($rootScope) {

      this.private = {};
      this.private.listeners = {};

      // public vars
      _.extend(this, {
        $rootScope: $rootScope
      });
    }

    /**
     * broadcast to the listeners with the same given identifier
     * broadcaster will throw error if there is no listener with the given identifier
     * @param  {string} identifier
     * @param  {object} message
     */
    broadcast(identifier, message) {
      if (!this.private.listeners[identifier]) {
        throw new Error('broadcasting without listeners');
      }

      this.$rootScope.$emit(identifier, message);
    }

    /**
     * listens to the messsages with given identifier
     * this function will try to make sure that you don't forget to unlisten it
     * @param  {string}   identifier
     * @param  {Function} callback   [this function will be called when the message arrives]
     * @return {Function}            [destroyer function call to unlisten]
     */
    on(identifier, callback) {
      let that = this;
      // register the listener
      this.private.listeners[identifier] = true;

      let destroyer = this.$rootScope.$on(identifier, callbackWrapper);
      return destroyerWrapper;

      function callbackWrapper(...args) {
        console.log('message arrives for:', identifier, 'content:', args);
        callback(args[1]);
      }

      function destroyerWrapper() {
        // unregister the listener
        delete that.private.listeners[identifier];
        destroyer();
      }
    }
  };

messagerServiceModule.service('Messager', Messager);
