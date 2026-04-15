import { useParams, useNavigate } from 'react-router-dom';
import { modules } from '../data/modules';
import { getUser, updateUser } from '../utils/auth';
import Navbar from '../components/Navbar';

const levelColor = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
};

function DecisionTreeDiagram() {
  return (
    <div className="flex justify-center my-6">
      <svg viewBox="0 0 500 350" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
        {/* Lines */}
        <line x1="250" y1="55" x2="130" y2="145" stroke="#a5b4fc" strokeWidth="2" />
        <line x1="250" y1="55" x2="370" y2="145" stroke="#a5b4fc" strokeWidth="2" />
        <line x1="130" y1="175" x2="70" y2="265" stroke="#a5b4fc" strokeWidth="2" />
        <line x1="130" y1="175" x2="190" y2="265" stroke="#a5b4fc" strokeWidth="2" />
        <line x1="370" y1="175" x2="310" y2="265" stroke="#a5b4fc" strokeWidth="2" />
        <line x1="370" y1="175" x2="430" y2="265" stroke="#a5b4fc" strokeWidth="2" />

        {/* Branch labels */}
        <text x="175" y="95" className="text-xs" fill="#6366f1" fontWeight="bold">Yes</text>
        <text x="310" y="95" className="text-xs" fill="#ef4444" fontWeight="bold">No</text>
        <text x="82" y="215" className="text-xs" fill="#6366f1" fontWeight="bold">Yes</text>
        <text x="165" y="215" className="text-xs" fill="#ef4444" fontWeight="bold">No</text>
        <text x="322" y="215" className="text-xs" fill="#6366f1" fontWeight="bold">Yes</text>
        <text x="405" y="215" className="text-xs" fill="#ef4444" fontWeight="bold">No</text>

        {/* Root node */}
        <rect x="200" y="20" width="100" height="40" rx="8" fill="#6366f1" />
        <text x="250" y="45" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Age &gt; 30?</text>

        {/* Level 2 nodes */}
        <rect x="80" y="140" width="100" height="40" rx="8" fill="#818cf8" />
        <text x="130" y="165" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Income &gt; 50k?</text>

        <rect x="320" y="140" width="100" height="40" rx="8" fill="#818cf8" />
        <text x="370" y="165" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Student?</text>

        {/* Leaf nodes */}
        <rect x="30" y="260" width="80" height="35" rx="8" fill="#22c55e" />
        <text x="70" y="282" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Buy ✓</text>

        <rect x="150" y="260" width="80" height="35" rx="8" fill="#ef4444" />
        <text x="190" y="282" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Don't Buy ✗</text>

        <rect x="270" y="260" width="80" height="35" rx="8" fill="#22c55e" />
        <text x="310" y="282" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Buy ✓</text>

        <rect x="390" y="260" width="80" height="35" rx="8" fill="#ef4444" />
        <text x="430" y="282" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Don't Buy ✗</text>

        <text x="250" y="330" textAnchor="middle" fill="#64748b" fontSize="12">Example: Purchase Decision Tree</text>
      </svg>
    </div>
  );
}

function NeuralNetworkDiagram() {
  const inputY = [80, 140, 200, 260];
  const hiddenY = [60, 120, 180, 240, 300];
  const outputY = [130, 210];
  const inputX = 80, hiddenX = 250, outputX = 420;

  return (
    <div className="flex justify-center my-6">
      <svg viewBox="0 0 500 360" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
        {/* Input → Hidden lines */}
        {inputY.map((iy, i) =>
          hiddenY.map((hy, j) => (
            <line key={`ih-${i}-${j}`} x1={inputX} y1={iy} x2={hiddenX} y2={hy} stroke="#c7d2fe" strokeWidth="1" opacity="0.6" />
          ))
        )}
        {/* Hidden → Output lines */}
        {hiddenY.map((hy, i) =>
          outputY.map((oy, j) => (
            <line key={`ho-${i}-${j}`} x1={hiddenX} y1={hy} x2={outputX} y2={oy} stroke="#c7d2fe" strokeWidth="1" opacity="0.6" />
          ))
        )}

        {/* Input layer */}
        {inputY.map((y, i) => (
          <g key={`input-${i}`}>
            <circle cx={inputX} cy={y} r="18" fill="#6366f1" />
            <text x={inputX} y={y + 5} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">x{i + 1}</text>
          </g>
        ))}

        {/* Hidden layer */}
        {hiddenY.map((y, i) => (
          <g key={`hidden-${i}`}>
            <circle cx={hiddenX} cy={y} r="18" fill="#8b5cf6" />
            <text x={hiddenX} y={y + 5} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">h{i + 1}</text>
          </g>
        ))}

        {/* Output layer */}
        {outputY.map((y, i) => (
          <g key={`output-${i}`}>
            <circle cx={outputX} cy={y} r="18" fill="#a855f7" />
            <text x={outputX} y={y + 5} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">y{i + 1}</text>
          </g>
        ))}

        {/* Labels */}
        <text x={inputX} y={310} textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">Input</text>
        <text x={hiddenX} y={345} textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">Hidden</text>
        <text x={outputX} y={275} textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">Output</text>
      </svg>
    </div>
  );
}

export default function ModulePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mod = modules.find((m) => m.id === id);

  if (!mod) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Module not found</h1>
        </div>
      </div>
    );
  }

  const handleTakeQuiz = () => {
    const user = getUser();
    if (user) {
      const completed = user.completedModules || [];
      if (!completed.includes(id)) {
        const updated = [...completed, id];
        const streak = (user.streak || 0) + 1;
        const badges = [...(user.badges || [])];
        if (updated.length >= 1 && !badges.includes('first-step')) badges.push('first-step');
        if (streak >= 3 && !badges.includes('on-fire')) badges.push('on-fire');
        updateUser({ completedModules: updated, streak, badges });
      }
    }
    navigate(`/quiz/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${levelColor[mod.level]}`}>
            {mod.level}
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mt-3">{mod.title}</h1>
          <p className="text-gray-500 mt-2">{mod.description}</p>
        </div>

        {/* SVG Diagram */}
        {id === 'decision-trees' && <DecisionTreeDiagram />}
        {id === 'neural-networks' && <NeuralNetworkDiagram />}

        {/* Content sections */}
        <div className="space-y-6 mb-8">
          {mod.sections.map((sec, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                {sec.heading}
              </h2>
              <p className="text-gray-600 leading-relaxed">{sec.body}</p>
            </div>
          ))}
        </div>

        {/* Quiz button */}
        <button
          onClick={handleTakeQuiz}
          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-8 py-3 font-medium transition-colors text-lg"
        >
          Take Quiz →
        </button>
      </div>
    </div>
  );
}
