
import React from 'react';
import { LayoutDashboard, Users, CalendarCheck, Sparkles, LogOut, Baby, Home, Download, Languages, UserCog, School, ChevronRight, ChevronLeft } from 'lucide-react';
import { User } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  user: User | null;
  onLogout: () => void;
  showInstallButton: boolean;
  onInstall: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  setCurrentView, 
  isMobileOpen, 
  setIsMobileOpen, 
  user, 
  onLogout,
  showInstallButton,
  onInstall
}) => {
  const { t, toggleLanguage, language } = useLanguage();

  const allMenuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard, roles: ['admin', 'teacher'] },
    { id: 'students', label: t('students'), icon: Users, roles: ['admin', 'teacher'] },
    { id: 'attendance', label: t('attendance'), icon: CalendarCheck, roles: ['admin', 'teacher'] },
    { id: 'ai-planner', label: t('aiPlanner'), icon: Sparkles, roles: ['admin', 'teacher'] },
    { id: 'classes', label: t('classes'), icon: School, roles: ['admin'] },
    { id: 'users', label: t('users'), icon: UserCog, roles: ['admin'] },
    { id: 'parent-view', label: t('myChild'), icon: Home, roles: ['parent'] },
  ];

  const menuItems = allMenuItems.filter(item => user && item.roles.includes(user.role));

  const getRoleLabel = (role?: string) => {
    if (role === 'admin') return t('roleAdmin');
    if (role === 'teacher') return t('roleTeacher');
    return t('roleParent');
  };

  return (
    <>
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 ${language === 'ar' ? 'right-0' : 'left-0'} z-30 w-64 bg-white border-l border-r border-gray-100 shadow-lg md:shadow-none transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : (language === 'ar' ? 'translate-x-full md:translate-x-0' : '-translate-x-full md:translate-x-0')}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center gap-3 border-b border-gray-50">
            <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
              <Baby size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{t('appTitle')}</h1>
              <p className="text-xs text-gray-500">{t('appSubtitle')}</p>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-indigo-50 text-indigo-700 font-bold shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  <Icon size={20} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {showInstallButton && (
              <button
                onClick={onInstall}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 mt-4"
              >
                <Download size={20} />
                <span>{t('installApp')}</span>
              </button>
            )}

            <button
                onClick={toggleLanguage}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-600 hover:bg-gray-50 mt-4"
              >
                <Languages size={20} className="text-gray-400" />
                <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </nav>

          <div className="p-4 border-t border-gray-50">
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentView('profile')}
                className={`flex-1 flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors ${currentView === 'profile' ? 'bg-indigo-50' : ''}`}
              >
                <img src={user?.avatar || "https://picsum.photos/seed/user/40/40"} alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                <div className="flex-1 min-w-0 text-start">
                  <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{getRoleLabel(user?.role)}</p>
                </div>
                <div className="text-gray-300">
                  {language === 'ar' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </div>
              </button>
              <button 
                onClick={onLogout}
                className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                title={t('logout')}
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
