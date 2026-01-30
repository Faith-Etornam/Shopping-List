const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemClear = document.getElementById("clear");
const filter = document.getElementById("filter");

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

function addItem(event) {
  event.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);

  itemList.appendChild(li);

  itemInput.value = "";

  checkUI();
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
    if (itemName.indexOf(textInput) !== -1) {
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

// Events and their handlers

itemForm.addEventListener("submit", addItem);

itemList.addEventListener("click", removeItem);

itemClear.addEventListener("click", clearItems);

filter.addEventListener("input", filterItems);

checkUI();
