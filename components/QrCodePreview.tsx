import React, { useRef, useEffect, useState, useMemo } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Canvg } from 'canvg';
import { ELEGANT_CROSS_SVG_PATH } from '../constants.jsx';

const DOT_SHAPE_PATHS = {
    square: 'M 0 0 H 1 V 1 H 0 Z',
    dots: 'M 0.5,0.5 m -0.5,0 a 0.5,0.5 0 1,0 1,0 a 0.5,0.5 0 1,0 -1,0',
    rounded: 'M 0.2,0 H 0.8 A 0.2,0.2 0 0 1 1,0.2 V 0.8 A 0.2,0.2 0 0 1 0.8,1 H 0.2 A 0.2,0.2 0 0 1 0,0.8 V 0.2 A 0.2,0.2 0 0 1 0.2,0 Z',
    'extra-rounded': 'M 0.5,0 A 0.5,0.5 0 0 1 1,0.5 V 0.5 A 0.5,0.5 0 0 1 0.5,1 H 0.5 A 0.5,0.5 0 0 1 0,0.5 V 0.5 A 0.5,0.5 0 0 1 0.5,0 Z',
    classy: 'M 0.2 0 H 0.8 C 0.91 0 1 0.09 1 0.2 V 0.8 C 1 0.91 0.91 1 0.8 1 H 0.2 C 0.09 1 0 0.91 0 0.8 V 0.2 C 0 0.09 0.09 0 0.2 0 Z M 0.7 0.7 H 0.3 V 0.3 H 0.7 V 0.7 Z',
    'classy-rounded': 'M0.5,0 A0.5,0.5,0,0,1,1,0.5 V0.5 A0.5,0.5,0,0,1,0.5,1 H0.5 A0.5,0.5,0,0,1,0,0.5 V0.5 A0.5,0.5,0,0,1,0.5,0 Z M0.6,0.4 a0.1,0.1,0,1,0,0.2,0 a0.1,0.1,0,1,0,-0.2,0 Z',
};

// All eye paths are defined in a 7x7 module coordinate system, centered at (0,0)
const EYE_FRAME_PATHS = {
    square: 'M41,7V41H7V7H41m7-7H0V48H48V0Z',
    'extra-rounded': 'M33,7a8,8,0,0,1,8,8V33a8,8,0,0,1-8,8H15a8,8,0,0,1-8-8V15a8,8,0,0,1,8-8H33m0-7H15A15,15,0,0 ,0,0,15V33A15,15,0,0,0,15,48H33A15,15,0,0,0,48,33V15A15,15,0,0,0,33,0Z',
    dot: 'M24,7A17,17,0,1,1,7,24,17,17,0,0,1,24,7m0-7A24,24,0,1,0,48,24,24,24,0,0,0,24,0Z',
    drop: 'M30.87,7A10.14,10.14,0,0,1,41,17.13V41H17.13A10.14,10.14,0,0,1, 7,30.87V17.13A10.14,10.14,0,0,1,17.13,7H30.87m0-7H17.13A17.13,17.13 ,0,0,0,0,17.13V30.87A17.13,17.13,0,0,0,17.13,48H41.32A6.68,6.68,0,0 ,0,48,41.32V17.13A17.13,17.13,0,0,0,30.87,0Z'
};

const EYE_BALL_PATHS = {
    square: 'M -1.2 -1.2 H 1.2 V 1.2 H -1.2 Z',
    dot: 'M0 -1.2 A1.2 1.2 0 1 1 0 1.2 A1.2 1.2 0 1 1 0 -1.2 Z',
    oval: 'M0 -1.5 A1.2 1.5 0 1 1 0 1.5 A1.2 1.5 0 1 1 0 -1.5 Z',
}

