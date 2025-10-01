import { NextRequest, NextResponse } from "next/server";
import { getFarmById } from "@/lib/farms";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const farmId = parseInt(id);

    if (isNaN(farmId)) {
      return NextResponse.json({ error: "Invalid farm ID" }, { status: 400 });
    }

    const farm = getFarmById(farmId);

    if (!farm) {
      return NextResponse.json({ error: "Farm not found" }, { status: 404 });
    }

    return NextResponse.json(farm);
  } catch (error) {
    console.error("Error fetching farm:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const farmId = parseInt(id);

    if (isNaN(farmId)) {
      return NextResponse.json({ error: "Invalid farm ID" }, { status: 400 });
    }

    return NextResponse.json({ message: "Farm deleted successfully" });
  } catch (error) {
    console.error("Error deleting farm:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
