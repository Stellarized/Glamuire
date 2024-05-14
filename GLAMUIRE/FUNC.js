function addToCart(productName) {
    alert(productName + " added to cart!");
}

var attempt = 0; 
    function log_out(){
         window.location.href = "login.html";
    }

    function LogIn(){
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        if (username == "shantelle.sotelo2804@gmail.com" && password == "1234"){
            window.location.href = "home.html";
            return true;
        } else {
            attempt ++;
            if (attempt == 3) {
                alert("Cannot login. Attempts exceeded!");
                document.getElementById("btn_logIn").disabled = true;
                document.getElementById("username").disabled = true;
                document.getElementById("password").disabled = true;
                document.getElementById("username").value = null;
                document.getElementById("password").value = null;
                return false;
            } else {
                alert("Incorrect username or password.")
                return false;
            }
        }

        function restPass() {
        }
    }
	
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    var navbar = document.getElementById("navbar");
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}