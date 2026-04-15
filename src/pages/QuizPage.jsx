import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizzes } from '../data/quizzes';
import { getUser, updateUser } from '../utils/auth';
import Navbar from '../components/Navbar';

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const questions = quizzes[id] || [];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800">No quiz found for this module</h1>
        </div>
      </div>
    );
  }

  const q = questions[current];

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.answer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      // Quiz finished
      const finalScore = score + (selected === q.answer ? 0 : 0); // score already updated
      const xp = score * 10 + (selected === q.answer && selected !== null ? 0 : 0);
      const user = getUser();
      if (user) {
        const newScore = (user.score || 0) + score * 10;
        const completed = user.completedModules || [];
        if (!completed.includes(id)) completed.push(id);
        const badges = [...(user.badges || [])];
        if (newScore >= 100 && !badges.includes('quiz-master')) badges.push('quiz-master');
        if (completed.length >= 1 && !badges.includes('first-step')) badges.push('first-step');
        updateUser({ score: newScore, completedModules: completed, badges });
      }
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <span className="text-5xl block mb-4">🎉</span>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
            <p className="text-4xl font-bold text-indigo-600 mb-2">
              {score} / {questions.length}
            </p>
            <p className="text-gray-500 mb-6">You earned {score * 10} XP</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-2.5 font-medium transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-medium text-gray-500">
            Question {current + 1} of {questions.length}
          </p>
          <div className="w-48 bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">{q.q}</h2>
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              let cls = 'border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50';
              if (selected !== null) {
                if (idx === q.answer) cls = 'border-2 border-green-500 bg-green-50';
                else if (idx === selected) cls = 'border-2 border-red-500 bg-red-50';
                else cls = 'border border-gray-200 opacity-60';
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selected !== null}
                  className={`w-full text-left p-4 rounded-lg transition-all ${cls}`}
                >
                  <span className="font-medium text-gray-700">
                    {String.fromCharCode(65 + idx)}.{' '}
                  </span>
                  <span className="text-gray-700">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation + Next */}
        {selected !== null && (
          <div className="space-y-4">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <p className="text-sm font-medium text-indigo-800 mb-1">
                {selected === q.answer ? '✅ Correct!' : '❌ Incorrect'}
              </p>
              <p className="text-sm text-indigo-700">{q.explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-2.5 font-medium transition-colors"
            >
              {current + 1 < questions.length ? 'Next Question →' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
