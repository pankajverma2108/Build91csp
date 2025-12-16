import type { Project } from "../types/project";
import type { Phase } from "../types/phases";
import { PHASE_CONFIG } from "../config/phases";

const phases: Phase[] = [
    {
      id: 'onboarding',
      number: PHASE_CONFIG.onboarding.order,
      title: PHASE_CONFIG.onboarding.label,
      status: 'completed',
      progress: 100,
      tasks: [
        { id: 't1', name: 'Upload signed agreement', status: 'completed', completedDate: 'Dec 5, 2025' },
        { id: 't2', name: 'Confirm your details', status: 'completed', completedDate: 'Dec 6, 2025' },
        { id: 't3', name: 'Initial payment', status: 'completed', completedDate: 'Dec 7, 2025' }
      ],
      poc: { name: 'Pankaj Verma', role: 'Account Manager', phone: '+91 98765 43210', email: 'pankaj@chinasourcing.com' },
      meetings: 2,
      messages: 8,
      documents: [
        { name: 'Contract_Agreement.pdf', size: '2.4 MB' },
        { name: 'KYC_Documents.pdf', size: '1.8 MB' },
        { name: 'Payment_Receipt.pdf', size: '856 KB' }
      ]
    },
    {
      id: 'planning',
      number: PHASE_CONFIG.planning.order,
      title: PHASE_CONFIG.planning.label,
      status: 'in-progress',
      progress: 65,
      tasks: [
        { id: 't4', name: 'Upload product specs', status: 'completed', completedDate: 'Dec 10, 2025' },
        {
          id: 't5',
          name: 'Design approval',
          status: 'in-progress',
          subtasks: [
            { id: 't5a', name: 'Review color palette', status: 'completed', completedDate: 'Dec 11, 2025' },
            { id: 't5b', name: 'Approve packaging design', status: 'in-progress' },
            { id: 't5c', name: 'Finalize logo placement', status: 'pending' }
          ]
        },
        { 
          id: 't6', 
          name: 'Budget confirmation', 
          status: 'in-progress',
          subtasks: [
            { id: 't6a', name: 'Review cost breakdown', status: 'completed', completedDate: 'Dec 12, 2025' },
            { id: 't6b', name: 'Approve final budget', status: 'in-progress' }
          ]
        },
        { id: 't7', name: 'Material selection', status: 'pending' }
      ],
      poc: { name: 'Upmanyu', role: 'Design Consultant', phone: '+91 98765 43211', email: 'upmanyu@chinasourcing.com' },
      meetings: 3,
      messages: 15,
      documents: [
        { name: 'Design_Specs.pdf', size: '3.2 MB' },
        { name: 'Budget_Plan.xlsx', size: '124 KB' },
        { name: 'Material_Samples.pdf', size: '1.5 MB' },
        { name: 'Color_Swatches.pdf', size: '890 KB' },
        { name: 'Technical_Drawings.pdf', size: '4.1 MB' }
      ]
    },
    {
      id: 'travel',
      number: PHASE_CONFIG.travel.order,
      title: PHASE_CONFIG.travel.label,
      status: 'in-progress',
      progress: 30,
      tasks: [
        { id: 't8', name: 'Book flights', status: 'completed', completedDate: 'Dec 8, 2025' },
        { id: 't9', name: 'Hotel reservation', status: 'in-progress' },
        { id: 't10', name: 'Visa application', status: 'pending' }
      ],
      poc: { name: 'Wei Chen', role: 'Travel Coordinator', phone: '+86 139 0000 0000', email: 'wei.chen@chinasourcing.com' },
      meetings: 1,
      messages: 5,
      documents: [
        { name: 'Flight_Tickets.pdf', size: '450 KB' },
        { name: 'Visa_Application.pdf', size: '1.2 MB' }
      ]
    },
    {
      id: 'shopping',
      number: PHASE_CONFIG.shopping.order,
      title: PHASE_CONFIG.shopping.label,
      status: 'pending',
      progress: 0,
      tasks: [
        { id: 't11', name: 'Market research', status: 'pending' },
        { id: 't12', name: 'Supplier visits', status: 'pending' },
        { id: 't13', name: 'Product selection', status: 'pending' }
      ],
      poc: { name: 'Sarah Chen', role: 'Shopping Coordinator', phone: '+86 139 0000 0001', email: 'sarah.chen@chinasourcing.com' },
      meetings: 0,
      messages: 0,
      documents: [
        { name: 'Market_Research_Guide.pdf', size: '2.1 MB' }
      ]
    },
    {
      id: 'ordering',
      number: PHASE_CONFIG.ordering.order,
      title: PHASE_CONFIG.ordering.label,
      status: 'pending',
      progress: 0,
      tasks: [
        { id: 't14', name: 'Purchase order creation', status: 'pending' },
        { id: 't15', name: 'Order confirmation', status: 'pending' },
        { id: 't16', name: 'Payment processing', status: 'pending' }
      ],
      meetings: 0,
      messages: 0,
      documents: []
    },
    {
      id: 'production',
      number: PHASE_CONFIG.production.order,
      title: PHASE_CONFIG.production.label,
      status: 'pending',
      progress: 0,
      tasks: [
        { id: 't17', name: 'Manufacturing started', status: 'pending' },
        { id: 't18', name: 'Quality checks', status: 'pending' },
        { id: 't19', name: 'Final inspection', status: 'pending' }
      ],
      meetings: 0,
      messages: 0,
      documents: []
    },
    {
      id: 'deliver',
      number: PHASE_CONFIG.deliver.order,
      title: PHASE_CONFIG.deliver.label,
      status: 'pending',
      progress: 0,
      tasks: [
        { id: 't20', name: 'Shipping arrangement', status: 'pending' },
        { id: 't21', name: 'Customs clearance', status: 'pending' },
        { id: 't22', name: 'Final delivery', status: 'pending' }
      ],
      meetings: 0,
      messages: 0,
      documents: []
    },
    {
      id: 'installation',
      number: PHASE_CONFIG.installation.order,
      title: PHASE_CONFIG.installation.label,
      status: 'pending',
      progress: 0,
      tasks: [
        { id: 't23', name: 'Installation scheduling', status: 'pending' },
        { id: 't24', name: 'Installation complete', status: 'pending' },
        { id: 't25', name: 'Final handover', status: 'pending' }
      ],
      meetings: 0,
      messages: 0,
      documents: []
    }
  ];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-123",
    customerid: {
      id: "customer-1",
      name: "Upmanyu",
      email: "upmanyu@example.com",
    },
    adminid: {
      id: "admin-1",
      name: "Admin User",
      email: "admin@chinasourcing.com",
    },
    projecttype: "Furniture Sourcing",
    projectdescription: "Complete 3BHK apartment furnishing with modern Italian furniture",
    projectlevelbudget: 1500000,
    location: "Mumbai",
    status: "active",
    currentphase: "planninganddesign",
    estimatedstartdate: "2024-01-15T00:00:00.000Z",
    estimatedcompletedate: "2024-06-15T00:00:00.000Z",
    ordervalue: 1800000,
    createdAt: "2024-12-01T00:00:00.000Z",
    updatedAt: "2024-12-15T00:00:00.000Z",
  },
];

