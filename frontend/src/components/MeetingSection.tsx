import { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, FileText, ExternalLink, CheckCircle2, Circle } from 'lucide-react';
import { MOCK_MEETINGS } from '../mock/mockMeetings';
import type { Meeting } from '../types/api';

export function MeetingSection() {
  const [expandedMeetings, setExpandedMeetings] = useState<string[]>([MOCK_MEETINGS[0]?.id]);
  const meetings = MOCK_MEETINGS;

  const toggleMeeting = (meetingId: string) => {
    setExpandedMeetings((prev) =>
      prev.includes(meetingId)
        ? prev.filter((id) => id !== meetingId)
        : [...prev, meetingId]
    );
  };

  const getStatusColor = (status: Meeting['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="bg-card border-2 border-slate-300 rounded-lg p-4 md:p-6">
      <h2 className="text-foreground font-semibold mb-4 flex items-center gap-2">
        Meeting Records
        <Calendar className="w-5 h-5 text-muted-foreground" />
      </h2>

      <div className="space-y-3">
        {meetings.map((meeting) => {
          const isExpanded = expandedMeetings.includes(meeting.id);
          return (
            <div
              key={meeting.id}
              className="border-2 border-slate-300 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
            >
              {/* Meeting Header */}
              <button
                onClick={() => toggleMeeting(meeting.id)}
                className="w-full p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors text-left"
              >
                <Calendar className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(meeting.scheduledat)} at {formatTime(meeting.scheduledat)}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border-2 font-medium ${getStatusColor(
                        meeting.status
                      )}`}
                    >
                      {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                    </span>
                    {meeting.phaseid && (
                      <span className="text-xs px-2 py-0.5 rounded-full border-2 bg-slate-100 text-slate-700 border-slate-300 font-medium">
                        {meeting.phaseid.name}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground">{meeting.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{meeting.description}</p>
                </div>
                <div className="shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t-2 border-slate-300 bg-slate-50 p-4 space-y-4">
                  {/* Meeting Summary */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-2">Meeting Summary</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{meeting.summary}</p>
                  </div>

                  {/* Meeting Attendees */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-2">Meeting Attendees</h4>
                    <div className="flex flex-wrap gap-2">
                      {meeting.attendees.map((attendee, idx) => (
                        <div
                          key={idx}
                          className="bg-white border-2 border-slate-300 px-3 py-1.5 rounded-full text-sm"
                        >
                          <span className="font-medium text-foreground">{attendee.name}</span>
                          <span className="text-muted-foreground"> • {attendee.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Items */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-2">Action Items</h4>
                    <div className="space-y-2">
                      {meeting.actionitems.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-white border-2 border-slate-300 p-3 rounded-lg flex items-start gap-2"
                        >
                          {item.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm ${
                                item.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                              }`}
                            >
                              {item.text}
                            </p>
                            {item.duedate && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Due: {formatDate(item.duedate)}
                                {item.assignee && ` • Assigned to: ${item.assignee}`}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Linked Documents */}
                  {meeting.linkeddocuments && meeting.linkeddocuments.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">Linked Documents</h4>
                      <div className="space-y-2">
                        {meeting.linkeddocuments.map((doc) => (
                          <div
                            key={doc.id}
                            className="bg-white border-2 border-slate-300 p-3 rounded-lg flex items-center gap-3 hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{doc.filename}</p>
                              <p className="text-xs text-muted-foreground">{formatFileSize(doc.filesize)}</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
