//Filter buttons
const allFilter = document.querySelector("#all-btn");
const mensFilter = document.querySelector("#mens-btn");
const womensFilter = document.querySelector("#womens-btn");
const jewelleryFilter = document.querySelector("#jewellery-btn");
const electronicsFilter = document.querySelector("#electronics-btn");

//different sections
const mensSection = document.querySelector("#mens-section");
const womensSection = document.querySelector("#womens-section");
const jewellerySection = document.querySelector("#jewellery-section");
const electronicsSection = document.querySelector("#electronics-section");
const searchSection = document.querySelector("#searched-section");

const search = document.querySelector("#searchBar");
const rangeBar=document.querySelector("#range")

const applyBtn=document.querySelector("#apply-btn")
const lowPrice=document.querySelector("#low")
const midPrice=document.querySelector("#mid")
const highPrice=document.querySelector("#high")
const vHighPrice=document.querySelector("#vHigh")



let men = []; 
let women = []; 
let jewelery = [];
let electronics = []; 
let response = [];
let myCartArray = []; 

// check if the current user is not stored in the localStorage
if(!localStorage.getItem("currentUser")){
  alert("you need to signup or login first to access products");
   setTimeout(()=>{
    window.location.href  ="../index.html";
   },1000);
}

// Retrieve the cart array from local storage and assign it to a variable.
let temp = JSON.parse(localStorage.getItem("cart"));
if (temp) {
  myCartArray = temp;
}

// Declare a function to fetch data from an API
fetchAPI("https://fakestoreapi.com/products");
async function fetchAPI(url) {
  try {
    // Fetch data from the URL and store it in a variable named "data"
    let data = await fetch(url);
    console.log(data);

    // Parse the data as JSON and store the resulting array of objects in a variable named "response"
    response = await data.json();
    console.log(response);

    // Filter the response by category and store each filtered array in a corresponding variable
    men = response.filter((item) => {
      return item.category == "men's clothing";
    });
    console.log(men);

    jewelery = response.filter((item) => {
      return item.category == "jewelery";
    });
    console.log(jewelery);

    electronics = response.filter((item) => {
      return item.category == "electronics";
    });
    console.log(electronics);

    women = response.filter((item) => {
      return item.category == "women's clothing";
    });
    console.log(women);

    // Call the showAll() function to display all the products on the page
    showAll();
  } catch (error) {
    // Handle any errors that occur during the fetch request
    console.log("error-msg" + error);
  }
}


// Welcome Messege
const user1 = JSON.parse(localStorage.getItem('currentUser'));
let message = document.getElementById('welcome');
message.innerHTML = `Welcome ${user1.firstName} to ShopEasy.`;

if(user1.firstName === null){
  alert("You are not authorized to access this page. Please login or sign up to continue.");
  window.location.href = "../index.html";
} else {
  // var currentUser = JSON.parse(currentUserStr);
  if(typeof user1.firstName === "undefined" || typeof user1.firstName === "undefined"){
    alert("You are not authorized to access this page. Please login or sign up to continue.");
    window.location.href = "../index.html";
  }
}
console.log(message)
console.log(localStorage.getItem('currentUser'))


//add to cart function
function addToCart(itemId) {
  let temp = response.filter((item) => {
    return item.id == itemId;
  });
  alert("Item Added to Cart")
  myCartArray.push(temp[0]);
  localStorage.setItem("cart", JSON.stringify(myCartArray));
}

// Add an event listener to an HTML element with the ID "allFilter" that calls the "showAll()" function when clicked.
allFilter.addEventListener("click", showAll);

// Define the "showAll()" function
function showAll() {
  // Add the class "active" to the "allFilter" element and the class "hide-class" to the "searchSection" element.
  allFilter.classList.add("active");
  searchSection.classList.add("hide-class");

  // Create an array containing references to four HTML elements (mensSection, womensSection, jewellerySection, and electronicsSection), and remove the class "hide-class" from each of them using the forEach() method.
  const allSections = [
    mensSection,
    womensSection,
    jewellerySection,
    electronicsSection,
  ];
  allSections.forEach((section) => section.classList.remove("hide-class"));

  // Create an array containing references to four HTML elements (mensFilter, womensFilter, jewelleryFilter, and electronicsFilter), and remove the class "active" from each of them using the forEach() method.
  const allFilters = [
    mensFilter,
    womensFilter,
    jewelleryFilter,
    electronicsFilter,
  ];
  allFilters.forEach((section) => section.classList.remove("active"));

  // Map over the "men" array, calling the "renderItems()" function on each item and returning the resulting HTML string.
  //  Join the resulting array of strings together into a single string using the join() method, and set the resulting string 
  // as the innerHTML of an HTML element with the ID "mens-items".
  const myHTML_1 = men.map((item) => {
    return renderItems(item);
  });
  document.getElementById("mens-items").innerHTML = myHTML_1.join("");

  // Repeat the same process for the "women", "jewelery", and "electronics" arrays, setting the resulting HTML strings as
  //  the innerHTML of corresponding HTML elements.
  const myHTML_2 = women.map((item) => {
    return renderItems(item);
  });
  document.getElementById("womens-items").innerHTML = myHTML_2.join("");

  const myHTML_3 = jewelery.map((item) => {
    return renderItems(item);
  });
  document.getElementById("jewellery-items").innerHTML = myHTML_3.join("");

  const myHTML_4 = electronics.map((item) => {
    return renderItems(item);
  });
  document.getElementById("electronics-items").innerHTML = myHTML_4.join("");
}
// Add an event listener to an HTML element with the ID "mensFilter" that calls the "showMensClothings()" function when clicked.
mensFilter.addEventListener("click", showMensClothings);