const generateQrSvg = (qrInstance, options) => {
    if (!qrInstance || !qrInstance._qr) return '';
    
    const count = qrInstance._qr.getModuleCount();
    if (count === 0) return '';
    
    const {
        width = 450,
        margin: optionMargin,
        dotsOptions,
        cornersSquareOptions,
        cornersDotOptions,
        backgroundOptions,
        imageOptions,
        image: imageUrl,
    } = options;

    const margin = optionMargin && optionMargin >= 0 ? optionMargin : 0;
    const qrContentSize = width - margin * 2;
    if (qrContentSize <= 0) return '';
    const dotSize = qrContentSize / count;

    const getFill = (opts, id) => {
        if (opts?.gradient) {
            const rotation = opts.gradient.rotation || 0;
            const x1 = Math.round(Math.cos(rotation) * 100);
            const y1 = Math.round(Math.sin(rotation) * 100);
            const stops = opts.gradient.colorStops.map((cs) => `<stop offset="${cs.offset * 100}%" stop-color="${cs.color}" />`).join('');
            return {
                def: `<linearGradient id="${id}" x1="0%" y1="0%" x2="${x1}%" y2="${y1}%">${stops}</linearGradient>`,
                fill: `url(#${id})`
            };
        }
        return { def: '', fill: opts?.color || '#000' };
    };

    const dotsFill = getFill(dotsOptions, 'dots-gradient');
    const cornersSquareFill = getFill(cornersSquareOptions, 'corners-square-gradient');
    const cornersDotFill = getFill(cornersDotOptions, 'corners-dot-gradient');

    let defs = `<defs>${dotsFill.def}${cornersSquareFill.def}${cornersDotFill.def}</defs>`;
    
    let dotPaths = [];
    let eyePaths = [];

    const isEye = (r, c) => (r < 7 && c < 7) || (r < 7 && c > count - 8) || (r > count - 8 && c < 7);

    let logoSafeZone = null;
    if (imageUrl && imageOptions?.hideBackgroundDots) {
        const imageSizeFactor = imageOptions.imageSize || 0.4;
        const aspectRatio = imageOptions.aspectRatio || 1; 

        let safeZoneWidthInModules;
        let safeZoneHeightInModules;

        if (aspectRatio >= 1) { // Landscape or square image
            safeZoneWidthInModules = count * imageSizeFactor;
            safeZoneHeightInModules = safeZoneWidthInModules / aspectRatio;
        } else { // Portrait image
            safeZoneHeightInModules = count * imageSizeFactor;
            safeZoneWidthInModules = safeZoneHeightInModules * aspectRatio;
        }

        const center = count / 2;
        const startX = center - safeZoneWidthInModules / 2;
        const startY = center - safeZoneHeightInModules / 2;

        logoSafeZone = { x: startX, y: startY, width: safeZoneWidthInModules, height: safeZoneHeightInModules };
    }
    
    for (let r = 0; r < count; r++) {
        for (let c = 0; c < count; c++) {
            if (!qrInstance._qr.isDark(r, c)) continue;
            if (isEye(r, c)) continue;

            if (logoSafeZone && c >= logoSafeZone.x && c < logoSafeZone.x + logoSafeZone.width && r >= logoSafeZone.y && r < logoSafeZone.y + logoSafeZone.height) {
                continue;
            }
            
            const dotType = dotsOptions?.type || 'square';
            const customDotSize = dotsOptions?.size ?? 1;
            const offset = (dotSize * (1 - customDotSize)) / 2;
            const x = margin + (c * dotSize) + offset;
            const y = margin + (r * dotSize) + offset;

            let path;
            let scale;

            if (dotType === 'cross') {
                path = ELEGANT_CROSS_SVG_PATH;
                scale = (dotSize / 100) * customDotSize;
            } else {
                path = DOT_SHAPE_PATHS[dotType] || DOT_SHAPE_PATHS.square;
                scale = dotSize * customDotSize;
            }
            dotPaths.push(`<path transform="translate(${x}, ${y}) scale(${scale})" d="${path}" fill="${dotsFill.fill}"/>`);
        }
    }
    
    const eyePositions = [ {r: 3.5, c: 3.5}, {r: 3.5, c: count - 3.5}, {r: count - 3.5, c: 3.5} ];
    const frameType = cornersSquareOptions?.type || 'square';
    const framePath = EYE_FRAME_PATHS[frameType] || EYE_FRAME_PATHS.square;
    const ballType = cornersDotOptions?.type || 'dot';

    eyePositions.forEach(({r, c}) => {
        const centerX = margin + c * dotSize;
        const centerY = margin + r * dotSize;
        
        let scale;
        let translation = `translate(${centerX}, ${centerY})`;
        let pathSpecificTransform = '';
        
        if (['extra-rounded', 'dot', 'square', 'drop'].includes(frameType)) {
             scale = (dotSize * 7) / 48;
             pathSpecificTransform = 'translate(-24, -24)';
        } else {
            scale = dotSize;
        }
        
        eyePaths.push(`<path transform="${translation} scale(${scale}) ${pathSpecificTransform}" d="${framePath}" fill="${cornersSquareFill.fill}" fill-rule="evenodd"/>`);
        
        if (ballType === 'diamond' || ballType === 'diamond-sharp') {
            const ballSize = 2.4;
            const rectSize = ballSize * dotSize;
            const rx = ballType === 'diamond' ? rectSize * 0.22 : 0;
            eyePaths.push(`<rect transform="translate(${centerX} ${centerY}) rotate(45)" x="${-rectSize/2}" y="${-rectSize/2}" width="${rectSize}" height="${rectSize}" rx="${rx}" fill="${cornersDotFill.fill}" />`);
        } else {
            const ballPath = EYE_BALL_PATHS[ballType] || EYE_BALL_PATHS.dot;
            eyePaths.push(`<path transform="translate(${centerX}, ${centerY}) scale(${dotSize})" d="${ballPath}" fill="${cornersDotFill.fill}"/>`);
        }
    });

    let imageTag = '';
    if (imageUrl) {
        const imageSize = (imageOptions?.imageSize || 0.4) * width;
        const x = width / 2 - imageSize / 2;
        const y = width / 2 - imageSize / 2;
        imageTag = `<image href="${imageUrl}" x="${x}" y="${y}" width="${imageSize}" height="${imageSize}" preserveAspectRatio="xMidYMid meet" />`;
    }
    
    const dotsGroup = `<g>${dotPaths.join('')}</g>`;
    const eyesGroup = `<g>${eyePaths.join('')}</g>`;

    return `<svg width="${width}" height="${width}" viewBox="0 0 ${width} ${width}" xmlns="http://www.w3.org/2000/svg">${defs}<rect width="${width}" height="${width}" fill="${backgroundOptions?.color || '#fff'}"/>${dotsGroup}${eyesGroup}${imageTag}</svg>`;
};


