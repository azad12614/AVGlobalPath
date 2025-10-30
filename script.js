const topButton = document.getElementById("go-to-top");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.getElementById("contactForm");
const header = document.querySelector("header");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove("open");
    }
  });
});

window.onscroll = function () {
  const scrollPosition =
    document.body.scrollTop || document.documentElement.scrollTop;

  if (scrollPosition > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (scrollPosition > 200) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
};

topButton.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log(
    "Inquiry submitted successfully! This is a simulation, ready for back-end integration."
  );

  const formContainer = document.querySelector(".contact-form-container");
  const successMessage = document.createElement("p");
  successMessage.textContent = "Inquiry sent! We will contact you soon.";
  successMessage.style.color = "var(--primary-color)";
  successMessage.style.fontWeight = "bold";
  formContainer.appendChild(successMessage);

  setTimeout(() => {
    contactForm.reset();
    formContainer.removeChild(successMessage);
  }, 3000);
});
