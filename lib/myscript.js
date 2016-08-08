/*
 Application : PhoneHub
 File        : myscript.js
 Author      : Rafael Battesti
 Since       : 2016-07-28
 Version     : 0.1
 */

var productId = "";

/*************************************************************************************************************
 * FUNCTION DECLARATIONS                                                                                     *
 ************************************************************************************************************/

/**
 * Create UUID for the JQMSESSION
 * @returns {string}
 */
//Function generates a UUID
function generateUUID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

/**
 *
 * @param selector - jquery selector of the images (that hold the id of the product)
 */
function trackProdId(selector) {
    $(selector).click(function() {
        productId = $(this).attr("id").substr(4);
    });
}

/**
 * Handles JSON on the AJAX call (Called upon success).
 * @param data JSON
 */
function handleJson(data) {
    localStorage.setItem("products", JSON.stringify(data));
    buildPage(data, "#homeProdList", false); //home
    buildPage(data, "#dealsProdList", true, "deal", true); //deals
    buildPage(data, "#phoneProdList", true, "category", "phone"); //phones
    buildPage(data, "#tabletProdList", true, "category", "tablet"); //tablets
}

/**
 *
 * @param data - products - JSON
 * @param containerId - ID of the container to append data - string
 * @param doFilter - boolean
 * @param attribute - JSON attribute to use for filtering - string
 * @param attributeValue - JSON attribute value for filtering - string
 */
function buildPage(data, containerId, doFilter, attribute, attributeValue) {
    var array;
    if(doFilter) {
        array = filterProducts(data, attribute, attributeValue);
    } else {
        array = data;
    }
    array.forEach(function (item) {
        var name = item.name;
        var img = item.imageUrl;
        var id = item.id;
        var qoh = item.qoh;
        $(containerId).append(
            "<li data-inset='true' class='ui-li-has-thumb ui-first-child'>" +
            "<a id='img-" + id + "' href='#product' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" +
            "<img src='" + img + "' class='ui-li-thumb'>" +
            "<h2 class='ui-li-heading'>" + name + "</h2>" +
            "<p class='ui-li-desc'>Quantity on hand: " + qoh + "</p>" +
            "</a>" +
            "</li>"
        );
        if (qoh == 0) {
            $(containerId + " li:last-child").addClass("ui-disabled");
        }

        trackProdId("a[id^='img-']");

    });
}

/**
 * Filter products JSON for different pages
 * @param data - products - JSON
 * @param attribute - JSON attribute to use for filtering - string
 * @param condition - Condition to filter elements
 * @returns {Array} - Filtered items
 */
function filterProducts(data, attribute, condition) {
    var array = [];
    data.forEach(function(item) {
        if(item[attribute] == condition) {
            array.push(item);
        }
    });
    return array;
}


/*************************************************************************************************************
 * DOCUMENT EVENTS                                                                                           *
 ************************************************************************************************************/

