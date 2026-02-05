import { testNotionConnection } from '@/lib/test-notion';
import { NextResponse } from 'next/server';

export async function GET() {
  await testNotionConnection();
  
  return NextResponse.json({ 
    message: 'Check your console for test results',
    env: {
      hasToken: !!process.env.NOTION_TOKEN,
      hasDatabaseId: !!process.env.NOTION_DATABASE_ID,
      tokenLength: process.env.NOTION_TOKEN?.length || 0,
      databaseId: process.env.NOTION_DATABASE_ID,
    }
  });
}