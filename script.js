// ====== Loading Screen ======
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 1500);
  }
});

// ====== Mobile nav toggle ======
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('show');
  });

  // Close mobile menu when clicking on a link
  const navLinkElements = navLinks.querySelectorAll('.nav-link');
  navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('show');
    });
  });
}

// ====== Header scroll effect ======
const header = document.getElementById('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (header) {
    if (currentScrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  lastScrollY = currentScrollY;
});

// ====== Active navigation link ======
const sections = document.querySelectorAll('section[id]');
const navLinkElements = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// ====== Back to top button ======
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ====== Footer year ======
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ====== Typewriter effect ======
(function typewriter(){
  const el = document.querySelector('.typewriter .tw-text');
  const wrapper = document.querySelector('.typewriter');
  if (!el || !wrapper) return;
  let words = [];
  try {
    words = JSON.parse(wrapper.getAttribute('data-words'));
  } catch(_) { words = ["Builder"]; }

  let i=0, j=0, removing=false, pause=0;
  function tick(){
    const word = words[i % words.length];
    if (!removing){
      el.textContent = word.slice(0, j++);
      if (j > word.length){ removing = true; pause = 1200; }
    } else {
      el.textContent = word.slice(0, j--);
      if (j === 0){ removing = false; i++; pause = 300; }
    }
    setTimeout(tick, pause || (removing ? 40 : 70));
    pause = 0;
  }
  tick();
})();

// ====== Animated counter for stats ======
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// ====== Intersection Observer for animations ======
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      
      // Animate counters when stats section is visible
      if (entry.target.classList.contains('stat-num')) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
      }
      
      // Animate skill bars when skills section is visible
      if (entry.target.classList.contains('skill-progress')) {
        const width = entry.target.getAttribute('data-width');
        setTimeout(() => {
          entry.target.style.width = width + '%';
        }, 200);
      }
    }
  });
}, observerOptions);

// ====== Observe elements for animation ======
document.addEventListener('DOMContentLoaded', () => {
  // Observe stat numbers
  const statNums = document.querySelectorAll('.stat-num');
  statNums.forEach(num => observer.observe(num));
  
  // Observe skill progress bars
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => observer.observe(bar));
  
  // Observe project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => observer.observe(card));
  
  // Observe timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => observer.observe(item));
});

// ====== Projects data & render ======
const projects = [
  {
    title: "Breast Cancer Diagnosis Predictor",
    blurb: "Designed an interactive Streamlit web app in Python for breast cancer prediction, achieving over 98% accuracy using Scikit-learn for data preprocessing with NumPy and Pandas, and deployed with scaler objects for reliability.",
    tags: ["Python", "Scikit-learn", "NumPy", "Pandas", "Streamlit"],
    category: "ai",
    links: { repo: "https://github.com/aneeshbukya/Breast-Cancer-Diagnosis-Predictor"}
  },
  {
    title: "RepIt — Personal AI Trainer",
    blurb: "Spearheaded the development of an AI-powered fitness trainer using computer vision technology, providing real-time workout form feedback and achieving a 90% accuracy rate in tracking and counting repetitions.",
    tags: ["Angular", "TypeScript", "HTML/CSS", "ML5.js"],
    category: "ai",
    links: { repo: "https://github.com/aneeshbukya/RepIt" }
  },
  {
    title: "EmpowerHR:AI‑Powered HR Solutions",
    blurb: "Django web app with agentic AI to summarize candidate notes, answer FAQs, and onboard employees.",
    tags: ["Django", "LLMs", "OpenAI", "PostgreSQL"],
    category: "ai",
    links: { repo: "https://github.com/aneeshbukya/EmpowerHR--AI-Powered-HR-Agents" }
  },
  {
    title: "Twitter Sentiment → Markets",
    blurb: "Analyzed sentiment impact on stock trends; built ETL + dashboards for insights.",
    tags: ["Python", "NLP", "Dashboards"],
    category: "ai",
    links: { repo: "https://github.com/aneeshbukya/Twitter-Sentiment-Investing-Strategy" }
  },
  {
    title: "Language Classifier (EN vs NL)",
    blurb: "DTL + AdaBoost on sentence fragments; feature engineering + cross‑val.",
    tags: ["ML", "AdaBoost", "DTL"],
    category: "ai",
    links: { repo: "https://github.com/aneeshbukya/Multilingual-Language-Classifier" }
  },
  {
    title: "Pantry Tracker",
    blurb: "A pantry tracker web app built with Next.js and Firebase, using React for the frontend and Firebase for the backend.",
    tags: ["Next.js", "Firebase", "React"],
    category: "web",
    links: { repo: "https://github.com/aneeshbukya/Pantry-Tracker" }
  }
];

function renderProjects(filter = 'all'){
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  
  grid.innerHTML = filteredProjects.map(p => `
    <article class="project-card" data-category="${p.category}">
      <h3>${p.title}</h3>
      <p>${p.blurb}</p>
      <div class="project-tags">
        ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join("")}
      </div>
      <div class="project-links">
        ${p.links.repo ? `<a href="${p.links.repo}" target="_blank" rel="noreferrer" class="project-link">GitHub →</a>` : ""}
      </div>
    </article>
  `).join("");
}

// ====== Project filter functionality ======
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Filter projects
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
  
  // Initial render
  renderProjects();
});

// ====== Contact form handling ======
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };
      
      // Simple validation
      if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Create mailto link
      const mailtoLink = `mailto:aneeshbsri@outlook.com?subject=${encodeURIComponent(data.subject || 'Contact from Portfolio')}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Reset form
      contactForm.reset();
      
      // Show success message
      alert('Thank you for your message! Your email client should open now.');
    });
  }
});

// ====== Smooth scrolling for anchor links ======
document.addEventListener('DOMContentLoaded', () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// ====== Parallax effect for floating shapes ======
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll('.shape');
  
  shapes.forEach((shape, index) => {
    const speed = 0.5 + (index * 0.1);
    const yPos = -(scrolled * speed);
    shape.style.transform = `translateY(${yPos}px)`;
  });
});
