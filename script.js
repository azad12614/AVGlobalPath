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

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Stop the form's default mailto action for a moment

      // 1. Get the values from the form inputs using the new 'name' attributes
      const name = contactForm.querySelector('[name="name"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      const subject = contactForm
        .querySelector('[name="subject"]')
        .value.trim();
      const message = contactForm
        .querySelector('[name="message"]')
        .value.trim();

      // Simple client-side validation check
      if (!name || !email || !subject || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      // 2. Define the recipient and build the mailto parameters
      const recipient = " ";

      // Construct the Subject line: Combine form subject with sender info
      const finalSubject = encodeURIComponent(
        `Inquiry: ${subject} (${name} - ${email})`
      );

      // Construct the Body: Format the message content neatly
      const finalBody = encodeURIComponent(
        "Name: " +
          name +
          "\n" +
          "Email: " +
          email +
          "\n\n" +
          "Subject: " +
          subject +
          "\n\n" +
          "Message:\n" +
          message
      );

      // 3. Create the final mailto link
      const mailtoLink = `mailto:${recipient}?subject=${finalSubject}&body=${finalBody}`;

      // 4. Redirect the user to the generated mailto link
      // This will open their default email client (Outlook, Gmail in a tab, etc.)
      window.location.href = mailtoLink;

      // Optional: Clear the form after a slight delay
      // This prevents the user from accidentally sending the same data again
      // if they quickly return to the page.
      setTimeout(() => {
        contactForm.reset();
      }, 100);
    });
  }
});
