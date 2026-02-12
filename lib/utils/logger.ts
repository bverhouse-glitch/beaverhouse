// lib/utils/logger.ts

type LogLevel = 'info' | 'success' | 'warning' | 'error' | 'debug';

interface LogStyle {
  icon: string;
  color: string;
  bgColor: string;
}

const LOG_STYLES: Record<LogLevel, LogStyle> = {
  info: { icon: 'ℹ️', color: '#3b82f6', bgColor: '#dbeafe' },
  success: { icon: '✅', color: '#10b981', bgColor: '#d1fae5' },
  warning: { icon: '⚠️', color: '#f59e0b', bgColor: '#fef3c7' },
  error: { icon: '❌', color: '#ef4444', bgColor: '#fee2e2' },
  debug: { icon: '🔍', color: '#8b5cf6', bgColor: '#ede9fe' },
};

class Logger {
  private enabled: boolean;

  constructor() {
    // 개발 환경에서만 활성화
    this.enabled = process.env.NODE_ENV === 'development';
  }

  private log(level: LogLevel, category: string, message: string, data?: any) {
    if (!this.enabled) return;

    const style = LOG_STYLES[level];
    const timestamp = new Date().toLocaleTimeString('ko-KR');

    console.log(
      `%c${style.icon} [${category}] ${message}`,
      `color: ${style.color}; font-weight: bold; padding: 2px 4px; border-radius: 3px; background: ${style.bgColor}`,
      `(${timestamp})`
    );

    if (data !== undefined) {
      console.log('%cData:', 'color: #6b7280; font-weight: bold', data);
    }
  }

  // Firebase Auth 관련
  auth(message: string, data?: any) {
    this.log('info', 'AUTH', message, data);
  }

  authSuccess(message: string, data?: any) {
    this.log('success', 'AUTH', message, data);
  }

  authError(message: string, error?: any) {
    this.log('error', 'AUTH', message, error);
  }

  // Firestore 관련
  firestore(message: string, data?: any) {
    this.log('info', 'FIRESTORE', message, data);
  }

  firestoreSuccess(message: string, data?: any) {
    this.log('success', 'FIRESTORE', message, data);
  }

  firestoreError(message: string, error?: any) {
    this.log('error', 'FIRESTORE', message, error);
  }

  // 게임 로직 관련
  game(message: string, data?: any) {
    this.log('info', 'GAME', message, data);
  }

  gameSuccess(message: string, data?: any) {
    this.log('success', 'GAME', message, data);
  }

  gameWarning(message: string, data?: any) {
    this.log('warning', 'GAME', message, data);
  }

  gameError(message: string, error?: any) {
    this.log('error', 'GAME', message, error);
  }

  // 일반 디버그
  debug(category: string, message: string, data?: any) {
    this.log('debug', category, message, data);
  }

  // 그룹 로그 (접었다 펼 수 있음)
  group(title: string, callback: () => void) {
    if (!this.enabled) return;
    console.group(`📦 ${title}`);
    callback();
    console.groupEnd();
  }

  // 테이블 형식 로그
  table(data: any) {
    if (!this.enabled) return;
    console.table(data);
  }
}

export const logger = new Logger();