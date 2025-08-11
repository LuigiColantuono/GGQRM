import React, { useState, useEffect } from 'react';
import { QrCodeData, QrCodeOptions, QrCodeType, SavedQrCode } from './types';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Dashboard from './components/Dashboard';
import SettingsModal from './components/SettingsModal';
import { DEFAULT_QR_CODE_OPTIONS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'editor' | 'dashboard'>('editor');
  const [qrCodeType, setQrCodeType] = useState<QrCodeType>('url');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  
  const [qrCodeData, setQrCodeData] = useState<QrCodeData>({
    url: 'https://www.google.com',
    text: 'Hello World',
    wifi: { ssid: '', password: '', encryption: 'WPA' },
    payment: { type: 'paypal', details: { recipient: '', amount: '' } },
    whatsapp: { phone: '', message: '' },
  });
  const [qrOptions, setQrOptions] = useState<QrCodeOptions>(DEFAULT_QR_CODE_OPTIONS);
  
  const [savedQRCodes, setSavedQRCodes] = useState<SavedQrCode[]>(() => {
    try {
      const item = window.localStorage.getItem('savedQRCodes');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error("Error reading savedQRCodes from localStorage", error);
      return [];
    }
  });

  const [localHost, setLocalHost] = useState<string>(() => {
    try {
      return window.localStorage.getItem('localHost') || '';
    } catch (error) {
      console.error("Error reading localHost from localStorage", error);
      return '';
    }
  });

  // Effect to handle scan tracking and redirection
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scanId = urlParams.get('scan');

    if (scanId) {
        setIsRedirecting(true);
        try {
            const storedCodes: SavedQrCode[] = JSON.parse(window.localStorage.getItem('savedQRCodes') || '[]');
            const codeToScan = storedCodes.find(c => c.id === scanId);

            if (codeToScan) {
                const updatedCodes = storedCodes.map(c =>
                    c.id === scanId ? { ...c, scans: c.scans + 1 } : c
                );
                window.localStorage.setItem('savedQRCodes', JSON.stringify(updatedCodes));
                
                // Add a small delay to ensure the storage event has time to fire in other tabs before redirecting.
                setTimeout(() => {
                    window.location.href = codeToScan.finalQrString;
                }, 100);

            } else {
                console.error(`QR Code with ID ${scanId} not found.`);
                window.location.href = window.location.origin + window.location.pathname;
            }
        } catch (error) {
            console.error("Error processing scan:", error);
            window.location.href = window.location.origin + window.location.pathname;
        }
    }
  }, []);
  
  // Effect to sync state across multiple tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'savedQRCodes' && event.newValue) {
        try {
          setSavedQRCodes(JSON.parse(event.newValue));
        } catch (error) {
          console.error("Error syncing state from storage update:", error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  // Effect to persist savedQRCodes to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem('savedQRCodes', JSON.stringify(savedQRCodes));
    } catch (error) {
      console.error("Error writing savedQRCodes to localStorage", error);
    }
  }, [savedQRCodes]);
  
  // Effect to persist localHost to localStorage
  useEffect(() => {
    try {
        window.localStorage.setItem('localHost', localHost);
    } catch (error) {
        console.error("Error writing localHost to localStorage", error);
    }
  }, [localHost]);


  const getQrString = (): string => {
    switch (qrCodeType) {
      case 'url':
        return qrCodeData.url;
      case 'text':
        return qrCodeData.text;
      case 'wifi':
        const { ssid, password, encryption } = qrCodeData.wifi;
        return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
      case 'whatsapp':
        const { phone, message } = qrCodeData.whatsapp;
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        if (!cleanPhone) return '';
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`;
      case 'payment':
        const { type, details } = qrCodeData.payment;
        if (type === 'paypal' && details.recipient) {
          return `https://paypal.me/${details.recipient}/${details.amount || ''}`;
        }
        if (type === 'bitcoin' && details.recipient) {
          return `bitcoin:${details.recipient}?amount=${details.amount || ''}`;
        }
        return '';
      default:
        return '';
    }
  };
  
  const handleSaveQrCode = (name: string) => {
    const newId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const protocol = window.location.protocol;
    const port = window.location.port ? `:${window.location.port}` : '';
    const host = localHost || window.location.hostname;
    const trackingUrl = `${protocol}//${host}${port}${window.location.pathname}?scan=${newId}`;

    const newCode: SavedQrCode = {
      id: newId,
      name,
      qrCodeType,
      qrCodeData,
      options: qrOptions,
      finalQrString: getQrString(),
      trackingUrl: trackingUrl,
      scans: 0,
      createdAt: new Date().toISOString(),
    };
    setSavedQRCodes(prev => [...prev, newCode]);
    setView('dashboard');
  };

  const handleDeleteQrCode = (id: string) => {
    setSavedQRCodes(prev => prev.filter(code => code.id !== id));
  };

  const handleEditQrCode = (code: SavedQrCode) => {
    setQrCodeType(code.qrCodeType);
    setQrCodeData(code.qrCodeData);
    setQrOptions(code.options);
    setView('editor');
  };

  if (isRedirecting) {
    return (
      <div className="flex h-screen w-screen justify-center items-center bg-[#121212] text-white">
        <div className="text-center">
            <svg className="animate-spin h-8 w-8 text-[#00f0a0] mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-medium">Processing Scan...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen bg-[#121212] text-gray-100 font-sans">
        <Sidebar
          selectedType={qrCodeType}
          onSelectType={setQrCodeType}
          view={view}
          onSelectView={setView}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
        />
        {view === 'editor' ? (
          <MainContent
            qrCodeType={qrCodeType}
            qrCodeData={qrCodeData}
            setQrCodeData={setQrCodeData}
            qrOptions={qrOptions}
            setQrOptions={setQrOptions}
            finalQrString={getQrString()}
            onSave={handleSaveQrCode}
          />
        ) : (
          <Dashboard
            savedQRCodes={savedQRCodes}
            onEdit={handleEditQrCode}
            onDelete={handleDeleteQrCode}
          />
        )}
      </div>
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        currentHost={localHost}
        onSaveHost={setLocalHost}
      />
    </>
  );
};

export default App;
