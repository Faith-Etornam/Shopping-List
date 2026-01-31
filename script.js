const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemClear = document.getElementById("clear");
const filter = document.getElementById("filter");

// Function to create the Button and Icon

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

// Functionalities for the Shopping List

function checkUI() {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    filter.style.display = "none";
    itemClear.style.display = "none";
  } else {
    filter.style.display = "block";
    itemClear.style.display = "block";
  }
}

function addItemToDOM(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);

  itemList.appendChild(li);
}

function addItemToStorage(item) {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = []
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'))
  }
  itemsFromStorage.push(item)

  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function onAddItemSubmit(event) {
  event.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  addItemToDOM(newItem);
  addItemToStorage(newItem)

  checkUI();
  itemInput.value = "";
}

function removeItem(event) {
  if (event.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure you want to delete this item?")) {
      event.target.parentElement.parentElement.remove();
    }
  }
  checkUI();
}

function filterItems(event) {
  const items = itemList.querySelectorAll("li");
  const textInput = event.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.includes(textInput)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  checkUI();
}

// Events and their handlers

itemForm.addEventListener("submit", onAddItemSubmit);

itemList.addEventListener("click", removeItem);

itemClear.addEventListener("click", clearItems);

filter.addEventListener("input", filterItems);

checkUI();
