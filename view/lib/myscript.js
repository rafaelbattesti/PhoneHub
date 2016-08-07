/*
 Application : PhoneHub
 File        : myscript.js
 Author      : Rafael Battesti
 Since       : 2016-07-28
 Version     : 0.1
*/

//TODO: Add custom scripts for dataaccess presentation (AJAX)
//TODO: Create local storage session as JSON (type, user, cartitems)
//TODO: If User signed in, remove sign in button and replace with User name
//TODO: If Admin signed in, remove sign in button and replace with Admin name

//TODO: make a request for admin JSON when submitting form

//When the DOM finishes loading
$(document).ready(function() {

    //Plug-in an event handler for the sign in form
    $("#signinform").submit(function(event) {
        event.preventDefault();
        var email = $("#email").val();
        var pass  = $("#password").val();
        var cred = {email : email, password : pass};

        $.ajax({
            type : "POST",
            url  : "controller/login.php",
            dataType : "JSON",
            data     : cred,
            success : function(response) {
                if (response) {
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



});

/*
$(document).ready(function() {

    $("#adminsigninform").submit(function(event) {
        event.preventDefault();
        $.mobile.changePage("#admin");
    });

});

$(document).on("pagebeforeshow", "#admin", function() {
    $.ajax({
        type     : "GET",
        url      : "users/admin.json",
        dataType : "JSON",
        success  : function(dataaccess) {
            var email = $("#email").val();
            var pass  = $("#password").val();

            if (dataaccess.email === email && dataaccess.password === pass) {
                $.mobile.changePage("#admin");
                localStorage.setItem("adminSession", JSON.stringify(dataaccess));
            } else {
                $.mobile.changePage("#home");
                localStorage.removeItem("adminSession");
            }

        },
        error    : function() {
            alert("Could not fetch JSON");
        }
    })
});
*/