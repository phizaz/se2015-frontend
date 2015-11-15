
export class SRegisterController {

  constructor(Navigator, SRegister) {
    Navigator.currentPage = 'SRegister';
    this.SRegister =SRegister;
    this.form = {};
  }

  show(){
	this.SRegister.takeSRegister();
	}
}
	