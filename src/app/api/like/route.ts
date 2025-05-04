import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { nama } = await req.json()

  if (!nama) {
    return new Response(JSON.stringify({ error: 'Nama wajib diisi' }), { status: 400 })
  }

  try {
    const like = await prisma.like.create({ data: { nama } })
    return new Response(JSON.stringify({ success: true, like }), { status: 200 })
  } catch (error) {
    console.error('Gagal menyimpan:', error)
    return new Response(JSON.stringify({ error: 'Gagal menyimpan nama' }), { status: 500 })
  }
}
