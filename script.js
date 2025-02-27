// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const navButtons = document.querySelectorAll('button[data-section]');
const contactForm = document.getElementById('contact-form');
const currentYearElement = document.getElementById('current-year');

// Set current year in footer
currentYearElement.textContent = new Date().getFullYear();

// Toggle mobile menu
mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  mobileNav.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

// Smooth scroll to sections
navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const sectionId = button.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    
    if (section) {
      // Close mobile menu if open
      mobileMenuBtn.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.classList.remove('no-scroll');
      
      // Scroll to section
      const headerHeight = document.querySelector('header').offsetHeight;
      const sectionTop = section.offsetTop - headerHeight;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  });
});

// Handle contact form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Here you would typically send the form data to a server
    // For this example, we'll just log it and show a success message
    console.log({ name, email, subject, message });
    
    // Reset form
    contactForm.reset();
    
    // Show success message
    alert('Message sent successfully!');
  });
}

// Active section highlighting on scroll
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  
  // Get all sections
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remove active class from all nav buttons
      navButtons.forEach(button => {
        button.classList.remove('active');
      });
      
      // Add active class to corresponding nav buttons
      document.querySelectorAll(`button[data-section="${sectionId}"]`).forEach(button => {
        button.classList.add('active');
      });
    }
  });
});

// Add animation to skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkillBars = () => {
  skillBars.forEach(bar => {
    const barPosition = bar.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (barPosition < screenPosition) {
      bar.style.width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
    }
  });
};

// Initial check for elements in view
window.addEventListener('DOMContentLoaded', () => {
  animateSkillBars();
});

// Check for elements in view on scroll
window.addEventListener('scroll', () => {
  animateSkillBars();
});