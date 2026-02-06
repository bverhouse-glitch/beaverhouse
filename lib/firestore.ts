import { db } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  deleteDoc,
  increment,
  serverTimestamp 
} from 'firebase/firestore';

// 장바구니 추가
export async function addToCart(userId: string, productId: string, quantity: number = 1) {
  const cartRef = doc(db, 'users', userId, 'cart', productId);
  await setDoc(cartRef, {
    productId,
    quantity,
    addedAt: serverTimestamp()
  }, { merge: true });
}

// 장바구니 목록 가져오기
export async function getCart(userId: string) {
  const cartRef = collection(db, 'users', userId, 'cart');
  const snapshot = await getDocs(cartRef);
  return snapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() 
  }));
}

// 장바구니 삭제
export async function removeFromCart(userId: string, productId: string) {
  const cartRef = doc(db, 'users', userId, 'cart', productId);
  await deleteDoc(cartRef);
}

// 찜하기 토글
export async function toggleLike(userId: string, productId: string) {
  const likeRef = doc(db, 'users', userId, 'likes', productId);
  const snapshot = await getDoc(likeRef);
  
  if (snapshot.exists()) {
    await deleteDoc(likeRef);
    return false; // 찜 해제
  } else {
    await setDoc(likeRef, {
      productId,
      likedAt: serverTimestamp()
    });
    return true; // 찜 추가
  }
}

// 찜 목록 가져오기
export async function getLikes(userId: string) {
  const likesRef = collection(db, 'users', userId, 'likes');
  const snapshot = await getDocs(likesRef);
  return snapshot.docs.map(doc => doc.id); // productId 배열 반환
}

// 주문 생성 (모의)
export async function createOrder(userId: string, items: any[], totalPrice: number) {
  const ordersRef = collection(db, 'users', userId, 'orders');
  const orderDoc = doc(ordersRef); // 자동 ID 생성
  
  await setDoc(orderDoc, {
    orderNumber: `ORD-${Date.now()}`,
    items,
    totalPrice,
    status: 'pending',
    createdAt: serverTimestamp()
  });
  
  return orderDoc.id;
}

// 주문 내역 가져오기
export async function getOrders(userId: string) {
  const ordersRef = collection(db, 'users', userId, 'orders');
  const snapshot = await getDocs(ordersRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}