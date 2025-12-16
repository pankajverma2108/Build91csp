import React from "react";
import { Phone, Mail } from "lucide-react";

export function ContactTeam() {
  const teamMembers = [
    {
      id: 1,
      name: "Pankaj Verma",
      role: "Designer",
      phone: "+91 98765 43210",
      email: "pankaj@chinasourcing.com",
      avatar: "PV",
      color: "blue",
    },
    {
      id: 2,
      name: "Upmanyu",
      role: "Consultant",
      phone: "+91 98765 43211",
      email: "upmanyu@chinasourcing.com",
      avatar: "UP",
      color: "emerald",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-600",
        border: "border-blue-600",
        cardBg: "bg-blue-50",
      },
      emerald: {
        bg: "bg-emerald-600",
        border: "border-emerald-600",
        cardBg: "bg-emerald-50",
      },
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="bg-card border-2 border-slate-300 rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-foreground font-semibold">Meet Your Crew</h2>
        <span className="text-lg">👥</span>
      </div>

      <div className="space-y-3">
        {teamMembers.map((member) => {
          const colorClasses = getColorClasses(member.color);
          return (
            <div
              key={member.id}
              className="flex items-center gap-3 p-3 border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              {/* Avatar */}
              <div
                className={`w-12 h-12 md:w-14 md:h-14 ${colorClasses.bg} rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-slate-300`}
              >
                <span className="text-white font-bold text-sm md:text-base">
                  {member.avatar}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm md:text-base">
                  {member.name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-2 font-medium">
                  {member.role}
                </p>

                <div className="space-y-1.5">
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{member.phone}</span>
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
