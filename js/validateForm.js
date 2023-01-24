import { checkLength, validateNumber } from "./validators.js";

const nameInput = document.querySelector("#name");
const cardNumInput = document.querySelector("#card-num");
const cvvNumInput = document.querySelector("#cvv-num");

const nameError = document.querySelector("#name-error");
const cardNumError = document.querySelector("#card-num-error");
const cvvNumError = document.querySelector("#cvv-num-error");

export default function validateForm() {
  function checkInput() {
    if (checkLength(nameInput.value, 4)) {
      nameError.style.display = "none";
    } else {
      nameError.style.display = "block";
    }

    if (checkLength(cardNumInput.value, 15)) {
      cardNumError.style.display = "none";
    } else {
      cardNumError.style.display = "block";
    }

    if (validateNumber(cardNumInput.value)) {
      cardNumError.style.display = "none";
    } else {
      cardNumError.style.display = "block";
    }
  }
  nameInput.addEventListener("keyup", checkInput);
  cardNumInput.addEventListener("keyup", checkInput);
}
