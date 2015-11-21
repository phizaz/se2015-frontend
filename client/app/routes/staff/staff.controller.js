
export class StaffController {
  constructor(Navigator, Staff) {
    Navigator.currentPage = 'staff';
    this.Staff =Staff;
    this.form = {};
  }
}
  