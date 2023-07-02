const cartSection=document.querySelector("#cart-section")

let cartItems=JSON.parse(localStorage.getItem("cart"))
console.log(cartItems)



// check if the current user is not stored in the localStorage
if(!localStorage.getItem("currentUser")){
  // if the user is not stored, show an alert message
  alert("We're sorry, but it looks like there was an error processing your request. Please try again later or contact our support team for assistance.");

  // Set a delay(function execution) of 1 second(1000 milliseconds) to redirect to the homepage.
  setTimeout(()=>{
    window.location.href  ="../index.html";
   },1000);
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
if(cartItems==null){
  cartItems=[]
  }
// if no item in cart 
newFunction();
function newFunction() {
  if (cartItems.length === 0) {
    alert("No items in cart");
  }
}

//function for calculating total price
function calculateTotal(){
    let totalPrice=0
 cartItems.map((item) => {
    totalPrice+= item.price
   
});
let currentUser=JSON.parse(localStorage.getItem("currentUser"))
currentUser.totalPrice=totalPrice.toFixed(2)

localStorage.setItem("currentUser", JSON.stringify(currentUser))

document.getElementById("total-price").innerHTML = "$"+totalPrice.toFixed(2)
}
calculateTotal()

//function for rendering cart items on screen
function renderCartSection(){
    const searchHTML = cartItems.map((item) => renderItems(item));
    document.getElementById("cart-items").innerHTML =  searchHTML.join("");
}
renderCartSection()

//function to show items on list
function renderList(){
    const searchHTML_2 = cartItems.map((item) => renderPrice(item));
    document.getElementById("list-items").innerHTML  =  searchHTML_2.join("");
}
renderList()

//function for rendering items on screen
function renderItems(item) {
    return `
   <div class="item">
   <div id="img-div">
   <img src=${item.image} alt="Item" />
   </div>
     <div class="info" id="info-div">
     <div class="title">${item.title}</div>
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
   <button id="addBtn" onclick="removeItems(${item.id})">Remove from cart</button>
   </div>
  </div>`;
  }

  //function for rendering items in bill
  function renderPrice(item){

    return`
    <div id="itemOfList"> 
    <div>${item.title.slice(0, 20)}...</div>
    <div>$${item.price}</div>
    </div>
    `
  }

  //function for removing items from cart
  function removeItems(id){
   cartItems=cartItems.filter((item)=>{
        
        return item.id != id
    })
    alert("Item was removed")
    localStorage.setItem("cart",JSON.stringify(cartItems))
    renderCartSection()
    renderList()
    calculateTotal()
  }

  //redirecting to the payments page
  document.querySelector("#pay-btn").addEventListener("click",()=>{
    localStorage.setItem("cart", JSON.stringify([]))
    alert("The items were purchased")
    window.location.href="../razorpay/index.html"
  })