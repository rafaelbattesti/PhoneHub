/*
 Application : PhoneHub
 File        : myscript.js
 Author      : Rafael Battesti
 Since       : 2016-07-28
 Version     : 0.1
 */


/*************************************************************************************************************
 * GLOBALS                                                                                                   *
 ************************************************************************************************************/
var productId = "";
var productTxt = "";
var total = 0;
var qty = 1;

/*************************************************************************************************************
 * FUNCTION DECLARATIONS                                                                                     *
 ************************************************************************************************************/

/**
 * Create UUID for the JQMSESSION
 * @returns {string}
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Assigns the click event to the product buttons
 * @param selector - jquery selector of the images (that hold the id of the product)
 */
function trackProdInfo(selector) {
    $(selector).click(function () {
        productId = $(this).attr("id").substr(4);
        productTxt = $(this).find("h2").text();
    });
}

/**
 *
 * @param productId
 * @param qty
 */
function addToCart(productId, qty) {
    var object = {};
    if (localStorage.getItem("cart") == null) {
        object[productId] = qty;
    } else {
        object = getLocalStorage("cart");
        object[productId] = qty;
    }
    setLocalStorage("cart", object);
}
/**
 *
 * @param products
 * @param cart
 */
function updateProducts(products, cart) {
    for (var key in cart) {
        var qty = cart[key];
        for (var i = 0; i < products.length; i++) {
            if (products[i].id == productId) {
                products[i].qoh -= qty;
                break;
            }
        }
    }
    setLocalStorage("products", products);
}

/**
 * Remove all content of a container for data refresh
 * @param containerId
 */
function removeAllContent(containerId) {
    $(containerId).empty();
}

/**
 * Function refreshes the content to reflect the changes to QOH
 * @param products
 */
function refreshContent(products) {
    buildPage(products, "#homeprodlist", false); //home
    buildPage(products, "#dealsprodlist", true, "deal", true); //deals
    buildPage(products, "#phoneprodlist", true, "category", "phone"); //phones
    buildPage(products, "#tabletprodlist", true, "category", "tablet"); //tablets
}

/**
 * Gets elements from the local storage
 * @param key
 */
function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

/**
 * Sets elements into localStorage
 * @param key
 * @param value
 */
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Handles JSON on the AJAX call (Called upon success).
 * @param data JSON
 */
function handleJson(data) {
    setLocalStorage("products", data);
    refreshContent(data);
}

/**
 *
 * @param products - array
 * @param containerId - ID of the container to append data - string
 * @param doFilter - boolean
 * @param attribute - JSON attribute to use for filtering - string
 * @param attributeValue - JSON attribute value for filtering - string
 */
function buildPage(products, containerId, doFilter, attribute, attributeValue) {
    var array;
    if (doFilter) {
        array = filterProducts(products, attribute, attributeValue);
    } else {
        array = products;
    }
    removeAllContent(containerId);
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
        trackProdInfo("a[id^='img-']");
    });
}

/**
 * Filter products JSON for different pages
 * @param products - array
 * @param attribute - JSON attribute to use for filtering - string
 * @param condition - Condition to filter elements
 * @returns {Array} - Filtered items
 */
function filterProducts(products, attribute, condition) {
    var array = [];
    products.forEach(function (item) {
        if (item[attribute] == condition) {
            array.push(item);
        }
    });
    return array;
}

/**
 *
 * @param listId
 */
function buildCart(listId) {
    removeAllContent(listId);
    var html = "";
    var products = getLocalStorage("products");
    var cart = getLocalStorage("cart");
    var cartProducts = [];
    var grandTotal = 0;
    for (var key in cart) {
        var prod = filterProducts(products, "id", key);
        cartProducts.push(prod[0]);
    }
    for (var key in cart) {
        var prodArray = filterProducts(cartProducts, "id", key);
        var prod = prodArray[0];
        var qty = cart[key];
        var productTotal;
        var name = prod.name;
        var img = prod.imageUrl;
        var id = prod.id;
        var price = prod.price;
        productTotal = qty * price;
        grandTotal += productTotal;
        html +=
            "<li data-inset='true' class='ui-li-has-thumb ui-first-child'>" +
            "<a id='img-" + id + "' href='#product' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" +
            "<img src='" + img + "' class='ui-li-thumb'>" +
            "<h2 class='ui-li-heading'>" + name + "</h2>" +
            "<p class='ui-li-desc'>Items in cart: " + qty + " X $" + price + ".00</p>" +
            "<p class='ui-li-desc ui-'>Total: $" + productTotal + ".00</p>" +
            "</a>" +
            "</li>";
    }
    html +=
        "<li data-inset='true' class='ui-li-has-thumb ui-first-child'>" +
        "<h2 class='ui-li-heading'>Total: $" + grandTotal + ".00</h2>" +
        "</li>" +
        "<li data-inset='true' class='ui-li-has-thumb ui-first-child'>" +
        "<h2 class='ui-li-heading'>Total + taxes: $" + Math.round(grandTotal * 1.13 * 100) / 100 + "</h2>" +
        "</li>"
    $(listId).append(html);
    total = Math.round(grandTotal * 1.13 * 100) / 100;
    trackProdInfo("a[id^='img-']");
}

