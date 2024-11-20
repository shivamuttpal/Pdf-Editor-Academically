import React, { useState } from 'react';

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-64 h-full bg-gradient-to-b from-blue-900 to-blue-700 text-white shadow-lg">
      {/* App Logo */}
      <div className="p-6 text-center text-3xl font-bold border-b border-blue-600">
        Faculty Portal
      </div>

      {/* Navigation Links */}
      <nav className="mt-6">
        <ul className="space-y-2">
          {/* Dropdown for Faculty View */}
          <li className="group">
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-between w-full px-6 py-3 hover:bg-blue-600 rounded-lg transition duration-200"
            >
              <div className="flex items-center">
                <span className="text-lg group-hover:text-gray-200">Faculty</span>
              </div>
            </button>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <ul className="mt-2 space-y-1 pl-8">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-blue-500 rounded-lg transition duration-200"
                  >
                    Faculty View
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center border-t border-blue-600 text-sm">
        © 2024 Faculty Portal
      </div>
    </div>
  );
};

export default Sidebar;
