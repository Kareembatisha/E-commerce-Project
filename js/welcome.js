// Array of cover image URLs
const imageUrls = [
  './img/w1.jpg',
  './img/w2.jpg',
  './img/w3.jpg',
];

let currentIndex = 0;
const coverContainer = document.getElementById('banner');

// Function to change the background image
function changeImage() {
  coverContainer.style.backgroundImage = `url('${imageUrls[currentIndex]}')`;
  currentIndex = (currentIndex + 1) % imageUrls.length;
}

// Set interval to change the background image every 3 seconds (3000 milliseconds)
setInterval(changeImage, 3000); 
    

     
      function goToSignUpPage() {
        var url = "signup.html";
        window.location.href = url;
      }

      function goToLoginPage() {
        var url = "login.html";
        window.location.href = url;
      }
    