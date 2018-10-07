class Home{
  constructor(){
    let userName = '';
    let isLoggedIn = false;
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
      $('#userName').children("a").text(`Welcome, ${this.userName}`);
      $('#navSignIn').children("a").text("Log Out").addClass("log-out");
      $('#navSignUp').remove();
    }
    return;
  };


}

$(function(){
  window.gHome = new Home();
  window.gHome._isLoggedIn();
  if (window.gHome.isLoggedIn){
    window.gHome._getUserFromStorage();
    window.gHome._switchLogInHeader();
  }
})
