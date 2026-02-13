// app/game/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGameData } from './hooks/useGameData';

type SideMenu = 'missions' | 'stats' | 'settings' | null;

const BG_OPTIONS = [
  { id: 'room', label: '방', path: '/game/bg-room.jpg' },
  { id: 'office-day', label: '오피스-낮', path: '/game/bg-office-day.jpg' },
  { id: 'office-afternoon', label: '오피스-오후', path: '/game/bg-office-afternoon.jpg' },
  { id: 'night', label: '퇴근길', path: '/game/bg-city-night.jpg' },
];

// 배경별 대사
const BG_DIALOGUES: Record<string, string[]> = {
  room: [
    '오늘은 집에서\n푹 쉬어야겠어',
    '침대가 최고야...\n나가기 싫다',
    '혼자만의 시간이\n필요해',
  ],
  'office-day': [
    '회사 일이\n산더미야...',
    '오늘도 야근\n각인가 봐',
    '커피 한 잔\n마셔야겠어',
  ],
  'office-afternoon': [
    '퇴근 시간이\n다가온다',
    '노을이 예쁘네...\n집에 가고 싶다.',
    '오늘 하루도\n고생했어',
  ],
  night: [
    '퇴근했어...\n오늘도 진짜 힘들었다',
    '밤하늘이\n참 조용하다',
    '내일은 좀\n나았으면',
  ],
};

