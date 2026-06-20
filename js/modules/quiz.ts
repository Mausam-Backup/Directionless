// Mental Well-being Screening Quiz Logic Engine
// Fully client-side, highly performant, zero external dependencies
// Aesthetic: Strict 2D Flat Monochrome (Black & White & Grey)

export interface ChoiceOption {
  value: number;
  label: string;
  details: string;
  cssClass: string;
  score: number;
}

export interface Question {
  id: number;
  category: string;
  categoryKey: 'mood' | 'anxiety' | 'focus' | 'stress' | 'sleep';
  type: 'visual-slider' | 'visual-choice' | 'speed-card';
  questionText: string;
  reverse?: boolean;
  visualMeta: {
    leftLabel?: string;
    rightLabel?: string;
    leftIcon?: string;
    rightIcon?: string;
    choices?: ChoiceOption[];
  };
}

// Inline helper for 2D flat monochromatic outline SVGs used in range sliders
function getVisualIconSvg(name: string): string {
  const strokeColor = "currentColor";
  switch (name) {
    case 'battery-empty':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="16" height="10" rx="1.5"/><line x1="22" y1="11" x2="22" y2="13"/></svg>`;
    case 'battery-full':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="16" height="10" rx="1.5"/><line x1="22" y1="11" x2="22" y2="13"/><path d="M6 12h8M10 9v6"/></svg>`;
    case 'spark':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1l2.1-2.1M17 7l2.1-2.1"/></svg>`;
    case 'void':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/></svg>`;
    case 'leaf':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22s4-12 10-14c4-1.3 8-4 8-4s-2.7 4-4 8c-2 6-14 10-14 10zM12 8l4 4"/></svg>`;
    case 'explosion':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2 4 5 1-4 4 1 5-4-3-4 3 1-5-4-4 5-1 2-4z"/></svg>`;
    case 'eye':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>`;
    case 'mirror':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 21a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><path d="M12 2v2M4.9 4.9l1.4 1.4M19.1 4.9l-1.4 1.4"/></svg>`;
    case 'gear':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4A1.65 1.65 0 0 0 7.18 19.7l-.06.06A2 2 0 1 1 4.3 17l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7 4.3l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
    case 'puzzle':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/></svg>`;
    case 'wave':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c3-4 6 4 10 0s6-4 10 0"/></svg>`;
    case 'wall':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1.5"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>`;
    case 'fountain':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M8 12a4 4 0 0 1 8 0M5 16a7 7 0 0 1 14 0"/></svg>`;
    case 'dynamite':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="6" width="6" height="14" rx="1"/><path d="M12 6V2M15 2h-6"/></svg>`;
    case 'plug':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-4V4h-4v6H6c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2zM12 19v3"/></svg>`;
    case 'antenna':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M5 7a7 7 0 0 1 14 0M8 11a4 4 0 0 1 8 0"/></svg>`;
    case 'sleep':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 9 9 9.75 9.75 0 0 0-9-9z"/></svg>`;
    case 'radio':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="14" rx="2"/><circle cx="8" cy="13" r="3"/><circle cx="16" cy="13" r="3"/><path d="M6 6V3h4"/></svg>`;
    case 'balloon':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 2 5 5 5 9c0 4 3 8 7 11 4-3 7-7 7-11 0-4-3-7-7-7zM12 20v3"/></svg>`;
    case 'weight':
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="14" height="14" rx="2"/><circle cx="12" cy="12" r="3"/></svg>`;
    default:
      return '';
  }
}

// Inline helper for 2D flat monochromatic SVGs used in choice grids
function getChoiceThumbnailSvg(cssClass: string): string {
  const strokeColor = "currentColor";
  switch (cssClass) {
    // Mood
    case 'space-fog':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16M6 12h12M8 16h8M10 20h4"/></svg>`;
    case 'space-blank':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1.5"/></svg>`;
    case 'space-rain':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5v14M12 3v18M16 5v14M4 7v10M20 7v10" stroke-dasharray="2 3"/></svg>`;
    case 'space-sun':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`;

    // Anxiety
    case 'react-sink':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>`;
    case 'react-escape':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21V3h10v18H9zM3 12h6M6 9l-3 3 3 3"/></svg>`;
    case 'react-neutral':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
    case 'react-calm':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;

    // Focus
    case 'pile-chaos':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="12" height="12" rx="1"/><rect x="8" y="9" width="12" height="12" rx="1" stroke-dasharray="2 1"/><rect x="5" y="3" width="12" height="12" rx="1" stroke-dasharray="1 2"/></svg>`;
    case 'pile-avalanche':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8l3-3 3 3M4 14l4-4 4 4M2 20l5-5 5 5M12 8l4-4 4 4M10 14l5-5 5 5M8 20l6-6 6 6"/></svg>`;
    case 'pile-neat':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="12" y1="12" x2="12" y2="6"/></svg>`;
    case 'pile-fluid':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;

    // Stress
    case 'press-clamp':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 18h16M12 6v12M8 10h8M8 14h8"/></svg>`;
    case 'press-leak':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h6M18 12h3M12 3v6M12 18v3M7.76 7.76l4.24 4.24M16.24 16.24l3.54 3.54"/></svg>`;
    case 'press-stream':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8c4-4 6 4 10 0s6-4 10 0M2 16c4-4 6 4 10 0s6-4 10 0"/></svg>`;
    case 'press-balloon':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 2 5 5 5 9c0 4 3 8 7 11 4-3 7-7 7-11 0-4-3-7-7-7zM12 20v3"/></svg>`;

    // Sleep
    case 'night-scroll':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>`;
    case 'night-fragment':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/><path d="M12 5V2M5 12H2M19 12h3M12 19v3"/></svg>`;
    case 'night-deep':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 9 9 9.75 9.75 0 0 0-9-9z"/></svg>`;
    case 'night-owl':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><circle cx="8" cy="10" r="2"/><circle cx="16" cy="10" r="2"/><path d="M12 14v4M9 18h6"/></svg>`;

    default:
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1.5"/></svg>`;
  }
}

