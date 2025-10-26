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

  useEffect(() => {
    ready();
    expand();
    
    // If no user (testing in browser), set loading to false after 1 second
    if (!user) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadHabits();
    }
  }, [user]);

  const loadHabits = async () => {
    if (!user) return;
    
    try {
      const data = await habitService.getUserHabits(user.id);
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
    
    // For testing without backend
    if (!user) {
      const mockHabit = {
        _id: Date.now().toString(),
        title,
        duration: durationNumber,
        currentDay: 0,
        completed: false,
        userId: 'demo-user'
      };
      setHabits([mockHabit, ...habits]);
      setScreen('list');
      return;
    }

    try {
      const newHabit = await habitService.createHabit(user.id, title, durationNumber);
      setHabits([newHabit, ...habits]);
      setScreen('list');
      hapticFeedback('light');
    } catch (error) {
      console.error('Failed to create habit:', error);
      showAlert('Failed to create habit. Please try again.');
    }
  };

  const handleCheckIn = async (habitId) => {
    // For testing without backend
    if (!user) {
      setHabits(habits.map(h => {
        if (h._id === habitId) {
          return { ...h, currentDay: h.currentDay + 1, completed: h.currentDay + 1 >= h.duration };
        }
        return h;
      }));
      
      if (selectedHabit?._id === habitId) {
        const updated = { 
          ...selectedHabit, 
          currentDay: selectedHabit.currentDay + 1,
          completed: selectedHabit.currentDay + 1 >= selectedHabit.duration
        };
        setSelectedHabit(updated);
      }
      return;
    }

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

