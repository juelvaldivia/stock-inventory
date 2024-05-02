import React from 'react';

interface Option {
  name: string;
  url: string;
}

interface AppBarProps {
  name?: string;
  options?: Option[];
}

const AppBar: React.FC<AppBarProps> = ({ name, options }) => {
  return (
    <div className="bg-gray-800 text-white p-4 flex items-center fixed top-0 left-0 w-full z-10">
      <div className="text-lg font-bold">{name || 'Stock inventory'}</div>
      <nav className="ml-auto">
        <ul className="flex space-x-4">
          {options?.map((option, key) => (
            <li key={`app-bar-key-${key}`} className="cursor-pointer">
              <a href={option.url}>{option.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AppBar;