export const questionBank: Question[] = [
  // ==========================================
  // Category 1: Mood & Energy Dynamics (Mood)
  // ==========================================
  {
    id: 1,
    category: "Mood & Energy Dynamics",
    categoryKey: "mood",
    type: "visual-slider",
    questionText: "Where does your emotional battery sit today?",
    reverse: true,
    visualMeta: {
      leftLabel: "DRAINED & EMPTY",
      rightLabel: "CHARGED & BRIGHT",
      leftIcon: "battery-empty",
      rightIcon: "battery-full"
    }
  },
  {
    id: 2,
    category: "Mood & Energy Dynamics",
    categoryKey: "mood",
    type: "visual-choice",
    questionText: "Choose the atmosphere that feels closest to your current head space.",
    visualMeta: {
      choices: [
        { value: 1, label: "Dense Grey Fog", details: "Shapes and boundaries feel blurred, muted sound.", cssClass: "space-fog", score: 1.0 },
        { value: 2, label: "Blank Room", details: "No textures, no windows, just neutral silence.", cssClass: "space-blank", score: 0.8 },
        { value: 3, label: "Persistent Drizzle", details: "Cold drops against window panes, overcast skies.", cssClass: "space-rain", score: 0.6 },
        { value: 4, label: "Warm Sunbeam", details: "Wide open space, soft lighting, room to breathe.", cssClass: "space-sun", score: 0.0 }
      ]
    }
  },
  {
    id: 3,
    category: "Mood & Energy Dynamics",
    categoryKey: "mood",
    type: "speed-card",
    questionText: "I feel like I am moving through honey just to complete simple, daily chores.",
    visualMeta: {}
  },
  {
    id: 4,
    category: "Mood & Energy Dynamics",
    categoryKey: "mood",
    type: "visual-slider",
    questionText: "How easily does interest or joy spark in things you usually love?",
    reverse: false,
    visualMeta: {
      leftLabel: "INSTANT SPARK",
      rightLabel: "COMPLETELY FLAT",
      leftIcon: "spark",
      rightIcon: "void"
    }
  },
  {
    id: 5,
    category: "Mood & Energy Dynamics",
    categoryKey: "mood",
    type: "speed-card",
    questionText: "When I look at the future, it resembles a blank wall with no texture or features.",
    visualMeta: {}
  },

  // ==========================================
  // Category 2: Anxiety & Tension Patterns (Anxiety)
  // ==========================================
  {
    id: 6,
    category: "Anxiety & Tension Patterns",
    categoryKey: "anxiety",
    type: "visual-slider",
    questionText: "How does physical tension manifest in your body when hearing a sudden notification?",
    reverse: false,
    visualMeta: {
      leftLabel: "CALM DRIFT",
      rightLabel: "PHYSICAL JOLT",
      leftIcon: "leaf",
      rightIcon: "explosion"
    }
  },
  {
    id: 7,
    category: "Anxiety & Tension Patterns",
    categoryKey: "anxiety",
    type: "visual-choice",
    questionText: "Select your immediate mental reaction to the words: 'We need to talk.'",
    visualMeta: {
      choices: [
        { value: 1, label: "Sinking Feeling", details: "A weight falls straight through your stomach.", cssClass: "react-sink", score: 1.0 },
        { value: 2, label: "Escape Route Plan", details: "Your mind instantly scans how to avoid the room.", cssClass: "react-escape", score: 0.85 },
        { value: 3, label: "Curiosity & Wonder", details: "Puzzled, but waiting with a neutral perspective.", cssClass: "react-neutral", score: 0.2 },
        { value: 4, label: "Total Openness", details: "Ready to sit down, secure in whatever is discussed.", cssClass: "react-calm", score: 0.0 }
      ]
    }
  },
  {
    id: 8,
    category: "Anxiety & Tension Patterns",
    categoryKey: "anxiety",
    type: "speed-card",
    questionText: "I replay minor details of social interactions for hours after they end, looking for mistakes.",
    visualMeta: {}
  },
  {
    id: 9,
    category: "Anxiety & Tension Patterns",
    categoryKey: "anxiety",
    type: "visual-slider",
    questionText: "Where is your focus directed when stepping into a crowded room?",
    reverse: false,
    visualMeta: {
      leftLabel: "OBSERVING SURROUNDINGS",
      rightLabel: "INTENSE SELF-FOCUS",
      leftIcon: "eye",
      rightIcon: "mirror"
    }
  },
  {
    id: 10,
    category: "Anxiety & Tension Patterns",
    categoryKey: "anxiety",
    type: "speed-card",
    questionText: "I notice my breathing is shallow, holding tension high in my collarbone.",
    visualMeta: {}
  },

  // ==========================================
  // Category 3: Focus & Executive Functioning (Focus)
  // ==========================================
  {
    id: 11,
    category: "Focus & Executive Functioning",
    categoryKey: "focus",
    type: "visual-slider",
    questionText: "When starting a boring but necessary task, your brain feels like:",
    reverse: false,
    visualMeta: {
      leftLabel: "FOCUSED ENGINE",
      rightLabel: "SLIPPING GEARS",
      leftIcon: "gear",
      rightIcon: "puzzle"
    }
  },
  {
    id: 12,
    category: "Focus & Executive Functioning",
    categoryKey: "focus",
    type: "visual-choice",
    questionText: "Which collection resembles your personal desk or counter space?",
    visualMeta: {
      choices: [
        { value: 1, label: "Active Chaos Piles", details: "Multiple distinct piles of half-finished thoughts.", cssClass: "pile-chaos", score: 0.75 },
        { value: 2, label: "Avalanche of Details", details: "Overwhelming items, reminders, and unopened boxes.", cssClass: "pile-avalanche", score: 1.0 },
        { value: 3, label: "Strict Minimalism", details: "Everything in drawers, only a single project in view.", cssClass: "pile-neat", score: 0.0 },
        { value: 4, label: "Dynamic Arrangement", details: "Messy but readable, fluid workspaces.", cssClass: "pile-fluid", score: 0.4 }
      ]
    }
  },
  {
    id: 13,
    category: "Focus & Executive Functioning",
    categoryKey: "focus",
    type: "speed-card",
    questionText: "I have at least three different half-finished projects within my immediate sight right now.",
    visualMeta: {}
  },
  {
    id: 14,
    category: "Focus & Executive Functioning",
    categoryKey: "focus",
    type: "visual-slider",
    questionText: "How difficult is it to shift your attention when deeply absorbed?",
    reverse: false,
    visualMeta: {
      leftLabel: "FLUID TRANSITIONS",
      rightLabel: "IMMOVABLE FOCUS",
      leftIcon: "wave",
      rightIcon: "wall"
    }
  },
  {
    id: 15,
    category: "Focus & Executive Functioning",
    categoryKey: "focus",
    type: "speed-card",
    questionText: "I lose track of what I was saying in the middle of a sentence and have to ask what it was.",
    visualMeta: {}
  },

  // ==========================================
  // Category 4: Stress & Burnout Thresholds (Stress)
  // ==========================================
  {
    id: 16,
    category: "Stress & Burnout Thresholds",
    categoryKey: "stress",
    type: "visual-slider",
    questionText: "How thin is your patience threshold before you feel irritated today?",
    reverse: false,
    visualMeta: {
      leftLabel: "DEEP WELL",
      rightLabel: "HAIR-TRIGGER ALERT",
      leftIcon: "fountain",
      rightIcon: "dynamite"
    }
  },
  {
    id: 17,
    category: "Stress & Burnout Thresholds",
    categoryKey: "stress",
    type: "visual-choice",
    questionText: "Choose the physical metaphor that matches your current workload pressure.",
    visualMeta: {
      choices: [
        { value: 1, label: "Tightening Clamp", details: "Steady, heavy compression on all sides.", cssClass: "press-clamp", score: 1.0 },
        { value: 2, label: "Leaking Pipe", details: "Small leaks spraying faster than you can patch them.", cssClass: "press-leak", score: 0.8 },
        { value: 3, label: "Steady Stream", details: "Constant movement, but stays inside the banks.", cssClass: "press-stream", score: 0.25 },
        { value: 4, label: "Drifting Balloon", details: "Weightless, navigating easily without pressure.", cssClass: "press-balloon", score: 0.0 }
      ]
    }
  },
  {
    id: 18,
    category: "Stress & Burnout Thresholds",
    categoryKey: "stress",
    type: "speed-card",
    questionText: "Adding even one tiny extra task to my plate feels like a mountain is falling on top of me.",
    visualMeta: {}
  },
  {
    id: 19,
    category: "Stress & Burnout Thresholds",
    categoryKey: "stress",
    type: "visual-slider",
    questionText: "How successfully do you disconnect from your responsibilities after hours?",
    reverse: false,
    visualMeta: {
      leftLabel: "IMMEDIATE SWITCH-OFF",
      rightLabel: "BACKGROUND HUM",
      leftIcon: "plug",
      rightIcon: "antenna"
    }
  },
  {
    id: 20,
    category: "Stress & Burnout Thresholds",
    categoryKey: "stress",
    type: "speed-card",
    questionText: "I feel thoroughly exhausted even after a full weekend of sleep and doing nothing.",
    visualMeta: {}
  },

  // ==========================================
  // Category 5: Sleep & Circadian Health (Sleep)
  // ==========================================
  {
    id: 21,
    category: "Sleep & Circadian Health",
    categoryKey: "sleep",
    type: "visual-slider",
    questionText: "As your head hits the pillow, your mind's volume knob is at:",
    reverse: false,
    visualMeta: {
      leftLabel: "SILENT STATIC",
      rightLabel: "BLARING STATIC",
      leftIcon: "sleep",
      rightIcon: "radio"
    }
  },
  {
    id: 22,
    category: "Sleep & Circadian Health",
    categoryKey: "sleep",
    type: "visual-choice",
    questionText: "Select the schedule block that mirrors your typical late hours.",
    visualMeta: {
      choices: [
        { value: 1, label: "Midnight Screen Scroll", details: "Binge-consuming content in the dark to sleep.", cssClass: "night-scroll", score: 0.95 },
        { value: 2, label: "Fragmented Stares", details: "Waking up repeatedly, looking at the ceiling.", cssClass: "night-fragment", score: 1.0 },
        { value: 3, label: "Deep Restful Sink", details: "Consistent 7-8 hours of uninterrupted deep sleep.", cssClass: "night-deep", score: 0.0 },
        { value: 4, label: "Hyperactive Night Owls", details: "Surging with writing or creative energy at 2 AM.", cssClass: "night-owl", score: 0.7 }
      ]
    }
  },
  {
    id: 23,
    category: "Sleep & Circadian Health",
    categoryKey: "sleep",
    type: "speed-card",
    questionText: "I wake up in the middle of the night or early morning with my heart racing for no apparent reason.",
    visualMeta: {}
  },
  {
    id: 24,
    category: "Sleep & Circadian Health",
    categoryKey: "sleep",
    type: "visual-slider",
    questionText: "How heavy does morning fatigue feel upon waking up?",
    reverse: false,
    visualMeta: {
      leftLabel: "LIGHT & READY",
      rightLabel: "HEAVY LEAD WEIGHT",
      leftIcon: "balloon",
      rightIcon: "weight"
    }
  },
  {
    id: 25,
    category: "Sleep & Circadian Health",
    categoryKey: "sleep",
    type: "speed-card",
    questionText: "I rely heavily on external stimulants (caffeine, sugar, medications) to push through my afternoon slump.",
    visualMeta: {}
  }
];

