import { menuArray } from "./data.js";
import {
  checkLengthMin,
  checkLengthMax,
  validateNumber,
} from "./validators.js";
import payModal from "./payModal.js";

// console.log(menuArray);

const nameInput = document.querySelector("#name");
const cardNumInput = document.querySelector("#card-num");
const cvvNumInput = document.querySelector("#cvv-num");
const modal = document.querySelector(".modal");
const menuContainer = document.querySelector(".menu-container");
const orderList = document.querySelector(".order__list");
const orderForm = document.querySelector("#order-form");
const orderContainer = document.querySelector(".order-container");
const successMsg = document.querySelector(".success-msg");
const errorMsg = document.querySelectorAll(".error-msg");

let orderArray = [];

payModal();

function createMenuHtml() {
  let menuHtml = "";
  menuArray.forEach((item) => {
    menuHtml += `
    <div class="menu__item">
        <figure class="menu__figure">${item.emoji}</figure>
        <div class="menu__info">
            <h4 class="menu__heading">${item.name}</h4>
            <p class="menu__ingredients">${item.ingredients}</p>
            <p class="menu__price">$${item.price}</p>
        </div>
        <div class="menu__btn" data-add="${item.id}">
        <i class="fa-solid fa-plus menu__btn-icon"></i>
        </div>
    </div>
    `;
  });
  return menuHtml;
}

function renderMenu() {
  menuContainer.innerHTML = createMenuHtml();
}

///click handlers
document.addEventListener("click", function (event) {
  if (event.target.dataset.add) {
    handleAddItem(event.target.dataset.add);
  } else if (event.target.dataset.remove) {
    handleRemoveItem(event.target.dataset.remove);
  }

  if (orderArray.length === 0) {
    orderContainer.style.display = "none";
  } else {
    orderContainer.style.display = "block";
  }
});

function handleAddItem(itemId) {
  const targetItemObj = menuArray.filter(function (item) {
    return item.id === parseInt(itemId);
  })[0];

  if (!orderArray.includes(targetItemObj)) {
    orderArray.push(targetItemObj);
  }

  renderOrder();
}

function handleRemoveItem(itemId) {
  const newArray = orderArray.filter(function (item) {
    return item.id !== parseInt(itemId);
  });

  orderArray = newArray;

  renderOrder();
}

////pay form
orderForm.addEventListener("submit", submitOrderForm);

function submitOrderForm(event) {
  event.preventDefault();

  if (
    checkLengthMin(nameInput.value, 2) &&
    checkLengthMin(cardNumInput.value, 15) &&
    checkLengthMax(cardNumInput.value, 17) &&
    validateNumber(cardNumInput.value) &&
    checkLengthMin(cvvNumInput.value, 2) &&
    checkLengthMax(cvvNumInput.value, 4) &&
    validateNumber(cvvNumInput.value)
  ) {
    // console.log("submitted");
    modal.style.display = "none";

    successMsg.style.display = "block";
    orderForm.reset();

    setTimeout(() => {
      successMsg.style.display = "none";
    }, 3000);

    orderArray = [];
    renderOrder();
    document.getElementById("order-price").textContent = "";
    orderContainer.style.display = "none";
  } else {
    errorMsg.forEach((msg) => {
      msg.style.display = "block";
    });
  }
}

///render order
function renderOrder() {
  let subTotal = 0;
  let discount = 0;
  let orderTotal = 0;

  orderList.innerHTML = "";

  orderArray.forEach((item) => {
    subTotal += Number(item.price * 1);

    if (subTotal >= 24) {
      discount = 15;
    } else {
      discount = 0;
    }

    orderTotal = subTotal - (subTotal * discount) / 100;

    orderList.innerHTML += `
    <li class="order__item">
      <div class="order__title">${item.name}</div> 
      <button class="remove-btn" data-remove="${item.id}">Remove</button>
      <div class="order__price">$${item.price}</div>
    </li>
    `;

    if (!discount) {
      document.getElementById("discount-msg").textContent = "";
    } else {
      document.getElementById("discount-msg").textContent = `
      ${discount}% discount
    `;
    }

    document.getElementById("order-price").textContent = `
    $${orderTotal.toFixed(2)}
  `;
  });
  // console.log(orderArray);
}

renderMenu();
renderOrder();
