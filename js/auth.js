class Auth {
  constructor() {
    this.libraryURL = 'http://127.0.0.1:3002/user/'
    this.newUserData;
  }

  _bindEvents(){
    // $('#loginBtn').on('click', this._userLogin.bind(this));
    $('#createAccountBtn').on('click', this._registerUser.bind(this));
  }

  _getUserInfo(){
    // console.log("Hello log2");
    const userInfo = $('#signUpForm').serializeArray();
    console.log(userInfo);
    let newData = new Object();
    userInfo.map((item, index) => {
      newData[item.name] = item.value;
    })
    console.log(newData, "DATA");

    //VALIDATION:
    const values = Object.values(newData);
    console.log(values, "Values");

    for (var i = 0; i < values.length; i++) {
      if (values[i] === '') {
        throw new Error('Please fill out all fields')
      }
      if (values[values.length-2] !== values[values.length-1]) {
        throw new Error ('Passwords don\'t match!')
      }
    }
    return this.newUserData = newData;
  }

  _registerUser(e){
    e.preventDefault();
    // console.log(this.newUserData, 'newUserData');
    // console.log("register user here log 1");
    // console.log(this.newUserData, "New User is going to the server");
    try {
      this._getUserInfo();
      $.ajax({
         url: `${this.libraryURL}${'register'}`,
         method: 'POST',
         dataType: 'json',
         data: this.newUserData,
         success: (data) => {
           console.log("Hello", data);
           if (data && data.auth) {
             this._modalToShow();
             $('#signUpForm')[0].reset();
           }
         }
       })
    } catch (err) {
      // Display error message to user
      this._modalToShow(err);
    }
  }

  _modalToShow(err){
    if(err){
      $('#signUpModal').find('.modal-body').empty();
      $('#signUpModal').modal('show');
      const message = $('<h4>', {class: 'text-danger text-center'});
      const checkmark = $('<figure><svg class="cross__svg" stroke="#e55454" xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 60 60"><circle class="cross__circle" stroke="#e55454" cx="26" cy="26" r="25" fill="none"/><path class="cross__path cross__path--right" stroke="#e55454" stroke-width="6" stroke-linecap="round" fill="none" d="M16,16 l20,20" /><path class="cross__path cross__path--left" stroke="#e55454" stroke-width="6" stroke-linecap="round" fill="none" d="M16,36 l20,-20" /></svg></figure>');
      message.text(err);
      checkmark.append(message);
      $('#signUpModal').find('.modal-body').append(checkmark);

    } else {

      $('#signUpModal').find('.modal-body').empty();
      $('#signUpModal').modal('show');
      const message = $('<h4>', {class: 'text-success text-center'});
      const checkmark = $('<figure class="w-100"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" xml:space="preserve" width="40px" height="40px"><circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/><polyline class="path check" fill="none" stroke="#73AF55" stroke-width="12" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/></svg></figure>');
      message.text('Thank you for signing up!');
      checkmark.append(message);
      $('#signUpModal').find('.modal-body').append(checkmark);
    }

  }

  // _userLogin(){
  //   console.log("Hello user!!!");
  //   $.ajax({
  //     url: `${this.libraryURL}${'login'}`,
  //     method: 'POST',
  //     // dataType: 'json',
  //     success: (data) => {
  //       console.log("Hello", data);
  //     }
  //   })
  // }

}

$(function(){
  window.gAuth = new Auth();
  window.gAuth._bindEvents();
})
