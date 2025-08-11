import React from 'https://esm.sh/react@19.1.1';
import { QrCodeData, QrCodeType } from '../types.ts';

interface ContentInputProps {
  qrCodeType: QrCodeType;
  qrCodeData: QrCodeData;
  setQrCodeData: React.Dispatch<React.SetStateAction<QrCodeData>>;
}

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className="w-full bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-md p-2 focus:ring-2 focus:ring-[#00f0a0] focus:outline-none"
  />
);

const SelectField: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select
    {...props}
    className="w-full bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-md p-2 focus:ring-2 focus:ring-[#00f0a0] focus:outline-none"
  >
    {props.children}
  </select>
);


const ContentInput: React.FC<ContentInputProps> = ({ qrCodeType, qrCodeData, setQrCodeData }) => {
  const renderInput = () => {
    switch (qrCodeType) {
      case 'url':
        return (
          <div className="space-y-2">
            <label className="font-medium">Website URL</label>
            <InputField
              type="url"
              value={qrCodeData.url}
              onChange={(e) => setQrCodeData({ ...qrCodeData, url: e.target.value })}
              placeholder="https://example.com"
            />
          </div>
        );
      case 'text':
        return (
          <div className="space-y-2">
            <label className="font-medium">Your Text</label>
            <textarea
              value={qrCodeData.text}
              onChange={(e) => setQrCodeData({ ...qrCodeData, text: e.target.value })}
              placeholder="Enter any text"
              className="w-full bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-md p-2 h-24 focus:ring-2 focus:ring-[#00f0a0] focus:outline-none"
            />
          </div>
        );
      case 'whatsapp':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-medium">Phone Number</label>
              <InputField
                type="tel"
                value={qrCodeData.whatsapp.phone}
                onChange={(e) => setQrCodeData({ ...qrCodeData, whatsapp: { ...qrCodeData.whatsapp, phone: e.target.value } })}
                placeholder="e.g. 15551234567"
              />
              <p className="text-xs text-gray-400">Enter phone number with country code, without '+' or other symbols.</p>
            </div>
            <div className="space-y-2">
              <label className="font-medium">Message (Optional)</label>
              <textarea
                value={qrCodeData.whatsapp.message}
                onChange={(e) => setQrCodeData({ ...qrCodeData, whatsapp: { ...qrCodeData.whatsapp, message: e.target.value } })}
                placeholder="Enter a predefined message"
                className="w-full bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-md p-2 h-24 focus:ring-2 focus:ring-[#00f0a0] focus:outline-none"
              />
            </div>
          </div>
        );
      case 'wifi':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-medium">Network Name (SSID)</label>
              <InputField
                type="text"
                value={qrCodeData.wifi.ssid}
                onChange={(e) => setQrCodeData({ ...qrCodeData, wifi: { ...qrCodeData.wifi, ssid: e.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <label className="font-medium">Password</label>
              <InputField
                type="password"
                value={qrCodeData.wifi.password}
                onChange={(e) => setQrCodeData({ ...qrCodeData, wifi: { ...qrCodeData.wifi, password: e.target.value } })}
              />
            </div>
             <div className="space-y-2">
                <label className="font-medium">Encryption</label>
                <SelectField value={qrCodeData.wifi.encryption} onChange={(e) => setQrCodeData({ ...qrCodeData, wifi: { ...qrCodeData.wifi, encryption: e.target.value as any } })}>
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None</option>
                </SelectField>
             </div>
          </div>
        );
      case 'payment':
        return (
          <div className="space-y-4">
            <SelectField value={qrCodeData.payment.type} onChange={(e) => setQrCodeData({ ...qrCodeData, payment: { ...qrCodeData.payment, type: e.target.value as any } })}>
                <option value="paypal">PayPal</option>
                <option value="bitcoin">Bitcoin</option>
            </SelectField>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="font-medium">{qrCodeData.payment.type === 'paypal' ? 'PayPal.me Username' : 'Bitcoin Address'}</label>
                    <InputField type="text" value={qrCodeData.payment.details.recipient} onChange={(e) => setQrCodeData({...qrCodeData, payment: {...qrCodeData.payment, details: {...qrCodeData.payment.details, recipient: e.target.value}}})} />
                </div>
                 <div className="space-y-2">
                    <label className="font-medium">Amount (Optional)</label>
                    <InputField type="text" value={qrCodeData.payment.details.amount} onChange={(e) => setQrCodeData({...qrCodeData, payment: {...qrCodeData.payment, details: {...qrCodeData.payment.details, amount: e.target.value}}})} />
                </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#1c1c1c] p-4 rounded-lg border border-[#2a2a2a]">
      {renderInput()}
    </div>
  );
};

export default ContentInput;