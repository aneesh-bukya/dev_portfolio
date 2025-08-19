// ====== Mobile nav toggle ======
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => navLinks.classList.toggle('show'));
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

// ====== Projects data & render ======
const projects = [
  {
    title: "AI‑Powered HR Solutions",
    blurb: "Django web app with agentic AI to summarize candidate notes, answer FAQs, and onboard employees.",
    tags: ["Django", "LLMs", "OpenAI", "PostgreSQL"],
    links: { repo: "https://github.com/aneeshbukya", demo: "" }
  },
  {
    title: "RepIt — Personal AI Trainer",
    blurb: "Computer vision coach that tracks reps and flags form using OpenCV; supports curls, push‑ups, squats.",
    tags: ["Python", "OpenCV", "NumPy"],
    links: { repo: "https://github.com/aneeshbukya", demo: "" }
  },
  {
    title: "Breast Cancer Diagnosis Predictor",
    blurb: "ML classifier to assist diagnosis; clean UI and explainable metrics for clinicians.",
    tags: ["scikit‑learn", "Python", "Streamlit"],
    links: { repo: "https://github.com/aneeshbukya", demo: "" }
  },
  {
    title: "Twitter Sentiment → Markets",
    blurb: "Analyzed sentiment impact on stock trends; built ETL + dashboards for insights.",
    tags: ["Python", "NLP", "Dashboards"],
    links: { repo: "https://github.com/aneeshbukya", demo: "" }
  },
  {
    title: "Language Classifier (EN vs NL)",
    blurb: "DTL + AdaBoost on sentence fragments; feature engineering + cross‑val.",
    tags: ["ML", "AdaBoost", "DTL"],
    links: { repo: "https://github.com/aneeshbukya", demo: "" }
  },
  {
    title: "Config Tool UI (NiceGUI)",
    blurb: "Migrated legacy CLI to a modern web app for MSA Safety; faster workflows & better UX.",
    tags: ["Python", "NiceGUI", "UX"],
    links: { repo: "https://github.com/aneeshbukya", demo: "" }
  }
];

function renderProjects(){
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = projects.map(p => `
    <article class="card">
      <h3>${p.title}</h3>
      <p>${p.blurb}</p>
      <div class="tags">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <div class="card-links">
        ${p.links.repo ? `<a href="${p.links.repo}" target="_blank" rel="noreferrer">GitHub →</a>` : ""}
        ${p.links.demo ? `<a href="${p.links.demo}" target="_blank" rel="noreferrer">Demo →</a>` : ""}
      </div>
    </article>
  `).join("");
}
renderProjects();
