
export class PharmarcistController {
  constructor(Navigator, Pharmarcist) {
    Navigator.currentPage = 'pharmarcist';
    this.Pharmarcist =Staff;
    this.form = {};
    this.patients = [];
    this.pharmarcist =[];
    this.search();
    this.Pharmarcist
    .pharmarcistInfo()
    .then(
        (res) => {
          this.pharmarcists = res;
        }
      );
  }

  search(firstname, lastname) {
    this.Pharmarcist
      .patientInfo()
      .then(
        (res) => {
          this.patients = res;
          console.log(this.patients);
        });
  }

}
  