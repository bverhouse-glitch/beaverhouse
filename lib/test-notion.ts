// 이 파일을 lib/test-notion.ts로 저장하고
// app/api/test-notion/route.ts에서 사용하세요

const NOTION_TOKEN = process.env.NOTION_TOKEN || '';
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || '';

export async function testNotionConnection() {
  console.log('=== Notion Connection Test ===');
  console.log('Token exists:', !!NOTION_TOKEN);
  console.log('Token length:', NOTION_TOKEN.length);
  console.log('Token starts with:', NOTION_TOKEN.substring(0, 10) + '...');
  console.log('Database ID:', NOTION_DATABASE_ID);
  console.log('Database ID length:', NOTION_DATABASE_ID.length);
  
  // 1. 데이터베이스 정보 가져오기 테스트
  try {
    console.log('\n--- Testing Database Retrieval ---');
    const dbResponse = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
        },
      }
    );
    
    console.log('Database response status:', dbResponse.status);
    
    if (dbResponse.ok) {
      const dbData = await dbResponse.json();
      console.log('✅ Database found!');
      console.log('Database title:', dbData.title?.[0]?.plain_text || 'No title');
      console.log('Database properties:', Object.keys(dbData.properties || {}));
    } else {
      const errorData = await dbResponse.json();
      console.log('❌ Database error:', errorData);
    }
  } catch (error) {
    console.log('❌ Database test failed:', error);
  }
  
  // 2. 데이터베이스 쿼리 테스트
  try {
    console.log('\n--- Testing Database Query ---');
    const queryResponse = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }
    );
    
    console.log('Query response status:', queryResponse.status);
    
    if (queryResponse.ok) {
      const queryData = await queryResponse.json();
      console.log('✅ Query successful!');
      console.log('Results count:', queryData.results.length);
      
      if (queryData.results.length > 0) {
        const firstItem = queryData.results[0];
        console.log('First item ID:', firstItem.id);
        console.log('First item properties:', Object.keys(firstItem.properties));
        
        // 각 속성의 타입 출력
        Object.entries(firstItem.properties).forEach(([key, value]: [string, any]) => {
          console.log(`  - ${key}: ${value.type}`);
        });
      }
    } else {
      const errorData = await queryResponse.json();
      console.log('❌ Query error:', errorData);
    }
  } catch (error) {
    console.log('❌ Query test failed:', error);
  }
  
  console.log('\n=== Test Complete ===');
}