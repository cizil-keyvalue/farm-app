import { NextRequest, NextResponse } from "next/server";
import {
  addFarm,
  getAllFarms
} from "@/lib/farms";

export async function GET(request: NextRequest) {
  try {
    const farms = getAllFarms();

    return NextResponse.json(farms);
  } catch (error) {
    console.error("Error fetching farms:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const requiredFields = [
      "farm_name",
      "location",
      "owner",
      "total_acreage",
      "active_crops",
      "annual_yield",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const lastFarm = getAllFarms()[getAllFarms().length - 1];
    const lastId = lastFarm.id;

    const newFarm = {
      id: lastId + 1,
      ...body,
      established_date: new Date().toISOString().split("T")[0],
      certifications: body.certifications || [],
      crops: body.crops || [],
    };

    addFarm(newFarm);

    return NextResponse.json(newFarm, { status: 201 });
  } catch (error) {
    console.error("Error creating farm:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
