import { getUser } from '../utils/auth';
import Navbar from '../components/Navbar';

export default function Leaderboard() {
  const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const currentUser = getUser();
  const sorted = [...allUsers].sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 10);

  const medal = (rank) => {
    if (rank === 0) return '🥇';
    if (rank === 1) return '🥈';
    if (rank === 2) return '🥉';
    return rank + 1;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">🏆 Leaderboard</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Rank</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Score</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Modules</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Badges</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    No users yet. Be the first!
                  </td>
                </tr>
              )}
              {sorted.map((user, i) => {
                const isCurrentUser = currentUser && user.email === currentUser.email;
                return (
                  <tr
                    key={user.email}
                    className={`border-b border-gray-50 ${
                      isCurrentUser ? 'bg-indigo-50' : 'hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <td className="px-4 py-3 text-lg font-bold text-gray-700 w-16">
                      {medal(i)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{user.name}</span>
                        {isCurrentUser && (
                          <span className="text-xs bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full font-medium">
                            You
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-indigo-600">{user.score || 0}</td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">
                      {user.completedModules?.length || 0}
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">
                      {user.badges?.length || 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
