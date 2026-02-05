// fetch API를 사용한 Notion 연동

const NOTION_TOKEN = process.env.NOTION_TOKEN || '';
const NOTION_DATABASE_ID_RAW = process.env.NOTION_DATABASE_ID || '';
const NOTION_VERSION = '2022-06-28';

// 노션 ID를 올바른 형식으로 변환 (UUID 형식: 8-4-4-4-12)
function formatNotionId(id: string | undefined): string {
  if (!id) return '';
  if (id.includes('-')) return id;
  
  const cleaned = id.replace(/-/g, '');
  if (cleaned.length !== 32) return id;
  
  return `${cleaned.slice(0, 8)}-${cleaned.slice(8, 12)}-${cleaned.slice(12, 16)}-${cleaned.slice(16, 20)}-${cleaned.slice(20)}`;
}

// Database ID를 올바른 형식으로 변환
const NOTION_DATABASE_ID = formatNotionId(NOTION_DATABASE_ID_RAW);

// 노션 데이터베이스에서 모든 아이템 가져오기
export async function getNotionData() {
  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': NOTION_VERSION,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: {
            property: 'IsActive',
            checkbox: {
              equals: true,
            },
          },
          sorts: [
            {
              property: 'CreatedAt',
              direction: 'descending',
            },
          ],
        }),
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Notion API Error:', error);
    return [];
  }
}

// 특정 상품 가져오기
export async function getNotionPage(pageId: string) {
  try {
    const formattedId = formatNotionId(pageId);
    
    const response = await fetch(
      `https://api.notion.com/v1/pages/${formattedId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': NOTION_VERSION,
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Notion Page Error:', error);
    return null;
  }
}

// 노션 페이지 속성 파싱 헬퍼 함수
export function parseNotionProperty(property: any): any {
  if (!property) return '';

  switch (property.type) {
    case 'title':
      return property.title?.[0]?.plain_text || '';
    case 'rich_text':
      return property.rich_text?.[0]?.plain_text || '';
    case 'number':
      return property.number ?? 0;
    case 'select':
      return property.select?.name || '';
    case 'multi_select':
      return property.multi_select?.map((s: any) => s.name).join(', ') || '';
    case 'date':
      return property.date?.start || '';
    case 'checkbox':
      return property.checkbox || false;
    case 'url':
      return property.url || '';
    case 'files':
      return property.files?.[0]?.file?.url || property.files?.[0]?.external?.url || '';
    default:
      return '';
  }
}

// 상품 데이터 타입
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  bgColor: string;
  image: string;
  description: string;
  stock: number;
  isActive: boolean;
  createdAt: string;
}

// 노션 데이터를 상품 데이터 형식으로 변환
export function convertNotionToProduct(notionPage: any): Product {
  const properties = notionPage.properties;

  return {
    id: notionPage.id,
    name: parseNotionProperty(properties.Name) || '제목 없음',
    price: parseNotionProperty(properties.Price) || 0,
    category: parseNotionProperty(properties.Category) || '미분류',
    bgColor: parseNotionProperty(properties.BgColor) || '#F5F5F5',
    image: parseNotionProperty(properties.Image) || '', // Image 속성이 없어도 작동
    description: parseNotionProperty(properties.Description) || '',
    stock: parseNotionProperty(properties.Stock) || 0,
    isActive: parseNotionProperty(properties.IsActive) !== false,
    createdAt: parseNotionProperty(properties.CreatedAt) || new Date().toISOString(),
  };
}

// 모든 상품 가져오기
export async function getAllProducts(): Promise<Product[]> {
  const notionData = await getNotionData();
  return notionData.map(convertNotionToProduct);
}

// 단일 상품 가져오기
export async function getProduct(id: string): Promise<Product | null> {
  const notionPage = await getNotionPage(id);
  if (!notionPage) return null;
  return convertNotionToProduct(notionPage);
}