
export class SRegisterController {

  constructor(Navigator, SRegister) {
    Navigator.currentPage = 'Sregister';
    this.SRegister =SRegister;
    this.form = {};
  }

  show(){
	this.SRegister.takeSRegister();
	}
}
	