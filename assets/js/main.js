"use strict";
/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== CHANGE COLOURS ====================*/
const changeColor = document.getElementById("button-color");
if (changeColor) {
  changeColor.addEventListener("click", () => {
    document
      .querySelector(":root")
      .style.setProperty("--hue-color", Math.floor(Math.random() * 360));
  });
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Toggle by default
document.body.classList.toggle(darkTheme);
themeButton.classList.toggle(iconTheme);

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== SECTION TRANSITIONS ====================*/
function initSectionTransitions() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav__link');
  
  // Hide all sections except home
  sections.forEach(section => {
    if (section.id !== 'home') {
      section.style.display = 'none';
    } else {
      section.classList.add('active');
    }
  });

  // Add click event to each nav link
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        // Get target section id
        const targetId = link.getAttribute('href').substring(1);
        
        // Remove active class from all links
        navLinks.forEach(navLink => {
          navLink.classList.remove('active-link');
        });
        
        // Add active class to clicked link
        link.classList.add('active-link');
        
        // Hide all sections
        sections.forEach(section => {
          section.classList.remove('active');
          section.style.display = 'none';
        });
        
        // Show and add active class to target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          // First display the section
          targetSection.style.display = 'block';
          
          // Set scroll position to top of section
          window.scrollTo(0, 0);
          
          // Then add the active class for animation
          targetSection.classList.add('active');
        }
        
        // Close mobile menu
        navMenu.classList.remove('show-menu');
      }
    });
  });
}

/*==================== ADJUST MAIN MARGIN ====================*/
function adjustMainMargin() {
  const header = document.querySelector('.header');
  const main = document.querySelector('.main');
  
  if (header && main) {
    // Get the actual computed height of the header
    const headerHeight = header.offsetHeight;
    
    // Add a small buffer to account for the active line (2px)
    const adjustedHeaderHeight = headerHeight + 2;
    
    // Set the margin-top of main to exactly match the adjusted header height
    main.style.marginTop = `${adjustedHeaderHeight}px`;
    
    // Also update min-height calculation for the home section
    const homeSection = document.getElementById('home');
    const footer = document.querySelector('.footer');
    const footerHeight = footer ? footer.offsetHeight : 0;
    
    if (homeSection) {
      homeSection.style.minHeight = `calc(100vh - ${adjustedHeaderHeight}px - ${footerHeight}px)`;
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Clean up any section--hidden classes
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('section--hidden');
  });
  
  // Initialize section transitions
  initSectionTransitions();
  
  // Adjust main margin to match header height exactly
  adjustMainMargin();
  
  // Add event handlers for footer links
  const footerLinks = document.querySelectorAll('.footer__link');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      
      // Find the corresponding nav link and trigger a click on it
      const correspondingNavLink = document.querySelector(`.nav__link[href="#${targetId}"]`);
      if (correspondingNavLink) {
        correspondingNavLink.click();
      }
    });
  });
  
  // Initialize qualification tabs
  const qualificationSection = document.querySelector('.qualification');
  if (qualificationSection) {
    // Make sure qualification section is properly initialized even when hidden
    tabs.forEach(tab => {
      if (tab.classList.contains('qualification__active')) {
        const target = document.querySelector(tab.dataset.target);
        if (target) {
          target.classList.add('qualification__active');
        }
      }
    });
  }
});

// Re-adjust on window resize
window.addEventListener('resize', adjustMainMargin);

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)
        
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')
        
        tabs.forEach(tab => {
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== CONTACT FORM ====================*/
const contactForm = document.querySelector('.contact__form')

contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    // Get form data
    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', data)
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.')
    contactForm.reset()
})

// Fix for the home padding inconsistency bug
function fixHomeSection() {
  const homeSection = document.getElementById('home');
  if (homeSection) {
    // Always ensure home section has the correct padding
    homeSection.style.paddingTop = '0.5rem';
  }
}

// Call it initially and on every section change
fixHomeSection();

// Attach to window resize and navigation events
window.addEventListener('resize', fixHomeSection);

// Original section transition logic modified to maintain padding consistency
function handleSectionClick(e) {
  // Prevent default link behavior
  e.preventDefault();
  
  // Get the id from data-id attribute
  const targetSectionId = this.getAttribute('data-id');
  
  // Get the current active section and the target section
  const currentSection = document.querySelector('.section.active');
  const targetSection = document.getElementById(targetSectionId);
  
  // Skip if we're already on this section
  if (currentSection === targetSection) return;
  
  // Remove active class from current section and add to target
  if (currentSection) {
    currentSection.classList.remove('active');
  }
  
  // Show the target section
  if (targetSection) {
    targetSection.classList.add('active');
  }
  
  // Update active link in navigation
  document.querySelector('.nav__link.active-link').classList.remove('active-link');
  this.classList.add('active-link');
  
  // Close the menu (mobile)
  if (window.innerWidth < 768) {
    menuClose();
  }
  
  // Make sure home padding stays consistent
  fixHomeSection();
}

// Attach event listeners to all navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Get all nav links with data-id attributes
  const sectionLinks = document.querySelectorAll('.nav__link[data-id]');
  
  // Attach click event to each link
  sectionLinks.forEach(link => {
    link.addEventListener('click', handleSectionClick);
  });
  
  // Also attach to footer links
  const footerLinks = document.querySelectorAll('.footer__link[data-id]');
  footerLinks.forEach(link => {
    link.addEventListener('click', handleSectionClick);
  });
});
