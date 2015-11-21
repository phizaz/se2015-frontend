
export class RegisterController {
  constructor(Navigator, Register) {
    Navigator.currentPage = 'register';
    this.Register =Register;
    this.form = {};

    $('select').material_select();
  }

  regis(){
    this.Register.takeRegister(this.photo,this.firstname,this.lastname,this.address,this.telephone,this.email,this.sex,this.nation,this.religion,this.blood,this.pid,this.password);
	}
}
	