import React, { useState, useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import { habitService } from './services/api';
import Welcome from './components/Welcome';
import CreateHabit from './components/CreateHabit';
import HabitList from './components/HabitList';
import Progress from './components/Progress';

function App() {
  const { user, ready, expand, showAlert, hapticFeedback } = useTelegram();
  const [screen, setScreen] = useState('welcome'); // welcome, create, list, progress
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [localUserId, setLocalUserId] = useState(null);

  useEffect(() => {
    ready();
    expand();
    
    // If not in Telegram, create a persistent local userId so backend can be used
    if (!user) {
      const stored = localStorage.getItem('hf_device_id');
      if (stored) {
        setLocalUserId(stored);
      } else {
        const generated = 'local-' + Math.random().toString(36).slice(2, 10);
        localStorage.setItem('hf_device_id', generated);
        setLocalUserId(generated);
      }
    }
  }, []);

  useEffect(() => {
    if (user || localUserId) {
      loadHabits();
    }
  }, [user, localUserId]);

  const loadHabits = async () => {
    const uid = user?.id || localUserId;
    if (!uid) return;
    
    try {
      const data = await habitService.getUserHabits(uid);
      setHabits(data);
      
      // If user has habits, show list instead of welcome
      if (data.length > 0 && screen === 'welcome') {
        setScreen('list');
      }
    } catch (error) {
      console.error('Failed to load habits:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateHabit = async ({ title, duration }) => {
    const durationNumber = typeof duration === 'string' ? parseInt(duration) : duration;
    
    const uid = user?.id || localUserId;

    try {
      const newHabit = await habitService.createHabit(uid, title, durationNumber);
      setHabits([newHabit, ...habits]);
      setScreen('list');
      hapticFeedback('light');
    } catch (error) {
      console.error('Failed to create habit:', error);
      showAlert('Failed to create habit. Please try again.');
    }
  };

  const handleCheckIn = async (habitId) => {
    const uid = user?.id || localUserId;

    try {
      const updatedHabit = await habitService.checkInHabit(habitId);
      setHabits(habits.map(h => h._id === habitId ? updatedHabit : h));
      
      if (selectedHabit?._id === habitId) {
        setSelectedHabit(updatedHabit);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleHabitClick = (habit) => {
    setSelectedHabit(habit);
    setScreen('progress');
    hapticFeedback('light');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <p className="text-gray-600">Odatlar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  const showContent = () => {
    switch (screen) {
      case 'welcome':
        return (
          <Welcome
            user={user}
            onCreateClick={() => setScreen('create')}
          />
        );
      case 'create':
        return (
          <CreateHabit
            onBack={() => setScreen('list')}
            onCreate={handleCreateHabit}
          />
        );
      case 'list':
        return (
          <HabitList
            habits={habits}
            onHabitClick={handleHabitClick}
            onCreateNew={() => setScreen('create')}
          />
        );
      case 'progress':
        return (
          <Progress
            habit={selectedHabit}
            onBack={() => setScreen('list')}
            onCheckIn={handleCheckIn}
            hapticFeedback={hapticFeedback}
            showAlert={showAlert}
          />
        );
      default:
        return null;
    }
  };

  return <div className="App">{showContent()}</div>;
}

export default App;

