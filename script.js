const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

function addItem(event) {
  event.preventDefault();
  if (itemInput.value === "") {
    alert("Please add an item");
    return;
  }
  
}

itemForm.addEventListener("submit", addItem);