const QrCodePreview = ({ options, showDownloads = true }) => {
  const qrInstance = useMemo(() => {
    const { dotsOptions, cornersSquareOptions, cornersDotOptions, imageOptions, ...restOfOptions } = options;
    const { size, type: dotsType, ...restOfDotsOptions } = dotsOptions || {};
    const { type: cornersSquareType, ...restOfCornersSquareOptions } = cornersSquareOptions || {};
    const { type: cornersDotType, ...restOfCornersDotOptions } = cornersDotOptions || {};
    const { aspectRatio, ...restOfImageOptions } = imageOptions || {};

    const libOptions = {
      ...restOfOptions,
      data: options.data || ' ',
      dotsOptions: {
        ...restOfDotsOptions,
        type: dotsType === 'cross' ? 'square' : dotsType,
      },
      cornersSquareOptions: {
        ...restOfCornersSquareOptions,
        type: (['drop', 'extra-rounded', 'dot', 'square'].includes(cornersSquareType || '')) ? 'square' : cornersSquareType,
      },
      cornersDotOptions: {
          ...restOfCornersDotOptions,
          type: (cornersDotType === 'diamond' || cornersDotType === 'oval' || cornersDotType === 'diamond-sharp') ? 'dot' : cornersDotType
      },
      imageOptions: restOfImageOptions,
    };
    return new QRCodeStyling(libOptions);
  }, [options]);

  const previewRef = useRef(null);
  const [downloading, setDownloading] = useState<number | null>(null);

  useEffect(() => {
    if (previewRef.current && qrInstance) {
        previewRef.current.innerHTML = generateQrSvg(qrInstance, options);
    }
  }, [qrInstance, options]);

  const handleDownload = async (size: number) => {
    if (!qrInstance || downloading) return;
    setDownloading(size);

    try {
        const svgString = generateQrSvg(qrInstance, { ...options, width: size, height: size, margin: (options.margin || 0) * (size / (options.width || 450)) });
        const canvas = new OffscreenCanvas(size, size);
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error("Could not get canvas context");
        
        const v = await Canvg.from(ctx, svgString);
        await v.render();

        const blob = await canvas.convertToBlob({ type: 'image/png' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `qr-code-${size}px.png`;
        a.click();
        URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Failed to download QR code", error);
    } finally {
      setDownloading(null);
    }
  };

  const downloadSizes = [256, 512, 1024];

  return (
     <div className="flex flex-col items-center">
      <div ref={previewRef} style={{width: options.width, height: options.height}} className="bg-[#121212] border border-[#2a2a2a] rounded-lg overflow-hidden"/>
      {showDownloads && (
        <div style={{width: options.width}} className="mt-4">
            <div className="grid grid-cols-3 gap-2">
                {downloadSizes.map((size) => (
                    <button
                        key={size}
                        onClick={() => handleDownload(size)}
                        disabled={downloading !== null}
                        className="bg-[#2a2a2a] border border-[#3a3a3a] text-gray-300 font-medium py-2 px-2 rounded-lg hover:bg-[#3a3a3a] hover:text-white transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {downloading === size ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        )}
                        <span className="text-sm">{size}px</span>
                    </button>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default QrCodePreview;