
import React from 'react';
import { QrCodeData, QrCodeOptions, QrCodeType } from '../types';
import ContentInput from './ContentInput';
import QrCodeCustomizer from './QrCodeCustomizer';

interface MainContentProps {
  qrCodeType: QrCodeType;
  qrCodeData: QrCodeData;
  setQrCodeData: React.Dispatch<React.SetStateAction<QrCodeData>>;
  qrOptions: QrCodeOptions;
  setQrOptions: React.Dispatch<React.SetStateAction<QrCodeOptions>>;
  finalQrString: string;
}

const MainContent: React.FC<MainContentProps> = ({
  qrCodeType,
  qrCodeData,
  setQrCodeData,
  qrOptions,
  setQrOptions,
  finalQrString,
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
        />
      </div>
    </main>
  );
};

export default MainContent;
