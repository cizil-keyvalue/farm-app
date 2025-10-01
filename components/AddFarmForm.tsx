"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { addFarm } from "@/lib/actions";
import { initialState, type AddFarmState } from "@/lib/farms";

export default function AddFarmForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<AddFarmState, FormData>(
    addFarm,
    initialState
  );

  useEffect(() => {
    if (state?.success) {
      router.push("/");
    }
  }, [state?.success, router]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-black mb-2">Add New Farm</h2>
      </div>

      <form
        action={formAction}
        className="bg-white shadow-md border rounded-lg p-6 space-y-6"
      >
        <div>
          <label
            htmlFor="farm_name"
            className="block text-sm font-medium text-black mb-2"
          >
            Farm Name *
          </label>
          <input
            type="text"
            name="farm_name"
            id="farm_name"
            required
            disabled={pending}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-transparent outline-none text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="e.g., Green Valley Organic Farm"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-black mb-2"
          >
            Location *
          </label>
          <input
            type="text"
            name="location"
            id="location"
            required
            disabled={pending}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-transparent outline-none text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="e.g., Napa Valley, California"
          />
        </div>

        <div>
          <label
            htmlFor="owner"
            className="block text-sm font-medium text-black mb-2"
          >
            Owner *
          </label>
          <input
            type="text"
            name="owner"
            id="owner"
            required
            disabled={pending}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-transparent outline-none text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="e.g., John Doe"
          />
        </div>

        <div>
          <label
            htmlFor="total_acreage"
            className="block text-sm font-medium text-black mb-2"
          >
            Total Acreage *
          </label>
          <input
            type="number"
            name="total_acreage"
            id="total_acreage"
            required
            min="0"
            step="0.01"
            disabled={pending}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-transparent outline-none text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="e.g., 150"
          />
        </div>

        <div>
          <label
            htmlFor="active_crops"
            className="block text-sm font-medium text-black mb-2"
          >
            Active Crops *
          </label>
          <input
            type="text"
            name="active_crops"
            id="active_crops"
            required
            disabled={pending}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-transparent outline-none text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="e.g., Tomatoes, Lettuce, Carrots (comma-separated)"
          />
          <p className="text-sm text-black mt-1">
            Enter crops separated by commas
          </p>
        </div>

        <div>
          <label
            htmlFor="annual_yield"
            className="block text-sm font-medium text-black mb-2"
          >
            Annual Yield (kg) *
          </label>
          <input
            type="number"
            name="annual_yield"
            id="annual_yield"
            required
            min="0"
            disabled={pending}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-transparent outline-none text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="e.g., 45000"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={pending}
            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {pending ? "Adding Farm..." : "Add Farm"}
          </button>
          <Link
            href="/"
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
