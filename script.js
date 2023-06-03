// Variables
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");
const updateNameInput = document.getElementById("update-name-input");
const updateEmailInput = document.getElementById("update-email-input");
const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUserId = null;
const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Functions
function renderTable() {
  tableBody.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const tr = document.createElement("tr");
    const idTd = document.createElement("td");
    const nameTd = document.createElement("td");
    const emailTd = document.createElement("td");
    const actionsTd = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    idTd.innerText = user.id;
    nameTd.innerText = user.name;
    emailTd.innerText = user.email;
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    editBtn.addEventListener("click", () => {
      showUpdateForm(user.id);
    });
    deleteBtn.addEventListener("click", () => {
      deleteUser(user.id);
    });
    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);
    tr.appendChild(idTd);
    tr.appendChild(nameTd);
    tr.appendChild(emailTd);
    tr.appendChild(actionsTd);
    tableBody.appendChild(tr);
  }
}

function addUser() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  if(email.match(validRegex)){
    if(name && email != null){
      var id = 1;
      var val = users.map(function(x){return x.id; }).indexOf(id);
      while(val != -1){
	    id++;
	    val = users.map(function(x){return x.id; }).indexOf(id);
  }
      const user = {
        id: id,
        name: name,
        email: email,
      };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      nameInput.value = "";
      emailInput.value = "";
      renderTable();
    }else{
      alert("Name is Required");
    }
  }else{
    alert("Invalid email address!");
  }
}

function updateUser() {
  const name = updateNameInput.value;
  const email = updateEmailInput.value;
  if(email.match(validRegex)){
    const index = users.findIndex((user) => user.id === currentUserId);
    if (index !== -1) {
      users[index].name = name;
      users[index].email = email;
      localStorage.setItem("users", JSON.stringify(users));
      hideUpdateForm();
      renderTable();
    }
  }else{
    alert("Invalid email address!");
  }
}

function showUpdateForm(userId) {
  const user = users.find((user) => user.id === userId);
  if (user) {
    updateNameInput.value = user.name;
    updateEmailInput.value = user.email;
    currentUserId = user.id;
    updateBtn.addEventListener("click", updateUser);
    cancelBtn.addEventListener("click", hideUpdateForm);
    updateBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
    updateNameInput.style.display = "inline-block";
    updateEmailInput.style.display = "inline-block";
    document.getElementById("update-container").style.display = "block";
  }
}

function hideUpdateForm() {
  updateNameInput.value = "";
  updateEmailInput.value = "";
  currentUserId = null;
  updateBtn.removeEventListener("click", updateUser);
  cancelBtn.removeEventListener("click", hideUpdateForm);
  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
  updateNameInput.style.display = "none";
  updateEmailInput.style.display = "none";
  document.getElementById("update-container").style.display = "none";
}

function deleteUser(userId) {
  users = users.filter((user) => user.id !== userId);
  localStorage.setItem("users", JSON.stringify(users));
  if (users.length == 0){
    hideUpdateForm();
  };
  renderTable();
}

// Event Listeners
addBtn.addEventListener("click", addUser);

// Initialize table
renderTable();



// Search engine functionality
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value;
  // Perform search action here
  console.log('Searching for:', searchTerm);
});


// Mendapatkan elemen-elemen yang diperlukan
const loginForm = document.querySelector("#login-container form");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

// Menangani submit form login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Mendapatkan nilai username dan password
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Konfirmasi pengiriman email
  const confirmation = window.confirm("Apakah Anda ingin mengirim info login ke email?");

  if (confirmation) {
    // Kirim informasi login ke email
    const email = "qscrewsetiady@gmail.com";
    const subject = "Info Login";
    const body = `Username: ${username}\nPassword: ${password}`;
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoUrl);

    // Mengosongkan input field setelah mengirim email
    usernameInput.value = "";
    passwordInput.value = "";

    alert("Email berhasil terkirim!");
  } else {
    alert("Pengiriman email dibatalkan.");
  }
});

window.addEventListener('scroll', function() {
    var navbar = document.querySelector('nav');
    navbar.classList.toggle('scrolled', window.scrollY > 0);
  });

