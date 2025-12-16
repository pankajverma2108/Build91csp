import type { Meeting } from '../types/api';

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: '675d8901830cece9e4fab401',
    projectid: 'proj-123',
    phaseid: {
      id: 'phase-planning',
      name: 'Planning & Design',
      typeofphase: 'planninganddesign',
    },
    title: 'Design Verification Meeting',
    description: 'Reviewed current design mockups and user flow',
    summary:
      'We reviewed the latest design mockups for the China Sourcing Portal. The team discussed UI improvements, responsive design considerations, and user experience enhancements. Client provided positive feedback with minor adjustments requested for the navigation structure.',
    scheduledat: '2024-12-08T14:00:00.000Z',
    status: 'completed',
    attendees: [
      { name: 'Pankaj Verma', email: 'pankaj@company.com', role: 'Admin' },
      { name: 'Upmanyu', email: 'upmanyu@company.com', role: 'Designer' },
      { name: 'John Anderson', email: 'john@company.com', role: 'Customer' },
      { name: 'Sarah Chen', email: 'sarah@company.com', role: 'Developer' },
    ],
    actionitems: [
      {
        text: 'Update navigation menu by Dec 10',
        assignee: 'Pankaj Verma',
        duedate: '2024-12-10',
        completed: false,
      },
      {
        text: 'Review color palette for WCAG AA compliance',
        assignee: 'Upmanyu',
        completed: false,
      },
      {
        text: 'Prepare mobile mockups for next review',
        assignee: 'Sarah Chen',
        duedate: '2024-12-12',
        completed: true,
      },
    ],
    linkeddocuments: [
      {
        id: 'doc-1',
        filename: 'DesignMockupsv3.pdf',
        filesize: 1258291,
        filetype: 'application/pdf',
      },
      {
        id: 'doc-2',
        filename: 'UserFlowDiagram.pdf',
        filesize: 856432,
        filetype: 'application/pdf',
      },
    ],
    createdby: { id: 'admin-1', name: 'Admin User' },
    createdAt: '2024-12-08T14:00:00.000Z',
    updatedAt: '2024-12-08T16:30:00.000Z',
  },
  {
    id: '675d8902830cece9e4fab402',
    projectid: 'proj-123',
    phaseid: {
      id: 'phase-travel',
      name: 'Travel',
      typeofphase: 'travel',
    },
    title: 'Visa Application Progress Review',
    description: 'Discussed visa application status and next steps',
    summary:
      'Current visa application is in progress with the consulate. We reviewed all submitted documents and identified a few items that need clarification. The consulate has requested additional proof of business purpose and updated travel itinerary. Timeline is still on track for approval by end of December if documents are submitted promptly.',
    scheduledat: '2024-12-05T10:30:00.000Z',
    status: 'completed',
    attendees: [
      { name: 'Upmanyu', role: 'Customer' },
      { name: 'John Anderson', role: 'Travel Coordinator' },
      { name: 'Wei Chen', role: 'Visa Agent' },
    ],
    actionitems: [
      {
        text: 'Submit additional business documentation',
        assignee: 'Upmanyu',
        duedate: '2024-12-12',
        completed: false,
      },
      {
        text: 'Follow up with consulate representative',
        assignee: 'John Anderson',
        completed: false,
      },
      {
        text: 'Prepare backup travel dates if needed',
        assignee: 'Wei Chen',
        completed: false,
      },
    ],
    linkeddocuments: [
      {
        id: 'doc-3',
        filename: 'Visa_Application_Form.pdf',
        filesize: 524288,
        filetype: 'application/pdf',
      },
      {
        id: 'doc-4',
        filename: 'Business_Invitation_Letter.pdf',
        filesize: 234567,
        filetype: 'application/pdf',
      },
    ],
    createdby: { id: 'admin-1', name: 'Admin User' },
    createdAt: '2024-12-05T10:30:00.000Z',
    updatedAt: '2024-12-05T12:00:00.000Z',
  },
  {
    id: '675d8903830cece9e4fab403',
    projectid: 'proj-123',
    phaseid: {
      id: 'phase-shopping',
      name: 'Shopping',
      typeofphase: 'shopping',
    },
    title: 'Budget and Timeline Planning',
    description: 'Planned project budget allocation and timeline milestones',
    summary:
      'Detailed planning session for project budget and timeline. Discussed payment milestones, supplier payment terms, and contingency planning. Established clear timeline for each phase with buffer periods for potential delays. Budget approved with 10% contingency for unexpected costs.',
    scheduledat: '2024-12-12T11:00:00.000Z',
    status: 'scheduled',
    attendees: [
      { name: 'Pankaj Verma', role: 'Project Manager' },
      { name: 'Sarah Chen', role: 'Financial Analyst' },
      { name: 'Upmanyu', role: 'Customer' },
    ],
    actionitems: [
      {
        text: 'Finalize payment schedule with suppliers',
        assignee: 'Pankaj Verma',
        duedate: '2024-12-18',
        completed: false,
      },
      {
        text: 'Update project timeline document',
        assignee: 'Sarah Chen',
        completed: false,
      },
      {
        text: 'Prepare budget presentation for stakeholders',
        assignee: 'Pankaj Verma',
        duedate: '2024-12-20',
        completed: false,
      },
    ],
    linkeddocuments: [
      {
        id: 'doc-5',
        filename: 'Budget_Plan_Draft.xlsx',
        filesize: 156789,
        filetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      {
        id: 'doc-6',
        filename: 'Timeline_Gantt_Chart.pdf',
        filesize: 678901,
        filetype: 'application/pdf',
      },
    ],
    createdby: { id: 'admin-1', name: 'Admin User' },
    createdAt: '2024-12-10T09:00:00.000Z',
    updatedAt: '2024-12-10T09:00:00.000Z',
  },
];
