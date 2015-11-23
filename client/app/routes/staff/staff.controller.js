
export class StaffController {
  constructor(Navigator, Staff) {
    Navigator.currentPage = 'staff';
    this.Staff =Staff;
    this.form = {};
    this.patients = [];
    this.staffs =[];
    this.search();
    this.Staff
    .staffInfo()
    .then(
        (res) => {
          this.staffs = res;
        }
      );
  }

  search(firstname, lastname) {
    this.Staff
      .patientInfo()
      .then(
        (res) => {
          this.patients = res;
          console.log(this.patients);
        });
  }

}
  