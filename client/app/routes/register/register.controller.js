
export class RegisterController {
  constructor(Navigator, Register) {
    Navigator.currentPage = 'register';
    this.Register =Register;
    this.form = {};
  }

  regis(form){
    console.log('form:', form);
    this.Register.takeRegister(form);
	}
}

