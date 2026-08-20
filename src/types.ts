export interface PriorityItem {
  id: string;
  title: string;
  completed: boolean;
  priorityLevel: 'high' | 'medium' | 'low';
  tag?: string;
}

export interface StockTicker {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  isPositive: boolean;
}

export interface MeetingConflict {
  id: string;
  title: string;
  description: string;
  priority: 'High Priority' | 'Medium Priority' | 'Low Priority';
  time: string;
  platform: 'teams' | 'gcal' | 'zoom';
  proposedOption?: {
    optionNumber: number;
    title: string;
    targetEvent: string;
    sourceApp: string;
    status: string;
    timeRange: string;
    startHour: number;
    endHour: number;
    proposedStart: string;
    proposedEnd: string;
    attendees: Array<{ initials: string; name: string }>;
  };
}

export interface WorkspaceUpdate {
  id: string;
  type: 'slack' | 'email';
  title: string;
  channelOrSender: string;
  messagesCount?: number;
  mentionsCount?: number;
  timeAgo: string;
  summary: string;
  fullDetails?: string;
  source: 'Slack' | 'Outlook';
}

export interface CompletedItem {
  id: string;
  type: 'jira' | 'priority';
  platformName: string;
  title: string;
  status: string;
  tags: string[];
  source: 'Jira' | 'Priorities';
}

export type SourceType = 'All' | 'Jira' | 'Slack' | 'Outlook' | 'GCal';
