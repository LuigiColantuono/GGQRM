
import React from 'react';
import { QrCodeOptions } from '../../types';

interface ColorsTabProps {
  options: QrCodeOptions;
  setOptions: React.Dispatch<React.SetStateAction<QrCodeOptions>>;
}

const ColorPicker: React.FC<{ label: string; color: string; onChange: (color: string) => void }> = ({ label, color, onChange }) => (
    <div className="flex items-center justify-between">
        <label className="text-gray-300">{label}</label>
        <div className="relative">
            <input 
                type="color" 
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="w-10 h-10 p-0 border-none cursor-pointer bg-transparent"
                style={{ appearance: 'none', WebkitAppearance: 'none' }}
            />
            <div 
                className="absolute top-0 left-0 w-10 h-10 rounded-md border border-[#2a2a2a] pointer-events-none" 
                style={{ backgroundColor: color }}
            ></div>
        </div>
    </div>
);

const ColorsTab: React.FC<ColorsTabProps> = ({ options, setOptions }) => {
  const handleColorChange = (key: 'dotsOptions' | 'cornersSquareOptions' | 'cornersDotOptions' | 'backgroundOptions', color: string) => {
    setOptions(prev => ({...prev, [key]: {...(prev[key] || {}), color}}));
  };
    
  return (
    <div className="space-y-4">
        <ColorPicker
            label="Body Color"
            color={options.dotsOptions?.color || '#000000'}
            onChange={(c) => handleColorChange('dotsOptions', c)}
        />
        <ColorPicker
            label="Eye Frame Color"
            color={options.cornersSquareOptions?.color || '#000000'}
            onChange={(c) => handleColorChange('cornersSquareOptions', c)}
        />
        <ColorPicker
            label="Eye Ball Color"
            color={options.cornersDotOptions?.color || '#000000'}
            onChange={(c) => handleColorChange('cornersDotOptions', c)}
        />
        <ColorPicker
            label="Background Color"
            color={options.backgroundOptions?.color || '#ffffff'}
            onChange={(c) => handleColorChange('backgroundOptions', c)}
        />
    </div>
  );
};

export default ColorsTab;