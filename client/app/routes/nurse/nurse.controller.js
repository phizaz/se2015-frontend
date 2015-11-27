
export /*@ngInject*/ class NurseController {
  constructor(Nurse) {
    this.Nurse =Nurse;
    this.form = {};
    this.patients = [];
    this.nurses =[];
    this.search();

    // ฟังก์ชันนี้ไม่มีจริง
    // this.Nurse
    // .staffInfo()
    // .then(
    //     (res) => {
    //       this.nurses = res;
    //     }
    //   );
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

