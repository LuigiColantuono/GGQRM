import React from 'react';
import { QrCodeType } from '../types';

interface SidebarProps {
  selectedType: QrCodeType;
  onSelectType: (type: QrCodeType) => void;
}

const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const TextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>;
const WifiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12.55a8 8 0 0 1 14.08 0" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.53 16.11a4 4 0 0 1 6.95 0" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h.01" />
    </svg>
);
const PaymentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const WhatsAppIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.447-4.432-9.885-9.888-9.885-5.448 0-9.886 4.434-9.889 9.885-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.608-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.371c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>;


const Sidebar: React.FC<SidebarProps> = ({ selectedType, onSelectType }) => {
  const navItems = [
    { id: 'url' as QrCodeType, label: 'URL', icon: <LinkIcon /> },
    { id: 'text' as QrCodeType, label: 'Text', icon: <TextIcon /> },
    { id: 'whatsapp' as QrCodeType, label: 'WhatsApp', icon: <WhatsAppIcon /> },
    { id: 'wifi' as QrCodeType, label: 'Wi-Fi', icon: <WifiIcon /> },
    { id: 'payment' as QrCodeType, label: 'Payment', icon: <PaymentIcon /> },
  ];

  return (
    <div className="w-64 bg-[#121212] border-r border-[#2a2a2a] p-4 flex flex-col">
      <h1 className="text-2xl font-bold text-[#00f0a0] mb-8">GG QR Manager</h1>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectType(item.id)}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
              selectedType === item.id
                ? 'bg-[#00f0a0] text-black'
                : 'text-gray-400 hover:bg-[#1c1c1c] hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;