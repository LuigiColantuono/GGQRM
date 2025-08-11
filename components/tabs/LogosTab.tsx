import React, { useRef } from 'react';
import { QrCodeOptions } from '../../types';

interface LogosTabProps {
  options: QrCodeOptions;
  setOptions: React.Dispatch<React.SetStateAction<QrCodeOptions>>;
}

const LogosTab: React.FC<LogosTabProps> = ({ options, setOptions }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readEvent) => {
        const newImageUrl = readEvent.target?.result as string;
        if (newImageUrl) {
            const img = new Image();
            img.onload = () => {
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                setOptions(prev => ({
                    ...prev,
                    image: newImageUrl,
                    imageOptions: {
                        ...(prev.imageOptions || {}),
                        hideBackgroundDots: true,
                        aspectRatio: aspectRatio,
                    }
                }));
            };
            img.onerror = () => {
                console.error("Failed to load image to get dimensions.");
                setOptions(prev => ({ ...prev, image: newImageUrl }));
            };
            img.src = newImageUrl;
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = () => {
    setOptions(prev => {
      const newOptions = { ...prev };
      delete newOptions.image;
      if (newOptions.imageOptions) {
        delete newOptions.imageOptions.aspectRatio;
      }
      return newOptions;
    });

     if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Add Logo</h3>
        <input
            type="file"
            accept="image/png, image/jpeg, image/svg+xml"
            onChange={handleImageUpload}
            className="hidden"
            ref={fileInputRef}
        />
        <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-gradient-to-r from-[#00F0A0] to-[#00D0A0] text-black font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
        >
            Upload Image
        </button>

        {options.image && (
             <div className="mt-4 p-2 bg-[#2a2a2a] rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-2 overflow-hidden">
                    <img src={options.image} alt="logo preview" className="w-10 h-10 rounded-md object-contain flex-shrink-0" />
                    <span className="text-sm text-gray-300 truncate">logo-image</span>
                </div>
                <button onClick={removeImage} className="text-gray-400 hover:text-white flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        )}

        <div className="space-y-2 mt-4">
            <label className="text-sm font-medium text-gray-300 block">Logo Size</label>
            <input 
                type="range" 
                min="0.1" 
                max="1" 
                step="0.05" 
                value={options.imageOptions?.imageSize ?? 0.4}
                onChange={(e) => setOptions(prev => ({...prev, imageOptions: {...(prev.imageOptions || {}), imageSize: parseFloat(e.target.value)}}))}
                className="w-full h-2 bg-[#3a3a3a] rounded-lg appearance-none cursor-pointer accent-[#00f0a0] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!options.image}
            />
        </div>
    </div>
  );
};

export default LogosTab;