/**
 * Produces sales data for tables and chart
 * @param products
 * @param cart
 * @returns {{labels: Array, qty: Array}}
 */
function reportData(products, cart) {
    var labels = [];
    var qty = [];
    var rating = []
    var qoh = []
    for (var key in cart) {
        for (var i = 0; i < products.length; i++) {
            if (products[i].id == key) {
                labels.push(products[i].name);
                qty.push(cart[key]);
                rating.push(products[i].rating);
                qoh.push(products[i].qoh);
                break;
            }
        }
    }
    return {labels : labels, qty : qty, rating: rating, qoh: qoh};
}

/**
 * Draw new sales data
 */
function draw(prodData, value, canvas) {
    var context = $(canvas).get(0).getContext("2d");
    var data = {
        labels : prodData["labels"],
        scaleOverride : true,
        scaleSteps : 10,
        scaleStepWidth : 1,
        scaleStartValue : 0,
        datasets : [
            {
                label : "2016",
                fill  : false,
                backgroundColor : "rgba(25,100,150,0.5)",
                data : prodData[value],
                spanGaps: true
            }
        ]
    }
    return new Chart( context,{ type:'bar', data:data});
}

/**
 * Draw product sales
 */
function drawSales(prodData) {
    draw(prodData, "qty", "#salescanvas");
}

/**
 * Draw product rating
 */
