import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          상품을 찾을 수 없습니다
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          요청하신 상품이 존재하지 않거나 삭제되었습니다
        </p>
        <Link
          href="/goods"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-medium"
        >
          상품 목록으로
        </Link>
      </div>
    </div>
  );
}