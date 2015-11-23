
export class PharmacistController {
  constructor(Navigator, Pharmacist, Staff) {
    Navigator.currentPage = 'pharmacist';
    this.Pharmacist =Staff;
    this.form = {};
    this.patients = [];
    this.pharmacist =[];
    this.search();
    // ยังไม่ได้สร้าง
    this.Pharmacist
      .pharmacistinfo()
      .then(
          (res) => {
            this.pharmarcists = res;
          }
        );
  }

  search(firstname, lastname) {
    this.Pharmacist
      .patientInfo()
      .then(
        (res) => {
          this.patients = res;
          console.log(this.patients);
        });
  }

}

