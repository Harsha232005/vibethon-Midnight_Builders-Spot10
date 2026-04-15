export default function BadgeCard({ emoji, name, description }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <span className="text-3xl">{emoji}</span>
      <div>
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
