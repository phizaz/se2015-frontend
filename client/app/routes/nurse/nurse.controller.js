
export class NurseController {
  constructor(Navigator, Nurse) {
    Navigator.currentPage = 'nurse';
    this.Nurse =Nurse;
    this.form = {};
    this.patients = [];
    this.nurses =[];
    this.search();
    this.Nurse
    .staffInfo()
    .then(
        (res) => {
          this.nurses = res;
        }
      );
  }

  search(firstname, lastname) {
    this.Nurse
      .patientInfo()
      .then(
        (res) => {
          this.patients = res;
          console.log(this.patients);
        });
  }

}
  