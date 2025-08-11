import React, { useState } from 'https://esm.sh/react@19.1.1';
import Modal from './Modal.tsx';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentHost: string;
  onSaveHost: (host: string) => void;
}

const InstructionAccordion: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-[#3a3a3a] rounded-md">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-3 text-left text-gray-300 hover:bg-[#2a2a2a]"
            >
                <span>{title}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            {isOpen && (
                <div className="p-3 border-t border-[#3a3a3a] bg-[#1c1c1c] text-sm text-gray-400 space-y-2">
                    {children}
                </div>
            )}
        </div>
    );
};

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentHost, onSaveHost }) => {
  const [host, setHost] = useState(currentHost);

  const handleSave = () => {
    onSaveHost(host);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings">
      <div className="space-y-4">
        <div>
          <label htmlFor="localHost" className="font-medium text-gray-300 block mb-2">Local Network Host</label>
          <input
            id="localHost"
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-md p-2 focus:ring-2 focus:ring-[#00f0a0] focus:outline-none"
            placeholder="e.g., 192.168.1.100"
          />
          <p className="text-xs text-gray-500 mt-2">
            For scan tracking to work on other devices (like your phone), enter your computer's local network IP address here.
          </p>
        </div>

        <div className="space-y-2">
             <h3 className="text-sm font-medium text-gray-400">How to find my IP address?</h3>
             <InstructionAccordion title="Windows">
                <p>1. Open Command Prompt.</p>
                <p>2. Type <code className="bg-[#2a2a2a] px-1 rounded">ipconfig</code> and press Enter.</p>
                <p>3. Look for the "IPv4 Address" under your active network adapter (e.g., "Wireless LAN adapter Wi-Fi").</p>
             </InstructionAccordion>
             <InstructionAccordion title="macOS">
                 <p>1. Open System Settings.</p>
                 <p>2. Go to Network &gt; Wi-Fi.</p>
                 <p>3. Your IP address is listed there. Alternatively, open Terminal and type <code className="bg-[#2a2a2a] px-1 rounded">ipconfig getifaddr en0</code>.</p>
             </InstructionAccordion>
             <InstructionAccordion title="Linux">
                 <p>1. Open a terminal.</p>
                 <p>2. Type <code className="bg-[#2a2a2a] px-1 rounded">hostname -I</code> or <code className="bg-[#2a2a2a] px-1 rounded">ip a</code> and press Enter.</p>
                 <p>3. Look for the inet address associated with your primary network interface (e.g., eth0, wlan0).</p>
             </InstructionAccordion>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button type="button" onClick={onClose} className="py-2 px-4 rounded-lg bg-[#3a3a3a] text-gray-300 hover:bg-[#4a4a4a] transition-colors">
            Cancel
          </button>
          <button type="button" onClick={handleSave} className="py-2 px-4 rounded-lg bg-gradient-to-r from-[#00F0A0] to-[#00D0A0] text-black font-bold hover:opacity-90 transition-opacity">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;