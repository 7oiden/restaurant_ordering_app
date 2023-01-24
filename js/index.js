import { menuArray } from "./data.js";
import { checkLength, validateNumber } from "./validators.js";
import validateForm from "./validateForm.js";
import payModal from "./payModal.js";

// console.log(menuArray);

const nameInput = document.querySelector("#name");
const cardNumInput = document.querySelector("#card-num");
const cvvNumInput = document.querySelector("#cvv-num");
const modal = document.querySelector(".modal");
const menuContainer = document.querySelector(".menu-container");
const orderList = document.querySelector(".order__list");
const orderBtn = document.querySelector("#order-btn");
const payBtn = document.querySelector("#pay-btn");

const orderForm = document.querySelector("#order-form");
const orderContainer = document.querySelector(".order-container");
const successMsg = document.querySelector(".success-msg");

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
            <p>$${item.price}</p>
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

///////////
document.addEventListener("click", function (event) {
  if (event.target.dataset.add) {
    handleAddItem(event.target.dataset.add);

    // console.log(event.target);
  }
});

let orderArray = [];

// if (orderArray === []) {
//   subTotal = 0;
// }

function handleAddItem(itemId) {
  const targetItemObj = menuArray.filter(function (item) {
    return item.id === parseInt(itemId);
  })[0];

  // console.log(num);

  if (!orderArray.includes(targetItemObj)) {
    orderArray.push(targetItemObj);
  }
  // console.log(orderArray);

  if (orderArray === []) {
    orderContainer.style.display = "none";
  } else {
    orderContainer.style.display = "block";
  }

  renderOrder();
}

////form
orderForm.addEventListener("submit", submitOrderForm);

function submitOrderForm(event) {
  event.preventDefault();
  validateForm();
  if (
    checkLength(nameInput.value, 4) &&
    checkLength(cardNumInput.value, 15) &&
    validateNumber(cardNumInput.value) &&
    checkLength(cvvNumInput.value, 2) &&
    validateNumber(cvvNumInput.value)
  ) {
    console.log("submitted");
    modal.style.display = "none";

    successMsg.style.display = "block";
    // orderForm.reset();

    setTimeout(() => {
      successMsg.style.display = "none";
    }, 3000);

    orderArray = [];
    renderOrder();
    document.getElementById("order-price").textContent = "";
    orderContainer.style.display = "none";
  }
}

function renderOrder() {
  let subTotal = 0;
  orderList.innerHTML = "";
  orderArray.forEach((item) => {
    subTotal += Number(item.price * 1);

    orderList.innerHTML += `
    <li class="order__item">
      <div class="order__title">${item.name}</div> 
      <div class="order__price">$${item.price}</div>
    </li>
    `;

    document.getElementById("order-price").textContent = `
    $${subTotal}
  `;
  });
  console.log(orderArray);
}

renderMenu();
