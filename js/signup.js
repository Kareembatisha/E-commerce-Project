let userName = document.getElementById("userName");
let userPassword = document.getElementById("password");
let useremail = document.getElementById("email");
let signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    userName.value === "" ||
    useremail.value === "" ||
    userPassword.value === ""
  ) {
    alert("Please fill in all the required fields.");
  } else {
    // Check if the user already exists
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some((user) => user.username === userName.value);

    if (!userExists) {
      // Add the new user
      existingUsers.push({
        username: userName.value,
        password: userPassword.value,
        email: useremail.value,
      });
      localStorage.setItem("users", JSON.stringify(existingUsers));
      alert("Sign up successful! You can now sign in.");
    } else {
      alert("Username already exists. Please choose a different one.");
    }

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  }
});

