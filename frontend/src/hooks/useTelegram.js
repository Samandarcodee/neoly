import { useEffect, useState } from 'react';

export const useTelegram = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      
      // Expand the app to full height
      tg.expand();

      // Set user data
      const initData = new URLSearchParams(window.Telegram.WebApp.initData);
      const userJson = initData.get('user');
      
      if (userJson) {
        const userData = JSON.parse(userJson);
        setUser({
          id: userData.id.toString(),
          firstName: userData.first_name,
          lastName: userData.last_name,
          username: userData.username,
          photoUrl: userData.photo_url
        });
      }

      // Configure theme
      if (tg.colorScheme === 'dark') {
        document.body.style.backgroundColor = '#1a1a1a';
      }
    }
  }, []);

  const ready = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
    }
  };

  const expand = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }
  };

  const close = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.close();
    }
  };

  const showAlert = (message) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showAlert(message);
    } else {
      alert(message);
    }
  };

  const hapticFeedback = (type = 'light') => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred(type);
    }
  };

  return {
    user,
    ready,
    expand,
    close,
    showAlert,
    hapticFeedback,
    isTelegram: !!window.Telegram?.WebApp
  };
};

