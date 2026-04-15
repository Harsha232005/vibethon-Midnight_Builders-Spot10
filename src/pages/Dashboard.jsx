import { Link } from 'react-router-dom';
import { getUser } from '../utils/auth';
import { modules } from '../data/modules';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import BadgeCard from '../components/BadgeCard';

const BADGE_DEFS = [
  { id: 'first-step', emoji: '🏆', name: 'First Step', description: 'Completed your first module' },
  { id: 'quiz-master', emoji: '🧠', name: 'Quiz Master', description: 'Scored 100+ points' },
  { id: 'on-fire', emoji: '🔥', name: 'On Fire', description: '3+ day streak' },
  { id: 'game-over', emoji: '🎮', name: 'Game Over', description: 'Completed the spam classifier game' },
];

const levelColor = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
};

export default function Dashboard() {
  const user = getUser();
  if (!user) return null;

  const completedCount = user.completedModules?.length || 0;
  const earnedBadges = BADGE_DEFS.filter((b) => user.badges?.includes(b.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 md:p-8 text-white mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user.name}! 👋</h1>
          <p className="mt-2 text-indigo-100">Continue your AI & ML learning journey.</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Score', value: user.score || 0, icon: '⭐' },
            { label: 'Modules Completed', value: `${completedCount} / ${modules.length}`, icon: '📚' },
            { label: 'Current Streak', value: user.streak || 0, icon: '🔥' },
            { label: 'Badges Earned', value: earnedBadges.length, icon: '🏅' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
              <span className="text-2xl">{s.icon}</span>
              <p className="text-2xl font-bold text-gray-800 mt-2">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Module list */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Learning Modules</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {modules.map((m) => {
            const done = user.completedModules?.includes(m.id);
            return (
              <Link
                key={m.id}
                to={`/module/${m.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${levelColor[m.level]}`}>
                    {m.level}
                  </span>
                  {done && <span className="text-green-500 text-sm font-medium">✓ Complete</span>}
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {m.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{m.description}</p>
                <div className="mt-4">
                  <ProgressBar value={done ? 100 : 0} max={100} color={done ? 'bg-green-500' : 'bg-gray-300'} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Badges */}
        {earnedBadges.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Earned Badges</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 mb-8">
              {earnedBadges.map((b) => (
                <BadgeCard key={b.id} emoji={b.emoji} name={b.name} description={b.description} />
              ))}
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <Link
            to="/leaderboard"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-2.5 font-medium transition-colors"
          >
            View Leaderboard
          </Link>
          <Link
            to="/game"
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6 py-2.5 font-medium transition-colors"
          >
            Play Spam Classifier Game
          </Link>
        </div>
      </div>
    </div>
  );
}
