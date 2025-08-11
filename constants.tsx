import React from 'https://esm.sh/react@19.1.1';
import { QrCodeOptions, DotType, CornerSquareType, CornerDotType, ShapeOption } from './types.ts';

export const DEFAULT_QR_CODE_OPTIONS: QrCodeOptions = {
  width: 450,
  height: 450,
  data: 'https://www.google.com',
  margin: 10,
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'Q',
  },
  dotsOptions: {
    color: '#ffffff',
    type: 'extra-rounded',
    size: 1, // Default size
  },
  backgroundOptions: {
    color: '#121212',
  },
  cornersSquareOptions: {
    color: '#ffffff',
    type: 'extra-rounded',
  },
  cornersDotOptions: {
    color: '#ffffff',
    type: 'dot',
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 10,
  },
};

export const ELEGANT_CROSS_SVG_PATH = "M21.2 0L50 28.8 78.8 0 100 21.2 71.2 50 100 78.8 78.8 100 50 71.2 21.2 100 0 78.8 28.8 50 0 21.2Z";


export const BODY_SHAPES: ShapeOption<DotType>[] = [
    { id: 'square', label: 'Square', icon: <svg viewBox="0 0 100 100" className="w-full h-full"><rect width="100" height="100" fill="currentColor"/></svg> },
    { id: 'dots', label: 'Dots', icon: <svg viewBox="0 0 100 100" className="w-full h-full"><circle cx="50" cy="50" r="50" fill="currentColor"/></svg> },
    { id: 'rounded', label: 'Rounded', icon: <svg viewBox="0 0 100 100" className="w-full h-full"><rect width="100" height="100" rx="20" fill="currentColor"/></svg> },
    { id: 'extra-rounded', label: 'Extra Rounded', icon: <svg viewBox="0 0 100 100" className="w-full h-full"><rect width="100" height="100" rx="50" fill="currentColor"/></svg> },
    { id: 'classy', label: 'Classy', icon: <svg viewBox="0 0 100 100" className="w-full h-full"><path d="M0 20C0 8.95431 8.95431 0 20 0H80C91.0457 0 100 8.95431 100 20V80C100 91.0457 91.0457 100 80 100H20C8.95431 100 0 91.0457 0 80V20Z" fill="currentColor"/></svg> },
    { id: 'classy-rounded', label: 'Classy Rounded', icon: <svg viewBox="0 0 100 100" className="w-full h-full"><path d="M50 0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0ZM50 20C38.9543 20 30 28.9543 30 40V60C30 71.0457 38.9543 80 50 80C61.0457 80 70 71.0457 70 60V40C70 28.9543 61.0457 20 50 20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/></svg> },
    { id: 'cross', label: 'Cross', icon: <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor"><path d={ELEGANT_CROSS_SVG_PATH}/></svg> },
];

export const EYE_FRAME_SHAPES: ShapeOption<CornerSquareType>[] = [
    { id: 'square', label: 'Square', icon: <svg viewBox="0 0 48 48" fill="currentColor" fillRule="evenodd"><path d="M41,7V41H7V7H41m7-7H0V48H48V0Z"/></svg> },
    { id: 'extra-rounded', label: 'Rounded', icon: <svg viewBox="0 0 48 48" fill="currentColor" fillRule="evenodd"><path d="M33,7a8,8,0,0,1,8,8V33a8,8,0,0,1-8,8H15a8,8,0,0,1-8-8V15a8,8,0,0,1,8-8H33m0-7H15A15,15,0,0 ,0,0,15V33A15,15,0,0,0,15,48H33A15,15,0,0,0,48,33V15A15,15,0,0,0,33,0Z"/></svg> },
    { id: 'dot', label: 'Circle', icon: <svg viewBox="0 0 48 48" fill="currentColor" fillRule="evenodd"><path d="M24,7A17,17,0,1,1,7,24,17,17,0,0,1,24,7m0-7A24,24,0,1,0,48,24,24,24,0,0,0,24,0Z"/></svg> },
    { id: 'drop', label: 'Drop', icon: <svg viewBox="0 0 48 48" fill="currentColor" fillRule="evenodd"><path d="M30.87,7A10.14,10.14,0,0,1,41,17.13V41H17.13A10.14,10.14,0,0,1, 7,30.87V17.13A10.14,10.14,0,0,1,17.13,7H30.87m0-7H17.13A17.13,17.13 ,0,0,0,0,17.13V30.87A17.13,17.13,0,0,0,17.13,48H41.32A6.68,6.68,0,0 ,0,48,41.32V17.13A17.13,17.13,0,0,0,30.87,0Z"/></svg> },
];

export const EYE_BALL_SHAPES: ShapeOption<CornerDotType>[] = [
    { id: 'square', label: 'Square', icon: <svg viewBox="0 0 100 100" className="w-full h-full"><rect x="25" y="25" width="50" height="50" fill="currentColor"/></svg> },
    { id: 'dot', label: 'Circle', icon: <svg viewBox="0 0 100 100" className="w-full h-full"><circle cx="50" cy="50" r="25" fill="currentColor"/></svg> },
    { id: 'diamond', label: 'Diamond', icon: <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor"><rect x="30" y="30" width="40" height="40" rx="9" transform="rotate(45 50 50)"/></svg> },
    { id: 'diamond-sharp', label: 'Diamond Sharp', icon: <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor"><rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)"/></svg> },
    { id: 'oval', label: 'Oval', icon: <svg viewBox="0 0 100 100" className="w-full h-full"><ellipse cx="50" cy="50" rx="24" ry="30" fill="currentColor"/></svg> },
];