import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 w-60 h-screen bg-gradient-to-b from-slate-800 to-slate-900 shadow-lg z-10">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-green-600 font-bold text-2xl">🌱</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Farmy</h1>
            <p className="text-slate-300 text-sm">Farm Marketplace</p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        <div className="px-10">
          <div className="space-y-2">
            <Link
              href="/"
              className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              href="/farms/add"
              className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200"
            >
              Add Farm
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
