// lib/admob.ts
export const ADMOB_CONFIG = {
  appId: 'ca-app-pub-1547398510185840~6055500088',
  rewardAdUnitId: 'ca-app-pub-1547398510185840/4143652613',
  
  // 테스트용 광고 ID
  testRewardAdUnitId: 'ca-app-pub-3940256099942544/5224354917',
  
  // 웹용 AdSense 설정
  adSenseClientId: 'ca-pub-1547398510185840',
};

// 개발 모드 체크
export const isDevelopment = process.env.NODE_ENV === 'development';

// 플랫폼 감지
export function getPlatform(): 'ios' | 'android' | 'web' {
  if (typeof window === 'undefined') return 'web';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
  if (/android/.test(userAgent)) return 'android';
  return 'web';
}

// 사용할 광고 ID 반환
export function getAdUnitId() {
  return isDevelopment ? ADMOB_CONFIG.testRewardAdUnitId : ADMOB_CONFIG.rewardAdUnitId;
}

// 포인트 지급액
export const REWARD_POINTS = 5;