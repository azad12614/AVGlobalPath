// --------------------------------------------------------------------------
// --- DOM Element Selection ---
// --------------------------------------------------------------------------
const topButton = document.getElementById("go-to-top");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.getElementById("contactForm");
const header = document.querySelector("header");

// Breakpoint constant to match the CSS media query
const MOBILE_BREAKPOINT = 900;

// --------------------------------------------------------------------------
// --- Mobile Menu Toggle Handler ---
// --------------------------------------------------------------------------

/**
 * Toggles the 'open' class on the navigation links and updates the
 * menu icon (Hamburger <-> X).
 */
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const icon = menuToggle.querySelector("i");
  if (navLinks.classList.contains("open")) {
    // Menu is open, change icon to 'X' (fa-times)
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    // Menu is closed, change icon back to Hamburger (fa-bars)
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

/**
 * Fixes the issue where the sidebar remains open after a link is clicked.
 * It removes the 'open' class and resets the icon.
 */
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    // Only close the menu if we are in mobile view (<= 900px)
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      navLinks.classList.remove("open");

      // Reset the icon back to the hamburger
      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    }
  });
});

// --------------------------------------------------------------------------
// --- Scroll Effects (Header and Go-To-Top Button) ---
// --------------------------------------------------------------------------

window.onscroll = function () {
  const scrollPosition =
    document.body.scrollTop || document.documentElement.scrollTop;

  // 1. Header Scroll Effect: Add 'scrolled' class for background change
  if (scrollPosition > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // 2. Go-To-Top Button Visibility
  if (scrollPosition > 200) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
};

topButton.addEventListener("click", function () {
  // Smooth scroll to the top of the page
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// --------------------------------------------------------------------------
// --- Contact Form Submission Simulation ---
// --------------------------------------------------------------------------
const formMessage = document.getElementById("form-message");

function displayFormMessage(message, isSuccess = true) {
  formMessage.textContent = message;
  formMessage.classList.remove("success", "error");
  formMessage.classList.add(isSuccess ? "success" : "error");

  // Automatically hide the message after 5 seconds
  setTimeout(() => {
    formMessage.classList.remove("success", "error");
    formMessage.textContent = "";
  }, 5000);
}

function handleContactFormSubmit(event) {
  event.preventDefault(); // Stop default form submission

  // In a real application, you would send this data to a server here.
  // We simulate a successful send after a small delay.

  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  // Simulate a network request
  setTimeout(() => {
    // Show success message
    displayFormMessage(
      "Thank you! Your message has been sent successfully. We will respond shortly.",
      true
    );

    // Clear the form fields
    form.reset();

    // Re-enable button
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
  }, 1500); // 1.5 second delay to simulate sending
}

if (contactForm) {
  contactForm.addEventListener("submit", handleContactFormSubmit);
}
