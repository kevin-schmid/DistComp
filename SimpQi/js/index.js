$(document).ready(function() {
    var loginController = new LoginController(function(username){
       alert("User " + username + " ist jetzt angemeledet");
    });
    loginController.display();
    loginController.initialize();
});
