
document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Signup successful! Please login now.");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});
