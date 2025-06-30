// mobile menubar
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// ScrollSpy: Highlight nav links based on scroll position
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a, .desktop-nav a");

function activateLinkOnScroll() {
  let scrollY = window.scrollY;

  sections.forEach((section) => {
    const offsetTop = section.offsetTop - 120;
    const offsetBottom = offsetTop + section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= offsetTop && scrollY < offsetBottom) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${sectionId}`
        );
      });
    }
  });
}

// On scroll: update active link
window.addEventListener("scroll", activateLinkOnScroll);

// On click: highlight instantly + close mobile nav
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    document.querySelector(".navbar").classList.remove("active"); // close menu
  });
});

// Form Validation
const form = document.querySelector(".signup-form");
const nameInput = form.querySelector('input[name="name"]');
const emailInput = form.querySelector('input[name="email"]');
const checkbox = form.querySelector(".terms-checkbox");

const nameError = form.querySelector(".name-error");
const emailError = form.querySelector(".email-error");
const checkboxError = form.querySelector(".checkbox-error");
const successMessage = form.querySelector(".success-message");

const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Stop form from submitting
  let isValid = true;

  nameError.textContent = "";
  emailError.textContent = "";
  checkboxError.textContent = "";
  successMessage.textContent = "";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const isChecked = checkbox.checked;

  if (name === "") {
    nameError.textContent = "Please enter your name.";
    isValid = false;
  }

  if (email === "") {
    emailError.textContent = "Email is required.";
    isValid = false;
  } else if (!emailPattern.test(email)) {
    emailError.textContent = "Enter a valid email address.";
    isValid = false;
  }

  if (!isChecked) {
    checkboxError.textContent = "You must agree to the terms.";
    isValid = false;
  }

  if (isValid) {
    successMessage.style.color = "green";
    successMessage.textContent = "You’ve been successfully signed up!";
    form.reset();
    setTimeout(() => {
      successMessage.textContent = "";
    }, 3000);
  }
});
