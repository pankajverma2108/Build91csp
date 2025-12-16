import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/Layout";
import { Projects } from "./routes/Projects";
import { Documents } from "./routes/Documents";
import { Login } from "./routes/Login";
import { AuthCallback } from "./routes/AuthCallback";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Protected Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/projects" replace />} />
            <Route path="projects" element={<Projects />} />
            <Route path="documents" element={<Documents />} />
          </Route>

          {/* Catch all - redirect to projects */}
          <Route path="*" element={<Navigate to="/projects" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;


// import React, { useState } from 'react';
// import { Header } from './components/Header';
// import { FilterBar } from './components/FilterBar';
// import { WelcomeBanner } from './components/WelcomeBanner';
// import { KPICards } from './components/KPICards';
// import { PhaseCards } from './components/PhaseCards';
// import { MeetingSection } from './components/MeetingSection';
// import { DocumentsFiles } from './components/DocumentsFiles';
// import { ContactTeam } from './components/ContactTeam';
// import { ChatSessions } from './components/ChatSessions';

// export default function App() {
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [filterPhase, setFilterPhase] = useState<string>('all');

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       <FilterBar
//         viewMode={viewMode}
//         setViewMode={setViewMode}
//         filterPhase={filterPhase}
//         setFilterPhase={setFilterPhase}
//       />

//       <main className="max-w-[1920px] mx-auto">
//         <WelcomeBanner />
        
//         <div className="px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6">
//           <KPICards />
//           <PhaseCards filterPhase={filterPhase} viewMode={viewMode} />
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
//             <ContactTeam />
//             <ChatSessions />
//           </div>
//           <MeetingSection />
//           <DocumentsFiles />
//         </div>
//       </main>
//     </div>
//   );
// }