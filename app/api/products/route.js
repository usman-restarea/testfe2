import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',           
      password: '',          
      database: 'usmanfe2',   
    });

    const [rows] = await connection.execute('SELECT * FROM products');
    await connection.end();

    return NextResponse.json(rows);
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}