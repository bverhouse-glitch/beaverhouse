// app/api/products/route.ts
import { getAllProducts } from '@/lib/notion';

export async function GET() {
  try {
    const products = await getAllProducts();
    return Response.json(products);
  } catch (error) {
    console.error('상품 로드 에러:', error);
    return Response.json([], { status: 500 });
  }
}