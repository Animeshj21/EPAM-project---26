// ------------------------------
// ABC Bank Customer Dashboard
// ------------------------------

// Default Values
let balance = Number(localStorage.getItem("balance")) || 50000;
let history = JSON.parse(localStorage.getItem("history")) || [];

// DOM Elements
const balanceDisplay = document.getElementById("balance");

const depositInput = document.getElementById("depositAmount");
const withdrawInput = document.getElementById("withdrawAmount");

const transferInput = document.getElementById("transferAmount");
const receiverInput = document.getElementById("receiver");

const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");
const transferBtn = document.getElementById("transferBtn");

const message = document.getElementById("message");

const historyList = document.getElementById("historyList");

const clearBtn = document.getElementById("clearHistory");

// ------------------------------
// Load Balance
// ------------------------------

function updateBalance() {

    balanceDisplay.innerText = balance.toLocaleString();

    localStorage.setItem("balance", balance);

}

// ------------------------------
// Save History
// ------------------------------

function saveHistory() {

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

}

// ------------------------------
// Show Message
// ------------------------------

function showMessage(text, color) {

    message.innerText = text;

    message.style.borderLeftColor = color;

}

// ------------------------------
// Add Transaction
// ------------------------------

function addTransaction(type, amount, receiver = "") {

    const now = new Date();

    const transaction = {

        type,
        amount,
        receiver,
        date: now.toLocaleString()

    };

    history.unshift(transaction);

    saveHistory();

    renderHistory();

}

// ------------------------------
// Render History
// ------------------------------

function renderHistory() {

    historyList.innerHTML = "";

    if (history.length === 0) {

        historyList.innerHTML =
            "<li>No Transactions Yet</li>";

        return;

    }

    history.forEach(item => {

        let text = "";

        let cls = "";

        if (item.type === "Deposit") {

            text = `Deposited ₹${item.amount}`;

            cls = "deposit";

        }

        else if (item.type === "Withdraw") {

            text = `Withdrawn ₹${item.amount}`;

            cls = "withdraw";

        }

        else {

            text = `Transferred ₹${item.amount} to ${item.receiver}`;

            cls = "transfer";

        }

        historyList.innerHTML += `

        <li>

            <div>

                <strong>${text}</strong>

                <br>

                <small>${item.date}</small>

            </div>

            <span class="${cls} amount">

            ₹${item.amount}

            </span>

        </li>

        `;

    });

}

// ------------------------------
// Deposit
// ------------------------------

depositBtn.addEventListener("click", () => {

    let amount = Number(depositInput.value);

    if (amount <= 0 || isNaN(amount)) {

        showMessage("Enter valid amount", "red");

        return;

    }

    balance += amount;

    updateBalance();

    addTransaction("Deposit", amount);

    showMessage(
        "Money Deposited Successfully",
        "green"
    );

    depositInput.value = "";

});

// ------------------------------
// Withdraw
// ------------------------------

withdrawBtn.addEventListener("click", () => {

    let amount = Number(withdrawInput.value);

    if (amount <= 0 || isNaN(amount)) {

        showMessage("Enter valid amount", "red");

        return;

    }

    if (amount > balance) {

        showMessage(
            "Insufficient Balance",
            "red"
        );

        return;

    }

    balance -= amount;

    updateBalance();

    addTransaction("Withdraw", amount);

    showMessage(
        "Money Withdrawn Successfully",
        "green"
    );

    withdrawInput.value = "";

});

// ------------------------------
// Transfer
// ------------------------------

transferBtn.addEventListener("click", () => {

    let receiver = receiverInput.value.trim();

    let amount = Number(transferInput.value);

    if (receiver === "") {

        showMessage(
            "Enter Receiver Name",
            "red"
        );

        return;

    }

    if (amount <= 0 || isNaN(amount)) {

        showMessage(
            "Enter Valid Amount",
            "red"
        );

        return;

    }

    if (amount > balance) {

        showMessage(
            "Insufficient Balance",
            "red"
        );

        return;

    }

    balance -= amount;

    updateBalance();

    addTransaction(
        "Transfer",
        amount,
        receiver
    );

    showMessage(
        `₹${amount} Sent to ${receiver}`,
        "green"
    );

    receiverInput.value = "";

    transferInput.value = "";

});

// ------------------------------
// Clear History
// ------------------------------

clearBtn.addEventListener("click", () => {

    if (confirm("Clear all transactions?")) {

        history = [];

        saveHistory();

        renderHistory();

        showMessage(
            "Transaction History Cleared",
            "orange"
        );

    }

});

// ------------------------------
// Date & Time
// ------------------------------

function updateDateTime() {

    const now = new Date();

    document.getElementById("date").innerText =
        now.toLocaleDateString();

    document.getElementById("time").innerText =
        now.toLocaleTimeString();

}

setInterval(updateDateTime, 1000);

updateDateTime();

// ------------------------------
// Initial Load
// ------------------------------

updateBalance();

renderHistory();