export type CaseStatus = 'Active' | 'Closed' | 'Pending' | 'On Hold';
export type CasePriority = 'High' | 'Medium' | 'Low';
export type TaskStatus = 'Todo' | 'In Progress' | 'Review' | 'Completed';

export interface Case {
  id: string;
  title: string;
  clientName: string;
  type: string;
  status: CaseStatus;
  priority: CasePriority;
  assignedTo: string;
  openDate: string;
  lastUpdate: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  casesCount: number;
  lastActive: string;
  status: 'Active' | 'Inactive';
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  priority: CasePriority;
  caseId: string;
  caseName?: string;
  status: TaskStatus;
  assignedTo?: string;
}

export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  location?: string;
  description?: string;
}

export interface Associate {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  taskCount: number;
  completedTasks: number;
  efficiency: number;
  load: number;
  specialization: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  joined: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  category: 'Firm News' | 'Policy' | 'Social' | 'Urgent';
  image?: string;
}

export interface SharedResource {
  id: string;
  title: string;
  type: 'Template' | 'Policy' | 'Handbook' | 'Guidelines';
  category: string;
  lastUpdated: string;
  downloadUrl: string;
}

export interface NavItem {
  title: string;
  icon: React.ElementType;
  id: string;
}