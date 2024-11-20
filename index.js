function openImage(imageSrc) {
  window.open(imageSrc, '_blank');
}
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('show'); // Toggles the 'show' class to display/hide the menu
}


document.addEventListener("DOMContentLoaded", () => {
  // IntersectionObserver for animations
  const observerOptions = { threshold: 0.2 };

  const animateOnScroll = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animationClass = `animate-${entry.target.dataset.animate}`;
        entry.target.classList.add(animationClass);
        observer.unobserve(entry.target); // Stop observing after animation triggers
      }
    });
  };

  const observer = new IntersectionObserver(animateOnScroll, observerOptions);
  document.querySelectorAll("[data-animate]").forEach((element) => observer.observe(element));

  // Services Section Animation
  const serviceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          entry.target.style.transition = "transform 1s ease, opacity 1s ease";
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".services-list div").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    serviceObserver.observe(card);
  });

  // Certifications Section and Rainfall Effect
  const certificationsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll(".certification-card");
          cards.forEach((card, index) => {
            card.classList.add("animate-card");
            card.style.animationDelay = `${index * 0.3}s`; // Staggered animation
          });

          document.getElementById("rain").classList.add("rain-active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const certificationsSection = document.getElementById("certifications");
  certificationsObserver.observe(certificationsSection);

  // Create Rainfall Effect
  const createRaindrops = () => {
    const rainContainer = document.getElementById("rain");
    for (let i = 0; i < 100; i++) {
      const element = document.createElement("div");
      element.classList.add(Math.random() > 0.5 ? "star" : "flower");
      element.style.left = `${Math.random() * window.innerWidth}px`;
      element.style.animationDelay = `-${Math.random() * 5}s`;
      rainContainer.appendChild(element);
    }
  };

  createRaindrops();

  // Work Items Animation
  const workObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".work").forEach((item) => workObserver.observe(item));

  // Contact Form Popup Message
  document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const popup = document.getElementById("popup-message");
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 3000);

    this.reset();
  });
});

// Tab Functionality
const tablinks = document.getElementsByClassName("tab-link");
const tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  Array.from(tablinks).forEach((tablink) => tablink.classList.remove("active-link"));
  Array.from(tabcontents).forEach((tabcontent) => tabcontent.classList.remove("active-tab"));

  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// Side Menu Functionality
const sidemenu = document.getElementById("sidemenu");

function openmenu() {
  sidemenu.style.right = "0";
}

function closemenu() {
  sidemenu.style.right = "-200px";
}

// Form Submission to Google Sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbyC3QhiN7DuG-VTUaiUkc5rQz9topOa_wPo49XNjCTLtAocJVdeyKZ60mIIv-da3_gH/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', (e) => {
  e.preventDefault();

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(() => {
      msg.innerHTML = "Message sent successfully";
      setTimeout(() => (msg.innerHTML = ""), 5000);
      form.reset();
    })
    .catch((error) => console.error('Error!', error.message));
});

  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");

  let particles = [];
  const particleCount = 50;
  const particleColor = "rgba(255, 0, 79, 0.7)";
  const maxParticleSize = 5;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * maxParticleSize + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Keep particles within bounds
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(
        new Particle(Math.random() * canvas.width, Math.random() * canvas.height)
      );
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  // Responsive canvas
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });

  // Initialize and animate
  initParticles();
  animateParticles();
  canvas.addEventListener("mousemove", (e) => {
    particles.forEach((particle) => {
      const dx = particle.x - e.clientX;
      const dy = particle.y - e.clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 100;
  
      if (distance < maxDistance) {
        particle.x += dx / 10;
        particle.y += dy / 10;
      }
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const rainContainer = document.getElementById("rain");
  
    // Function to generate burst effect
    function generateBurst() {
      // Create a new star or flower element
      const element = document.createElement("div");
      if (Math.random() > 0.5) {
        element.classList.add("star");
      } else {
        element.classList.add("flower");
      }
  
      // Randomly decide if the burst will come from the left or right
      const side = Math.random() > 0.5 ? "left" : "right"; // Either left or right side
      const xPosition = Math.random() * 100; // Random position along the X-axis
      const yPosition = Math.random() * 50;  // Random vertical distance
  
      // Set custom properties for burst direction
      element.style.setProperty('--x', side === 'left' ? `${xPosition}%` : `-${xPosition}%`);
      element.style.setProperty('--y', `${yPosition}px`);
  
      // Position the element at the top of the screen, left or right
      element.style[side] = `${Math.random() * 50}%`; // Random horizontal position on left or right side
  
      // Append the element to the container
      rainContainer.appendChild(element);
  
      // Remove the element after animation completes to avoid memory leaks
      setTimeout(() => {
        rainContainer.removeChild(element);
      }, 2000); // Matches the duration of the burst animation (2 seconds)
    }
  
    // Generate bursts every 250ms (this can be adjusted for speed)
    setInterval(generateBurst, 250);
  });
  
  
  