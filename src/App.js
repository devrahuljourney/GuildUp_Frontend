import './App.css';
import SubjectAndReceipentMail from './component/SubjectAndReceipentMail';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2e2e2e] text-white font-sans p-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-[#2a2a2a] rounded-2xl shadow-2xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#B9FD50]">
          📧 Email Scheduler
        </h1>
        <SubjectAndReceipentMail />
      </div>
    </div>
  );
}

export default App;
