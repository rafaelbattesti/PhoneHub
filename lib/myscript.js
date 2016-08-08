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
            type     : "POST",
            url      : "controllers/login.php",
            dataType : "JSON",
            data     : cred,
            success  : function(response) {
                if (response.isLoggedIn == true) {
                    localStorage.setItem("user", JSON.stringify(response));
                    $.mobile.changePage("#admin");
                } else {
                    $.mobile.changePage("#home");
                }
            },
            error    : function() {
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

    //Set footers
    $("footer").html(
        "<section class='ui-grid-b'>" +
            "<section class='ui-block-a'>" +
                "<p>Systems Analyst</p>" +
            "</section>" +
            "<section class='ui-block-b'>" +
                "<p>&copy;2016 Rafael Battesti</p>" +
            "</section>" +
            "<section class='ui-block-c'>" +
                "<p>991.382.266</p>" +
            "</section>" +
        "</section>"
    );

});

//On first page load, load phones into memory
$(document).on("pagecreate", "#home", function() {
    var jqmsession = localStorage.getItem("JQMSESSION");
    if (jqmsession == null) {

        //Make ajax request for the phones
        $.ajax({
            type     : "GET",
            url      : "phones/phones.json",
            dataType : "json",
            success  : function(products) {
                localStorage.setItem("products", JSON.stringify(products));
            },
            error    : function() {
                alert("Could not get JSON!");
            }
        });

        //Create logout button
        $("#adminheader").append(
            "<a id='logout' href='#home' data-role='button'>Logout</a>"
        );

        localStorage.setItem("JQMSESSION", generateUUID());
    }
});

//Function generates a UUID
function generateUUID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}