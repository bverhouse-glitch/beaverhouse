import { getNotionData, parseNotionProperty } from './notion';

// 진행중 팝업 (일단 하드코딩 유지 - 나중에 별도 DB 만들면 수정)
export const popupStores = [
  { id: 1, title: '홍대 팝업스토어', date: '2026.02.01 - 02.28', bgColor: '#F5F5F5' },
  { id: 2, title: '강남 팝업스토어', date: '2026.03.01 - 03.31', bgColor: '#F0F0F0' },
];

// 하드코딩된 기존 데이터 (폴백용)
export const allProducts = [
  { id: 1, name: '비버 미니 피규어', price: '29,000', category: '피규어', bgColor: '#FFF8E1' },
  { id: 2, name: '비버 에코백', price: '15,000', category: '패션', bgColor: '#E8F5E9' },
  { id: 3, name: '비버 노트', price: '8,000', category: '문구', bgColor: '#E3F2FD' },
  { id: 4, name: '비버 키링', price: '12,000', category: '악세서리', bgColor: '#FCE4EC' },
  { id: 5, name: '비버 스티커팩', price: '6,000', category: '문구', bgColor: '#FFF3E0' },
  { id: 6, name: '비버 후드티', price: '45,000', category: '패션', bgColor: '#F3E5F5' },
  { id: 7, name: '비버 머그컵', price: '18,000', category: '리빙', bgColor: '#E1F5FE' },
  { id: 8, name: '비버 파우치', price: '22,000', category: '패션', bgColor: '#FFF9C4' },
  { id: 9, name: '비버 인형 대형', price: '89,000', category: '피규어', bgColor: '#F1F8E9' },
  { id: 10, name: '비버 볼펜 세트', price: '12,000', category: '문구', bgColor: '#FCE4EC' },
  { id: 11, name: '비버 마스킹테이프', price: '5,000', category: '문구', bgColor: '#E0F2F1' },
  { id: 12, name: '비버 맨투맨', price: '42,000', category: '패션', bgColor: '#FFF8E1' },
];