export default function GameHub() {
  const router = useRouter();
  const { gameData, loading, claimMissionReward } = useGameData();
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<SideMenu>(null);
  const [currentBg, setCurrentBg] = useState('');
  const [selectedBgId, setSelectedBgId] = useState('auto');
  const [currentBgId, setCurrentBgId] = useState('night');
  const [dialogue, setDialogue] = useState('퇴근했어...\n오늘도 진짜 힘들었다');

  // 배경 결정 (자동 또는 수동)
  useEffect(() => {
    const savedBg = localStorage.getItem('selectedBg');
    if (savedBg && savedBg !== 'auto') {
      setSelectedBgId(savedBg);
      const bgOption = BG_OPTIONS.find(b => b.id === savedBg);
      if (bgOption) {
        setCurrentBg(bgOption.path);
        setCurrentBgId(savedBg);
        // 해당 배경의 랜덤 대사 선택
        const dialogues = BG_DIALOGUES[savedBg] || BG_DIALOGUES.night;
        setDialogue(dialogues[Math.floor(Math.random() * dialogues.length)]);
      }
    } else {
      setSelectedBgId('auto');
      // 시간대별 자동 선택
      const hour = new Date().getHours();
      let bg = '';
      let bgId = 'night';
      
      if (hour >= 5 && hour < 9) {
        bg = '/game/bg-room.jpg';
        bgId = 'room';
      } else if (hour >= 9 && hour < 15) {
        bg = '/game/bg-office-day.jpg';
        bgId = 'office';
      } else if (hour >= 15 && hour < 19) {
        bg = '/game/bg-office-afternoon.jpg';
        bgId = 'afternoon';
      } else {
        bg = '/game/bg-city-night.jpg';
        bgId = 'night';
      }
      
      setCurrentBg(bg);
      setCurrentBgId(bgId);
      // 해당 배경의 랜덤 대사 선택
      const dialogues = BG_DIALOGUES[bgId] || BG_DIALOGUES.night;
      setDialogue(dialogues[Math.floor(Math.random() * dialogues.length)]);
    }
  }, []);

  const handleBgChange = (bgId: string) => {
    setSelectedBgId(bgId);
    localStorage.setItem('selectedBg', bgId);
    
    if (bgId === 'auto') {
      const hour = new Date().getHours();
      let bg = '';
      let actualBgId = 'night';
      
      if (hour >= 5 && hour < 9) {
        bg = '/game/bg-room.jpg';
        actualBgId = 'room';
      } else if (hour >= 9 && hour < 15) {
        bg = '/game/bg-office-day.jpg';
        actualBgId = 'office-day';
      } else if (hour >= 15 && hour < 19) {
        bg = '/game/bg-office-afternoon.jpg';
        actualBgId = 'office-afternoon';
      } else {
        bg = '/game/bg-city-night.jpg';
        actualBgId = 'night';
      }
      
      setCurrentBg(bg);
      setCurrentBgId(actualBgId);
      // 해당 배경의 랜덤 대사 선택
      const dialogues = BG_DIALOGUES[actualBgId] || BG_DIALOGUES.night;
      setDialogue(dialogues[Math.floor(Math.random() * dialogues.length)]);
    } else {
      const bgOption = BG_OPTIONS.find(b => b.id === bgId);
      if (bgOption) {
        setCurrentBg(bgOption.path);
        setCurrentBgId(bgId);
        // 해당 배경의 랜덤 대사 선택
        const dialogues = BG_DIALOGUES[bgId] || BG_DIALOGUES.night;
        setDialogue(dialogues[Math.floor(Math.random() * dialogues.length)]);
      }
    }
  };

  useEffect(() => { 
    setMounted(true);
    // 모바일에서 스크롤 완전 차단
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  if (!mounted || loading) {
    return (
      <div className="fixed inset-0 bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-[#4fd1ff] text-sm tracking-widest animate-pulse">LOADING...</div>
      </div>
    );
  }

  if (!gameData) {
    return (
      <div className="fixed inset-0 bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-[#4fd1ff]/60 text-sm">로그인이 필요합니다</div>
      </div>
    );
  }

  const unclaimedCount = gameData.missions.filter(m => m.completed && !m.claimed).length;
  const dailyMissions  = gameData.missions.filter(m => m.type === 'daily');
  const completedCount = gameData.missions.filter(m => m.completed).length;

  const formatLastChat = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(diff / 86400000);
    if (m < 1)  return '방금 전';
    if (m < 60) return `${m}분 전`;
    if (h < 24) return `${h}시간 전`;
    return `${d}일 전`;
  };

  const toggleMenu = (menu: SideMenu) =>
    setActiveMenu(prev => (prev === menu ? null : menu));

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#0a0e1a] flex items-center justify-center">
      
      {/* 모바일 컨테이너 (최대 너비 제한) */}
      <div className="relative w-full max-w-[600px] h-full overflow-hidden select-none">

        {/* ══ 배경: 선택된 이미지 ══ */}
        <div className="absolute inset-0">
          {currentBg && (
            <Image 
              src={currentBg} 
              alt="background"
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* ══ 상단 HUD (fixed height: 100px) ══ */}
        <div className="absolute top-14 left-0 right-0 h-[100px] z-30 px-4 pt-4 bg-gradient-to-b from-[#060912]/90 to-transparent">
          <div className="flex items-start justify-between">
            {/* 프로필 */}
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-lg border border-[#4fd1ff]/50 bg-[#1a2440] overflow-hidden shadow-[0_0_10px_rgba(79,209,255,0.2)]">
                <Image src="/bver.png" alt="비버" fill className="object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }}/>
                <span className="absolute bottom-0 left-0 right-0 text-center text-[8px] font-bold text-black bg-[#4fd1ff]/90 leading-tight py-px">Lv.{gameData.stats.level}</span>
              </div>
              <div>
                <div className="text-[13px] font-bold text-[#e8f0ff] tracking-wide">비버</div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-[#4fd1ff] tracking-widest font-medium">RANK.1</span>
                  <div className="w-14 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[46%] bg-gradient-to-r from-[#2a6fff] to-[#4fd1ff] rounded-full"/>
                  </div>
                </div>
              </div>
            </div>

            {/* 재화 */}
            <div className="flex flex-col gap-1 items-end">
              <div className="flex gap-1.5">
                <div className="flex items-center gap-1 bg-[#080c1c]/75 border border-white/10 rounded-full px-2.5 py-1 backdrop-blur-sm">
                  <span className="text-xs">🪙</span>
                  <span className="text-[11px] font-bold text-[#e8f4ff]">{gameData.stats.points.toLocaleString()}</span>
                  <span className="text-[10px] text-[#4fd1ff]">+</span>
                </div>
                <div className="flex items-center gap-1 bg-[#080c1c]/75 border border-white/10 rounded-full px-2.5 py-1 backdrop-blur-sm">
                  <span className="text-xs">💎</span>
                  <span className="text-[11px] font-bold text-[#e8f4ff]">0</span>
                  <span className="text-[10px] text-[#4fd1ff]">+</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-[#ff6b8a]/10 border border-[#ff6b8a]/30 rounded-full px-2.5 py-0.5">
                <span className="text-[10px]">🔥</span>
                <span className="text-[10px] text-[#f0a0b5]">{gameData.chatHistory.loginStreak}일 연속</span>
              </div>
            </div>
          </div>
        </div>

        {/* ══ 우측 사이드 메뉴 (fixed: right, vertical center) ══ */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-25 flex flex-col gap-2">
          {([
            { key: 'missions',    icon: '📋', label: '미션',  badge: unclaimedCount },
            { key: 'stats',       icon: '💝', label: '통계', badge: 0 },
            { key: 'settings',    icon: '⚙️', label: '설정',  badge: 0 },
          ] as const).map((item) => {
            const isHighlight = item.key === 'missions' && unclaimedCount > 0;

            return (
              <button
                key={item.label}
                onClick={() => item.key && toggleMenu(item.key as SideMenu)}
                className={[
                  'relative w-13 flex flex-col items-center gap-1 rounded-xl px-1.5 py-2 backdrop-blur-md transition-all active:scale-95',
                  'border bg-[rgba(8,12,28,0.82)]',
                  activeMenu === item.key
                    ? 'border-[#4fd1ff]/60 bg-[rgba(20,35,70,0.85)] shadow-[0_0_12px_rgba(79,209,255,0.25)]'
                    : isHighlight
                    ? 'border-[#f5c842]/50 bg-[rgba(20,15,5,0.82)]'
                    : 'border-[rgba(79,209,255,0.25)]',
                ].join(' ')}
              >
                <span className="text-xl leading-none">{item.icon}</span>
                <span className={`text-[9px] tracking-wide ${isHighlight ? 'text-[#f5c842]' : 'text-[rgba(180,200,240,0.7)]'}`}>{item.label}</span>
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#ff6b8a] rounded-full border border-[#0a0e1a] flex items-center justify-center text-[8px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ══ 사이드 패널 (미션) ══ */}
        {activeMenu === 'missions' && (
          <div className="absolute right-[68px] top-1/2 -translate-y-1/2 z-24 w-52 max-h-[500px] bg-[rgba(8,12,28,0.92)] border border-[rgba(79,209,255,0.25)] rounded-xl backdrop-blur-xl shadow-xl flex flex-col overflow-hidden">
            {/* 헤더 - 고정 */}
            <div className="flex-shrink-0 px-3 pt-3 pb-2 border-b border-[#4fd1ff]/12">
              <div className="text-[9px] tracking-[2.5px] text-[#4fd1ff]/50 uppercase">— MISSION —</div>
            </div>
            
            {/* 미션 리스트 - 스크롤 가능 */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
              {dailyMissions.map(m => (
                <div key={m.id} className="flex items-start justify-between gap-2 py-1">
                  <div className="flex items-start gap-1.5 flex-1 min-w-0">
                    <div className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${m.completed ? 'bg-[#f5c842]' : 'border border-white/20'}`}/>
                    <div>
                      <div className={`text-[10px] leading-tight ${m.completed ? 'text-[#f5c842]/70 line-through' : 'text-[rgba(220,230,255,0.8)]'}`}>{m.title}</div>
                      <div className="text-[9px] text-white/30 mt-0.5">{m.description}</div>
                    </div>
                  </div>
                  {m.completed && !m.claimed && (
                    <button
                      onClick={() => claimMissionReward(m.id)}
                      className="flex-shrink-0 text-[9px] font-bold text-black bg-[#f5c842] px-2 py-0.5 rounded active:scale-95 transition-transform"
                    >받기</button>
                  )}
                </div>
              ))}
            </div>

            {/* 푸터 - 고정 */}
            <div className="flex-shrink-0 px-3 pb-3 pt-2 border-t border-[#4fd1ff]/10 text-[9px] text-[#4fd1ff]/40 text-center">
              {completedCount} / {gameData.missions.length} 완료
            </div>
          </div>
        )}

        {/* ══ 사이드 패널 (통계) ══ */}
        {activeMenu === 'stats' && (
          <div className="absolute right-[68px] top-1/2 -translate-y-1/2 z-24 w-52 bg-[rgba(8,12,28,0.92)] border border-[rgba(79,209,255,0.25)] rounded-xl p-3 backdrop-blur-xl shadow-xl">
            <div className="text-[9px] tracking-[2.5px] text-[#4fd1ff]/50 uppercase mb-2 pb-2 border-b border-[#4fd1ff]/12">— 비버 현 상태 —</div>
            
            {/* 스탯 바 */}
            <div className="space-y-2.5 mb-3">
              {[
                { icon: '💗', label: '친밀도', val: gameData.stats.affection, color: 'from-[#c04060] to-[#ff7090]', textColor: 'text-[#ff8099]' },
                { icon: '💙', label: '공감도', val: gameData.stats.empathy,   color: 'from-[#2060c0] to-[#60b0ff]', textColor: 'text-[#70c0ff]' },
                { icon: '💜', label: '반항도', val: gameData.stats.rebellion, color: 'from-[#7030a0] to-[#b060e8]', textColor: 'text-[#c080ff]' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <span className="text-[11px] w-4 text-center">{s.icon}</span>
                  <div className="flex-1 h-2 bg-black/50 rounded-full border border-white/[0.07] overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${s.color} rounded-full relative`} style={{width:`${s.val}%`}}>
                      <div className="absolute top-0 left-1 right-1 h-px bg-white/30 rounded"/>
                    </div>
                  </div>
                  <span className={`text-[11px] font-bold w-6 text-right ${s.textColor}`}>{s.val}</span>
                </div>
              ))}
            </div>

            {/* 통계 정보 */}
            <div className="pt-2 border-t border-[#4fd1ff]/10">
              <div className="space-y-1.5 text-[10px]">
                {[
                  { label: '총 대화',    value: `${gameData.chatHistory.totalChats}회` },
                  { label: '연속 접속',  value: `${gameData.chatHistory.loginStreak}일` },
                  { label: '최대 연속',  value: `${gameData.chatHistory.maxLoginStreak}일` },
                  { label: '완료 미션',  value: `${completedCount}개` },
                ].map(s => (
                  <div key={s.label} className="flex justify-between items-center">
                    <span className="text-white/40">{s.label}</span>
                    <span className="font-bold text-[#e8f0ff]">{s.value}</span>
                  </div>
                ))}
              </div>
              
              {gameData.achievements.length > 0 && (
                <div className="pt-2 mt-2 border-t border-white/5">
                  <div className="text-white/30 mb-1.5 text-[9px]">획득 칭호</div>
                  <div className="flex flex-wrap gap-1">
                    {gameData.achievements.map((a, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-[#f5c842]/10 text-[#f5c842] rounded text-[9px] border border-[#f5c842]/25">{a}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══ 사이드 패널 (설정) ══ */}
        {activeMenu === 'settings' && (
          <div className="absolute right-[68px] top-1/2 -translate-y-1/2 z-24 w-52 bg-[rgba(8,12,28,0.92)] border border-[rgba(79,209,255,0.25)] rounded-xl p-3 backdrop-blur-xl shadow-xl">
            <div className="text-[9px] tracking-[2.5px] text-[#4fd1ff]/50 uppercase mb-3 pb-2 border-b border-[#4fd1ff]/12">— 설정 —</div>
            
            {/* 배경 선택 */}
            <div className="space-y-2">
              <div className="text-[10px] text-white/60 mb-2">배경 선택</div>
              
              {/* 자동 옵션 */}
              <button
                onClick={() => {
                  handleBgChange('auto');
                  setActiveMenu(null);
                }}
                className={[
                  'w-full text-left px-3 py-2 rounded-lg text-[10px] transition-all',
                  selectedBgId === 'auto'
                    ? 'bg-[#4fd1ff]/20 border border-[#4fd1ff]/40 text-[#4fd1ff]'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                ].join(' ')}
              >
                <div className="flex items-center justify-between">
                  <span>자동 (시간대별)</span>
                  {selectedBgId === 'auto' && <span>✓</span>}
                </div>
              </button>

              {/* 배경 옵션들 */}
              {BG_OPTIONS.map(bg => (
                <button
                  key={bg.id}
                  onClick={() => {
                    handleBgChange(bg.id);
                    setActiveMenu(null);
                  }}
                  className={[
                    'w-full text-left px-3 py-2 rounded-lg text-[10px] transition-all',
                    selectedBgId === bg.id
                      ? 'bg-[#4fd1ff]/20 border border-[#4fd1ff]/40 text-[#4fd1ff]'
                      : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                  ].join(' ')}
                >
                  <div className="flex items-center justify-between">
                    <span>{bg.label}</span>
                    {selectedBgId === bg.id && <span>✓</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ══ 캐릭터 + 말풍선 그룹 (중앙 정렬, bottom에서 200px) ══ */}
        <div className="absolute bottom-[200px] left-1/2 -translate-x-1/2 z-15 flex flex-col items-center">
          
          {/* 말풍선 */}
          <div className="relative mb-4 w-56 bg-[rgba(6,9,18,0.88)] border border-[#4fd1ff]/30 rounded-xl px-4 py-3 backdrop-blur-xl shadow-lg game-speech-glow">
            <div className="text-[9px] font-bold text-[#4fd1ff] tracking-[1.5px] mb-1.5 uppercase">— 비버 —</div>
            <p className="text-[13px] text-[rgba(220,230,255,0.9)] leading-relaxed whitespace-pre-line">
              {dialogue}
              <span className="inline-block w-0.5 h-3 bg-[#4fd1ff] ml-0.5 align-middle game-cursor-blink"/>
            </p>
            {/* 말풍선 꼬리 (아래로) */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-[rgba(6,9,18,0.88)] [clip-path:polygon(0_0,100%_0,50%_100%)] border-l border-r border-[#4fd1ff]/30"/>
          </div>

          {/* 비버 캐릭터 */}
          <div className="relative w-[280px] h-[280px]">
            <Image
              src={currentBgId.startsWith('office') ? '/game/bver-office.png' : '/bver.png'}
              alt="비버"
              fill
              className="object-contain drop-shadow-[0_30px_60px_rgba(79,209,255,0.2)]"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

        </div>

        {/* ══ 하단 영역 (fixed height: 170px) ══ */}
        <div className="absolute bottom-0 left-0 right-0 h-[170px] z-30 px-4 pb-6 pt-4 bg-gradient-to-t from-[#060912]/98 via-[#060912]/80 to-transparent">
          {/* 타임스탬프 */}
          <p className="text-center text-[10px] text-[rgba(120,150,200,0.45)] mb-2.5 tracking-wide">
            마지막 대화 · {formatLastChat(gameData.chatHistory.lastChatTime)}
          </p>

          {/* 대화하기 버튼 */}
          <button
            onClick={() => router.push('/game/chat')}
            className="relative w-full mb-3 overflow-hidden rounded-xl border border-[#4fd1ff]/50 bg-gradient-to-r from-[#1a3a6a] via-[#0d2450] to-[#1a3a6a] shadow-[0_4px_0_#091828] active:translate-y-1 active:shadow-none transition-transform game-chat-glow"
          >
            <span className="absolute inset-0 game-btn-sweep"/>
            <div className="relative flex items-center justify-center gap-2 py-4">
              <span className="text-lg">💬</span>
              <span className="text-[15px] font-bold text-[#e0f4ff] tracking-[3px]">대화하기</span>
            </div>
          </button>
        </div>

      </div>
    </div>
  );
}