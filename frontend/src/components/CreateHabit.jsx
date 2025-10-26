import React, { useState } from 'react';

const CreateHabit = ({ onBack, onCreate }) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(30);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }

    if (duration < 1 || duration > 365) {
      return;
    }

    setIsLoading(true);
    await onCreate({ title: title.trim(), duration });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 mr-4 text-xl font-semibold transition-colors"
          >
            ← Orqaga
          </button>
          <h1 className="text-2xl font-black text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Yangi Odat
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
              <span className="mr-2 text-xl">📝</span>
              Qanday odatni shakllantirmoqchisiz?
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masalan: Kunlik yugurish, Kitob o'qish, Meditatsiya"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-700"
              maxLength={50}
              required
            />
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
              <span className="mr-2 text-xl">⏱️</span>
              Davomiyligi (kun)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 365)) {
                  setDuration(value === '' ? '' : parseInt(value));
                }
              }}
              placeholder="Masalan: 30"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-700"
              min="1"
              max="365"
              required
            />
            <p className="text-xs text-gray-500 mt-3 flex items-center">
              <span className="mr-1">💡</span>
              Maslahat: 7, 14, 21, 30, 60, 90 kun oralig'i muvaffaqiyatli natija beradi
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200 shadow-sm">
            <p className="text-sm text-blue-800 flex items-start">
              <span className="mr-2 text-lg">ℹ️</span>
              <span>
                <strong>Eslatma:</strong> Har kun natijangizni belgilashingiz kerak bo'ladi. 
                Har kuni sizga eslatma yuboramiz!
              </span>
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !title.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                Yaratilmoqda...
              </>
            ) : (
              <>
                <span>🚀</span>
                Boshlash
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHabit;

