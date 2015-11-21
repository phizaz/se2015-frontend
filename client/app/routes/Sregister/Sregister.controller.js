
export class SRegisterController {

  constructor(Navigator, SRegister) {
    Navigator.currentPage = 'SRegister';
    this.SRegister =SRegister;
    this.form = {};
    $('select').material_select();
  }

  regis(){
    this.SRegister.takeSRegister(this.photo,this.role,this.specialist,this.firstname,this.lastname,this.telephone,this.email,this.uid,this.password);
	}
}
	