// get value in local storage
let students = localStorage.getItem("data")
  ? JSON.parse(localStorage.getItem("data"))
  : [];
// get value in local storage

// create table
const renderList = () => {
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let thead_tr = document.createElement("tr");
  let tr_th_1 = document.createElement("th");
  tr_th_1.innerHTML = "Index";
  let tr_th_2 = document.createElement("th");
  tr_th_2.innerHTML = "Name";
  let tr_th_3 = document.createElement("th");
  tr_th_3.innerHTML = "Email";
  let tr_th_4 = document.createElement("th");
  tr_th_4.innerHTML = "Number";
  let tr_th_5 = document.createElement("th");
  tr_th_5.innerHTML = "Edit";
  let tr_th_6 = document.createElement("th");
  tr_th_6.innerHTML = "Delete";

  thead_tr.appendChild(tr_th_1);
  thead_tr.appendChild(tr_th_2);
  thead_tr.appendChild(tr_th_3);
  thead_tr.appendChild(tr_th_4);
  thead_tr.appendChild(tr_th_5);
  thead_tr.appendChild(tr_th_6);
  thead.appendChild(thead_tr);
  table.appendChild(thead);

  if (students.length === 0) {
    thead.style.display = "none";
    document.getElementById("form-id").onsubmit = todoList;
    update.innerText = "Submit";
    update.style.backgroundColor = " #4385f5";
    name_1.value = "";
    email_1.value = "";
    number_1.value = "";
  }

  let tbody = document.createElement("tbody");
  for (let i = 0; i < students.length; i++) {
    let tbody_tr = document.createElement("tr");
    let tr_td_1 = document.createElement("td");
    let tr_td_2 = document.createElement("td");
    let tr_td_3 = document.createElement("td");
    let tr_td_4 = document.createElement("td");
    let button_td_1 = document.createElement("td");
    let button_td_2 = document.createElement("td");
    let d_button = document.createElement("button");
    let e_button = document.createElement("button");

    tr_td_1.innerHTML = i + 1;
    tr_td_2.innerHTML = students[i].name;
    tr_td_3.innerHTML = students[i].email;
    tr_td_4.innerHTML = students[i].number;

    tbody_tr.className = "rows";
    d_button.addEventListener("click", () => Delete(i));
    d_button.innerText = "Delete";
    d_button.className = "delete_btn";
    d_button.id = "delete";
    e_button.addEventListener("click", () => Edit(i));
    e_button.innerText = "Edit";
    e_button.className = "edit_btn";
    tbody_tr.appendChild(tr_td_1);
    tbody_tr.appendChild(tr_td_2);
    tbody_tr.appendChild(tr_td_3);
    tbody_tr.appendChild(tr_td_4);
    tbody_tr.appendChild(button_td_1);
    tbody_tr.appendChild(button_td_2);
    button_td_1.appendChild(e_button);
    button_td_2.appendChild(d_button);
    tbody.appendChild(tbody_tr);
  }
  table.appendChild(tbody);
  document.getElementById("tables").innerHTML = "";
  document.getElementById("tables").appendChild(table);
};
// create table

// delete button funtion
const Delete = (index) => {
  students.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(students));
  renderList();
  swal("Delete");
};

// delete button funtion

// get button id
let update = document.getElementById("form-btn");
// get button id

let name_1 = document.getElementById("name");
let email_1 = document.getElementById("email");
let number_1 = document.getElementById("number");

// get index
let editInex;
// get index

// update table row fields in click update button
const renderInput = () => {
  document.getElementById("form-id").onsubmit = () => {
    students[editInex].name = name_1.value;
    students[editInex].email = email_1.value;
    students[editInex].number = number_1.value;

    name_1.value = "";
    email_1.value = "";
    number_1.value = "";
    localStorage.setItem("data", JSON.stringify(students));
    renderList();
    swal("Updated");
    document.getElementById("form-id").onsubmit = todoList;
    update.innerText = "Submit";
    update.style.backgroundColor = " #4385f5";
  };
};
// update table row fields in click update button

const del_disBtn = document.getElementsByClassName("delete_btn");
const edit_disBtn = document.getElementsByClassName("edit_btn");
const d_Button_disabled = () => {
  del_disBtn[editInex].disabled = true;
};
const e_Button_disabled = () => {
  edit_disBtn[editInex].disabled = true;
};

// edit button funtion
const Edit = (index) => {
  name_1.value = students[index].name;
  email_1.value = students[index].email;
  number_1.value = students[index].number;
  update.innerText = "Update";
  update.style.backgroundColor = "green";
  editInex = index;
  e_Button_disabled();
  d_Button_disabled();
  renderInput();
};
// edit button funtion

// main funtion
const todoList = () => {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value;
  let number = document.getElementById("number").value;

  if (name == "") {
    swal(" please Fill the Input Fields");
  } else {
    name_1.value = "";
    email_1.value = "";
    number_1.value = "";
    students.unshift({ name, email, number });

    // set value in local storage
    localStorage.setItem("data", JSON.stringify(students));
    // set value in local storage

    renderList();
    swal("Good job!", "Submitted!", "success");
  }
};
renderList();
