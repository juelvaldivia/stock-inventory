'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faShapes, faTags, faPlus } from '@fortawesome/free-solid-svg-icons';

const assignIcon = (icon: string) => {
  if (icon === 'products') return <FontAwesomeIcon icon={faTags} />;
  if (icon === 'materials') return <FontAwesomeIcon icon={faShapes} />;
  if (icon === 'register') return <FontAwesomeIcon icon={faPlus} />;
  else return <FontAwesomeIcon icon={faPlus} />;
};

interface SubOption {
  name: string;
  url: string;
  icon: string;
}

interface Option {
  name: string;
  url: string;
  icon: string;
  subOptions?: SubOption[];
}

interface AppBarProps {
  name?: string;
  options?: Option[];
}

const AppBar: React.FC<AppBarProps> = ({ name, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAppBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`bg-gray-800 text-white p-4 fixed top-0 left-0 h-full transition duration-200 ease-in-out ${
        isOpen ? 'w-64' : 'w-16'
      } z-10`}
    >
      <div className="flex flex-col h-full space-y-4">
        <button className="top-4 right-4 text-2xl" onClick={toggleAppBar}>
          {isOpen ? (
            <div className="flex items-center">
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              <p className="text-m">{name || 'Stock In'}</p>
            </div>
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>
        <nav className={`${isOpen ? 'block' : 'hidden'} space-y-4`}>
          <ul>
            {' '}
            {options?.map((option, key) => (
              <li key={`app-bar-key-${key}`} className="items-center cursor-pointer px-4 py-2">
                <a href={option.url} className="items-center cursor-pointer">
                  <span className="inline-flex items-center mr-2">{assignIcon(option.icon)}</span>
                  <span>{option.name}</span>
                </a>
                <hr className="border-t border-gray-400 my-1" />
                {option?.subOptions && (
                  <ul>
                    {option.subOptions.map((subOption, subKey) => (
                      <div key={`sub-option-key-${subKey}`}>
                        <li className="cursor-pointer py-2 hover:bg-gray-700">
                          <a href={subOption.url} className="flex items-center px-4">
                            <span className="">{assignIcon(subOption.icon)}</span>
                            <span className="ml-2">{subOption.name}</span>
                          </a>
                        </li>
                        <hr className="border-t border-gray-400 my-1" />
                      </div>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <nav className={`${isOpen ? 'hidden' : 'block'}`}>
          <ul>
            {options?.map((option, key) => (
              <li
                key={`app-bar-key-${key}`}
                className="flex items-center cursor-pointer px-2 py-2 hover:bg-gray-700"
              >
                <a href={option.url} title={name}>
                  <span>{assignIcon(option.icon)}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppBar;
