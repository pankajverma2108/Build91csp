// import React from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';

export function ChatSessions() {
  const chatMessages = [
    {
      id: 1,
      sender: 'Pankaj Verma',
      message: 'Hi Sarah! I\'ve reviewed the design samples you uploaded.',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      message: 'Great! What do you think?',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Pankaj Verma',
      message: 'They look good! Just need some minor adjustments to the color scheme. I\'ll send the updated specs by EOD.',
      timestamp: '10:35 AM',
      isOwn: false
    },
    {
      id: 4,
      sender: 'You',
      message: 'Perfect, thanks!',
      timestamp: '10:36 AM',
      isOwn: true
    }
  ];

  return (
    <div className="bg-card border-2 border-slate-300 rounded-lg p-4 md:p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-foreground font-semibold">Project Chat</h2>
          <span className="text-lg">💬</span>
        </div>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors p-1.5 hover:bg-muted rounded-md"
          title="Open in WhatsApp"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Chat History */}
      <div className="flex-1 space-y-3 mb-4 max-h-64 md:max-h-80 overflow-y-auto custom-scrollbar">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] md:max-w-[70%] rounded-lg px-3 md:px-4 py-2.5 ${
                msg.isOwn
                  ? 'bg-blue-600 text-white border-2 border-blue-700'
                  : 'bg-slate-50 text-foreground border-2 border-slate-300'
              }`}
            >
              {!msg.isOwn && (
                <div className="text-xs font-bold mb-1 text-blue-600">{msg.sender}</div>
              )}
              <p className="text-sm md:text-base">{msg.message}</p>
              <div className={`text-xs mt-1.5 ${msg.isOwn ? 'text-blue-100' : 'text-muted-foreground'}`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp CTA */}
      <button
        onClick={() => window.open('https://wa.me/919876543210', '_blank')}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold shadow-sm border-2 border-emerald-700"
      >
        <MessageCircle className="w-4 h-4" />
        <span>Continue Chat on WhatsApp</span>
      </button>
    </div>
  );
}