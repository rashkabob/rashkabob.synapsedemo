import { PriorityItem, StockTicker, MeetingConflict, WorkspaceUpdate, CompletedItem } from './types';

export const INITIAL_PRIORITIES: PriorityItem[] = [
  {
    id: 'p1',
    title: 'Review Q4 budget proposal',
    completed: false,
    priorityLevel: 'high',
    tag: 'Finance',
  },
  {
    id: 'p2',
    title: 'Finalize sprint planning',
    completed: true,
    priorityLevel: 'high',
    tag: 'Sprint',
  },
  {
    id: 'p3',
    title: 'Prepare AI demo for executive review',
    completed: false,
    priorityLevel: 'medium',
    tag: 'Demo',
  },
];

export const INITIAL_STOCKS: StockTicker[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA',
    price: 123.45,
    changePercent: 5.0,
    isPositive: true,
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 123.45,
    changePercent: -2.0,
    isPositive: false,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet',
    price: 123.45,
    changePercent: 1.0,
    isPositive: true,
  },
];

export const SUGGESTED_PROMPTS = [
  "What are today's updates that I should know about?",
  "Schedule a progress check with the team",
  "Show my team schedule for this week",
  "Summarize priorities and blockers for this week",
];

export const MEETING_CONFLICTS: MeetingConflict[] = [
  {
    id: 'c1',
    title: 'Meeting Conflict from 2:00 - 3:00 PM',
    description: 'Design Review is overlapping with Client Demo',
    priority: 'High Priority',
    time: '2:00 PM - 3:00 PM',
    platform: 'teams',
    proposedOption: {
      optionNumber: 1,
      title: 'Move Design Review to 3:30 PM',
      targetEvent: 'Design Review with Product Team',
      sourceApp: 'Microsoft Teams',
      status: 'Proposed',
      timeRange: '3:30 - 4:30 PM EST',
      startHour: 2,
      endHour: 5,
      proposedStart: '3:30 PM',
      proposedEnd: '4:30 PM',
      attendees: [
        { initials: 'AK', name: 'Alex Kim' },
        { initials: 'SL', name: 'Sarah Lin' },
        { initials: 'MJ', name: 'Mark Jensen' },
      ],
    },
  },
  {
    id: 'c2',
    title: 'Meeting Overlap by 30 minutes',
    description: 'Sprint Planning is overlapping your 1:1 w/ Jordan',
    priority: 'Medium Priority',
    time: '10:00 AM - 10:30 AM',
    platform: 'teams',
    proposedOption: {
      optionNumber: 1,
      title: 'Move 1:1 to 10:30 AM',
      targetEvent: '1:1 with Jordan',
      sourceApp: 'Teams',
      status: 'Proposed',
      timeRange: '10:30 - 11 AM EST',
      startHour: 9,
      endHour: 11,
      proposedStart: '10:30 AM',
      proposedEnd: '11:00 AM',
      attendees: [
        { initials: 'CM', name: 'Chris Miller' },
        { initials: 'JL', name: 'Jordan Lee' },
      ],
    },
  },
];

export const WORKSPACE_UPDATES: WorkspaceUpdate[] = [
  {
    id: 'u1',
    type: 'slack',
    title: '#design-system',
    channelOrSender: '#design-system',
    messagesCount: 15,
    mentionsCount: 4,
    timeAgo: '8 minutes ago',
    source: 'Slack',
    summary:
      'The design system refactoring is 75% complete. Key components including buttons, forms, and navigation have been updated. Remaining work includes data tables and chart components, estimated 3-4 days. No blockers identified.',
    fullDetails:
      'Thread in #design-system: Discussed token unification with Figma variables, accessibility contrast checks passing AA standard across all 48 new interactive state variants.',
  },
  {
    id: 'u2',
    type: 'email',
    title: 'Email from Jensen',
    channelOrSender: 'Jensen Huang (CEO Office)',
    timeAgo: 'Last synced 2 min ago',
    source: 'Outlook',
    summary:
      'Jensen shared updates on the Q4 planning timeline and requested feedback on the revised milestones.',
    fullDetails:
      'Subject: Q4 Roadmap & AI Architecture Sync\n"Team, please review the attached updated milestones for NVIDIA Synapse rollout and ensure platform teams align on inference latency targets before next Tuesday."',
  },
];

export const COMPLETED_ITEMS: CompletedItem[] = [
  {
    id: 'ci1',
    type: 'jira',
    platformName: 'Jira',
    title: 'Authentication module implementation',
    status: 'Done',
    tags: ['PROJ-456', 'RW'],
    source: 'Jira',
  },
  {
    id: 'ci2',
    type: 'priority',
    platformName: 'Priorities',
    title: 'Stakeholder approval on design mockups',
    status: 'Done',
    tags: ['Design', 'High'],
    source: 'Priorities',
  },
];
