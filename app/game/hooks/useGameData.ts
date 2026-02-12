// app/game/hooks/useGameData.ts
'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { GameData, GameStats, Mission, ChatHistory } from '../types';
import { 
  getGameData, 
  initializeGameData, 
  updateGameStats, 
  updateMissions, 
  updateChatHistory,
  addAchievement,
  resetDailyMissions,
} from '@/lib/firestore/game';
import { STAT_INCREASE, POINT_REWARDS, getExpForLevel } from '../data/constants';
import { logger } from '@/lib/utils/logger';

export function useGameData() {
  const [user, setUser] = useState<User | null>(null);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);

  // Firebase Auth 상태 구독
  useEffect(() => {
    logger.auth('Auth state listener started');
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        logger.authSuccess('User logged in', { uid: currentUser.uid, email: currentUser.email });
      } else {
        logger.auth('User logged out');
      }
      setUser(currentUser);
    });

    return () => {
      logger.auth('Auth state listener cleanup');
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      logger.game('Loading game data for user', { uid: user.uid });
      loadGameData();
    } else {
      logger.game('No user found, clearing game data');
      setGameData(null);
      setLoading(false);
    }
  }, [user]);

  const loadGameData = async () => {
    if (!user) {
      logger.gameWarning('loadGameData called without user');
      return;
    }
    
    setLoading(true);
    logger.game('Starting game data load', { userId: user.uid });
    
    try {
      let data = await getGameData(user.uid);
      
      if (!data) {
        logger.game('No existing game data, initializing new data');
        data = await initializeGameData(user.uid);
        logger.gameSuccess('Game data initialized', data);
      } else {
        logger.gameSuccess('Game data loaded from Firestore', data);
        
        // 일일 미션 리셋 체크
        const lastLogin = new Date(data.chatHistory.lastLoginDate);
        const today = new Date();
        
        if (lastLogin.toDateString() !== today.toDateString()) {
          logger.game('New day detected, resetting daily missions', {
            lastLogin: lastLogin.toDateString(),
            today: today.toDateString()
          });
          await resetDailyMissions(user.uid);
          data = await getGameData(user.uid);
          logger.gameSuccess('Daily missions reset complete');
        }
      }
      
      setGameData(data);
    } catch (error) {
      logger.gameError('Failed to load game data', error);
    } finally {
      setLoading(false);
      logger.game('Game data loading complete');
    }
  };

  const increaseStat = async (stat: 'affection' | 'empathy' | 'rebellion', amount: number = STAT_INCREASE.perChoice) => {
    if (!user || !gameData) {
      logger.gameWarning('increaseStat called without user or gameData');
      return;
    }
    
    // 함수형 업데이트로 항상 최신 state 사용
    setGameData(prevData => {
      if (!prevData) return prevData;
      
      logger.game(`Increasing ${stat} by ${amount}`, { currentValue: prevData.stats[stat] });
      
      const newStats = { ...prevData.stats };
      const oldValue = newStats[stat];
      newStats[stat] = Math.min(newStats[stat] + amount, 100);
      newStats.exp += amount;
      
      logger.debug('STAT', `${stat}: ${oldValue} → ${newStats[stat]}`);
      
      // 레벨업 체크
      const requiredExp = getExpForLevel(newStats.level);
      if (newStats.exp >= requiredExp) {
        const oldLevel = newStats.level;
        newStats.level += 1;
        newStats.exp = newStats.exp - requiredExp;
        logger.gameSuccess(`⭐ LEVEL UP! ${oldLevel} → ${newStats.level}`, { 
          remainingExp: newStats.exp 
        });
      }
      
      // 비동기 업데이트 (Firestore)
      const updates: Partial<GameStats> = {
        [stat]: newStats[stat],
        exp: newStats.exp,
        level: newStats.level
      };
      
      updateGameStats(user!.uid, updates)
        .then(() => {
          logger.gameSuccess('Stats updated successfully');
          // 업적 체크
          checkAchievements(newStats);
        })
        .catch(error => logger.gameError('Failed to update stats', error));
      
      return { ...prevData, stats: newStats };
    });
  };

  const addPoints = async (points: number) => {
    if (!user || !gameData) {
      logger.gameWarning('addPoints called without user or gameData');
      return;
    }
    
    // 함수형 업데이트
    setGameData(prevData => {
      if (!prevData) return prevData;
      
      const newPoints = prevData.stats.points + points;
      logger.game(`Adding ${points} points`, { 
        currentPoints: prevData.stats.points,
        newTotal: newPoints
      });
      
      // 비동기 업데이트 (Firestore)
      updateGameStats(user!.uid, { points: newPoints })
        .then(() => logger.gameSuccess(`💰 Points added! Total: ${newPoints}`))
        .catch(error => logger.gameError('Failed to add points', error));
      
      return {
        ...prevData,
        stats: { ...prevData.stats, points: newPoints }
      };
    });
  };

  const incrementChatCount = async () => {
    if (!user || !gameData) {
      logger.gameWarning('incrementChatCount called without user or gameData');
      return;
    }
    
    logger.game('Incrementing chat count');
    
    // 함수형 업데이트
    setGameData(prevData => {
      if (!prevData) return prevData;
      
      const newChatHistory: ChatHistory = {
        ...prevData.chatHistory,
        lastChatTime: new Date().toISOString(),
        todayChats: prevData.chatHistory.todayChats + 1,
        totalChats: prevData.chatHistory.totalChats + 1,
      };
      
      // 비동기 업데이트 (Firestore)
      updateChatHistory(user!.uid, newChatHistory)
        .then(() => {
          logger.gameSuccess('Chat count updated', {
            todayChats: newChatHistory.todayChats,
            totalChats: newChatHistory.totalChats
          });
          // 포인트 지급 및 미션 업데이트
          addPoints(POINT_REWARDS.chat);
          updateMissionProgress('chat_count', 1);
          updateMissionProgress('choice_count', 1);
        })
        .catch(error => logger.gameError('Failed to increment chat count', error));
      
      return { ...prevData, chatHistory: newChatHistory };
    });
  };

  const updateMissionProgress = async (type: string, increment: number = 1) => {
    if (!user || !gameData) {
      logger.gameWarning('updateMissionProgress called without user or gameData');
      return;
    }
    
    logger.game(`Updating mission progress: ${type} +${increment}`);
    
    setGameData(prevData => {
      if (!prevData) return prevData;
      
      const updatedMissions = prevData.missions.map(mission => {
        if (mission.completed) return mission;
        
        let shouldUpdate = false;
        
        if (type === 'chat_count' && mission.requirement.type === 'chat_count') {
          shouldUpdate = true;
        } else if (type === 'choice_count' && mission.requirement.type === 'choice_count') {
          shouldUpdate = true;
        } else if (type === 'login_streak' && mission.requirement.type === 'login_streak') {
          shouldUpdate = true;
        } else if (type === 'shop_visit' && mission.requirement.type === 'shop_visit') {
          shouldUpdate = true;
        }
        
        if (shouldUpdate) {
          const newProgress = mission.progress + increment;
          const completed = newProgress >= mission.requirement.target;
          
          if (completed && !mission.completed) {
            logger.gameSuccess(`🎯 Mission completed: ${mission.title}`);
          }
          
          return { ...mission, progress: newProgress, completed };
        }
        
        return mission;
      });
      
      // 비동기 업데이트 (Firestore)
      updateMissions(user!.uid, updatedMissions)
        .then(() => logger.gameSuccess('Mission progress updated'))
        .catch(error => logger.gameError('Failed to update mission progress', error));
      
      return { ...prevData, missions: updatedMissions };
    });
  };

  const claimMissionReward = async (missionId: string) => {
    if (!user || !gameData) {
      logger.gameWarning('claimMissionReward called without user or gameData');
      return;
    }
    
    const mission = gameData.missions.find(m => m.id === missionId);
    if (!mission || !mission.completed || mission.claimed) {
      logger.gameWarning('Invalid mission claim attempt', { missionId, mission });
      return;
    }
    
    logger.game(`Claiming mission reward: ${mission.title}`, mission.reward);
    
    try {
      // 포인트 지급
      await addPoints(mission.reward.points);
      
      // 칭호 지급
      if (mission.reward.title) {
        await addAchievement(user.uid, mission.reward.title);
        setGameData(prevData => {
          if (!prevData) return prevData;
          return {
            ...prevData,
            achievements: [...prevData.achievements, mission.reward.title!],
          };
        });
        logger.gameSuccess(`🏆 Achievement unlocked: ${mission.reward.title}`);
      }
      
      // 미션 claimed 처리
      setGameData(prevData => {
        if (!prevData) return prevData;
        
        const updatedMissions = prevData.missions.map(m =>
          m.id === missionId ? { ...m, claimed: true } : m
        );
        
        updateMissions(user.uid, updatedMissions)
          .then(() => logger.gameSuccess('Mission reward claimed successfully'))
          .catch(error => logger.gameError('Failed to claim mission reward', error));
        
        return { ...prevData, missions: updatedMissions };
      });
    } catch (error) {
      logger.gameError('Failed to claim mission reward', error);
    }
  };

  const checkAchievements = async (stats: GameStats) => {
    if (!user || !gameData) {
      logger.gameWarning('checkAchievements called without user or gameData');
      return;
    }
    
    logger.debug('ACHIEVEMENT', 'Checking achievements', stats);
    
    setGameData(prevData => {
      if (!prevData) return prevData;
      
      const updatedMissions = prevData.missions.map(mission => {
        if (mission.type !== 'achievement' || mission.completed) return mission;
        
        if (mission.requirement.type === 'stat_level' && mission.requirement.stat) {
          const statValue = stats[mission.requirement.stat];
          if (statValue >= mission.requirement.target) {
            logger.gameSuccess(`🎖️ Achievement unlocked: ${mission.title}`);
            return { ...mission, progress: mission.requirement.target, completed: true };
          }
        }
        
        return mission;
      });
      
      // 비동기 업데이트 (Firestore)
      updateMissions(user!.uid, updatedMissions)
        .catch(error => logger.gameError('Failed to update achievements', error));
      
      return { ...prevData, missions: updatedMissions };
    });
  };

  const recordShopVisit = async () => {
    if (!user || !gameData) {
      logger.gameWarning('recordShopVisit called without user or gameData');
      return;
    }
    logger.game('Recording shop visit');
    await updateMissionProgress('shop_visit', 1);
  };

  return {
    gameData,
    loading,
    increaseStat,
    addPoints,
    incrementChatCount,
    claimMissionReward,
    recordShopVisit,
    refresh: loadGameData,
  };
}