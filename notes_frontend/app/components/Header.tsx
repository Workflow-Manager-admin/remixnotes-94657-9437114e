import React from "react";

// PUBLIC_INTERFACE
export const Header: React.FC = () => (
  <header className="flex items-center h-16 px-4 gap-2 border-b border-gray-100 bg-white sticky top-0 z-10">
    <div className="flex-1 flex items-center gap-4 min-w-0">
      <span className="inline-flex items-center font-bold text-lg tracking-tight text-[#2563eb]">
        <svg
          width="32"
          height="32"
          aria-hidden="true"
          viewBox="0 0 40 40"
          fill="none"
        >
          <rect width="100%" height="100%" rx="8" fill="#2563eb" />
          <text
            x="50%"
            y="56%"
            textAnchor="middle"
            fill="#fff"
            fontSize="22"
            fontFamily="monospace"
            dy=".3em"
          >
            N
          </text>
        </svg>
        <span className="ml-2">Notes</span>
      </span>
    </div>
    <nav className="flex items-center text-[#64748b] gap-6">
      {/* Home nav */}
      <a href="/" className="hover:text-[#2563eb] font-medium">All Notes</a>
      <a href="/categories" className="hover:text-[#2563eb] font-medium">Categories</a>
    </nav>
  </header>
);
