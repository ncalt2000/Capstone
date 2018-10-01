class Login {
  constructor() {
    this.libraryURL = 'http://127.0.0.1:3002/user/'

  }

  _bindEvent(){
    $('#loginBtn').on('click', this._userLogin.bind(this));
  }

  _userLogin(){
    console.log("Hello user!!!");
    $.ajax({
      url: `${this.libraryURL}${'login'}`,
      method: 'POST',
      // dataType: 'json',
      success: (data) => {
        console.log("Hello", data);
      }
    })
  }

}

$(function(){
  window.gLogin = new Login();
})
