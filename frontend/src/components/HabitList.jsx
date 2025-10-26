import React from 'react';

const HabitList = ({ habits, onHabitClick, onCreateNew }) => {
  const getProgressColor = (habit) => {
    const progress = (habit.currentDay / habit.duration) * 100;
    if (progress < 33) return 'bg-gradient-to-r from-orange-500 to-red-600';
    if (progress < 66) return 'bg-gradient-to-r from-yellow-500 to-orange-600';
    return 'bg-gradient-to-r from-green-500 to-emerald-600';
  };

  const getMotivationalText = (habit) => {
    const progress = (habit.currentDay / habit.duration) * 100;
    const remainingDays = habit.duration - habit.currentDay;

    if (habit.completed) {
      return { text: '🎉 Maqsad amalga oshirildi!', emoji: '🎉', color: 'text-green-600' };
    }
    if (progress >= 80) {
      return { text: 'Yaqinda tayyor bo\'ladi! Davom eting!', emoji: '🔥', color: 'text-green-600' };
    }
    if (progress >= 50) {
      return { text: 'Yarim yo\'l bosib o\'tildi! A\'lo ish!', emoji: '💪', color: 'text-blue-600' };
    }
    if (progress >= 30) {
      return { text: 'Progress ko\'rsatmoqdasiz! Mustahkam turish!', emoji: '⚡', color: 'text-yellow-600' };
    }
    return { text: `Hali ${remainingDays} kun qoldi!`, emoji: '🌱', color: 'text-gray-600' };
  };

  if (habits.length === 0) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-md mx-auto text-center mt-20">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Hozircha odatlar yo'q
          </h2>
          <p className="text-gray-600 mb-6">
            Natijangizni kuzatishni boshlash uchun birinchi odatingizni yarating!
          </p>
          <button
            onClick={onCreateNew}
            className="bg-primary text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Odat Yaratish ➕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-4 pb-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Odatlarim</h1>
          <button
            onClick={onCreateNew}
            className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            ➕ Yangi
          </button>
        </div>

        {habits.map((habit) => {
          const progress = (habit.currentDay / habit.duration) * 100;
          const remainingDays = habit.duration - habit.currentDay;
          const motivation = getMotivationalText(habit);

          return (
            <div
              key={habit._id}
            onClick={() => onHabitClick(habit)}
            className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-2xl transition-all hover:scale-102 active:scale-98"
          >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-900 flex-1">
                  {habit.title}
                </h3>
                <span className={`text-2xl ${motivation.color}`}>
                  {motivation.emoji}
                </span>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span className="font-bold">Kun {habit.currentDay} / {habit.duration}</span>
                  <span className="font-bold text-primary text-lg">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className={`h-4 rounded-full transition-all duration-700 ${getProgressColor(habit)}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  >
                    {progress > 20 && (
                      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-slow"></div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <p className={`font-medium ${motivation.color}`}>
                  {motivation.text}
                </p>
                <span className="text-gray-500">
                  {remainingDays > 0 ? `${remainingDays} kun qoldi` : 'Bajarildi!'}
                </span>
              </div>

              {habit.completed && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-center text-green-600 font-bold text-sm">
                    🎉 Tabriklaymiz! Maqsadingizni amalga oshirdingiz!
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HabitList;

