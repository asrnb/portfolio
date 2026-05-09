
import { NextResponse } from 'next/server';
import { join } from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  const filePath = join(process.cwd(), 'public', 'april-suarnaba-resume.pdf');
  const fileBuffer = await fs.readFile(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="April_Suarnaba_Resume.pdf"',
    },
  });
}
