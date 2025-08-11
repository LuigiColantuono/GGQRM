
import type { Options, DotType as LibDotType, CornerSquareType as LibCornerSquareType, CornerDotType as LibCornerDotType } from 'qr-code-styling';

export type QrCodeType = 'url' | 'text' | 'wifi' | 'payment' | 'whatsapp';

export interface WifiData {
  ssid: string;
  password?: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
}

export interface PaymentData {
  type: 'paypal' | 'bitcoin';
  details: {
    recipient: string;
    amount?: string;
  };
}

export interface WhatsAppData {
  phone: string;
  message: string;
}

export interface QrCodeData {
  url: string;
  text: string;
  wifi: WifiData;
  payment: PaymentData;
  whatsapp: WhatsAppData;
}

export type DotType = LibDotType | 'cross';
export type CornerSquareType = LibCornerSquareType | 'drop';
export type CornerDotType = LibCornerDotType | 'diamond' | 'oval' | 'diamond-sharp';

type LibImageOptions = NonNullable<Options['imageOptions']>;

export interface CustomImageOptions extends LibImageOptions {
  aspectRatio?: number;
}

// Create a new Options type that uses our custom DotType and adds a size property.
export interface CustomQrCodeOptions extends Omit<Options, 'dotsOptions' | 'cornersSquareOptions' | 'cornersDotOptions' | 'imageOptions'> {
    dotsOptions?: Omit<NonNullable<Options['dotsOptions']>, 'type'> & {
        type?: DotType;
        size?: number; // Custom property to control dot size
    };
    cornersSquareOptions?: Omit<NonNullable<Options['cornersSquareOptions']>, 'type'> & {
        type?: CornerSquareType;
    };
    cornersDotOptions?: Omit<NonNullable<Options['cornersDotOptions']>, 'type'> & {
        type?: CornerDotType;
    };
    imageOptions?: CustomImageOptions;
}

export type QrCodeOptions = CustomQrCodeOptions;


export interface ShapeOption<T extends string = string> {
    id: T;
    label: string;
    icon: React.ReactNode;
}