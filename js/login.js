// Get the login button element by its ID
var logInBtn = document.getElementById("login");

// Add a click event listener to the login button
logInBtn.addEventListener("click", (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Get the values of the username and password from the input fields
  let UserName = document.getElementById("UserName").value;
  let UserPass = document.getElementById("UserPass").value;

  // Retrieve user data from local storage
  let userdata = JSON.parse(localStorage.getItem("users"));

  // Check if either the username or password is empty
  if (UserName == "" || UserPass == "") {
    // Display an alert if data is missing
    alert("Please fill in both username and password.");
  } else {
    // Check if the user is an admin
    if (userdata.some((v) => v.username === "admin" && UserName === "admin")) {
      // Set the adminName in local storage
      localStorage.setItem("adminName", "Admin");

      // Redirect to the admin page after a delay
      setTimeout(() => {
        window.location.href = "admin page.html";
      }, 1500);
    } else {
      // Check if the entered username and password match any user in the data
      if (userdata.some((v) => v.username === UserName && v.password === UserPass)) {
        // Set the clientName in local storage
        localStorage.setItem("clientName", UserName);

        // Redirect to the home page after a delay
        setTimeout(() => {
          window.location.href = "Home.html";
        }, 1500);
      } else {
        // Display an alert if the username or password is incorrect
        alert("Wrong username or password.");
      }
    }
  }
});
