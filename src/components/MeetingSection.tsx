import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, FileText, ExternalLink } from 'lucide-react';

interface Meeting {
  id: number;
  date: string;
  time: string;
  type: 'Discussion' | 'Review' | 'Planning';
  title: string;
  description: string;
  summary: string;
  attendees: string[];
  actionItems: { text: string; dueDate?: string }[];
  linkedDocuments: { name: string; icon?: string }[];
}

export function MeetingSection() {
  const [expandedMeetings, setExpandedMeetings] = useState<number[]>([1]);

  const meetings: Meeting[] = [
    {
      id: 1,
      date: 'Dec 5, 2025',
      time: '10:30 AM',
      type: 'Discussion',
      title: 'Visa Application Progress Review',
      description: 'Discussed visa application status and next...',
      summary:
        'Current visa application is in progress with the consulate. We reviewed all submitted documents and identified a few items that need clarification. The consulate has requested additional proof of business purpose and updated travel itinerary. Timeline is still on track for approval by end of December if documents are submitted promptly.',
      attendees: ['Upmanyu', 'John Anderson', 'Travel Coordinator'],
      actionItems: [
        { text: 'Submit additional business documentation', dueDate: 'by Dec 12' },
        { text: 'Upmanyu to follow up with consulate representative' },
        { text: 'Prepare backup travel dates if needed' },
        { text: 'Update travel insurance to match new dates' }
      ],
      linkedDocuments: [
        { name: 'Visa_Application_Form.pdf' },
        { name: 'Business_Invitation_Letter.pdf' }
      ]
    },
    {
      id: 2,
      date: 'Dec 10, 2025',
      time: '2:00 PM',
      type: 'Review',
      title: 'Design Specifications Review',
      description: 'Reviewed product design specifications and...',
      summary:
        'Comprehensive review of all product design specifications. Team discussed material choices, color palette, and manufacturing constraints. Client provided positive feedback on initial designs with minor adjustments requested for the packaging design.',
      attendees: ['Upmanyu', 'Wei Chen', 'Sarah Chen'],
      actionItems: [
        { text: 'Update packaging design with client feedback', dueDate: 'by Dec 15' },
        { text: 'Finalize material samples for approval' },
        { text: 'Schedule factory visit for production planning' }
      ],
      linkedDocuments: [
        { name: 'Design_Specs_v2.pdf' },
        { name: 'Material_Samples.pdf' }
      ]
    },
    {
      id: 3,
      date: 'Dec 12, 2025',
      time: '11:00 AM',
      type: 'Planning',
      title: 'Budget and Timeline Planning',
      description: 'Planned project budget allocation and...',
      summary:
        'Detailed planning session for project budget and timeline. Discussed payment milestones, supplier payment terms, and contingency planning. Established clear timeline for each phase with buffer periods for potential delays.',
      attendees: ['Pankaj Verma', 'Sarah Chen'],
      actionItems: [
        { text: 'Finalize payment schedule with suppliers', dueDate: 'by Dec 18' },
        { text: 'Update project timeline document' },
        { text: 'Prepare budget presentation for stakeholders' }
      ],
      linkedDocuments: [
        { name: 'Budget_Plan_Draft.xlsx' },
        { name: 'Timeline_Gantt_Chart.pdf' }
      ]
    }
  ];

  const toggleMeeting = (meetingId: number) => {
    setExpandedMeetings((prev) =>
      prev.includes(meetingId)
        ? prev.filter((id) => id !== meetingId)
        : [...prev, meetingId]
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Discussion':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Review':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Planning':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="bg-card border-2 border-slate-300 rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-foreground font-semibold">Meeting Records</h2>
        <span className="text-lg">📅</span>
      </div>

      <div className="space-y-2">
        {meetings.map((meeting) => {
          const isExpanded = expandedMeetings.includes(meeting.id);

          return (
            <div
              key={meeting.id}
              className="border-2 border-slate-300 rounded-lg overflow-hidden bg-blue-50/30 hover:border-slate-400 transition-colors"
            >
              {/* Meeting Header */}
              <div
                className="p-3 cursor-pointer"
                onClick={() => toggleMeeting(meeting.id)}
              >
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-slate-600" />
                    <span className="text-slate-900 font-medium">
                      {meeting.date} at {meeting.time}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold border ${getTypeColor(
                        meeting.type
                      )}`}
                    >
                      {meeting.type}
                    </span>
                  </div>
                  <button className="text-slate-600 hover:text-slate-900">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <h3 className="font-bold text-slate-900 mb-0.5">{meeting.title}</h3>
                <p className="text-sm text-slate-600">{meeting.description}</p>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-3 pb-3 space-y-3 border-t border-slate-300 pt-3">
                  {/* Meeting Summary */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1.5">Meeting Summary</h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {meeting.summary}
                    </p>
                  </div>

                  {/* Meeting Attendees */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1.5">Meeting Attendees</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {meeting.attendees.map((attendee, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-white text-blue-700 rounded-full text-sm font-medium border border-blue-300"
                        >
                          {attendee}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Items */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1.5">Action Items</h4>
                    <ul className="space-y-1.5">
                      {meeting.actionItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                          <span className="text-slate-700">
                            {item.text}
                            {item.dueDate && (
                              <span className="text-slate-500"> {item.dueDate}</span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Linked Documents */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1.5">Linked Documents</h4>
                    <div className="space-y-1.5 mb-2">
                      {meeting.linkedDocuments.map((doc, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-blue-700 hover:underline cursor-pointer"
                        >
                          <FileText className="w-4 h-4" />
                          <span>{doc.name}</span>
                        </div>
                      ))}
                    </div>
                    <button className="flex items-center gap-1 text-sm text-blue-600 font-semibold hover:underline">
                      <span>Open all meeting documents</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}