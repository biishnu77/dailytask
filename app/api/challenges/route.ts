import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const challenges = await prisma.challenge.findMany({
      where: {
        userId: session.user.id,
      },
    });
    return NextResponse.json(challenges);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, description, startDate, endDate } = await req.json();
    const challenge = await prisma.challenge.create({
      data: {
        title,
        description,
        startDate,
        endDate,
        userId: session.user.id,
      },
    });
    return NextResponse.json(challenge);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}