import React from 'https://esm.sh/react@19.1.1';
import { QrCodeData, QrCodeOptions, QrCodeType } from '../types.js';
import ContentInput from './ContentInput.js';
import QrCodeCustomizer from './QrCodeCustomizer.js';

interface MainContentProps {
  qrCodeType: QrCodeType;
  qrCodeData: QrCodeData;
  setQrCodeData: React.Dispatch<React.SetStateAction<QrCodeData>>;
  qrOptions: QrCodeOptions;
  setQrOptions: React.Dispatch<React.SetStateAction<QrCodeOptions>>;
  finalQrString: string;
  onSave: (name: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  qrCodeType,
  qrCodeData,
  setQrCodeData,
  qrOptions,
  setQrOptions,
  finalQrString,
  onSave,
}) => {
  return (
    <main className="flex-1 flex flex-col p-6 overflow-y-auto">
      <ContentInput
        qrCodeType={qrCodeType}
        qrCodeData={qrCodeData}
        setQrCodeData={setQrCodeData}
      />
      <div className="flex-grow mt-6">
        <QrCodeCustomizer
          options={qrOptions}
          setOptions={setQrOptions}
          finalQrString={finalQrString}
          onSave={onSave}
        />
      </div>
    </main>
  );
};

export default MainContent;