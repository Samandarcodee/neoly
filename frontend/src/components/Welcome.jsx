import React from 'react';

const Welcome = ({ user, onCreateClick }) => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto">
        {/* Animated Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="relative mb-6">
            <div className="text-7xl mb-4 animate-bounce-slow">🚀</div>
            <div className="absolute inset-0 blur-2xl bg-primary opacity-20 rounded-full"></div>
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-rose-500 to-fuchsia-500 bg-clip-text text-transparent mb-3 letter-tight better-font">
            HabitFlow
          </h1>
          <p className="text-gray-300 text-lg font-medium letter-normal">
            Ezgu odatlarni shakllantiring
          </p>
          <p className="text-gray-400 text-sm mt-1 font-normal">
            Kun sayin rivojlan
          </p>
          <div className="mt-4 inline-block bg-rose-600 text-white px-4 py-2 rounded-full">
            <p className="font-semibold">
              Salom {user?.firstName || 'do\'st'}! 👋
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="bg-zinc-900 rounded-3xl p-6 mb-6 shadow-lg border border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center letter-tight">
            <span className="mr-2">✨</span>
            Qanday ishlaydi?
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start bg-black/40 rounded-lg p-3">
              <span className="text-emerald-400 mr-3 text-xl font-bold">✓</span>
              <span className="flex-1 font-medium letter-normal">Odat maqsadingiz va muddatini belgilang</span>
            </li>
            <li className="flex items-start bg-black/40 rounded-lg p-3">
              <span className="text-emerald-400 mr-3 text-xl font-bold">✓</span>
              <span className="flex-1 font-medium letter-normal">Har kun bajarganingizni belgilang</span>
            </li>
            <li className="flex items-start bg-black/40 rounded-lg p-3">
              <span className="text-emerald-400 mr-3 text-xl font-bold">✓</span>
              <span className="flex-1 font-medium letter-normal">Kunlik eslatmalar bilan motivatsiyani saqlang</span>
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={onCreateClick}
          className="w-full bg-rose-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <span className="text-xl">✨</span>
          Birinchi Odatingizni Yaratish
          <span className="text-xl">➕</span>
        </button>
      </div>
    </div>
  );
};

export default Welcome;