// Define the "showMensClothings()" function
function showMensClothings() {
  // Remove the class "hide-class" from the "mensSection" element and add the class "active" to the "mensFilter" element.
  mensSection.classList.remove("hide-class");
  mensFilter.classList.add("active");

  // Create an array containing references to three HTML elements (womensSection, jewellerySection, and electronicsSection), 
  // and add the class "hide-class" to each of them using the forEach() method.
  const allSections = [womensSection, jewellerySection, electronicsSection];
  allSections.forEach((section) => section.classList.add("hide-class"));

  // Create an array containing references to four HTML elements (allFilter, womensFilter, jewelleryFilter, and electronicsFilter), 
  // and remove the class "active" from each of them using the forEach() method.
  const allFilters = [
    allFilter,
    womensFilter,
    jewelleryFilter,
    electronicsFilter,
  ];
  allFilters.forEach((section) => section.classList.remove("active"));

  // Map over the "men" array, calling the "renderItems()" function on each item and returning the resulting HTML string. 
  // Join the resulting array of strings together into a single string using the join() method, and set the resulting string 
  // as the innerHTML of an HTML element with the ID "mens-items".
  const myHTML = men.map((item) => {
    return renderItems(item);
  });
  document.getElementById("mens-items").innerHTML = myHTML.join("");
}

//womesFilter function
womensFilter.addEventListener("click", showWomensClothings);
function showWomensClothings() {
  womensSection.classList.remove("hide-class");
  womensFilter.classList.add("active");

  const allSections = [mensSection, jewellerySection, electronicsSection];
  allSections.forEach((section) => section.classList.add("hide-class"));

  const allFilters = [
    allFilter,
    mensFilter,
    jewelleryFilter,
    electronicsFilter,
  ];
  allFilters.forEach((section) => section.classList.remove("active"));

  const myHTML = women.map((item) => {
    return renderItems(item);
  });
  document.getElementById("womens-items").innerHTML = myHTML.join("");
}

//jewelleryFilter function
jewelleryFilter.addEventListener("click", showJewellery);
function showJewellery() {
  jewellerySection.classList.remove("hide-class");
  jewelleryFilter.classList.add("active");

  const allSections = [mensSection, womensSection, electronicsSection];
  allSections.forEach((section) => section.classList.add("hide-class"));

  const allFilters = [allFilter, mensFilter, womensFilter, electronicsFilter];
  allFilters.forEach((section) => section.classList.remove("active"));

  const myHTML = jewelery.map((item) => {
    return renderItems(item);
  });
  document.getElementById("jewellery-items").innerHTML = myHTML.join("");
}

//electronicsFilter function
electronicsFilter.addEventListener("click", showElectronics);
function showElectronics() {
  electronicsSection.classList.remove("hide-class");
  electronicsFilter.classList.add("active");

  const allSections = [mensSection, jewellerySection, womensSection];
  allSections.forEach((section) => section.classList.add("hide-class"));

  const allFilters = [allFilter, mensFilter, jewelleryFilter, womensFilter];
  allFilters.forEach((section) => section.classList.remove("active"));

  const myHTML = electronics.map((item) => {
    return renderItems(item);
  });
  document.getElementById("electronics-items").innerHTML = myHTML.join("");
}

//search function
search.addEventListener("input", searchItems);
function searchItems() {
  const searchTerm = search.value.toLowerCase().trim();
  let searchResults = response.filter((item) =>
    item.title.toLowerCase().includes(searchTerm)
  );

  const allSections = [
    mensSection,
    womensSection,
    jewellerySection,
    electronicsSection,
  ];
  allSections.forEach((section) => section.classList.add("hide-class"));

  const allFilters = [
    allFilter,
    mensFilter,
    womensFilter,
    jewelleryFilter,
    electronicsFilter,
  ];
  allFilters.forEach((section) => section.classList.remove("active"));
  
  
console.log(searchResults)


  if (searchTerm !== "") {
   
    const searchHTML = searchResults.map((item) => renderItems(item));
    document.getElementById("searched-items").innerHTML = searchHTML.join("");
    searchSection.classList.remove("hide-class");
  } else {
    document.getElementById("searched-items").innerHTML = "No items found";
    
  }
  if(searchResults.length==0){
    document.getElementById("searched-items").innerHTML = "No items found";
  
    }
}

