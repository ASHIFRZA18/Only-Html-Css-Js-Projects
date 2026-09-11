const html = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');


const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

// Whenever the toggle button is clicked...
toggleBtn.addEventListener('click', () => {
    // ...check what the CURRENT theme is right now...
    const isDark = html.getAttribute('data-theme') === 'dark';

    // ...flip it to the opposite...
    const newTheme = isDark ? 'light' : 'dark';

    // ...apply it to the page (this is what the CSS is watching for)...
    html.setAttribute('data-theme', newTheme);

    // ...and save the choice so it's remembered on the next visit.
    localStorage.setItem('theme', newTheme);
});


// ============================================
// MOBILE MENU TOGGLE
// ============================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close the menu automatically whenever any nav link is clicked
// (otherwise it stays open after the page scrolls to that section).
const allNavLinks = document.querySelectorAll('.nav-links a');

allNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});


// ============================================
// ACTIVE NAV-LINK HIGHLIGHT ON SCROLL
// ============================================
// Grab every <section> that has an id (home, about, projects, contact)
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');

            // Remove "active-link" from every nav link first...
            allNavLinks.forEach((link) => {
                link.classList.remove('active-link');
            });

            // ...then add it back only to the link matching the
            // section currently in view.
            const matchingLink = document.querySelector(
                `.nav-links a[href="#${currentId}"]`
            );
            if (matchingLink) {
                matchingLink.classList.add('active-link');
            }
        }
    });
}, {
    threshold: 0.4
});

sections.forEach((section) => {
    sectionObserver.observe(section);
});


// ============================================
// CONTACT FORM FEEDBACK
// ============================================
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const existingMessage = contactForm.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Build a new message element from scratch.
    const message = document.createElement('p');
    message.className = 'form-message';
    message.textContent = "Thanks! Your message has been noted — I'll get back to you soon.";

    // Insert it into the page, right before the submit button.
    const submitBtn = contactForm.querySelector('.btn-primary');
    contactForm.insertBefore(message, submitBtn);

    // Clear all the input/textarea fields for a clean slate.
    contactForm.reset();

    // Automatically remove the message after 5 seconds.
    setTimeout(() => {
        message.remove();
    }, 5000);
});
