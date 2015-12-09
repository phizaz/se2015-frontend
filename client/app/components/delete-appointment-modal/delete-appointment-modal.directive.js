import angular from 'angular';
import _ from 'lodash';
import Directive from '../directive';
import actions from '../../redux/actions';

import template from './delete-appointment-modal.template.html';

const partial =
  angular
    .module('deleteAppointmentModalDirectiveModule', [
      require('../../redux/store'),
    ]);

export default partial.name;

partial.directive('deleteAppointmentModal',
  (Store) => {

    return Directive.new({
      controllerAs: 'my',
      template: template,

      interfaces: {
        public: '=name',
        appointment: '=',
        onAppointmentDeleted: '&',
      },

      starter() {
        // console.log('init appointment modal:', this.appointment);

        const mapStateToThis = (state) => {
          _.extend(this, state.appointment);
        };

        Store.$subscribe(() => {
          mapStateToThis(Store.getState());
        });

        mapStateToThis(Store.getState());
      },

      methods: {
        deleteAppointment(appointment) {
          console.log('deleting an appointment:', appointment);
          Store.dispatch(actions.appointmentDelete(appointment.appointment_id))
            .then(() => {
              console.log('delete finished!');
              this.hideModal();

              if(this.onAppointmentDeleted) {
                console.log('onAppointmentDeleted');
                this.onAppointmentDeleted();
              }
            });
        },

        showModal() {
          this.element.children('.modal').openModal();
        },

        hideModal() {
          this.element.children('.modal').closeModal();
        }
      }
    });

  });