//rendering itemss here function
function renderItems(item) {
   
  return `
 <div class="item">
 <div id="img-div">
 <img src=${item.image} alt="Item" />
 </div>
   <div class="info" id="info-div">
   <div class="title">${item.title.slice(0,42)}...</div>
   <div class="row">
     <div class="price">$${item.price}</div>
     <div class="sized">S,M,L</div>
   </div>
   <div class="colors">
     Colors:
     <div class="row">
       <div class="circle" style="background-color: #000"></div>
       <div class="circle" style="background-color: #4938af"></div>
       <div class="circle" style="background-color: #203d3e"></div>
     </div>
   </div>
   <div class="row">Rating: ${item.rating.rate}⭐</div>
 </div>
  <div id="btn-div">
 <button id="addBtn" onclick="addToCart(${item.id})">Add to Cart</button>
 </div>
</div>`;
}

//function for the range bar
rangeBar.addEventListener("input", applyRatingFilter)
function applyRatingFilter(){
  const ratingValue = rangeBar.value
  let ratingResults = response.filter((item) =>{
    return Math.floor(item.rating.rate)==(ratingValue)

  } );
  const searchHTML = ratingResults.map((item) => renderItems(item));
  document.getElementById("searched-items").innerHTML = searchHTML.join("");
  searchSection.classList.remove("hide-class");
}

// Add an event listener to an HTML element with the ID "applyBtn" that calls the "filterPrice()" function when clicked.
applyBtn.addEventListener("click", filterPrice);

// Define the "filterPrice()" function
function filterPrice() {
  // Create an empty array to store search results.
  let resultsArr = [];

  // Check if the low-price checkbox is checked; if so, filter the "response" array to include only items that have a price 
  // less than or equal to 25.0. Then, push each item that matches the filter into the "resultsArr" array using the forEach() method.
  if (lowPrice.checked == true) {
    let temp = response.filter((item) => {
      return item.price <= 25.0;
    });

    temp.forEach((item) => {
      resultsArr.push(item);
    });
  }
  
  // Check if the mid-price checkbox is checked; if so, filter the "response" array to include only items that have a 
  // price between 25.0 and 50.0. Then, push each item that matches the filter into the "resultsArr" array using the forEach() method.
  if (midPrice.checked == true) {
    let temp = response.filter((item) => {
      return item.price >= 25.0 && item.price <= 50.0;
    });

    temp.forEach((item) => {
      resultsArr.push(item);
    });
  }
  
  // Check if the high-price checkbox is checked; if so, filter the "response" array to include only items that have a 
  // price between 50.0 and 100.0. Then, push each item that matches the filter into the "resultsArr" array using the forEach() method.
  if (highPrice.checked == true) {
    let temp = response.filter((item) => {
      return item.price >= 50.0 && item.price <= 100.0;
    });

    temp.forEach((item) => {
      resultsArr.push(item);
    });
  }
  
  // Check if the very-high-price checkbox is checked; if so, filter the "response" array to include only items that have 
  // a price greater than or equal to 100.0. Then, push each item that matches the filter into the "resultsArr" array using
  //  the forEach() method.
  if (vHighPrice.checked == true) {
    let temp = response.filter((item) => {
      return item.price >= 100.0;
    });

    temp.forEach((item) => {
      resultsArr.push(item);
    });
  }
 
  // Map over the "resultsArr" array, calling the "renderItems()" function on each item and returning the resulting HTML string.
  //  Join the resulting array of strings together into a single string using the join() method, and set the resulting string as
  //  the innerHTML of an HTML element with the ID "searched-items".
  const searchHTML = resultsArr.map((item) => renderItems(item));
  document.getElementById("searched-items").innerHTML = searchHTML.join("");

  // Make the "searchSection" visible by removing the class "hide-class"
  searchSection.classList.remove("hide-class");

  // If none of the checkboxes are checked, clear the innerHTML of the "searched-items" element and hide the "searchSection" 
  // by adding the class "hide-class".
  if (
    lowPrice.checked == false &&
    midPrice.checked == false &&
    highPrice.checked == false &&
    vHighPrice.checked == false
  ) {
    document.getElementById("searched-items").innerHTML = "";
    searchSection.classList.add("hide-class");
  }
}