//When the DOM finishes loading
$(document).ready(function () {

    //Sign in form authenticates user, makes ajax call for PHP backend
    $("#signinform").submit(function (event) {
        event.preventDefault();
        var email = $("#email").val();
        var pass = $("#password").val();
        var cred = {email: email, password: pass};

        $.ajax({
            type: "POST",
            url: "controllers/login.php",
            dataType: "JSON",
            data: cred,
            success: function (response) {
                if (response.isLoggedIn == true) {
                    localStorage.setItem("user", JSON.stringify(response));
                    $.mobile.changePage("#admin");
                } else {
                    $.mobile.changePage("#home");
                }
            },
            error: function () {
                alert("Error validating the response.")
            }
        })
    });

    //Change the href of the admin button based on the local storage user
    $("a[id $= 'signinbtn']").click(function (event) {
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


//HOME - PAGE CREATE
$(document).on("pagecreate", "#home", function () {

    if (localStorage.getItem("JQMSESSION") == null) {
        //Make ajax request for the phones
        $.ajax({
            type: "GET",
            url: "phones/phones.json",
            dataType: "json",
            success: handleJson,
            error: function () {
                alert("Could not get JSON!");
            }
        });

        //Create logout button
        $("#adminheader").append("<a id='logout' href='#home' data-role='button'>Logout</a>");

        //Append event handler to logout button
        $("#logout").click(function () {
            localStorage.removeItem("user");
            $("#adminheader").remove("#logout");
        });

        localStorage.setItem("JQMSESSION", generateUUID());
    }
});

//HOME PAGE - BEFORE SHOW
$(document).on("pagebeforeshow", "#home", function() {
    $("a[href='#home']").addClass("ui-btn-active");
    $("a[href='#cart']").removeClass("ui-btn-active");
    $("a[href='#categories']").removeClass("ui-btn-active");
    $("a[href='#deals']").removeClass("ui-btn-active");
});

//CATEGORIES - BEFORE SHOW
$(document).on("pagebeforeshow", "#categories", function() {
    $("a[href='#home']").removeClass("ui-btn-active");
    $("a[href='#cart']").removeClass("ui-btn-active");
    $("a[href='#deals']").removeClass("ui-btn-active");
    $("a[href='#categories']").addClass("ui-btn-active");
});

//CART - BEFORE SHOW
$(document).on("pagebeforeshow", "#cart", function() {
    $("a[href='#home']").removeClass("ui-btn-active");
    $("a[href='#categories']").removeClass("ui-btn-active");
    $("a[href='#deals']").removeClass("ui-btn-active");
    $("a[href='#cart']").addClass("ui-btn-active");
});

//DEALS - BEFORE SHOW
$(document).on("pagebeforeshow", "#deals", function() {
    $("a[href='#home']").removeClass("ui-btn-active");
    $("a[href='#cart']").removeClass("ui-btn-active");
    $("a[href='#categories']").removeClass("ui-btn-active");
    $("a[href='#deals']").addClass("ui-btn-active");
});

//ADMIN - BEFORE SHOW
$(document).on("pagebeforeshow", "#admin", function() {
    $("a[href='#home']").removeClass("ui-btn-active");
    $("a[id='logout']").addClass("ui-btn-active");
    $("a[href='#cart']").removeClass("ui-btn-active");
    $("a[href='#categories']").removeClass("ui-btn-active");
    $("a[href='#deals']").removeClass("ui-btn-active");
});

//TABLET - BEFORE SHOW
$(document).on("pagebeforeshow", "#tablet", function() {
    $("a[href='#home']").removeClass("ui-btn-active");
    $("a[href='#cart']").removeClass("ui-btn-active");
    $("a[href='#deals']").removeClass("ui-btn-active");
    $("a[href='#categories']").addClass("ui-btn-active");
});

//PHONE - BEFORE SHOW
$(document).on("pagebeforeshow", "#phone", function() {
    $("a[href='#home']").removeClass("ui-btn-active");
    $("a[href='#cart']").removeClass("ui-btn-active");
    $("a[href='#deals']").removeClass("ui-btn-active");
    $("a[href='#categories']").addClass("ui-btn-active");

});

//PRODUCT - BEFORE SHOW
$(document).on("pagebeforeshow", "#product", function() {
    $("#productcontent").html(
        "<img src='img/phones/" + productId + ".0.jpg'/>" +
        "<a id='productbackbtn' data-rel='back' data-role='button' class='ui-link ui-btn ui-shadow ui-corner-all' role='button'>Back</a>" +
        "<a id='productaddtocartbtn' data-rel='back' data-role='button' class='ui-link ui-btn ui-shadow ui-corner-all' role='button'>Add to cart</a>"
    );
});

/*************************************************************************************************************
 * WINDOW EVENTS                                                                                             *
 ************************************************************************************************************/
//Clear local storage
$(window).unload(function(){
    localStorage.clear();
});