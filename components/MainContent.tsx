import React from 'react';
import ContentInput from './ContentInput.jsx';
import QrCodeCustomizer from './QrCodeCustomizer.jsx';

const MainContent = ({
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
