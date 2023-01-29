import {menuArray} from '../js/data.js';
const yourOrder = document.querySelector('.order-summary');

// Building list of food available to order
const menuList = document.querySelector('.menu');

function buildMenu() {
    let foodItems = '';
    menuArray.forEach(function(menuItem){
        foodItems += `
        <section class="food-item">
            <div class="item-emoji">${menuItem.emoji}</div>
            <h1 class="item-name">${menuItem.name}</h1>
            <p class="item-ingredients">${menuItem.ingredients}</p>
            <p class="item-price">$${menuItem.price}</p>
            <img src="img/add-btn.png" class="add-item" id="${menuItem.id}" alt="button">
        </section>
        `    
    })
    return foodItems
}

menuList.innerHTML = buildMenu();

// Arrays that hold items added to the order and prices
let currentOrder = [];
let currentTotal = [];

// Pushes the item to the currentOrder Array and currentTotal Array + calls functions to build order list and running total
menuList.addEventListener('click', (e) => {
    if(e.target.className === 'add-item') {
        currentOrder.push(menuArray[e.target.id]);
        currentTotal.push(menuArray[e.target.id].price);
    }
    buildOrder(currentOrder);
    buildTotal(currentTotal);
})

// Builds the list of items added to order, adds an id to remove them later and toggles the order section visible
function buildOrder(arr) {
    const orderItems = document.querySelector('.order-items');
    let yourOrderHTML = '';

    for(let i = 0; i < arr.length; i++) {
        yourOrderHTML += `
            <div class="added-item">
                <div class="order-item">
                    <h1>${arr[i].name}</h1>
                </div>
                <div>
                    <h3><a href="#" class="order-remove-item" data-id="${arr[i].id}">remove</a></h3>
                </div>
                <div class="order-item-price">
                    <p>$${arr[i].price}</p>
                </div>
            </div>
        `;
    }
    orderItems.innerHTML = yourOrderHTML;

    if(yourOrder.classList.contains("hidden")) {
        yourOrder.classList.toggle("hidden")
    }
}

// Builds the running total for the items added to the order 
function buildTotal(arr) {
    const orderTotal = document.querySelector('.order-total');
    let totalHTML = '';
    let totalPrice = 0;
    for(let i = 0; i < arr.length; i++) {
        totalPrice += arr[i];
        totalHTML = `
        <h1>Total Price:</h1>
        <div class="total-price">
            $${totalPrice}
        </div>
        <button id="order-btn">Complete Order</button>
        `;
    }
    orderTotal.innerHTML = totalHTML;
    
    if(currentOrder.length > 0) {
        paymentModal();
    }
}

// Removes an item from the order by getting it's id, converting it to a number, finding a match in the currentOrder Array
// And removes it from both arrays since they in the same position, removes the item from the dom, rebuilds the running total and
// hides the Your Order section if nothing is left in the arrays
yourOrder.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.classList.contains('order-remove-item')) {
        let itemToRemove = e.target.dataset.id;
        itemToRemove = parseInt(itemToRemove);
        var index = currentOrder.findIndex(p => p.id == itemToRemove);
        currentOrder.splice(index, 1)
        currentTotal.splice(index, 1)
        e.target.parentNode.parentNode.parentNode.remove()
                if(currentTotal.length === 0) {
            yourOrder.classList.toggle("hidden")
        }
        buildTotal(currentTotal)
    }
})

// Checkout section

function paymentModal() {
    const payModalOpen = document.querySelector('#order-btn');
    const modal = document.querySelector('.modal');

    payModalOpen.addEventListener('click', () => {
        modal.showModal();
        const formFields = document.querySelectorAll('input[type="text')
        for(let i = 0; i < formFields.length; i++) {
            formFields[i].value = null;
        }
    })
    
    const payModalClose = document.querySelector('#pay-btn');
    payModalClose.addEventListener('click', () => {
        const nameField = document.getElementById('name-field');
        const cardField = document.getElementById('card-field');
        const cvvField = document.getElementById('cvv-field');
        
        if(nameField.value.length > 0 && cardField.value.length > 0 && cvvField.value.length > 0) {
            clearOrder(nameField);
        } 
    })
}

function clearOrder(arr) {
        currentOrder = [];
        currentTotal = [];
        yourOrder.innerHTML = '';
        yourOrder.classList.toggle("hidden");
       let thankYou =  document.querySelector(".order-complete");
       thankYou.classList.remove("hidden");
       thankYou.innerHTML = `
       <h2>Thanks, ${arr.value}! Your order is on its way!</h2>
       `;

       let timeleft = 10;
       const downloadTimer = setInterval(function(){
         if(timeleft <= 0){
           clearInterval(downloadTimer);
           location.reload();
         } else {
           thankYou.innerHTML = `
           <h2>Thanks, ${arr.value}! Your order is on its way! ${timeleft}</h2>
           `;
         }
         timeleft -= 1;
       }, 1000);
    }
