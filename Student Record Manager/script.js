const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("searchInput");
const sortAgeBtn = document.getElementById("sortAgeBtn");
const sortScoreBtn = document.getElementById("sortScoreBtn");
const statsDiv = document.getElementById("stats");

let students = [];
let editIndex = null;
let searchTerm = "";

function renderTable() {
  let filtered = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm)
  );
  studentTableBody.innerHTML = "";
  filtered.forEach((student, idx) => {
    const tr = document.createElement("tr");
    if (student.score > 80) tr.classList.add("highlight");
    tr.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.batch}</td>
                    <td>${student.age}</td>
                    <td>${student.score}</td>
                    <td class="actions">
                        <button onclick="editStudent(${idx})">Edit</button>
                        <button onclick="deleteStudent(${idx})">Delete</button>
                    </td>
                `;
    studentTableBody.appendChild(tr);
  });
  // Stats
  statsDiv.textContent = `Total Students: ${students.length} | Average Score: ${
    students.length
      ? (students.reduce((a, b) => a + b.score, 0) / students.length).toFixed(2)
      : 0
  }`;
}

window.editStudent = function (idx) {
  const student = students[idx];
  document.getElementById("name").value = student.name;
  document.getElementById("batch").value = student.batch;
  document.getElementById("age").value = student.age;
  document.getElementById("score").value = student.score;
  editIndex = idx;
};

window.deleteStudent = function (idx) {
  students.splice(idx, 1);
  renderTable();
};

studentForm.onsubmit = function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const batch = document.getElementById("batch").value.trim();
  const age = parseInt(document.getElementById("age").value, 10);
  const score = parseInt(document.getElementById("score").value, 10);

  if (
    !name ||
    !batch ||
    isNaN(age) ||
    isNaN(score) ||
    age <= 0 ||
    score < 0 ||
    score > 100
  ) {
    alert("Please enter valid data.");
    return;
  }

  const student = { name, batch, age, score };
  if (editIndex !== null) {
    students[editIndex] = student;
    editIndex = null;
  } else {
    students.push(student);
  }
  studentForm.reset();
  renderTable();
};

searchInput.oninput = function () {
  searchTerm = this.value.toLowerCase();
  renderTable();
};

sortAgeBtn.onclick = function () {
  students.sort((a, b) => a.age - b.age);
  renderTable();
};

sortScoreBtn.onclick = function () {
  students.sort((a, b) => b.score - a.score);
  renderTable();
};

renderTable();
