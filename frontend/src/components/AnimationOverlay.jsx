export default function AnimationOverlay({ persona, show }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
      <h2 className="text-green-400 text-xl mb-6">Analyzing...</h2>

      {persona === "rupee" && (
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-5xl font-bold text-yellow-900 animate-spin">
          ₹
        </div>
      )}

      {persona === "arogya" && (
        <div className="text-6xl animate-bounce">🏃</div>
      )}

      {persona === "udaan" && (
        <div className="text-6xl animate-pulse">🚀</div>
      )}

      {persona === "kahani" && (
        <div className="text-6xl animate-pulse">📖</div>
      )}

      {persona === "jyotish" && (
        <div className="text-6xl animate-spin">🌙</div>
      )}

      <p className="mt-6 text-gray-400">Please wait...</p>
    </div>
  );
}