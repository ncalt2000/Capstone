class Auth {
  constructor() {
    this.libraryURL = 'http://127.0.0.1:3002/user/'
    this.newUserData;
  }

  _init(){
    this._bindEvents();
  }

  _bindEvents(){
    $('#loginBtn').on('click', this._userLogin.bind(this));
    $('#createAccountBtn').on('click', this._registerUser.bind(this));
  }

  _getUserInfo(){
    const userInfo = $('#signUpForm').serializeArray();
    // console.log(userInfo);
    let newData = new Object();
    userInfo.map((item, index) => {
      newData[item.name] = item.value;
    })

    //VALIDATION:
    const values = Object.values(newData);

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
    try {
      this._getUserInfo();
      $.ajax({
         url: `${this.libraryURL}${'register'}`,
         method: 'POST',
         dataType: 'json',
         data: this.newUserData,
         success: (data) => {
           console.log("Hello", data);
           if (data.auth) {
             this._modalToShow();
             this._setToken(data);
             $('#signUpForm')[0].reset();
             setTimeout(() => {
               window.location = 'http://localhost:3000/'
             }, 900);
           } else {
             setTimeout(() => {
               this._modalToShow(data.msg);
             }, 100);
             setTimeout(() => {
               $('#signUpModal').modal('hide');
             }, 1800);
           }
         }
       })
    } catch (err) {
      setTimeout(() => {
        this._modalToShow(err);
      }, 100);
      setTimeout(() => {
        $('#signUpModal').modal('hide');
      }, 2000);    }
  };

  _modalToShow(err){
    if(err){
      $('#signUpModal').find('.modal-body').empty();
      $('#signUpModal').modal('show');
      const message = $('<h4>', {class: 'text-danger text-center'});
      const checkmark = $('<figure><svg stroke="#e55454" xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 60 60"><circle class="cross__circle" stroke="#e55454" cx="26" cy="26" r="20" fill="none"/><path class="cross__path cross__path--right" stroke="#e55454" stroke-width="6" stroke-linecap="round" fill="none" d="M16,16 l20,20" /><path class="cross__path cross__path--left" stroke="#e55454" stroke-width="6" stroke-linecap="round" fill="none" d="M16,36 l20,-20" /></svg></figure>');
      message.text(err);
      checkmark.append(message);
      $('#signUpModal').find('.modal-body').append(checkmark);

    } else {
      $('#signUpModal').find('.modal-body').empty();
      $('#signUpModal').modal('show');
      const message = $('<h4>', {class: 'text-success text-center'});
      const checkmark = $('<figure class="w-40"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" xml:space="preserve" width="40px" height="40px"><circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/><polyline class="path check" fill="none" stroke="#73AF55" stroke-width="12" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/></svg></figure>');
      message.text('Success!');
      checkmark.append(message);
      $('#signUpModal').find('.modal-body').append(checkmark);
    }

  }

  _getUserInfoLogin(){
    const userInfo = $('#loginForm').serializeArray();
    let newData = new Object();
    userInfo.map((item, index) => {
      newData[item.name] = item.value;
    })
    const values = Object.values(newData);

    for (var i = 0; i < values.length; i++) {
      if (values[i] === '') {
        throw new Error('Please fill out all fields')
      }
    }
    return this.newUserData = newData;
  }

  _userLogin(e){
    e.preventDefault();

    try {
      this._getUserInfoLogin();
      $.ajax({
        url: `${this.libraryURL}${'login'}`,
        method: 'POST',
        dataType: 'json',
        data: this.newUserData,
        success: (data) => {
          if (data.auth) {
            this._modalToShow();
            this._setToken(data);
            setTimeout(() => {
              window.location = 'http://localhost:3000/'
            }, 900);
          } else {
            setTimeout(() => {
              this._modalToShow(data.msg);
            }, 100);
            setTimeout(() => {
              $('#signUpModal').modal('hide');
            }, 1800);
          }
        }
      })
    } catch (err) {
      this._modalToShow(err);
    }
  };

  _setToken(jwt) {
    if(jwt.auth) {
      localStorage.setItem("jwt_token", jwt.token);
      localStorage.setItem("userName", jwt.user);
    }
  };

};

$(function(){
  window.gAuth = new Auth();
  window.gAuth._bindEvents();
})
