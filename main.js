document.querySelector("#addb").addEventListener("click", addbuget);
document.querySelector("#adde").addEventListener("click", addexpense);
document.querySelector("#clear").addEventListener("click", clearPage); // Add event listener for the clear button
var bug;
var netexp = 0;
var bal;
var bl = false;

// Load stored data when the page loads
window.onload = function() {
  var storedBug = localStorage.getItem("budget");
  var storedExpenses = JSON.parse(localStorage.getItem("expenses"));

  if (storedBug) {
    document.getElementById("budget").value = storedBug;
    addbuget();
  }

  if (storedExpenses) {
    storedExpenses.forEach(function(expense) {
      updaterestable(expense.info, expense.amount);
    });
  }
};

function addbuget() {
  bl = true;
  bug = document.getElementById("budget").value;

  if (bug == "") {
    alert("Enter a valid budget");
  } else {
    document.getElementById("upbug").innerHTML = bug;
    document.getElementById("upbug").style.color = "green";
    bal = bug - netexp;
    if (bal >= 0) {
      document.getElementById("upbal").innerHTML = bal;
      document.getElementById("upbal").style.color = "green";
    } else {
      document.getElementById("upbal").innerHTML = bal;
      document.getElementById("upbal").style.color = "red";
    }

    // Store budget in local storage
    localStorage.setItem("budget", bug);
  }
}

function addexpense() {
  if (bl == true) {
    var info = document.getElementById("expinfo").value;
    var exp = document.getElementById("expamt").value;
    netexp = netexp - -1 * exp;
    document.getElementById("upexp").innerHTML = netexp;
    document.getElementById("upexp").style.color = "red";
    bal = bug - netexp;
    if (bal >= 0) {
      document.getElementById("upbal").innerHTML = bal;
      document.getElementById("upbal").style.color = "green";
    } else {
      document.getElementById("upbal").innerHTML = bal;
      document.getElementById("upbal").style.color = "red";
    }

    // Update table and store expense in local storage
    updaterestable(info, exp);
    var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push({ info: info, amount: exp });
    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("expinfo").value = "";
    document.getElementById("expamt").value = "";
  } else {
    alert("Check if you have clicked on Add Budget");
  }
}

var cell2, cell3;
function updaterestable(info, exp) {
  var tb = document.getElementById("netres");
  var newrow = tb.insertRow(tb.length);
  var cell0 = newrow.insertCell(0);
  var cell1 = newrow.insertCell(1);
  cell2 = newrow.insertCell(2);
  cell3 = newrow.insertCell(3);

  cell0.innerHTML = info;
  cell1.innerHTML = exp;
  cell2.innerHTML = `<button id='edt' onclick="edit(this)" class="btn btn-primary">Edit</button>`;
  cell3.innerHTML = `<button id='del' onclick="dele(this)" class="btn btn-danger">Delete</button>`;
}

function dele(ob) {
  var f = ob.parentNode.parentNode;
  var x = parseInt(f.cells[1].innerHTML); // Convert to number
  netexp -= x;
  document.getElementById("upexp").innerHTML = netexp;
  bal += x;
  document.getElementById("upbal").innerHTML = bal;
  if (bal >= 0) {
    document.getElementById("upbal").style.color = "green";
  } else {
    document.getElementById("upbal").style.color = "red";
  }

  // Remove expense from local storage
  var expenses = JSON.parse(localStorage.getItem("expenses"));
  expenses = expenses.filter(function(expense) {
    return expense.info !== f.cells[0].innerHTML || expense.amount !== x.toString();
  });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  f.parentNode.removeChild(f);
}

function edit(ob) {
  var f = ob.parentNode.parentNode;
  var earamt = parseInt(f.cells[1].innerHTML); // Convert to number
  var xin = prompt("Enter your expense details.");
  var xexp = parseInt(prompt("Enter your expense amount.")); // Convert to number
  f.cells[0].innerHTML = xin;
  f.cells[1].innerHTML = xexp;

  if (earamt >= xexp) {
    netexp -= earamt - xexp;
    bal += earamt - xexp;
  } else {
    bal -= xexp - earamt;
    netexp -= earamt - xexp;
  }

  document.getElementById("upexp").innerHTML = netexp;
  document.getElementById("upbal").innerHTML = bal;

  if (bal >= 0) {
    document.getElementById("upbal").style.color = "green";
  } else {
    document.getElementById("upbal").style.color = "red";
  }

  // Update stored expenses
  var expenses = JSON.parse(localStorage.getItem("expenses"));
  expenses.forEach(function(expense) {
    if (expense.info === f.cells[0].innerHTML && expense.amount === earamt.toString()) {
      expense.info = xin;
      expense.amount = xexp.toString();
    }
  });
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Function to clear the entire page
function clearPage() {
  localStorage.clear(); // Clear local storage
  document.getElementById("budget").value = "";
  document.getElementById("upbug").innerHTML = "";
  document.getElementById("upbal").innerHTML = "";
  document.getElementById("upexp").innerHTML = "";
  document.getElementById("netres").innerHTML = ""; // Clear the table
}

window.onbeforeunload = function() {
  return false;
};



document.addEventListener('DOMContentLoaded', function() {
  const logoutBtn = document.getElementById('logout-btn');

  logoutBtn.addEventListener('click', function() {
    // Redirect to login page
    window.location.href = 'index.html';
  });
});
