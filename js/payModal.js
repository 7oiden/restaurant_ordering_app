////modal
const modal = document.querySelector(".modal");

export default function payModal() {
  document.addEventListener("click", toggleModal);

  function toggleModal(event) {
    const isClickedInsideModal = modal.contains(event.target);

    if (event.target.matches("#order-btn")) {
      modal.style.display = "block";
    } else if (!isClickedInsideModal) {
      modal.style.display = "none";
    }
  }
}
