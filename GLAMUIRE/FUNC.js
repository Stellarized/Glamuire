
// These are for windows transfer js
function Items(){
    window.location.href = "items.html";
}

function About(){
    window.location.href = "about.html";
}

function Out(){
    window.location.href = "index.html";
}

//These are for the scrolling navigation panel
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    var navbar = document.getElementById("navbar");
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

//These are for login section js
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

//This is for the Home section js
document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.querySelector('.main-content');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                mainContent.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    observer.observe(mainContent);
});

document.addEventListener("DOMContentLoaded", function() {
    const tag = document.querySelector('.tag');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tag.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    observer.observe(tag);
});



// These are for about section js
document.addEventListener("DOMContentLoaded", function() {
    const content = document.querySelector('.content');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                content.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    observer.observe(content);
});

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle animation when element is in viewport
function handleViewportAnimation() {
    const headers = document.querySelectorAll('.animate-header');
    const paragraphs = document.querySelectorAll('.animate-paragraph');

    headers.forEach(header => {
        if (isInViewport(header)) {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }
    });

    paragraphs.forEach(paragraph => {
        if (isInViewport(paragraph)) {
            paragraph.style.opacity = '1';
            paragraph.style.transform = 'translateY(0)';
        }
    });
}


window.addEventListener('scroll', handleViewportAnimation);

// Initial check for elements in viewport on page load
handleViewportAnimation();


// These are for item section js, add to cart
function tabtrigger(){
	document.body.classList.toggle('carttrigger');
}

let boughtitems = [];
let totalprice = 0;

function addtocart(event){
    const button = event.target;
    const product = button.closest('.product');
    const name = product.querySelector('h3').textContent;
	// These are alert for products
	 alert(`Added ${name} product to cart, Check it now!`);
	 
	// These displays all products added to cart
    if (!boughtitems.includes(name)){
        boughtitems.push(name);

        const count = document.querySelector('.itemcount');
        const counttext = count.textContent;
        const parsedcount = parseInt(counttext);
        const update = parsedcount + 1;
        count.textContent = update;

        const image = product.querySelector('img').src;
        const price = product.querySelector('.price').textContent;

        const cartcontainer = document.createElement('div');
        cartcontainer.classList.add('itemvariables');

        const item_image = document.createElement('div');
        item_image.classList.add('cartitemimg');
        const img = document.createElement('img');
        img.src = image;
        item_image.appendChild(img);

		// This is the quantity for the product
        const quantity = document.createElement('div');
        quantity.classList.add('c_itemquantity');
        quantity.innerHTML = `
            <span><input type="button" value="<" class="decrement" onclick="decrement(event)"></span>
            <span class="itemquantity">1</span>
            <span><input type="button" value=">" class="increment" onclick="increment(event)"></span>
        `;
		
		// This adds more displays for the carttab list
        const item_name = document.createElement('div');
        item_name.classList.add('c_itemname');
        item_name.textContent = name;

		// This is for the selling product prices
        const item_price = document.createElement('div');
        item_price.classList.add('c_itemprice');
        item_price.textContent = price;
		
		// This is for deleting a product in the carttab list
        const del = document.createElement('div');
        del.classList.add('del');
        del.innerHTML = `
            <img src="Designs/Del.png" onclick="del(event)" id="${name}">
        `;
    
        cartcontainer.appendChild(item_image);
        cartcontainer.appendChild(quantity);
        cartcontainer.appendChild(item_name);
        cartcontainer.appendChild(item_price);
        cartcontainer.appendChild(del);

        const cart = document.querySelector('.listCart');
        cart.appendChild(cartcontainer);
		
		// This tallies all the ordered products for total
        const total_price = price.replace(/₱|,/g, "");
        const totalparsed = parseFloat(total_price);
        totalprice += totalparsed;
        decimal();
    }

}

// These are the deleting function for carttab list
function del(event){
    const button = event.target;
    const buttonid = button.id;

    for (let i = 0; i < boughtitems.length; i++) {
        if (boughtitems[i] === buttonid){
            boughtitems.splice(i, 1);
        }
    } 

    const itemvariables = button.closest('.itemvariables');
    const itemprice = itemvariables.querySelector('.c_itemprice');
    const textcontentprice = itemprice.textContent;
    let price = textcontentprice.replace(/₱|,/g, "");
    const parsedprice = parseFloat(price);

    const quantitydiv = itemvariables.querySelector('.itemquantity')
    const quantitytext = quantitydiv.textContent;
    const quantityparse = parseInt(quantitytext);
    const itemtotal = quantityparse * parsedprice;

    totalprice -= itemtotal;

    itemvariables.remove();

    const count = document.querySelector('.itemcount');
        const counttext = count.textContent;
        const parsedcount = parseInt(counttext);
        const update = parsedcount - 1;
        count.textContent = update;

    decimal();
}

// This is a decimal add-onn computation for prices
function decimal(){
    const pricetext = document.querySelector('.total')
    const fixedprice = totalprice.toFixed(2);
    pricetext.textContent = fixedprice;
}

function increment(event){
    const button = event.target;
    const nearquantity = button.closest('.c_itemquantity');
    const quantity_text = nearquantity.querySelector('.itemquantity');

    let num = parseInt(quantity_text.textContent);
        num++;
        quantity_text.textContent = num;

    const itemvariables = button.closest('.itemvariables');
    const c_itemprice = itemvariables.querySelector('.c_itemprice');
    const price_text = c_itemprice.textContent;
    const price = price_text.replace(/₱|,/g, "");
    const parsedprice = parseFloat(price);

    totalprice += parsedprice;

    decimal();

}

function decrement(event){
    const button = event.target;
    const nearquantity = button.closest('.c_itemquantity');
    const quantity_text = nearquantity.querySelector('.itemquantity');

    const itemvariables = button.closest('.itemvariables');
    const c_itemprice = itemvariables.querySelector('.c_itemprice');
    const price_text = c_itemprice.textContent;
    const price = price_text.replace(/₱|,/g, "");
    const parsedprice = parseFloat(price);

    let num = parseInt(quantity_text.textContent);
    if (num > 1){
        num--;
        quantity_text.textContent = num;
        totalprice -= parsedprice;
    }

    decimal();
}

// Show the checkout popup
function showCheckout() {
    document.getElementById('checkoutPopup').classList.add('active');
    document.body.classList.add('blur-background');
    document.querySelector('.cartTab').style.display = 'none'; // Hide the cart tab
}

// Close the checkout popup
function closeCheckout() {
    document.getElementById('checkoutPopup').classList.remove('active');
    document.body.classList.remove('blur-background');
    document.querySelector('.cartTab').style.display = 'block'; // Show the cart tab
}

//This is for the Contacts section js
function showAlert(event) {
    event.preventDefault(); // Prevent form submission

    alert("Thank you for your message!");

    // Clear the form fields
    var form = event.target;
    form.reset();
    
    return false; // Prevent form submission for demonstration purposes
}

