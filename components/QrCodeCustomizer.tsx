import React, { useState } from 'react';
import QrCodePreview from './QrCodePreview.jsx';
import ShapesTab from './tabs/ShapesTab.jsx';
import ColorsTab from './tabs/ColorsTab.jsx';
import LogosTab from './tabs/LogosTab.jsx';
import { DEFAULT_QR_CODE_OPTIONS } from '../constants.jsx';
import Modal from './Modal.jsx';

const QrCodeCustomizer = ({ options, setOptions, finalQrString, onSave }) => {
  const [activeTab, setActiveTab] = useState('SHAPES');
  const [add3dEffect, setAdd3dEffect] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [qrCodeName, setQrCodeName] = useState('');

  const handleReset = () => {
    setOptions(DEFAULT_QR_CODE_OPTIONS);
    setAdd3dEffect(false);
  };
  
  const handle3dEffectToggle = (e) => {
    const isChecked = e.target.checked;
    setAdd3dEffect(isChecked);
    if(isChecked) {
        setOptions(prev => ({
            ...prev,
            dotsOptions: { ...prev.dotsOptions,
                gradient: {
                    type: 'linear',
                    rotation: Math.PI / 4,
                    colorStops: [{offset: 0, color: '#00f0a0'}, {offset: 1, color: '#00c080'}]
                }
            },
            cornersSquareOptions: { ...prev.cornersSquareOptions,
                gradient: {
                    type: 'linear',
                    rotation: Math.PI / 4,
                    colorStops: [{offset: 0, color: '#00f0a0'}, {offset: 1, color: '#00c080'}]
                }
            }
        }));
    } else {
         setOptions(prev => {
            const newOpts = {...prev};
            if (newOpts.dotsOptions) delete newOpts.dotsOptions.gradient;
            if (newOpts.cornersSquareOptions) delete newOpts.cornersSquareOptions.gradient;
            return newOpts;
         });
    }
  }
  
  const openSaveModal = () => {
    setQrCodeName('');
    setIsSaveModalOpen(true);
  };
  
  const handleConfirmSave = (e) => {
    e.preventDefault();
    if (qrCodeName && qrCodeName.trim() !== '') {
        onSave(qrCodeName.trim());
        setIsSaveModalOpen(false);
    }
  };


  const tabs = [
    { id: 'COLORS', label: 'Colors' },
    { id: 'SHAPES', label: 'Shapes' },
    { id: 'LOGOS', label: 'Logos' },
  ];

  return (
    <>
      <div className="bg-[#1c1c1c] rounded-lg border border-[#2a2a2a] h-full flex flex-col p-1">
          <div className="p-4 border-b border-[#2a2a2a]">
              <h2 className="text-xl font-bold text-white">Customize QR Code</h2>
          </div>
          <div className="flex-grow flex">
              <div className="w-5/12 p-4 pr-2 flex flex-col overflow-y-auto">
                  <div className="border-b border-[#2a2a2a] mb-4">
                      <nav className="flex space-x-6">
                      {tabs.map((tab) => (
                          <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={`py-2 px-1 text-sm font-medium transition-colors ${
                                  activeTab === tab.id
                                  ? 'text-[#00f0a0] border-b-2 border-[#00f0a0]'
                                  : 'text-gray-400 hover:text-white'
                              }`}
                          >
                          {tab.label}
                          </button>
                      ))}
                      </nav>
                  </div>

                  <div className="flex-grow">
                    {activeTab === 'SHAPES' && <ShapesTab options={options} setOptions={setOptions} />}
                    {activeTab === 'COLORS' && <ColorsTab options={options} setOptions={setOptions} />}
                    {activeTab === 'LOGOS' && <LogosTab options={options} setOptions={setOptions} />}
                  </div>
              </div>
              
              <div className="w-px bg-[#2a2a2a] my-4"></div>

              <div className="w-7/12 p-4 pl-2 flex flex-col items-center justify-center">
                  <QrCodePreview options={{ ...options, data: finalQrString }} />
                  <div className="w-[450px] mt-4 space-y-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" className="form-checkbox h-5 w-5 bg-[#2a2a2a] border-[#3a3a3a] rounded text-[#00f0a0] focus:ring-[#00f0a0]" checked={add3dEffect} onChange={handle3dEffectToggle}/>
                          <span className="text-sm">Add 3d Effect</span>
                      </label>

                      <div className="flex justify-between items-center text-sm">
                          <button onClick={handleReset} className="flex items-center space-x-1 text-gray-400 hover:text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l16 16" /></svg>
                              <span>Reset</span>
                          </button>
                          <button onClick={openSaveModal} className="bg-gradient-to-r from-[#00F0A0] to-[#00D0A0] text-black font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-2 text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              <span>Save to Dashboard</span>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <Modal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} title="Save QR Code">
        <form onSubmit={handleConfirmSave} noValidate>
          <div className="space-y-4">
            <div>
              <label htmlFor="qrName" className="font-medium text-gray-300 block mb-2">Name</label>
              <input
                id="qrName"
                type="text"
                value={qrCodeName}
                onChange={(e) => setQrCodeName(e.target.value)}
                className="w-full bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-md p-2 focus:ring-2 focus:ring-[#00f0a0] focus:outline-none"
                placeholder="e.g., My Website Link"
                required
                autoFocus
              />
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button type="button" onClick={() => setIsSaveModalOpen(false)} className="py-2 px-4 rounded-lg bg-[#3a3a3a] text-gray-300 hover:bg-[#4a4a4a] transition-colors">
                Cancel
              </button>
              <button type="submit" className="py-2 px-4 rounded-lg bg-gradient-to-r from-[#00F0A0] to-[#00D0A0] text-black font-bold hover:opacity-90 transition-opacity disabled:opacity-50" disabled={!qrCodeName.trim()}>
                Save
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default QrCodeCustomizer;
