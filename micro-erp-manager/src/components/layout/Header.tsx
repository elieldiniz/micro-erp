
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      </div>
    </header>
  );
};

export default Header;
