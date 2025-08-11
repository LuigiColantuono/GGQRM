import React, { useState } from 'react';
import { QrCodeData, QrCodeOptions, QrCodeType } from './types';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { DEFAULT_QR_CODE_OPTIONS } from './constants';

const App: React.FC = () => {
  const [qrCodeType, setQrCodeType] = useState<QrCodeType>('url');
  const [qrCodeData, setQrCodeData] = useState<QrCodeData>({
    url: 'https://www.google.com',
    text: 'Hello World',
    wifi: { ssid: '', password: '', encryption: 'WPA' },
    payment: { type: 'paypal', details: { recipient: '', amount: '' } },
    whatsapp: { phone: '', message: '' },
  });
  const [qrOptions, setQrOptions] = useState<QrCodeOptions>(DEFAULT_QR_CODE_OPTIONS);

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

  return (
    <div className="flex h-screen bg-[#121212] text-gray-100 font-sans">
      <Sidebar selectedType={qrCodeType} onSelectType={setQrCodeType} />
      <MainContent
        qrCodeType={qrCodeType}
        qrCodeData={qrCodeData}
        setQrCodeData={setQrCodeData}
        qrOptions={qrOptions}
        setQrOptions={setQrOptions}
        finalQrString={getQrString()}
      />
    </div>
  );
};

export default App;