import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getUser, updateUser } from '../utils/auth';
import Navbar from '../components/Navbar';

const emails = [
  { text: 'Congratulations! You won $1,000,000! Click here to claim your prize now!', isSpam: true },
  { text: 'Hi, the meeting has been rescheduled to 3 PM tomorrow. Please confirm your attendance.', isSpam: false },
  { text: 'URGENT: Your account will be suspended! Verify your password immediately at this link.', isSpam: true },
  { text: 'Hey, just wanted to check in on the project status. Can we sync up this afternoon?', isSpam: false },
  { text: 'FREE viagra and weight loss pills! Limited time offer — buy now, no prescription needed!!!', isSpam: true },
  { text: 'Please find attached the quarterly report. Let me know if you have any questions.', isSpam: false },
  { text: 'You have been selected for a $500 Walmart gift card! Click below to claim before it expires!', isSpam: true },
  { text: 'Reminder: Your dentist appointment is scheduled for Friday at 10 AM.', isSpam: false },
  { text: 'Make $$$ working from home! No experience needed! Guaranteed income!!!', isSpam: true },
  { text: "Hi team, I've pushed the latest code changes to the repo. Please review when you get a chance.", isSpam: false },
];

const spamTriggerWords = [
  { word: 'FREE', count: 8 },
  { word: 'URGENT', count: 7 },
  { word: 'Click', count: 6 },
  { word: '$$$', count: 5 },
  { word: 'Win/Won', count: 4 },
];

export default function GamePage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (userSaid) => {
    const newAnswers = [...answers, { ...emails[current], userSaid }];
    setAnswers(newAnswers);
    if (current + 1 < emails.length) {
      setCurrent(current + 1);
    } else {
      // Game complete
      const correct = newAnswers.filter(
        (a) => (a.isSpam && a.userSaid === 'spam') || (!a.isSpam && a.userSaid === 'ham')
      ).length;
      const user = getUser();
      if (user) {
        let newScore = user.score || 0;
        const badges = [...(user.badges || [])];
        if (correct >= 7) {
          newScore += 50;
        }
        if (!badges.includes('game-over')) badges.push('game-over');
        updateUser({ score: newScore, badges, completedGame: true });
      }
      setFinished(true);
    }
  };

  const correctCount = answers.filter(
    (a) => (a.isSpam && a.userSaid === 'spam') || (!a.isSpam && a.userSaid === 'ham')
  ).length;

  if (finished) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {/* Score card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center mb-8">
            <span className="text-5xl block mb-4">🎮</span>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Game Complete!</h1>
            <p className="text-4xl font-bold text-indigo-600 mb-2">
              {correctCount} / {emails.length}
            </p>
            <p className="text-gray-500">
              {correctCount >= 7
                ? '🎉 Great job! You earned 50 bonus points!'
                : 'Keep practicing to improve your spam detection skills!'}
            </p>
          </div>

          {/* Results table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Answers</h2>
            <div className="space-y-3">
              {answers.map((a, i) => {
                const isCorrect =
                  (a.isSpam && a.userSaid === 'spam') || (!a.isSpam && a.userSaid === 'ham');
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-lg border-2 ${
                      isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <p className="text-sm text-gray-700 mb-2">{a.text}</p>
                    <div className="flex gap-3 text-xs font-medium">
                      <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {isCorrect ? '✅ Correct' : '❌ Wrong'}
                      </span>
                      <span className="text-gray-500">
                        Actual: {a.isSpam ? '🚫 Spam' : '✉️ Ham'} | Your answer:{' '}
                        {a.userSaid === 'spam' ? '🚫 Spam' : '✉️ Ham'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recharts bar chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Top 5 Spam Trigger Words
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={spamTriggerWords} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="word" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
          <h1 className="text-xl font-bold text-gray-800">🎮 Spam Classifier Game</h1>
          <p className="text-sm font-medium text-gray-500">
            Email {current + 1} of {emails.length}
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / emails.length) * 100}%` }}
          />
        </div>

        {/* Email card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">📧</span>
            <div>
              <p className="text-sm font-medium text-gray-800">Unknown Sender</p>
              <p className="text-xs text-gray-400">inbox</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{emails[current].text}</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => handleAnswer('ham')}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 py-3 font-medium transition-colors text-lg"
          >
            ✉️ Ham (Legit)
          </button>
          <button
            onClick={() => handleAnswer('spam')}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg px-6 py-3 font-medium transition-colors text-lg"
          >
            🚫 Spam
          </button>
        </div>
      </div>
    </div>
  );
}
