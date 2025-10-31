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
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-md mx-auto text-center mt-20">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold mb-4">
            Hozircha odatlar yo'q
          </h2>
          <p className="text-gray-400 mb-6">
            Natijangizni kuzatishni boshlash uchun birinchi odatingizni yarating!
          </p>
          <button
            onClick={onCreateNew}
            className="bg-rose-500 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            Odat Yaratish ➕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-md mx-auto space-y-4 pb-28">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-extrabold">Today</h1>
          <div className="w-8 h-8"></div>
        </div>

        {/* Day pills (7 kun) */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {Array.from({ length: 7 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (3 - i));
            const day = date.getDate();
            const active = i === 3;
            return (
              <div key={i} className={`flex flex-col items-center min-w-[52px]`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold ${active ? 'bg-rose-600 text-white' : 'bg-zinc-800 text-zinc-300'}`}>
                  {day}
                </div>
              </div>
            );
          })}
        </div>

        {habits.map((habit) => {
          const progress = (habit.currentDay / habit.duration) * 100;
          const remainingDays = habit.duration - habit.currentDay;
          const motivation = getMotivationalText(habit);
          const last = habit.lastCheckIn ? new Date(habit.lastCheckIn) : null;
          const today = new Date();
          const isToday = last && today.getDate() === last.getDate() && today.getMonth() === last.getMonth() && today.getFullYear() === last.getFullYear();

          return (
            <div
              key={habit._id}
              onClick={() => onHabitClick(habit)}
              className="bg-zinc-900 rounded-3xl p-4 shadow border border-zinc-800 cursor-pointer active:scale-98 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-xl">🧘</div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-lg">{habit.title}</div>
                  <div className="inline-flex mt-1 items-center px-2 py-0.5 text-xs rounded-lg bg-fuchsia-700/40 text-fuchsia-200">Habit</div>
                </div>
                {isToday && (
                  <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center">✓</div>
                )}
              </div>
            </div>
          );
        })}

        {/* Floating add button */}
        <button
          onClick={onCreateNew}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-2xl bg-rose-600 text-white text-3xl shadow-xl active:scale-95"
          aria-label="Add"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default HabitList;

