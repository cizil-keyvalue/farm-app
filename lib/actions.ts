"use server";

import type { Farm, AddFarmState } from "./farms";

export async function addFarm(
  prevState: AddFarmState,
  formData: FormData
): Promise<AddFarmState> {
  try {
    const farm_name = formData.get("farm_name") as string;
    const location = formData.get("location") as string;
    const owner = formData.get("owner") as string;
    const total_acreage = Number(formData.get("total_acreage"));
    const active_crops = (formData.get("active_crops") as string)
      .split(",")
      .map((crop) => crop.trim())
      .filter((crop) => crop.length > 0);
    const annual_yield = Number(formData.get("annual_yield"));

    if (
      !farm_name ||
      !location ||
      !owner ||
      !total_acreage ||
      !active_crops.length ||
      !annual_yield
    ) {
      return {
        error: "All fields are required",
      };
    }

    if (total_acreage <= 0 || annual_yield <= 0) {
      return {
        error: "Total acreage and annual yield must be greater than 0",
      };
    }

    const newFarm: Omit<Farm, "id"> = {
      farm_name,
      location,
      owner,
      established_date: new Date().toISOString().split("T")[0],
      certifications: [],
      total_acreage,
      active_crops,
      annual_yield,
      crops: [],
    };

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/farms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFarm),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.error || "Failed to add farm. Please try again.",
      };
    }

    return {
      success: true,
      message: `Farm "${farm_name}" has been successfully added!`,
    };
  } catch (error) {
    console.error("Error adding farm:", error);
    return {
      error: "Failed to add farm. Please try again.",
    };
  }
}

export async function refreshFarmData(farmId: string) {
  const { revalidatePath } = await import("next/cache");
  
  if (farmId) {
    revalidatePath(`/farms/${farmId}`);
  }
  else {
    revalidatePath("/");
  }
  
  return { success: true };
}

