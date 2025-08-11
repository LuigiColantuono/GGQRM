import React from 'https://esm.sh/react@19.1.1';
import { QrCodeType } from '../types.ts';

interface SidebarProps {
  selectedType: QrCodeType;
  onSelectType: (type: QrCodeType) => void;
  view: 'editor' | 'dashboard';
  onSelectView: (view: 'editor' | 'dashboard') => void;
  onOpenSettings: () => void;
}

const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const TextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>;
const WifiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 -960 960 960" fill="currentColor">
        <path d="M480-120q-42 0-71-29t-29-71 29-71 71-29 71 29 29 71-29 71-71 29M254-346l-84-86q59-59 138.5-93.5T480-560t171.5 35T790-430l-84 84q-44-44-102-69t-124-25-124 25-102 69M84-516 0-600q92-94 215-147t265-53 265 53 215 147l-84 84q-77-77-178.5-120.5T480-680t-217.5 43.5T84-516"/>
    </svg>
);
const PaymentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const WhatsAppIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.447-4.432-9.885-9.888-9.885-5.448 0-9.886 4.434-9.889 9.885-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.608-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.371c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>;
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;


const Sidebar: React.FC<SidebarProps> = ({ selectedType, onSelectType, view, onSelectView, onOpenSettings }) => {
  const handleTypeSelect = (type: QrCodeType) => {
    onSelectType(type);
    onSelectView('editor');
  };

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
      <nav className="flex-grow flex flex-col space-y-2">
         <button
            onClick={() => onSelectView('dashboard')}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
              view === 'dashboard'
                ? 'bg-[#00f0a0] text-black'
                : 'text-gray-400 hover:bg-[#1c1c1c] hover:text-white'
            }`}
          >
            <DashboardIcon />
            <span className="font-medium">Dashboard</span>
          </button>

          <div className="pt-4 mt-4 border-t border-[#2a2a2a]">
             <h2 className="px-3 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Create New</h2>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTypeSelect(item.id)}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                  view === 'editor' && selectedType === item.id
                    ? 'bg-[#00f0a0] text-black'
                    : 'text-gray-400 hover:bg-[#1c1c1c] hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
      </nav>
      <div className="mt-auto pt-4 border-t border-[#2a2a2a]">
        <button
          onClick={onOpenSettings}
          className="flex w-full items-center space-x-3 p-3 rounded-lg transition-colors duration-200 text-gray-400 hover:bg-[#1c1c1c] hover:text-white"
        >
          <SettingsIcon />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;