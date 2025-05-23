
import { useTheme } from '@/lib/theme/ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  // 使用状态来保存主题
  const [localTheme, setLocalTheme] = useState<'light' | 'dark'>('light');

  // 尝试使用 ThemeProvider 上下文
  const themeContext = (() => {
    try {
      return useTheme();
    } catch (e) {
      // 如果不在 ThemeProvider 内部，返回一个本地的主题状态管理
      return {
        theme: localTheme,
        toggleTheme: () => {
          const newTheme = localTheme === 'light' ? 'dark' : 'light';
          setLocalTheme(newTheme);
          localStorage.setItem('theme', newTheme);
          document.documentElement.classList.toggle('dark', newTheme === 'dark');
        }
      };
    }
  })();

  const { theme, toggleTheme } = themeContext;

  // 在组件挂载时初始化本地主题（如果不在 ThemeProvider 上下文中）
  useEffect(() => {
    // 仅当使用本地主题时执行
    if (theme === localTheme) {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        setLocalTheme(savedTheme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setLocalTheme('dark');
      }
    }
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center px-3 py-1.5 text-sm text-white hover:bg-neutral-600 dark:hover:bg-neutral-700 transition-colors rounded-md"
      aria-label="切换主题"
    >
      {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </button>
  );
}
