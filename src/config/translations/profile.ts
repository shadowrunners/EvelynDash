import { createI18n } from '@/utils/i18n';
import { common } from './common';
import { provider } from './provider';

export const profile = createI18n(provider, {
  en: {
    logout: common.translations.en.logout,
    language: 'Language',
    'language description': 'Select your language',
    settings: 'Settings',
    'dark mode': 'Dark Mode',
    'dark mode description': 'Enables dark theme in order to protect your eyes',
  },
  cn: {
    logout: common.translations.cn.logout,
    language: '你的語言',
    'language description': '選擇你的語言',
    settings: '設置',
    'dark mode': '黑暗模式',
    'dark mode description': '啟用深色主題可以保護您的眼睛',
  },
});
