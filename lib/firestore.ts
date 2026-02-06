// lib/firestore.ts
import { db } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  deleteDoc,
  increment,
  serverTimestamp, 
  updateDoc
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

//
//
// 주문
// 주문 생성 시 items 배열에 상품 정보 + 배송지 정보도 같이 저장
export async function createOrder(
  userId: string, 
  items: any[], 
  totalPrice: number, 
  paymentInfo: { 
    paymentMethod: string; 
    transferInfo: any; 
    status: string; 
  },
  shippingInfo: {
    name: string;
    phone: string;
    zipcode: string;
    address: string;
    addressDetail: string;
  }
) {
  const ordersRef = collection(db, 'users', userId, 'orders');
  const orderDoc = doc(ordersRef);
  
  await setDoc(orderDoc, {
    orderNumber: `ORD-${Date.now()}`,
    items: items.map(item => ({
      productId: item.productId,
      name: item.product?.name,
      price: item.product?.price,
      quantity: item.quantity,
      image: item.product?.image,
      bgColor: item.product?.bgColor,
    })),
    totalPrice,
    status: paymentInfo.status,
    paymentMethod: paymentInfo.paymentMethod,
    transferInfo: paymentInfo.transferInfo,
    shippingInfo: {
      name: shippingInfo.name,
      phone: shippingInfo.phone,
      zipcode: shippingInfo.zipcode,
      address: shippingInfo.address,
      addressDetail: shippingInfo.addressDetail,
    },
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

// 주문 취소
export async function cancelOrder(userId: string, orderId: string) {
  const orderRef = doc(db, 'users', userId, 'orders', orderId);
  await updateDoc(orderRef, {
    status: 'canceled',
    canceledAt: new Date().toISOString(),
  });
}

//
//
// 포인트
// 포인트 조회
export async function getPoints(userId: string): Promise<number> {
  const userDoc = await getDoc(doc(db, 'users', userId));
  return userDoc.data()?.points || 0;
}

// 포인트 적립
export async function addPoints(userId: string, points: number): Promise<void> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  const currentPoints = userDoc.data()?.points || 0;
  
  await setDoc(userRef, {
    points: currentPoints + points,
    lastPointsEarned: new Date(),
  }, { merge: true });
}

// 포인트 사용
export async function usePoints(userId: string, points: number): Promise<boolean> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  const currentPoints = userDoc.data()?.points || 0;
  
  if (currentPoints < points) {
    return false; // 포인트 부족
  }
  
  await setDoc(userRef, {
    points: currentPoints - points,
  }, { merge: true });
  
  return true;
}