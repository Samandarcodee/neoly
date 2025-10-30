import React, { useState } from 'react';

const Progress = ({ habit, onBack, onCheckIn, hapticFeedback, showAlert }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [canCheckIn, setCanCheckIn] = useState(true);

  React.useEffect(() => {
    // Check if already checked in today
    if (habit.lastCheckIn) {
      const today = new Date();
      const lastCheckIn = new Date(habit.lastCheckIn);
      const isSameDay = today.getDate() === lastCheckIn.getDate() &&
                        today.getMonth() === lastCheckIn.getMonth() &&
                        today.getFullYear() === lastCheckIn.getFullYear();
      setCanCheckIn(!isSameDay);
    }
  }, [habit.lastCheckIn]);

  const progress = (habit.currentDay / habit.duration) * 100;
  const remainingDays = habit.duration - habit.currentDay;

  const handleCheckIn = async () => {
    if (!canCheckIn) {
      showAlert('Siz bugun allaqachon belgiladingiz. Ertaga qayting!');
      return;
    }

    if (habit.completed) {
      showAlert('Tabriklaymiz! Maqsadingizni amalga oshirdingiz!');
      return;
    }

    setIsLoading(true);
    hapticFeedback('heavy');
    
    try {
      await onCheckIn(habit._id);
      showAlert('Ajoyib! Progress qilyapsiz! 🎉');
    } catch (error) {
      if (error.response?.status === 400) {
        showAlert('Siz bugun allaqachon belgiladingiz. Ertaga qayting!');
      } else {
        showAlert('Nimadir xatolik yuz berdi. Qayta urinib ko\'ring.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto">
        <button
          onClick={onBack}
          className="text-gray-300 hover:text-white mb-6"
        >
          ← Orqaga
        </button>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            {habit.completed ? '🎉' : '📊'}
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {habit.title}
          </h1>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-8 mb-6 shadow-xl border border-zinc-800">
          {/* Circular Progress */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="transform -rotate-90" width="100%" height="100%">
              {/* Background circle */}
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke={progress >= 80 ? "url(#greenGradient)" : progress >= 50 ? "url(#blueGradient)" : "url(#orangeGradient)"}
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-black">
                  {habit.currentDay}
                </div>
                <div className="text-sm text-gray-400">/ {habit.duration} kun</div>
              </div>
            </div>
          </div>

          {/* Linear Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span className="font-semibold">Progress</span>
              <span className="font-bold text-rose-400">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-4 overflow-hidden shadow-inner">
              <div
                className={`h-4 rounded-full transition-all duration-1000 ${
                  progress >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                  progress >= 50 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                  'bg-gradient-to-r from-orange-500 to-red-600'
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse-slow"></div>
              </div>
            </div>
          </div>

          {habit.completed ? (
            <div className="text-center py-4 bg-emerald-900/30 rounded-xl">
              <p className="text-emerald-300 font-bold text-lg">
                🎉 Maqsad Amalga Oshirildi!
              </p>
              <p className="text-emerald-400 text-sm mt-1">
                Siz {habit.duration} kunlik shaxsiy rejangizni amalga oshirdingiz!
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-300 font-semibold mb-2">
                {remainingDays} kun qoldi
              </p>
              <p className="text-sm text-gray-400">
                {progress >= 80
                  ? '🔥 A\'lo! Yaqinda tayyor bo\'ladi!'
                  : progress >= 50
                  ? '💪 Ajoyib bajarayapsiz! Davom eting!'
                  : progress >= 30
                  ? '⚡ Yaxshi boshlangich! Mustahkam turish!'
                  : '🌱 Har kun muhim! Udamaningiz mumkin!'}
              </p>
            </div>
          )}
        </div>

        {!habit.completed && (
          <button
            onClick={handleCheckIn}
            disabled={isLoading || !canCheckIn}
            className="w-full bg-emerald-600 text-white font-bold py-5 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Qayta ishlanmoqda...
              </>
            ) : (
              <><span className="mr-2">✅</span>Bugun Bajarildi</>
            )}
          </button>
        )}

        {habit.lastCheckIn && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Oxirgi bajarilish: {new Date(habit.lastCheckIn).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;

