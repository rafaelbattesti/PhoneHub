/*
 Application : PhoneHub
 File        : myscript.js
 Author      : Rafael Battesti
 Since       : 2016-07-28
 Version     : 0.1
*/

//TODO: Add custom scripts for data presentation (AJAX)
//TODO: Create local storage session as JSON (type, user, cartitems)
//TODO: If User signed in, remove sign in button and replace with User name
//TODO: If Admin signed in, remove sign in button and replace with Admin name

//TODO: make a request for admin JSON when submitting form
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
        success  : function(data) {
            var email = $("#aemail").val();
            var pass  = $("#apassword").val();

            if (data.email === email && data.password === pass) {
                $.mobile.changePage("#admin");
                localStorage.setItem("adminSession", JSON.stringify(data));
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