export interface QuizState {
  currentQuestionIndex: number;
  answers: { [questionId: number]: number }; // score between 0.0 and 1.0
  categoryScores: {
    mood: number;
    anxiety: number;
    focus: number;
    stress: number;
    sleep: number;
  };
}

export const quizController = {
  state: {
    currentQuestionIndex: 0,
    answers: {},
    categoryScores: {
      mood: 0,
      anxiety: 0,
      focus: 0,
      stress: 0,
      sleep: 0
    }
  } as QuizState,

  init() {
    const trigger = document.getElementById('quiz-trigger-card');
    if (!trigger) return;

    // Remove any default click anchor action
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.openQuiz();
    });
  },

  skipToResults() {
    // Fill remaining unanswered questions with dynamic demo values for an organic radar chart
    questionBank.forEach((q) => {
      if (this.state.answers[q.id] === undefined) {
        this.state.answers[q.id] = parseFloat((0.2 + Math.random() * 0.6).toFixed(2));
      }
    });
    this.calculateResults();
  },

  openQuiz() {
    // Reset state
    this.state.currentQuestionIndex = 0;
    this.state.answers = {};
    this.state.categoryScores = {
      mood: 0,
      anxiety: 0,
      focus: 0,
      stress: 0,
      sleep: 0
    };

    // Render modal element if not already present
    let modal = document.getElementById('wellbeing-quiz-modal');
    if (!modal) {
      this.injectModalMarkup();
      modal = document.getElementById('wellbeing-quiz-modal')!;
    }

    // Hide scroll bar of root body to isolate interactive quiz view
    document.body.style.overflow = 'hidden';

    // Show modal
    modal.classList.add('is-active');

    // Ensure header is visible
    const modalHeader = document.querySelector('.quiz-modal-header') as HTMLElement;
    if (modalHeader) {
      modalHeader.style.display = 'flex';
    }

    // Attach core events
    this.bindEvents();

    // Render initial question
    this.renderCurrentQuestion();

    // Stop background scroll smoothing
    window.lenis?.stop();
  },

  closeQuiz() {
    const modal = document.getElementById('wellbeing-quiz-modal');
    if (modal) {
      modal.classList.remove('is-active');
    }
    document.body.style.overflow = '';

    // Resume background scroll smoothing
    window.lenis?.start();
  },

  injectModalMarkup() {
    const modalHtml = `
      <div id="wellbeing-quiz-modal" class="wellbeing-quiz-overlay" role="dialog" aria-modal="true" aria-labelledby="quiz-modal-title">
        <div class="wellbeing-quiz-container">
          <!-- Close button -->
          <button class="quiz-close-btn" aria-label="Close Quiz">&times;</button>
          
          <!-- Fixed Quiz Header -->
          <div class="quiz-modal-header">
            <span id="quiz-category-indicator" class="quiz-category-tag">Mood & Energy Dynamics</span>
            <div class="quiz-progress-track">
              <div id="quiz-progress-bar" class="quiz-progress-fill" style="width: 0%;"></div>
            </div>
            <div class="quiz-progress-numbers">
              <span id="quiz-question-number">Question 1 of 25</span>
            </div>
          </div>

          <!-- Scrollable Quiz Viewport -->
          <div class="quiz-content-scrollable" data-lenis-prevent>
            <!-- Quiz contents wrapper -->
            <div class="quiz-card-wrapper">
              <!-- Body of the question -->
              <div id="quiz-question-viewport" class="quiz-viewport">
                <!-- Rendered dynamic content goes here -->
              </div>
            </div>
            
            <!-- Results dashboard (starts hidden) -->
            <div id="quiz-results-container" class="quiz-results-container is-hidden">
              <!-- Dynamically populated dashboard -->
            </div>
          </div>

          <!-- Fixed Quiz Footer -->
          <div class="quiz-modal-footer">
            <div class="quiz-footer">
              <button id="quiz-back-btn" class="quiz-nav-btn is-back" disabled>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Back
              </button>
              <button id="quiz-skip-btn" class="quiz-nav-btn is-skip" style="display: none;">
                Skip to Results
              </button>
              <button id="quiz-next-btn" class="quiz-nav-btn is-next" disabled>
                Next
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Append to body (or parent container if features is included in index)
    const featuresSection = document.querySelector('.features-section');
    if (featuresSection) {
      featuresSection.insertAdjacentHTML('beforeend', modalHtml);
    } else {
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
  },

  bindEvents() {
    const modal = document.getElementById('wellbeing-quiz-modal')!;
    const closeBtn = modal.querySelector('.quiz-close-btn')!;
    const backBtn = document.getElementById('quiz-back-btn')!;
    const skipBtn = document.getElementById('quiz-skip-btn')!;
    const nextBtn = document.getElementById('quiz-next-btn')!;

    // Remove existing events to prevent multiple binds
    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode!.replaceChild(newCloseBtn, closeBtn);
    
    const newBackBtn = backBtn.cloneNode(true);
    backBtn.parentNode!.replaceChild(newBackBtn, backBtn);

    const newSkipBtn = skipBtn.cloneNode(true);
    skipBtn.parentNode!.replaceChild(newSkipBtn, skipBtn);

    const newNextBtn = nextBtn.cloneNode(true);
    nextBtn.parentNode!.replaceChild(newNextBtn, nextBtn);

    // Bind clean listener events
    document.getElementById('wellbeing-quiz-modal')!.querySelector('.quiz-close-btn')!.addEventListener('click', () => this.closeQuiz());
    document.getElementById('quiz-back-btn')!.addEventListener('click', () => this.navigateBack());
    document.getElementById('quiz-skip-btn')!.addEventListener('click', () => this.skipToResults());
    document.getElementById('quiz-next-btn')!.addEventListener('click', () => this.navigateNext());
    
    // Close on overlay click outside container
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeQuiz();
      }
    });

    // Keyboard support: Escape closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        this.closeQuiz();
      }
    });
  },

  renderCurrentQuestion() {
    const q = questionBank[this.state.currentQuestionIndex];
    if (!q) return;

    // Update headers
    const categoryTag = document.getElementById('quiz-category-indicator')!;
    categoryTag.textContent = q.category.toUpperCase();
    categoryTag.className = `quiz-category-tag tag-${q.categoryKey}`;

    const progressFill = document.getElementById('quiz-progress-bar')!;
    const percent = Math.round((this.state.currentQuestionIndex / questionBank.length) * 100);
    progressFill.style.width = `${percent}%`;

    const qNumText = document.getElementById('quiz-question-number')!;
    qNumText.textContent = `QUESTION ${this.state.currentQuestionIndex + 1} OF ${questionBank.length}`;

    // Enable/disable back btn
    const backBtn = document.getElementById('quiz-back-btn') as HTMLButtonElement;
    backBtn.disabled = this.state.currentQuestionIndex === 0;

    // Show/hide skip button (visible starting at Question 5, index >= 4)
    const skipBtn = document.getElementById('quiz-skip-btn') as HTMLButtonElement;
    if (skipBtn) {
      skipBtn.style.display = this.state.currentQuestionIndex >= 4 ? 'inline-flex' : 'none';
    }

    // Get viewport and clear it
    const viewport = document.getElementById('quiz-question-viewport')!;
    viewport.innerHTML = '';
    viewport.className = `quiz-viewport view-${q.type}`;

    // Add active animation class
    viewport.classList.add('fade-in-content');
    setTimeout(() => viewport.classList.remove('fade-in-content'), 400);

    // Check if we have an answer recorded
    const savedAnswer = this.state.answers[q.id];

    // Render by type
    if (q.type === 'visual-slider') {
      this.renderSliderQuestion(q, viewport, savedAnswer);
    } else if (q.type === 'visual-choice') {
      this.renderChoiceQuestion(q, viewport, savedAnswer);
    } else if (q.type === 'speed-card') {
      this.renderSpeedCardQuestion(q, viewport, savedAnswer);
    }
  },

  renderSliderQuestion(q: Question, container: HTMLElement, savedValue?: number) {
    const defaultValue = savedValue !== undefined ? savedValue * 4 + 1 : 3;
    const leftLabel = q.visualMeta.leftLabel || "";
    const rightLabel = q.visualMeta.rightLabel || "";
    const leftIcon = q.visualMeta.leftIcon || "";
    const rightIcon = q.visualMeta.rightIcon || "";

    const html = `
      <h3 class="quiz-question-title">${q.questionText}</h3>
      <div class="slider-graphic-container">
        <!-- Visual slider layout with clean flat SVGs -->
        <div class="slider-visualization">
          <div class="visual-side is-left">
            <span class="visual-art-icon">${getVisualIconSvg(leftIcon)}</span>
            <span class="visual-art-label">${leftLabel}</span>
          </div>
          <div class="visual-connection-line">
            <div id="slider-fluid-fill" class="fluid-line-fill" style="width: 50%"></div>
          </div>
          <div class="visual-side is-right">
            <span class="visual-art-icon">${getVisualIconSvg(rightIcon)}</span>
            <span class="visual-art-label">${rightLabel}</span>
          </div>
        </div>

        <div class="slider-input-wrapper">
          <input type="range" id="quiz-range-slider" min="1" max="5" value="${defaultValue}" step="1" class="quiz-range-input">
          <div class="slider-ticks">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <div class="slider-value-feedback">
            <span id="slider-intensity-text">Neutral / Middle</span>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    const slider = document.getElementById('quiz-range-slider') as HTMLInputElement;
    const fluidFill = document.getElementById('slider-fluid-fill')!;
    const feedback = document.getElementById('slider-intensity-text')!;
    const nextBtn = document.getElementById('quiz-next-btn') as HTMLButtonElement;

    // Define intensities text
    const getIntensityText = (val: number) => {
      if (val === 1) return "Very Low / Calm";
      if (val === 2) return "Mildly Low";
      if (val === 3) return "Moderate / Balanced";
      if (val === 4) return "Slightly Elevated";
      return "Intensely Felt / Maximum";
    };

    const updateSliderUI = (val: number) => {
      // fluid line fill update
      const percent = ((val - 1) / 4) * 100;
      fluidFill.style.width = `${percent}%`;
      feedback.textContent = getIntensityText(val).toUpperCase();

      // Save answer
      // Convert 1-5 scale to 0.0-1.0
      let normalized = (val - 1) / 4;
      if (q.reverse) {
        normalized = 1.0 - normalized;
      }
      this.state.answers[q.id] = normalized;
      nextBtn.disabled = false;
    };

    slider.addEventListener('input', (e) => {
      const val = parseInt((e.target as HTMLInputElement).value, 10);
      updateSliderUI(val);
    });

    // Trigger initial load
    updateSliderUI(defaultValue);
  },

  renderChoiceQuestion(q: Question, container: HTMLElement, savedValue?: number) {
    const choices = q.visualMeta.choices || [];
    let choiceCardsHtml = "";

    choices.forEach((choice) => {
      const isSelected = savedValue !== undefined && Math.abs(savedValue - choice.score) < 0.01;
      
      // Minimal CSS illustrations generated per card
      choiceCardsHtml += `
        <button class="choice-card-option ${choice.cssClass} ${isSelected ? 'is-selected' : ''}" data-score="${choice.score}" data-value="${choice.value}" aria-pressed="${isSelected}">
          <div class="choice-visual-meta">
            <!-- Minimal CSS-drawn icon layout -->
            <div class="css-thumbnail">
              <span class="css-thumbnail-art">${getChoiceThumbnailSvg(choice.cssClass)}</span>
            </div>
          </div>
          <div class="choice-card-content">
            <span class="choice-card-label">${choice.label}</span>
            <span class="choice-card-desc">${choice.details}</span>
          </div>
        </button>
      `;
    });

    const html = `
      <h3 class="quiz-question-title">${q.questionText}</h3>
      <div class="choices-layout-grid">
        ${choiceCardsHtml}
      </div>
    `;

    container.innerHTML = html;

    const nextBtn = document.getElementById('quiz-next-btn') as HTMLButtonElement;
    const cards = container.querySelectorAll('.choice-card-option');

    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        // Deselect others
        cards.forEach((c) => {
          c.classList.remove('is-selected');
          c.setAttribute('aria-pressed', 'false');
        });

        const activeCard = e.currentTarget as HTMLElement;
        activeCard.classList.add('is-selected');
        activeCard.setAttribute('aria-pressed', 'true');

        const score = parseFloat(activeCard.getAttribute('data-score')!);
        this.state.answers[q.id] = score;

        nextBtn.disabled = false;

        // Auto advance after 350ms for smooth speed transitions
        setTimeout(() => {
          this.navigateNext();
        }, 350);
      });
    });

    // If answer already selected
    if (savedValue !== undefined) {
      nextBtn.disabled = false;
    } else {
      nextBtn.disabled = true;
    }
  },

  renderSpeedCardQuestion(q: Question, container: HTMLElement, savedValue?: number) {
    const hasAnswer = savedValue !== undefined;
    const isRelatable = hasAnswer && savedValue === 1.0;
    const isNotMe = hasAnswer && savedValue === 0.0;

    const html = `
      <div class="speed-card-component">
        <div class="speed-card-frame">
          <div class="speed-card-avatar">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 12h3L4 18h3l2-6V6H3v6zm11 0h3l-2 6h3l2-6V6h-6v6z"/>
            </svg>
          </div>
          <p class="speed-card-statement">“${q.questionText}”</p>
        </div>
        
        <div class="speed-card-buttons">
          <button id="speed-btn-notme" class="speed-action-btn not-me ${isNotMe ? 'is-active' : ''}">
            Not Me
          </button>
          <button id="speed-btn-relatable" class="speed-action-btn relatable ${isRelatable ? 'is-active' : ''}">
            Relatable
          </button>
        </div>
      </div>
    `;

    container.innerHTML = html;

    const notMeBtn = document.getElementById('speed-btn-notme')!;
    const relatableBtn = document.getElementById('speed-btn-relatable')!;
    const nextBtn = document.getElementById('quiz-next-btn') as HTMLButtonElement;

    const setAnswer = (val: number) => {
      this.state.answers[q.id] = val;
      nextBtn.disabled = false;

      // Add feedback flash and auto advance
      if (val === 1.0) {
        relatableBtn.classList.add('is-active');
        notMeBtn.classList.remove('is-active');
      } else {
        notMeBtn.classList.add('is-active');
        relatableBtn.classList.remove('is-active');
      }

      setTimeout(() => {
        this.navigateNext();
      }, 350);
    };

    notMeBtn.addEventListener('click', () => setAnswer(0.0));
    relatableBtn.addEventListener('click', () => setAnswer(1.0));

    if (hasAnswer) {
      nextBtn.disabled = false;
    } else {
      nextBtn.disabled = true;
    }
  },

  navigateBack() {
    if (this.state.currentQuestionIndex > 0) {
      this.state.currentQuestionIndex--;
      this.renderCurrentQuestion();
    }
  },

  navigateNext() {
    if (this.state.currentQuestionIndex < questionBank.length - 1) {
      this.state.currentQuestionIndex++;
      this.renderCurrentQuestion();
    } else {
      // Calculate and display results dashboard
      this.calculateResults();
    }
  },

  calculateResults() {
    // 1. Reset averages
    const sums = { mood: 0, anxiety: 0, focus: 0, stress: 0, sleep: 0 };
    const counts = { mood: 0, anxiety: 0, focus: 0, stress: 0, sleep: 0 };

    questionBank.forEach((q) => {
      const score = this.state.answers[q.id];
      if (score !== undefined) {
        sums[q.categoryKey] += score;
        counts[q.categoryKey]++;
      }
    });

    const scores = {
      mood: counts.mood > 0 ? sums.mood / counts.mood : 0,
      anxiety: counts.anxiety > 0 ? sums.anxiety / counts.anxiety : 0,
      focus: counts.focus > 0 ? sums.focus / counts.focus : 0,
      stress: counts.stress > 0 ? sums.stress / counts.stress : 0,
      sleep: counts.sleep > 0 ? sums.sleep / counts.sleep : 0
    };

    this.state.categoryScores = scores;

    // Hide active card question contents and fixed footer/header
    const cardWrapper = document.querySelector('.quiz-card-wrapper') as HTMLElement;
    if (cardWrapper) {
      cardWrapper.style.display = 'none';
    }
    const modalFooter = document.querySelector('.quiz-modal-footer') as HTMLElement;
    if (modalFooter) {
      modalFooter.style.display = 'none';
    }
    const modalHeader = document.querySelector('.quiz-modal-header') as HTMLElement;
    if (modalHeader) {
      modalHeader.style.display = 'none';
    }

    // Show and build Results Dashboard
    const resultsContainer = document.getElementById('quiz-results-container')!;
    resultsContainer.classList.remove('is-hidden');

    this.renderResultsDashboard(scores, resultsContainer);
  },

  renderResultsDashboard(scores: QuizState['categoryScores'], container: HTMLElement) {
    // Match customized profiles
    let profileTitle = "Balanced Harmony";
    let profileDescription = "Your replies outline a generally well-balanced state of energy, focus, and physical release. Your rhythms align stable indicators without immediate sensory alerts.";
    let cssTag = "profile-balanced";

    // Threshold Checks
    if (scores.stress > 0.65 && scores.focus > 0.6) {
      profileTitle = "High-Stress Burnout";
      profileDescription = "Your profiles indicate a high correlation of stress with executive depletion. You are likely running on fumes, where tiny inputs cause massive sensory blockades.";
      cssTag = "profile-burnout";
    } else if (scores.sleep > 0.68 && scores.mood > 0.5) {
      profileTitle = "Circadian Exhaustion";
      profileDescription = "Your results outline a significant sleep disruption affecting core emotional recovery. This fatigue triggers flat mood states and circadian fatigue loops.";
      cssTag = "profile-sleep-drained";
    } else if (scores.anxiety > 0.65) {
      profileTitle = "Hyper-Reactive Anxiety";
      profileDescription = "Your physical tension triggers alarms easily. Your system resides in a high-alert scanning mode, replaying interactions and feeling sudden somatic jumps.";
      cssTag = "profile-anxiety-tension";
    } else if (scores.focus > 0.68) {
      profileTitle = "Executive Overload";
      profileDescription = "Your attention splits in multiple directions. Slipping gears and hyperfocus blocks transition pathways, creating structured clutter in your workspace and head.";
      cssTag = "profile-focus-dysfunction";
    } else if (scores.mood > 0.62) {
      profileTitle = "Mood & Energy Lows";
      profileDescription = "Your replies highlight flat energy dynamics and a heavy weight carrying down daily tasks. Sparks of interest feel distant, casting shadows over the horizon.";
      cssTag = "profile-mood-low";
    }

    // Convert scores to round percentages
    const pm = Math.round(scores.mood * 100);
    const pa = Math.round(scores.anxiety * 100);
    const pf = Math.round(scores.focus * 100);
    const ps = Math.round(scores.stress * 100);
    const psl = Math.round(scores.sleep * 100);

    // SVG Radar Chart Vertices Calculation (Monochrome Art Aesthetic)
    const values = [scores.mood, scores.anxiety, scores.focus, scores.stress, scores.sleep];
    const cx = 100;
    const cy = 100;
    const r = 65; // radar chart outer radius
    const angles = [
      -Math.PI / 2,                     // Mood (Up)
      -Math.PI / 2 + (2 * Math.PI / 5), // Anxiety
      -Math.PI / 2 + (4 * Math.PI / 5), // Focus
      -Math.PI / 2 + (6 * Math.PI / 5), // Stress
      -Math.PI / 2 + (8 * Math.PI / 5)  // Sleep
    ];

    // Build Pentagon concentric grid rings
    let gridsHtml = "";
    const gridLevels = [0.25, 0.5, 0.75, 1.0];
    gridLevels.forEach((level) => {
      const pts = angles.map((angle) => {
        const x = cx + r * level * Math.cos(angle);
        const y = cy + r * level * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(" ");
      gridsHtml += `<polygon points="${pts}" fill="none" stroke="var(--quiz-border)" stroke-width="1"/>`;
    });

    // Build Axis lines
    let axisHtml = "";
    angles.forEach((angle) => {
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      axisHtml += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="var(--quiz-border)" stroke-width="1" stroke-dasharray="1 2"/>`;
    });

    // Build User Score polygon
    const valuePts = angles.map((angle, idx) => {
      const val = Math.max(0.08, values[idx]); // Prevent zero collapse
      const x = cx + r * val * Math.cos(angle);
      const y = cy + r * val * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
    const polygonHtml = `<polygon points="${valuePts}" class="radar-score-poly" fill="rgba(18, 18, 18, 0.08)" stroke="var(--quiz-primary)" stroke-width="2"/>`;

    // Render small solid handle dots on score vertices
    let dotsHtml = "";
    angles.forEach((angle, idx) => {
      const val = Math.max(0.08, values[idx]);
      const x = cx + r * val * Math.cos(angle);
      const y = cy + r * val * Math.sin(angle);
      dotsHtml += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" fill="var(--quiz-primary)"/>`;
    });

    // Text labels around the pentagon
    const labels = [
      { text: "MOOD", x: 100, y: 20, anchor: "middle" },
      { text: "ANXIETY", x: 170, y: 82, anchor: "start" },
      { text: "FOCUS", x: 145, y: 162, anchor: "start" },
      { text: "STRESS", x: 55, y: 162, anchor: "end" },
      { text: "SLEEP", x: 30, y: 82, anchor: "end" }
    ];
    let labelsHtml = "";
    labels.forEach((lbl) => {
      labelsHtml += `<text x="${lbl.x}" y="${lbl.y}" text-anchor="${lbl.anchor}" class="radar-chart-label">${lbl.text}</text>`;
    });

    const radarSvg = `
      <svg viewBox="0 0 200 200" class="radar-chart-svg">
        ${gridsHtml}
        ${axisHtml}
        ${polygonHtml}
        ${dotsHtml}
        ${labelsHtml}
      </svg>
    `;

    const html = `
      <div class="results-header">
        <span class="results-meta-tag">Your Screening Synthesis</span>
        <h2 class="results-profile-title ${cssTag}">${profileTitle}</h2>
        <p class="results-profile-description">${profileDescription}</p>
      </div>

      <div class="results-score-grid">
        <!-- Left Side: Percentages List -->
        <div class="results-percentages-list">
          <div class="score-row">
            <div class="score-label-box">
              <span class="score-category-name">Mood & Energy Dynamics</span>
              <span class="score-percent">${pm}%</span>
            </div>
            <div class="score-bar-track">
              <div class="score-bar-fill" style="width: ${pm}%"></div>
            </div>
          </div>

          <div class="score-row">
            <div class="score-label-box">
              <span class="score-category-name">Anxiety & Tension Patterns</span>
              <span class="score-percent">${pa}%</span>
            </div>
            <div class="score-bar-track">
              <div class="score-bar-fill" style="width: ${pa}%"></div>
            </div>
          </div>

          <div class="score-row">
            <div class="score-label-box">
              <span class="score-category-name">Focus & Executive Functioning</span>
              <span class="score-percent">${pf}%</span>
            </div>
            <div class="score-bar-track">
              <div class="score-bar-fill" style="width: ${pf}%"></div>
            </div>
          </div>

          <div class="score-row">
            <div class="score-label-box">
              <span class="score-category-name">Stress & Burnout Thresholds</span>
              <span class="score-percent">${ps}%</span>
            </div>
            <div class="score-bar-track">
              <div class="score-bar-fill" style="width: ${ps}%"></div>
            </div>
          </div>

          <div class="score-row">
            <div class="score-label-box">
              <span class="score-category-name">Sleep & Circadian Health</span>
              <span class="score-percent">${psl}%</span>
            </div>
            <div class="score-bar-track">
              <div class="score-bar-fill" style="width: ${psl}%"></div>
            </div>
          </div>
        </div>

        <!-- Right Side: Radar Chart -->
        <div class="results-radar-chart-container">
          ${radarSvg}
        </div>
      </div>

      <!-- Actionable Resolution Dashboard -->
      <div class="results-next-steps">
        <h3 class="next-steps-section-title">Supportive Resolutions</h3>
        <p class="next-steps-section-desc">Practical, non-clinical steps mapped to your current screening configuration to ease stress and combat diagnosis apprehension.</p>
        
        <div class="resolutions-grid">
          <!-- Interactive Mindfulness breathing exercise -->
          <div class="resolution-card breathing-exercise">
            <div class="resolution-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12c3-4 6 4 10 0s6-4 10 0M2 17c3-4 6 4 10 0s6-4 10 0"/>
              </svg>
            </div>
            <div class="resolution-card-content">
              <h4>Grounding Breaths</h4>
              <p>Follow the visual expander to regulate your nervous system. 4 seconds inhale, 4 seconds hold, 4 seconds exhale.</p>
              <button id="breathing-trigger-btn" class="interactive-exercise-btn">Start Breathing Loop</button>
              <div id="breathing-ring-container" class="breathing-ring-container is-hidden">
                <div class="breathing-circle"></div>
                <span id="breathing-prompt-text">Focus here</span>
              </div>
            </div>
          </div>
 
          <!-- Direct Professional consult finder -->
          <div class="resolution-card">
            <div class="resolution-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/>
              </svg>
            </div>
            <div class="resolution-card-content">
              <h4>Direct Consultation Directories</h4>
              <p>Browse directories of trusted emotional wellness guides or connect with professional counselors online in India.</p>
              <a href="https://yourdost.com/" target="_blank" rel="noopener" class="resolution-action-link">Find Indian Counselors &rarr;</a>
            </div>
          </div>
        </div>
      </div>

      <div class="results-actions-footer">
        <button id="quiz-restart-btn" class="quiz-restart-action">Retake Screening Quiz</button>
        <button id="quiz-done-btn" class="quiz-done-action">Finish & Close</button>
      </div>
    `;

    container.innerHTML = html;

    // Attach local outcomes events
    document.getElementById('quiz-restart-btn')!.addEventListener('click', () => {
      const cardWrapper = document.querySelector('.quiz-card-wrapper') as HTMLElement;
      if (cardWrapper) {
        cardWrapper.style.display = 'flex';
      }
      const modalFooter = document.querySelector('.quiz-modal-footer') as HTMLElement;
      if (modalFooter) {
        modalFooter.style.display = 'block';
      }
      const modalHeader = document.querySelector('.quiz-modal-header') as HTMLElement;
      if (modalHeader) {
        modalHeader.style.display = 'flex';
      }
      container.classList.add('is-hidden');
      this.openQuiz();
    });

    document.getElementById('quiz-done-btn')!.addEventListener('click', () => {
      const cardWrapper = document.querySelector('.quiz-card-wrapper') as HTMLElement;
      if (cardWrapper) {
        cardWrapper.style.display = 'flex';
      }
      const modalFooter = document.querySelector('.quiz-modal-footer') as HTMLElement;
      if (modalFooter) {
        modalFooter.style.display = 'block';
      }
      const modalHeader = document.querySelector('.quiz-modal-header') as HTMLElement;
      if (modalHeader) {
        modalHeader.style.display = 'flex';
      }
      container.classList.add('is-hidden');
      this.closeQuiz();
    });

    // Breathing exercise action
    const breathingBtn = document.getElementById('breathing-trigger-btn')!;
    const breathingRing = document.getElementById('breathing-ring-container')!;
    const breathingText = document.getElementById('breathing-prompt-text')!;
    const breathingCircle = breathingRing.querySelector('.breathing-circle') as HTMLElement;

    let breathingInterval: any = null;

    breathingBtn.addEventListener('click', () => {
      if (breathingRing.classList.contains('is-hidden')) {
        breathingRing.classList.remove('is-hidden');
        breathingBtn.textContent = "Stop Breathing Loop";
        
        let cycle = 0; // 0 = Inhale, 1 = Hold, 2 = Exhale
        const runCycle = () => {
          if (cycle === 0) {
            breathingText.textContent = "Inhale...";
            breathingCircle.style.transform = "scale(1.7)";
            breathingCircle.style.transition = "transform 4000ms cubic-bezier(0.4, 0, 0.2, 1)";
            cycle = 1;
          } else if (cycle === 1) {
            breathingText.textContent = "Hold...";
            cycle = 2;
          } else {
            breathingText.textContent = "Exhale...";
            breathingCircle.style.transform = "scale(1)";
            breathingCircle.style.transition = "transform 4000ms cubic-bezier(0.4, 0, 0.2, 1)";
            cycle = 0;
          }
        };

        runCycle();
        breathingInterval = setInterval(runCycle, 4000);
      } else {
        clearInterval(breathingInterval);
        breathingRing.classList.add('is-hidden');
        breathingBtn.textContent = "Start Breathing Loop";
        breathingCircle.style.transform = "scale(1)";
      }
    });
  }
};
