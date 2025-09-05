export interface Tip {
  id: string;
  title: string;
  description: string;
}

export interface TipSet {
  setId: number;
  tips: Tip[];
}

export const TIPS_DATA: TipSet[] = [
  {
    setId: 1,
    tips: [
      {
        id: '1-1',
        title: 'Bold Visuals First',
        description: 'Start with an image, action, or scene that\'s visually striking. People scroll fast — a bold visual grabs attention instantly.'
      },
      {
        id: '1-2',
        title: 'Keep It Short',
        description: 'Videos that are concise perform better. Cut all unnecessary words or scenes. Every second counts — make it punchy.'
      },
      {
        id: '1-3',
        title: 'Show, Don\'t Tell',
        description: 'Demonstrate the point instead of explaining it. Actions stick in memory longer than words alone.'
      }
    ]
  },
  {
    setId: 2,
    tips: [
      {
        id: '2-1',
        title: 'Start with a Question',
        description: 'Ask something that makes viewers think instantly. Questions spark curiosity and keep them watching.'
      },
      {
        id: '2-2',
        title: 'Use Surprising Stats',
        description: 'Drop a shocking or counter-intuitive statistic. Numbers grab attention and make your content feel credible.'
      },
      {
        id: '2-3',
        title: 'Tease the Outcome',
        description: 'Hint at the payoff or reveal later in the video. Curiosity keeps viewers from scrolling away.'
      }
    ]
  },
  {
    setId: 3,
    tips: [
      {
        id: '3-1',
        title: 'Contrast Wins',
        description: 'Show extremes — before/after, success/failure, wrong/right. Visual contrast hooks viewers quickly.'
      },
      {
        id: '3-2',
        title: 'Fast Cuts',
        description: 'Quick scene changes prevent boredom. Slow pacing kills watch time — keep edits snappy.'
      },
      {
        id: '3-3',
        title: 'Use Text on Screen',
        description: 'Overlay text highlights key points. Some people watch muted — visuals + text keeps them engaged.'
      }
    ]
  },
  {
    setId: 4,
    tips: [
      {
        id: '4-1',
        title: 'Start With Action',
        description: 'Begin with movement, a person doing something, or an event. Static intros lose viewers.'
      },
      {
        id: '4-2',
        title: 'Trigger FOMO',
        description: 'Make viewers feel they\'re missing out if they don\'t watch. Scarcity and urgency boost engagement.'
      },
      {
        id: '4-3',
        title: 'Relatable Situations',
        description: 'Show scenarios people recognize in daily life. Relatability makes content memorable and shareable.'
      }
    ]
  },
  {
    setId: 5,
    tips: [
      {
        id: '5-1',
        title: 'Use Humor',
        description: 'Even short jokes or absurd moments make viewers pause. Funny content is highly shareable.'
      },
      {
        id: '5-2',
        title: 'Make Faces Visible',
        description: 'Human faces draw attention. Expressions amplify emotion and keep viewers watching.'
      },
      {
        id: '5-3',
        title: 'Add Music With Punch',
        description: 'A strong beat or effect reinforces timing and energy. Music guides attention subconsciously.'
      }
    ]
  },
  {
    setId: 6,
    tips: [
      {
        id: '6-1',
        title: 'Start With a Problem',
        description: 'Present a relatable problem immediately. Viewers stay to see the solution.'
      },
      {
        id: '6-2',
        title: 'Keep Sentences Snappy',
        description: 'Short sentences read/understand quickly. Long explanations lose viewers in seconds.'
      },
      {
        id: '6-3',
        title: 'Include a Twist',
        description: 'Do something unexpected or counter-intuitive mid-video. Twists spark curiosity and shares.'
      }
    ]
  },
  {
    setId: 7,
    tips: [
      {
        id: '7-1',
        title: 'Hook With Emotion',
        description: 'Anger, joy, fear, or excitement at the start triggers instinctive attention.'
      },
      {
        id: '7-2',
        title: 'Use Repetition',
        description: 'Repeat key phrases visually or verbally. Reinforcement helps viewers remember and share.'
      },
      {
        id: '7-3',
        title: 'Clear Call-To-Action',
        description: 'End with exactly what you want viewers to do. Confusion kills engagement.'
      }
    ]
  },
  {
    setId: 8,
    tips: [
      {
        id: '8-1',
        title: 'Use Props or Objects',
        description: 'Unique or surprising objects attract attention fast. Make it visually memorable.'
      },
      {
        id: '8-2',
        title: 'Change Camera Angles',
        description: 'Switch angles to maintain energy. One static shot gets boring quickly.'
      },
      {
        id: '8-3',
        title: 'Speak Directly to Camera',
        description: 'Eye contact builds connection. It makes viewers feel you\'re talking to them personally.'
      }
    ]
  },
  {
    setId: 9,
    tips: [
      {
        id: '9-1',
        title: 'Highlight Pain Points',
        description: 'Call out a common frustration. People watch content that promises relief or answers.'
      },
      {
        id: '9-2',
        title: 'Use Metaphors',
        description: 'Simplify complex ideas with comparisons. Metaphors stick better in memory.'
      },
      {
        id: '9-3',
        title: 'End With a Micro-Climax',
        description: 'Finish each clip with a small surprise or reveal. Keeps viewers anticipating the next video.'
      }
    ]
  },
  {
    setId: 10,
    tips: [
      {
        id: '10-1',
        title: 'Break Expectations',
        description: 'Do something unusual right away. Breaking predictability hooks viewers immediately.'
      },
      {
        id: '10-2',
        title: 'Layer Sound Effects',
        description: 'Use subtle SFX to emphasize key moments. Sound guides attention subconsciously.'
      },
      {
        id: '10-3',
        title: 'Loop Cleverly',
        description: 'End so the video can loop seamlessly. Loops increase total watch time and engagement.'
      }
    ]
  }
];