function drawRating(prodData) {
    draw(prodData, "rating", "#ratingcanvas");
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
$(document).on("pagebeforeshow", "#home", function () {
    $("a[href='#home']").addClass("ui-btn-active");
    $("a[href='#cart']").removeClass("ui-btn-active");
    $("a[href='#categories']").removeClass("ui-btn-active");
    $("a[href='#deals']").removeClass("ui-btn-active");
});

//CATEGORIES - BEFORE SHOW
$(document).on("pagebeforeshow", "#categories", function () {
    $("a[href='#home']").removeClass("ui-btn-active");
    $("a[href='#cart']").removeClass("ui-btn-active");
    $("a[href='#deals']").removeClass("ui-btn-active");
    $("a[href='#categories']").addClass("ui-btn-active");
});

//CART - BEFORE SHOW
$(document).on("pagebeforeshow", "#cart", function () {
    $("a[href='#home']").removeClass("ui-btn-active");
    $("a[href='#categories']").removeClass("ui-btn-active");
    $("a[href='#deals']").removeClass("ui-btn-active");
    $("a[href='#cart']").addClass("ui-btn-active");

    buildCart("#cartprodlist");
    if (!$("#cartclearbtn").length) {
        $("#cartcontent").append(
            "<a id='cartclearbtn' data-role='button' data-rel='back' class='ui-link ui-btn ui-shadow ui-corner-all'>Back</a>" +
            "<a id='cartcheckoutbtn' href='#checkout' data-role='button' class='ui-btn-active ui-link ui-btn ui-shadow ui-corner-all'>Checkout</a>"
        );
    }
});

//DEALS - BEFORE SHOW
$(document).on("pagebeforeshow", "#deals", function () {
    $("a[href='#home']").removeClass("ui-btn-active");
    $("a[href='#cart']").removeClass("ui-btn-active");
    $("a[href='#categories']").removeClass("ui-btn-active");
    $("a[href='#deals']").addClass("ui-btn-active");
});

//ADMIN - BEFORE SHOW
$(document).on("pagebeforeshow", "#admin", function () {
    $("a[href='#home']").removeClass("ui-btn-active");
    $("a[id='logout']").addClass("ui-btn-active");
    $("a[href='#cart']").removeClass("ui-btn-active");
    $("a[href='#categories']").removeClass("ui-btn-active");
    $("a[href='#deals']").removeClass("ui-btn-active");

    var data = reportData(getLocalStorage("products"), getLocalStorage("cart"));
    var htmlsales = "";
    var htmlrating = "";
    for (var i = 0; i < data.labels.length; i++) {
        htmlsales += "<tr><td>" + data.labels[i] + "</td><td>" + data.qoh[i] + "</td><td>" + data.qty[i]
            + "</td></tr>";
        htmlrating += "<tr><td>" + data.labels[i] + "</td><td>" + data.rating[i] + "</td></tr>";
    }
    $("#salestable").html(htmlsales);
    $("#ratingtable").html(htmlrating);
    drawSales(data);
    drawRating(data);
});

//TABLET - BEFORE SHOW
$(document).on("pagebeforeshow", "#tablet", function () {
    $("a[href='#home']").removeClass("ui-btn-active");
    $("a[href='#cart']").removeClass("ui-btn-active");
    $("a[href='#deals']").removeClass("ui-btn-active");
    $("a[href='#categories']").addClass("ui-btn-active");
});

//PHONE - BEFORE SHOW
$(document).on("pagebeforeshow", "#phone", function () {
    $("a[href='#home']").removeClass("ui-btn-active");
    $("a[href='#cart']").removeClass("ui-btn-active");
    $("a[href='#deals']").removeClass("ui-btn-active");
    $("a[href='#categories']").addClass("ui-btn-active");

});

//PRODUCT - BEFORE SHOW
$(document).on("pagebeforeshow", "#product", function () {

    if (localStorage.getItem("cart")) {
        var cart = getLocalStorage("cart");
        if (cart[productId]) {
            qty = cart[productId];
        } else {
            qty = 1;
        }
    }
    var products = getLocalStorage("products");
    var product = filterProducts(products, "id", productId);
    var price = product[0].price;
    var rating = product[0].rating;
    var qoh = product[0].qoh;

    $("#productheader>h1").html(productTxt);
    $("#productcontent").html(
        "<img src='img/phones/" + productId + ".0.jpg' class='prod-img'/>" +
        "<h2>" + productTxt + "</h2>" +
        "<h4>$ " + price + ".00</h4>" +
        "<form>" +
        "<h4>Product Rating</h4>" +
        "<input type='range' name='rating' id='productratingslider' value='" + rating + "' min='0' max='5' data-highlight='true' step='1'/>" +
        "</form>" +
        "<form>" +
        "<h4>Choose Quantity</h4>" +
        "<input type='range' name='rating' id='productquantity' value='" + qty + "' min='0' max='" + qoh + "' data-highlight='true' step='1'/>" +
        "</form>" +
        "<a id='productdescriptionbtn' data-rel='dialog' href='#productdescription' data-role='button' class='ui-link ui-btn ui-shadow ui-corner-all'>Description</a>" +
        "<a id='productbackbtn' data-rel='back' data-role='button' class='ui-link ui-btn ui-shadow ui-corner-all'>Back</a>" +
        "<a id='productaddtocartbtn' data-rel='dialog' href='#confirmadd' data-role='button' class='ui-link ui-btn ui-shadow ui-corner-all ui-btn-active'>Add to cart</a>"
    );
    $("#product").trigger("create");

    $("#productquantity").on("change", function(){
        qty = $(this).val();
    });

    $("#productratingslider").on("change", function() {
        var value = $(this).val();
        for (var i = 0; i < products.length; i++) {
            if (products[i].id == productId) {
                products[i].rating = value;
                break;
            }
        }
        setLocalStorage("products", products);
    });
});

//PRODUCT DESCRIPTION - BEFORE SHOW
$(document).on("pagebeforeshow", "#productdescription", function () {
    var products = getLocalStorage("products");
    var product = filterProducts(products, "id", productId);
    var desc = product[0].snippet;
    var name = product[0].name;
    $("#productdescriptioncontent").html(
        "<p>" + desc + "</p>" +
        "<a id='productdesciptionback' data-rel='back' data-role='button' class='ui-link ui-btn ui-shadow ui-corner-all ui-btn-active'>Back</a>"
    );

    $("#productdescriptionheader").html(
        "<h1 class='ui-title' role='heading' aria-level='1'>" + name + "</h1>"
    );
});

//CONFIRM ADD TO CART - BEFORE SHOW
$(document).on("pagebeforeshow", "#confirmadd", function() {
    $("#confirmaddcontent").html(
    "<a id='confirmaddcancelbtn' data-rel='back' data-role='button' class='ui-link ui-btn ui-shadow ui-corner-all'>Back</a>" +
    "<a id='confirmaddokbtn' href='#cart' data-role='button' class='ui-btn-active ui-link ui-btn ui-shadow ui-corner-all'>Ok</a>"
    );
    //ADD PRODUCT TO CART
    $("#confirmaddokbtn").click(function(){
        addToCart(productId, qty);
    });
});

//CHECKOUT - BEFORE SHOW
$(document).on("pagebeforeshow", "#checkout", function() {
    var orderId = localStorage.getItem("JQMSESSION");

    //Prepend the order id to the checkout
    if (!$("#orderheading").length) {
        $("#checkoutcontent").prepend(
            "<h1 id='orderheading' data-role='heading'>Order #</h1>" +
            "<h3>" + orderId + "</h3>"
        );
    }

    buildCart("#checkoutprodlist");

    if (!$("#checkoutcancelbtn").length) {
        $("#checkoutcontent").append(
            "<a id='checkoutcancelbtn' data-role='button' data-rel='back' class='ui-link ui-btn ui-shadow ui-corner-all'>Cancel</a>" +
            "<a id='checkoutokbtn' href='#thanks' data-rel='dialog' data-role='button' class='ui-btn-active ui-link ui-btn ui-shadow ui-corner-all'>Pay order</a>"
        );
    }

    //CHECKOUT - Here I would make an AJAX request to push changes to database.
    $("#checkoutokbtn").click(function() {
        var products = getLocalStorage("products");
        var cart = getLocalStorage("cart");
        updateProducts(products, cart);
        localStorage.removeItem("cart");
        refreshContent(products);
    });

});

/*************************************************************************************************************
 * WINDOW EVENTS                                                                                             *
 ************************************************************************************************************/
//Clear local storage
$(window).unload(function () {
    localStorage.clear();
});