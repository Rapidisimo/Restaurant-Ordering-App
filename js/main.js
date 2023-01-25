import {menuArray} from '../js/data.js';


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

let itemId = 0;
let price = 0;
let itemCount = [];
let runningTotal = [];

menuList.addEventListener('click', (e) => {

    if(e.target.className === 'add-item') {
        itemId = e.target.id;
        itemCount.push(itemId);
        price = menuArray[itemId].price;
        runningTotal.push(price);
        console.log(runningTotal)
        console.log(itemCount)
    }
    
})

