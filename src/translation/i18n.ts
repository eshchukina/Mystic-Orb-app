import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to the Mystic Orb, where you can get predictions',
      share: 'share',
      connect: 'connect with us',
      review: 'review',
      instructions: 'about the app',
      close: 'close',
      mainButton: 'get prediction',
      title: 'Click on the screen and get a prediction',
      saved: 'Here will be your saved predictions',
      list: 'List of your predictions',
      true: 'Predictions that came true: ',
      text1:
        'Mystic Orb - your personal guide in the world of predictions! Receive unique forecasts for each day!',
      text2:
        'The built-in feature for saving predictions will allow you not only to recall them at any time but also to track their fulfillment ',
      text3:
        "Don't miss the opportunity to immerse yourself in the amazing world of divinations with Mystic Orb!",
    },
  },
  ru: {
    translation: {
      welcome:
        'Добро пожаловать в Mystic Orb, где вы можете получить предсказания',
      share: 'поделиться',
      connect: 'свяжитесь с нами',
      review: 'отзыв',
      instructions: 'о приложении',
      close: 'закрыть',
      mainButton: 'получить предсказание',
      title: 'Нажмите на экран и получите предсказание',
      saved: 'Здесь будут ваши сохранённые предсказания',
      list: 'Список ваших предсказаний',
      true: 'Предсказания, которые сбылись: ',
      text1:
        'Mystic Orb - ваш личный гид в мире предсказаний! Получайте уникальные прогнозы на каждый день!',
      text2:
        'Встроенная функция сохранения предсказаний позволит вам не только вспоминать их в любое время, но и отслеживать их исполнение',
      text3:
        'Не упустите возможность погрузиться в удивительный мир гаданий с Mystic Orb!',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});

export default i18n;
