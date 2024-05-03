"use strict";

// Selecting DOM elements
const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const checkboxes = document.querySelectorAll("[name=checkbox]");

// Initialize tapas list from local storage or create an empty array
let store = localStorage.getItem("tapasList")
  ? JSON.parse(localStorage.getItem("tapasList"))
  : [];

// Function to render the tapas list
function renderList(lists = []) {
  itemsList.innerHTML = lists
    .map(
      (list, i) => `
    <li>
      <input onclick='checkItem(${i})' type="checkbox" ${
        list.isChecked ? "checked" : ""
      } id=${i} />
      <label for=${i}><span>${list.text}</span></label>
      <button onclick='deleteItem(${i})' class='delete' id=${i}>❌</button>
    </li>
  `
    )
    .join("");
}

// Function to add an item to the tapas list
const AddToList = (event) => {
  event.preventDefault();

  // Get the value of the item input
  let item = document.querySelector('[name="item"]').value.trim();

  // Check if input is empty
  if (!item) {
    alert("Please enter a valid item.");
    return;
  }

  // Convert input to sentence case
  item = capitalizeSentenceCase(item);

  // Check for duplicate entries
  if (store.some((list) => list.text === item)) {
    alert(`${item} already exists in the list.`);
    return;
  }

  const newItem = { text: item, isChecked: false };
  store.push(newItem); // Add the new item to the store array
  renderList(store); //Render the updated list
  localStorage.setItem("tapasList", JSON.stringify(store)); // Update local storage
  addItems.reset(); // Reset the form after adding item
};

// Function to delete an item from the tapas list
function deleteItem(index) {
  const storeCopy = [...store];
  storeCopy.splice(index, 1); // Remove the item from the store array
  store = storeCopy;
  localStorage.setItem("tapasList", JSON.stringify(store)); // Update local storage
  renderList(store); // Render the updated list
}

// Function to toggle the checked state of an item
function checkItem(index) {
  const storeCopy = [...store];
  storeCopy[index].isChecked = !storeCopy[index].isChecked; // Toggle the isChecked property
  store = storeCopy;
  localStorage.setItem("tapasList", JSON.stringify(store)); // Update local storage
  renderList(store); // Render the updated list
}

// Function to capitalize the first letter of each word in sentence case
function capitalizeSentenceCase(str) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

// Event listeners
// Event listener for form submission
addItems.addEventListener("submit", AddToList);

// Initial rendering of the tapas list
renderList(store);
