/*
 Application : PhoneHub
 File        : myscript.js
 Author      : Rafael Battesti
 Since       : 2016-07-28
 Version     : 0.1
*/

//When the DOM finishes loading
$(document).ready(function() {

    //Sign in form authenticates user, makes ajax call for PHP backend
    $("#signinform").submit(function(event) {
        event.preventDefault();
        var email = $("#email").val();
        var pass  = $("#password").val();
        var cred = {email : email, password : pass};

        $.ajax({
            type : "POST",
            url  : "controllers/login.php",
            dataType : "JSON",
            data     : cred,
            success : function(response) {
                if (response.isLoggedIn == true) {
                    localStorage.setItem("user", JSON.stringify(response));
                    $.mobile.changePage("#admin");
                } else {
                    $.mobile.changePage("#home");
                }
            },
            error : function() {
                alert("Error validating the response.")
            }
        })
    });

    //Change the href of the admin button based on the local storage user
    $("a[id $= 'signinbtn']").click(function(event) {
        var user = JSON.parse(localStorage.getItem("user"));
        if (user != null && user.isLoggedIn) {
            $(this).attr("href", "#admin");
            $(this).removeAttr("data-rel");
        } else {
            $(this).attr("href", "#signin");
            $(this).attr("data-rel", "dialog");
        }
    });
});