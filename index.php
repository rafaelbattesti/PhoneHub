<!DOCTYPE html>
<html lang="en">
<head>

    <title>PhoneHub</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Include JQuery Mobile -->
    <link rel="stylesheet" href="lib/jquery.mobile/jquery.mobile-1.4.5.min.css" />
    <script type="text/javascript" src="lib/jquery/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="lib/jquery.mobile/jquery.mobile-1.4.5.min.js"></script>

    <!-- Include Custom Scripts -->
    <script type="text/javascript" src="lib/myscript.js"></script>

    <!-- Include CSS Custom Styles -->
    <link rel="stylesheet" href="css/mystyles.css"/>

</head>
<body>

    <!-- Landing Page -->
    <section id="home" data-role="page">
        <header id="homeheader" data-role="header" data-position="fixed">
            <h1>PhoneHub</h1>
            <a id="homesigninbtn" href="#signin" data-role="button" data-rel="dialog">Sign In</a>
        </header>
        <section id="homenav" data-role="navbar">
            <ul>
                <li><a href="#categories">Categories</a></li>
                <li><a href="#deals">Deals</a></li>
                <li><a href="#cart" class="ui-disabled">Cart</a></li>
            </ul>
        </section>
        <section id="homecontent" role="main" class="ui-content">

        </section>
        <footer id="homefooter" data-role="footer">

        </footer>
    </section>

    <!-- Admin page -->
    <section id="admin" data-role="page">
        <header id="adminheader" data-role="header" data-position="fixed">
            <a id="adminhomebtn" href="#home" data-role="button">Home</a>
            <h1>Admin Area</h1>
        </header>
        <section id="adminnav" data-role="navbar">

        </section>
        <section id="admincontent" role="main" class="ui-content">

        </section>
        <section id="adminfooter" data-role="footer">

        </section>
    </section>

    <!-- Deals page -->
    <section id="deals" data-role="page">
        <header id="dealsheader" data-role="header" data-position="fixed">
            <a id="dealshomebtn" href="#home" data-role="button">Home</a>
            <h1>Deals</h1>
            <a id="dealssigninbtn" href="#signin" data-role="button" data-rel="dialog">Sign In</a>
        </header>
        <section id="dealscontent" role="main" class="ui-content">

        </section>
        <section id="dealsfooter" data-role="footer">

        </section>
    </section>

    <!-- Categories page -->
    <section id="categories" data-role="page">
        <header id="categoriesheader" data-role="header" data-position="fixed">
            <a id="categorieshomebtn" href="#home" data-role="button">Home</a>
            <h1>Categories</h1>
            <a id="categoriessigninbtn" href="#signin" data-role="button" data-rel="dialog">Sign In</a>
        </header>
        <section id="categoriescontent" role="main" class="ui-content">

        </section>
        <section id="categoriesfooter" data-role="footer">

        </section>
    </section>

    <!-- Product Page -->
    <section id="product" data-role="page">
        <header id="productheader" data-role="header" data-position="fixed">
            <a id="producthomebtn" href="#home" data-role="button">Home</a>
            <h1>Product</h1>
            <a id="productsigninbtn" href="#signin" data-role="button" data-rel="dialog">Sign In</a>
        </header>
        <section id="productnav" data-role="navbar">

        </section>
        <section id="productcontent" role="main" class="ui-content">

        </section>
        <footer id="productfooter" data-role="footer">

        </footer>
    </section>

    <!-- Shopping cart page -->
    <section id="cart" data-role="page">
        <header id="cartheader" data-role="header" data-position="fixed">
            <a id="carthomebtn" href="#home" data-role="button">Home</a>
            <h1>Cart</h1>
            <a id="cartsigninbtn" href="#signin" data-role="button" data-rel="dialog">Sign In</a>
        </header>
        <section id="cartnav" data-role="navbar">

        </section>
        <section id="cartcontent" role="main" class="ui-content">

        </section>
        <footer id="cartfooter" data-role="footer">

        </footer>
    </section>

    <!-- Checkout page -->
    <section id="checkout" data-role="page">
        <header id="checkoutheader" data-role="header" data-position="fixed">

        </header>
        <section id="checkoutcontent" role="main" class="ui-content">

        </section>
        <footer id="checkoutfooter" data-role="footer">

        </footer>
    </section>

    <!-- Add to cart - Confirmation Pop-up -->
    <section id="confirmation" data-role="page">
        <header id="confirmationheader" data-role="header">

        </header>
        <section id="confirmationcontent" role="main" class="ui-content">

        </section>
        <footer id="confirmationfooter" data-role="footer">

        </footer>
    </section>


    <!-- Sign in popup -->
    <section id="signin" data-role="page">
        <header id="signinheader" data-role="header">
            <h1>Sign In</h1>
        </header>
        <section id="signincontent" role="main" class="ui-content">
            <form id="signinform">
                <input id="uemail" name="uemail" type="email" placeholder="Email"/>
                <input id="upassword" name="upassword" type="password" placeholder="password"/>
                <input id="usubmit" type="submit" data-theme="b" value="Sign In"/>
            </form>
        </section>
        <footer id="signinfooter" data-role="footer">

        </footer>
    </section>

</body>
</html>