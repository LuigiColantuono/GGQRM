import React from 'react';
import { BODY_SHAPES, EYE_FRAME_SHAPES, EYE_BALL_SHAPES } from '../../constants.jsx';

const OptionGroup = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">{title}</h3>
        {children}
    </div>
);

const ShapeSelector = ({
    options,
    selectedValue,
    onChange,
}) => (
    <div className="grid grid-cols-7 gap-1">
        {options.map((option) => (
            <button
                key={option.id}
                onClick={() => onChange(option.id)}
                className={`relative p-1.5 border-2 rounded-lg aspect-square transition-colors ${
                    selectedValue === option.id ? 'border-[#00f0a0]' : 'border-[#2a2a2a] hover:border-[#3a3a3a]'
                }`}
            >
                <div className="w-full h-full text-white">{option.icon}</div>
                {selectedValue === option.id && (
                    <div className="absolute -top-1 -right-1 bg-[#00f0a0] text-black rounded-full w-4 h-4 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}
            </button>
        ))}
    </div>
);


const ShapesTab = ({ options, setOptions }) => {

  const handleBodyChange = (type) => {
    setOptions(prev => ({...prev, dotsOptions: { ...(prev.dotsOptions || {}), type }}));
  };

  const handleEyeFrameChange = (type) => {
    setOptions(prev => ({...prev, cornersSquareOptions: { ...(prev.cornersSquareOptions || {}), type }}));
  };

  const handleEyeBallChange = (type) => {
    setOptions(prev => ({...prev, cornersDotOptions: { ...(prev.cornersDotOptions || {}), type }}));
  };
  
  const handleDotSizeChange = (size) => {
    setOptions(prev => ({...prev, dotsOptions: { ...(prev.dotsOptions || {}), size }}));
  };

  return (
    <div className="space-y-6">
        <OptionGroup title="Body Type">
            <ShapeSelector options={BODY_SHAPES} selectedValue={options.dotsOptions?.type || 'square'} onChange={handleBodyChange} />
        </OptionGroup>
        
        <OptionGroup title="Body Size">
            <input 
                type="range" 
                min="0.4" 
                max="1.5" 
                step="0.05" 
                value={options.dotsOptions?.size ?? 1}
                onChange={(e) => handleDotSizeChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#3a3a3a] rounded-lg appearance-none cursor-pointer accent-[#00f0a0]"
            />
        </OptionGroup>
        
        <OptionGroup title="Eye Frame Type">
             <ShapeSelector options={EYE_FRAME_SHAPES} selectedValue={options.cornersSquareOptions?.type || 'square'} onChange={handleEyeFrameChange} />
        </OptionGroup>

        <OptionGroup title="Eye Ball Type">
             <ShapeSelector options={EYE_BALL_SHAPES} selectedValue={options.cornersDotOptions?.type || 'square'} onChange={handleEyeBallChange} />
        </OptionGroup>
    </div>
  );
};

export default ShapesTab;
