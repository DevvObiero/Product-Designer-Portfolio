// Select the nav items and the indicator span
const navItems = document.querySelectorAll("nav ul li");
const indicator = document.querySelector("nav span");

// Function to set the indicator position
function setIndicatorPosition(item) {
  const itemLeft =
    item.offsetLeft + item.offsetWidth / 2 - indicator.offsetWidth / 2;
  indicator.style.left = `${itemLeft}px`;
}

// Add click event listeners to each nav item
navItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Save the index of the clicked item to localStorage
    localStorage.setItem("activeNavIndex", index);

    // Move the indicator and update the active class
    setIndicatorPosition(item);
    navItems.forEach((li) => li.classList.remove("active"));
    item.classList.add("active");
  });
});

// Initialize the indicator position on page load
function initializeNav() {
  const savedIndex = localStorage.getItem("activeNavIndex");
  const initialIndex = savedIndex !== null ? parseInt(savedIndex) : 0;
  const initialItem = navItems[initialIndex];

  // Set the indicator and active class based on saved state
  setIndicatorPosition(initialItem);
  initialItem.classList.add("active");
}

// Run the initialization function on page load
initializeNav();

// nav scroll
document.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 400) {
    nav.classList.add("scrolled"); // Add class when scrolled more than 100px
  } else {
    nav.classList.remove("scrolled"); // Remove class when back to the top
  }
});

// svg rotation on scroll
window.addEventListener("scroll", function () {
  const svg = document.querySelector(".coolness svg");
  // Get the scroll position as a percentage of the page height
  const scrollY = window.scrollY;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  // Calculate the rotation degree based on scroll
  const rotationDegree = (scrollY / scrollHeight) * 720; // Max rotation is 360 degrees
  svg.style.transform = `rotate(${rotationDegree}deg)`; // Apply the rotation
});

// svg
// Get the SVG path element
const path = document.querySelector(".cls-1");

// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
}

// Event listener for scrolling
window.addEventListener("scroll", () => {
  if (isInViewport(path)) {
    // Trigger animation when the SVG is in the viewport
    path.style.strokeDashoffset = "0";
  }
});

// profile page
const texts = [
  "PAUL OBIERO",
  "A WEB DEVELOPER",
  "A STUDENT",
  "A TECH ENTHUSIAST"
];

let currentIndex = 0;

function changeText() {
  const dynamicText = document.getElementById("dynamicText");

  currentIndex = (currentIndex + 1) % texts.length; // Cycle through array
  dynamicText.textContent = texts[currentIndex];
}

setInterval(changeText, 2000);

// dark mode
const toggleButton = document.getElementById("toggle-theme");
const body = document.body;
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");

// Check if the user prefers dark mode from localStorage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  moonIcon.style.display = "block";
  sunIcon.style.display = "none";
}

// Toggle the theme and icons
toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    moonIcon.style.display = "block";
    sunIcon.style.display = "none";
    localStorage.setItem("theme", "dark");
  } else {
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
    localStorage.setItem("theme", "light");
  }
});

// Hide the button on scroll down, show it on scroll up
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    // Scrolling down
    toggleButton.style.display = "none";
  } else {
    // Scrolling up
    toggleButton.style.display = "block";
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative values
});
