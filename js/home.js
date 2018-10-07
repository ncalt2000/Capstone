class Home{
  constructor(){
    this.libraryURL = 'http://127.0.0.1:3002/user/'
    let userName = '';
    let isLoggedIn = false;
  }

  _bindEvents(){
    $('#logout').on('click', this._LogOut.bind(this));
  }

  _getToken (){
    console.log("222");
    return localStorage.getItem("jwt_token") || false;
  };

  _getUserFromStorage(){
    console.log("333");
     this.userName = localStorage.getItem("userName") || false;
     console.log(this.userName, 'USerName???');
  }

  _isLoggedIn (){
    console.log("111");
    this.isLoggedIn = this._getToken() ? true : false;
    console.log(this.isLoggedIn, 'logged???');
  };

  _switchLogInHeader (){
    console.log("444");
    if (this.isLoggedIn){
      $('#userName').children("a").text(`Welcome, ${this.userName}!`);
      $('#navSignIn').children("a").text("Log Out").attr('id', 'logout');
      $('#navSignUp').remove();
    }
    return;
  };

  _LogOut (e){
    e.preventDefault();
    console.log('Logout route');
    this._dumpToken()
    $.ajax({
      url: `${this.libraryURL}logout`,
      type: 'GET',
      dataType: 'json',
      success: (data => {
        console.log(data, "SUCCESS");
        location.reload();
      })
    })
  };

  _dumpToken (){
    localStorage.removeItem("jwt_token");
  };

}

$(function(){
  window.gHome = new Home();
  window.gHome._isLoggedIn();
  if (window.gHome.isLoggedIn){
    window.gHome._getUserFromStorage();
    window.gHome._switchLogInHeader();
    window.gHome._bindEvents();
  }
})
