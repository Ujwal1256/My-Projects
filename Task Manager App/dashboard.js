auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    fetchTasks();
  }
});

// Logout functionality
document.getElementById("logout-btn").addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
});

// Add Task
document.getElementById("task-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("task-title").value.trim();
  const body = document.getElementById("task-desc").value.trim();
  const user = auth.currentUser;
  if (!user || !title || !body) return;

  db.collection("tasks")
    .add({
      title,
      body,
      uid: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      completed: false,
    })
    .then(() => {
      fetchTasks();
      document.getElementById("task-form").reset();
    })
    .catch((err) => alert("Failed to add task: " + err.message));
});

// Fetch Tasks
function fetchTasks() {
  const tasksList = document.getElementById("tasks-list");
  tasksList.innerHTML = "<div>Loading...</div>";
  const user = auth.currentUser;
  if (!user) return;

  db.collection("tasks")
    .where("uid", "==", user.uid)
    .orderBy("createdAt", "desc")
    .get()
    .then((snapshot) => {
      tasksList.innerHTML = "";
      if (snapshot.empty) {
        tasksList.innerHTML = "<p class='text-muted'>No tasks found. Add a new one!</p>";
        return;
      }

      snapshot.forEach((doc) => {
        const task = doc.data();
        tasksList.innerHTML += `
          <div class="card task-card" data-id="${doc.id}">
            <div class="card-body">
              <h5 class="card-title">${task.title}</h5>
              <p class="card-text">${task.body}</p>
              <button class="btn btn-success btn-sm complete-btn">✅ Complete</button>
              <button class="btn btn-warning btn-sm edit-btn">📝 Edit</button>
              <button class="btn btn-danger btn-sm delete-btn">❌ Delete</button>
            </div>
          </div>
        `;
      });
    })
    .catch((err) => {
      tasksList.innerHTML = "<p class='text-danger'>Failed to load tasks.</p>";
      console.error(err);
    });
}

// Task Actions
document.getElementById("tasks-list").addEventListener("click", function (e) {
  const card = e.target.closest(".task-card");
  if (!card) return;
  const id = card.getAttribute("data-id");

  // Delete Task
  if (e.target.classList.contains("delete-btn")) {
    if (confirm("Are you sure you want to delete this task?")) {
      db.collection("tasks").doc(id).delete().then(fetchTasks);
    }
  }

  // Complete Task
  if (e.target.classList.contains("complete-btn")) {
    db.collection("tasks").doc(id).update({ completed: true }).then(fetchTasks);
  }

  // Edit Task
  if (e.target.classList.contains("edit-btn")) {
    const currentTitle = card.querySelector(".card-title").textContent;
    const currentBody = card.querySelector(".card-text").textContent;
    const newTitle = prompt("Edit title:", currentTitle);
    const newBody = prompt("Edit description:", currentBody);

    if (newTitle && newBody) {
      db.collection("tasks")
        .doc(id)
        .update({ title: newTitle.trim(), body: newBody.trim() })
        .then(fetchTasks)
        .catch((err) => alert("Failed to update task: " + err.message));
    }
  }
});