// Get tips for a specific set
export const getTipSet = (setId: number): TipSet | null => {
  return TIPS_DATA.find(set => set.setId === setId) || null;
};

// Get current tip set based on calendar days since user started
export const getCurrentTipSet = (tipsLastShown: Date | null, currentTipSet: number | null): { setId: number; tips: Tip[] } => {
  const now = new Date();
  
  // If no previous data, start with set 1 (Day 1)
  if (!tipsLastShown || !currentTipSet) {
    return TIPS_DATA[0]; // Set 1
  }
  
  // Calculate days since the user first started (tipsLastShown is their start date)
  const startDate = new Date(tipsLastShown);
  const currentDate = new Date(now);
  
  // Check for invalid dates
  if (isNaN(startDate.getTime()) || isNaN(currentDate.getTime())) {
    return TIPS_DATA[0]; // Return Set 1 if invalid dates
  }
  
  // Set both dates to midnight for accurate day calculation
  startDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  
  const timeDiff = currentDate.getTime() - startDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
  // Calculate which set to show based on days
  // Day 0 = Set 1, Day 1 = Set 2, ..., Day 9 = Set 10, Day 10 = Set 1, etc.
  let targetSetId = (daysDiff % 10) + 1;
  
  // If it's the same day, return current set
  if (daysDiff === 0) {
    const currentSet = getTipSet(currentTipSet);
    return currentSet || TIPS_DATA[0];
  }
  
  // Return the target set for the current day
  const targetSet = getTipSet(targetSetId);
  return targetSet || TIPS_DATA[0];
};

// Get the next tip set (for preview/testing)
export const getNextTipSet = (currentSetId: number): { setId: number; tips: Tip[] } => {
  let nextSetId = currentSetId + 1;
  if (nextSetId > 10) {
    nextSetId = 1;
  }
  
  const nextSet = getTipSet(nextSetId);
  return nextSet || TIPS_DATA[0];
};
