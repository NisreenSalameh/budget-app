let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-btn");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expensesValue = document.getElementById("expenses-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

//Function to set the Budget
totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;

    if (tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        //set budget
        amount.innerHTML = tempAmount;
        //set balance
        balanceValue.innerHTML = tempAmount - expensesValue.innerText;
        //clear input box
        totalAmount.value="";
    }
});

//Function to display "edit" and "delete" buttons
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach(element => {
        element.disabled = bool;
    });
};


//Function to modify list items
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expensesValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }
    balanceValue.innerText = parseInt 
    (currentBalance) + parseInt(parentAmount);
    expensesValue.innerText = 
    parseInt(currentExpense) - parseInt
    (parentAmount);
    parentDiv.remove();
};


//Function to create a list
const listCreator = (expenseName, expensesValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product">$
    {expensesName}</p><p class="amount">$
    {expensesValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid fa-pen-to-square", "edit");
    editButton.style.fontSize = "24px";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid fa-trash", "delete");
    deleteButton.style.fontSize = "24px";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);
};


//Function to add expenses
checkAmountButton.addEventListener("click", () =>{
    //check is empty
    if(!userAmount.value || !productTitle.value){
        productTitleError.classList.remove("hide");
        return false;
    }
    //enable buttons
    disableButtons(false);
    //expense
    let expenses = parseInt(userAmount.value);
    //total expense (existing + new)
    let sum =parseInt(expensesValue.innerText) + expenses;
    expensesValue.innerText = sum;
    //total balance (budget - total expense)
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;
    //create list
    listCreator (productTitle.value, userAmount.value);
    //empty inputs
    productTitle.value = "";
    userAmount.value = "";
});