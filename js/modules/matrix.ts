export const matrixData = [
  {
    id: "depression",
    label: "Depression & Low Mood",
    immediate: { cost: 150, time: "2 Hours", desc: "Basic consultation or therapy session." },
    projected: { cost: 4500, time: "6 Months", desc: "Lost productivity, intensive interventions." }
  },
  {
    id: "anxiety",
    label: "Severe Anxiety & Stress",
    immediate: { cost: 120, time: "1.5 Hours", desc: "Initial assessment and coping strategy session." },
    projected: { cost: 3200, time: "3 Months", desc: "Missed work, physical health impacts (ER visits)." }
  },
  {
    id: "burnout",
    label: "Burnout & Chronic Fatigue",
    immediate: { cost: 200, time: "3 Hours", desc: "Full health screening & coaching." },
    projected: { cost: 8000, time: "1 Year", desc: "Sabbatical needed, career stagnation, recovery." }
  },
  {
    id: "pain",
    label: "Unexplained Physical Pain",
    immediate: { cost: 250, time: "2 Hours", desc: "Specialist visit & basic imaging." },
    projected: { cost: 6500, time: "4 Months", desc: "Chronic condition management, physical therapy." }
  }
];

export const matrixController = {
  state: {
    selectedConcernId: null as string | null,
    sliderValue: 0 // 0 to 100
  },

  init() {
    const trigger = document.getElementById('matrix-trigger-card');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.openMatrix();
    });
  },

  openMatrix() {
    this.state.selectedConcernId = null;
    this.state.sliderValue = 0;

    let modal = document.getElementById('decision-matrix-modal');
    if (!modal) {
      this.injectModalMarkup();
      modal = document.getElementById('decision-matrix-modal')!;
    }

    document.body.style.overflow = 'hidden';
    modal.classList.add('is-active');
    
    if ((window as any).lenis) {
      (window as any).lenis.stop();
    }

    this.bindEvents();
    this.renderInputPhase();
  },

  closeMatrix() {
    const modal = document.getElementById('decision-matrix-modal');
    if (modal) {
      modal.classList.remove('is-active');
    }
    document.body.style.overflow = '';
    
    if ((window as any).lenis) {
      (window as any).lenis.start();
    }
  },

  injectModalMarkup() {
    const modalHtml = `
      <div id="decision-matrix-modal" class="wellbeing-quiz-overlay" role="dialog" aria-modal="true">
        <div class="wellbeing-quiz-container matrix-container">
          <button class="quiz-close-btn matrix-close-btn" aria-label="Close Matrix">&times;</button>
          
          <div class="quiz-modal-header matrix-header">
            <span class="quiz-category-tag" id="matrix-header-tag">Decision Matrix</span>
          </div>

          <div class="quiz-content-scrollable" data-lenis-prevent>
            <div id="matrix-viewport" class="quiz-viewport">
            </div>
          </div>
        </div>
      </div>
    `;

    const featuresSection = document.querySelector('.features-section');
    if (featuresSection) {
      featuresSection.insertAdjacentHTML('beforeend', modalHtml);
    } else {
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
  },

  bindEvents() {
    const modal = document.getElementById('decision-matrix-modal')!;
    const closeBtn = modal.querySelector('.matrix-close-btn')!;
    
    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode!.replaceChild(newCloseBtn, closeBtn);

    document.getElementById('decision-matrix-modal')!.querySelector('.matrix-close-btn')!.addEventListener('click', () => this.closeMatrix());
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeMatrix();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        this.closeMatrix();
      }
    });
  },

  renderInputPhase() {
    const viewport = document.getElementById('matrix-viewport')!;
    
    let optionsHtml = '';
    matrixData.forEach(item => {
      optionsHtml += `
        <button class="matrix-option-btn" data-id="${item.id}">
          <span class="matrix-option-label">${item.label}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      `;
    });

    viewport.innerHTML = `
      <div class="matrix-input-phase fade-in-content">
        <h3 class="quiz-question-title">What is your primary concern right now?</h3>
        <p class="sg-text-body-mini" style="opacity:0.6; margin-bottom: 2em;">Select the area that resonates most to see the trade-off of acting today vs. delaying.</p>
        <div class="matrix-options-grid">
          ${optionsHtml}
        </div>
      </div>
    `;

    const btns = viewport.querySelectorAll('.matrix-option-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        this.state.selectedConcernId = target.getAttribute('data-id');
        this.renderDashboardPhase();
      });
    });
  },

  renderDashboardPhase() {
    const data = matrixData.find(d => d.id === this.state.selectedConcernId);
    if (!data) return;

    const viewport = document.getElementById('matrix-viewport')!;
    
    viewport.innerHTML = `
      <div class="matrix-dashboard-phase fade-in-content">
        <div class="matrix-dashboard-header">
          <button id="matrix-back-btn" class="matrix-back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </button>
          <h3 class="sg-text-body-large">${data.label}</h3>
        </div>

        <div class="matrix-slider-section">
          <div class="matrix-slider-labels">
            <span class="label-immediate">Acting Today</span>
            <span class="label-projected">Ignoring for 1 Year</span>
          </div>
          <input type="range" id="matrix-time-slider" min="0" max="100" value="0" class="matrix-range-input">
        </div>

        <div class="matrix-comparison-cards">
          <!-- Immediate Card -->
          <div class="matrix-card immediate-card">
            <div class="matrix-card-title">Immediate Cost (Now)</div>
            <div class="matrix-stat-val">$${data.immediate.cost}</div>
            <div class="matrix-stat-time">⏳ ${data.immediate.time} spent</div>
            <p class="matrix-card-desc">${data.immediate.desc}</p>
          </div>
          
          <!-- Dynamic Projected Card -->
          <div class="matrix-card projected-card">
            <div class="matrix-card-title">Projected Cost (Later)</div>
            <div class="matrix-stat-val" id="matrix-dyn-cost">$${data.immediate.cost}</div>
            <div class="matrix-stat-time" id="matrix-dyn-time">⏳ ${data.immediate.time} spent</div>
            <p class="matrix-card-desc" id="matrix-dyn-desc">If addressed early...</p>
          </div>
        </div>

        <div class="matrix-buffer-section">
          <div class="matrix-buffer-header">
            <span class="sg-text-body-mini">Resources Saved (The Buffer)</span>
            <span class="sg-text-body-mini" id="matrix-buffer-val">100%</span>
          </div>
          <div class="quiz-progress-track">
            <div id="matrix-buffer-fill" class="quiz-progress-fill buffer-fill" style="width: 100%;"></div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('matrix-back-btn')!.addEventListener('click', () => {
      this.renderInputPhase();
    });

    const slider = document.getElementById('matrix-time-slider') as HTMLInputElement;
    const dynCost = document.getElementById('matrix-dyn-cost')!;
    const dynTime = document.getElementById('matrix-dyn-time')!;
    const dynDesc = document.getElementById('matrix-dyn-desc')!;
    const bufferFill = document.getElementById('matrix-buffer-fill')!;
    const bufferVal = document.getElementById('matrix-buffer-val')!;

    const updateDashboard = (val: number) => {
      const ratio = val / 100;
      
      const currentCost = data.immediate.cost + ratio * (data.projected.cost - data.immediate.cost);
      dynCost.textContent = `$${Math.round(currentCost).toLocaleString()}`;
      
      if (ratio < 0.1) {
        dynTime.textContent = `⏳ ${data.immediate.time} spent`;
        dynDesc.textContent = data.immediate.desc;
      } else if (ratio > 0.9) {
        dynTime.textContent = `⏳ ${data.projected.time} lost`;
        dynDesc.textContent = data.projected.desc;
      } else {
        dynTime.textContent = `⏳ Compounding...`;
        dynDesc.textContent = `Risks and costs are actively multiplying.`;
      }

      const bufferPercent = 100 - val;
      bufferFill.style.width = `${bufferPercent}%`;
      bufferVal.textContent = `${Math.round(bufferPercent)}%`;

      if (bufferPercent < 30) {
        bufferFill.style.backgroundColor = 'var(--dark)'; 
      } else {
        bufferFill.style.backgroundColor = 'var(--dark-grey)';
      }
    };

    slider.addEventListener('input', (e) => {
      const val = parseInt((e.target as HTMLInputElement).value, 10);
      updateDashboard(val);
    });

    updateDashboard(0);
  }
};
