
import React, { useState } from 'react';
import { Baby, LogIn, Languages } from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { User } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { t, language, toggleLanguage } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = MOCK_USERS.find(u => u.username === username && u.password === password);
    
    if (user) {
      onLogin(user);
    } else {
      setError(t('loginError'));
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4 relative ${language === 'rtl' ? 'text-right' : 'text-left'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      <button 
        onClick={toggleLanguage}
        className="absolute top-6 right-6 flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-sm text-gray-600 hover:text-indigo-600 hover:shadow-md transition-all font-medium z-10"
      >
        <Languages size={20} />
        <span>{language === 'ar' ? 'English' : 'العربية'}</span>
      </button>

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden relative z-0">
        <div className="p-8 bg-indigo-600 text-center">
          <div className="inline-flex bg-white/20 p-4 rounded-full mb-4 text-white">
            <Baby size={40} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{t('appTitle')}</h1>
          <p className="text-indigo-100">{t('loginTitle')}</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('username')}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder=""
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="********"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              {t('loginButton')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
