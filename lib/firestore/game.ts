// lib/firestore/game.ts
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { GameData, GameStats, Mission, ChatHistory } from '@/app/game/types';
import { initializeMissions } from '@/app/game/data/missions';
import { logger } from '../utils/logger';

export async function getGameData(userId: string): Promise<GameData | null> {
  try {
    logger.firestore(`Getting game data for user: ${userId}`);
    const docRef = doc(db, 'users', userId, 'gameData', 'main');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as GameData;
      logger.firestoreSuccess('Game data retrieved', {
        level: data.stats.level,
        points: data.stats.points,
        totalChats: data.chatHistory.totalChats
      });
      return data;
    }
    
    logger.firestore('No game data found');
    return null;
  } catch (error) {
    logger.firestoreError('Error getting game data', error);
    return null;
  }
}

export async function initializeGameData(userId: string): Promise<GameData> {
  logger.firestore(`Initializing new game data for user: ${userId}`);
  
  const initialData: GameData = {
    userId,
    stats: {
      level: 1,
      affection: 0,
      empathy: 0,
      rebellion: 0,
      points: 0,
      exp: 0,
    },
    missions: initializeMissions(),
    chatHistory: {
      lastChatTime: new Date().toISOString(),
      todayChats: 0,
      totalChats: 0,
      loginStreak: 1,
      lastLoginDate: new Date().toISOString().split('T')[0],
      maxLoginStreak: 1
    },
    achievements: [],
    lastUpdated: new Date().toISOString(),
  };
  
  logger.debug('INIT', 'Initial game data structure', initialData);
  
  try {
    const docRef = doc(db, 'users', userId, 'gameData', 'main');
    await setDoc(docRef, initialData);
    logger.firestoreSuccess('Game data initialized successfully');
    return initialData;
  } catch (error) {
    logger.firestoreError('Failed to initialize game data', error);
    throw error;
  }
}

export async function updateGameStats(userId: string, stats: Partial<GameStats>): Promise<void> {
  logger.firestore('Updating game stats', stats);
  
  try {
    const docRef = doc(db, 'users', userId, 'gameData', 'main');
    
    // Firestore dot notation으로 nested field 업데이트
    const updateData: Record<string, any> = {
      lastUpdated: new Date().toISOString(),
    };
    
    // stats의 각 필드를 개별적으로 업데이트
    Object.entries(stats).forEach(([key, value]) => {
      updateData[`stats.${key}`] = value;
    });
    
    logger.debug('FIRESTORE', 'Update data with dot notation', updateData);
    
    await updateDoc(docRef, updateData);
    logger.firestoreSuccess('Stats updated in Firestore');
  } catch (error) {
    logger.firestoreError('Error updating stats', error);
    throw error;
  }
}

export async function updateMissions(userId: string, missions: Mission[]): Promise<void> {
  const completedCount = missions.filter(m => m.completed).length;
  logger.firestore(`Updating missions (${completedCount}/${missions.length} completed)`);
  
  try {
    const docRef = doc(db, 'users', userId, 'gameData', 'main');
    await updateDoc(docRef, {
      missions,
      lastUpdated: new Date().toISOString(),
    });
    logger.firestoreSuccess('Missions updated in Firestore');
  } catch (error) {
    logger.firestoreError('Error updating missions', error);
    throw error;
  }
}

export async function updateChatHistory(userId: string, chatHistory: Partial<ChatHistory>): Promise<void> {
  logger.firestore('Updating chat history', chatHistory);
  
  try {
    const docRef = doc(db, 'users', userId, 'gameData', 'main');
    
    // Firestore dot notation으로 nested field 업데이트
    const updateData: Record<string, any> = {
      lastUpdated: new Date().toISOString(),
    };
    
    // chatHistory의 각 필드를 개별적으로 업데이트
    Object.entries(chatHistory).forEach(([key, value]) => {
      updateData[`chatHistory.${key}`] = value;
    });
    
    logger.debug('FIRESTORE', 'Update data with dot notation', updateData);
    
    await updateDoc(docRef, updateData);
    logger.firestoreSuccess('Chat history updated in Firestore');
  } catch (error) {
    logger.firestoreError('Error updating chat history', error);
    throw error;
  }
}

export async function addAchievement(userId: string, achievementId: string): Promise<void> {
  logger.firestore(`Adding achievement: ${achievementId}`);
  
  try {
    const gameData = await getGameData(userId);
    if (!gameData) {
      logger.firestoreError('Cannot add achievement - no game data found');
      return;
    }
    
    if (!gameData.achievements.includes(achievementId)) {
      const docRef = doc(db, 'users', userId, 'gameData', 'main');
      await updateDoc(docRef, {
        achievements: [...gameData.achievements, achievementId],
        lastUpdated: new Date().toISOString(),
      });
      logger.firestoreSuccess(`Achievement added: ${achievementId}`);
    } else {
      logger.firestore('Achievement already exists, skipping');
    }
  } catch (error) {
    logger.firestoreError('Error adding achievement', error);
    throw error;
  }
}

export async function resetDailyMissions(userId: string): Promise<void> {
  logger.firestore('Resetting daily missions');
  
  try {
    const gameData = await getGameData(userId);
    if (!gameData) {
      logger.firestoreError('Cannot reset missions - no game data found');
      return;
    }
    
    const resetMissions = gameData.missions.map(mission => {
      if (mission.type === 'daily') {
        return { ...mission, progress: 0, completed: false, claimed: false };
      }
      return mission;
    });
    
    const dailyCount = resetMissions.filter(m => m.type === 'daily').length;
    logger.debug('RESET', `Resetting ${dailyCount} daily missions`);
    
    await updateMissions(userId, resetMissions);
    logger.firestoreSuccess('Daily missions reset complete');
  } catch (error) {
    logger.firestoreError('Error resetting daily missions', error);
    throw error;
  }
}