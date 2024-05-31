import React from 'react';
import { SvgXml } from 'react-native-svg';

const cryptoIconsvg = `
<svg width="40" height="47" viewBox="0 0 40 47" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="20" cy="27" r="20" fill="#F7F2DD"/>
<path d="M16 26.4C16 27.17 16.6 27.8 17.33 27.8H18.83C19.47 27.8 19.99 27.25 19.99 26.58C19.99 25.85 19.67 25.59 19.2 25.42L16.8 24.58C16.32 24.41 16 24.15 16 23.42C16 22.75 16.52 22.2 17.16 22.2H18.66C19.4 22.21 20 22.83 20 23.6" stroke="#235643" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18 27.8501V28.5901" stroke="#235643" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18 21.4099V22.1899" stroke="#235643" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.99 32.98C22.4028 32.98 25.98 29.4028 25.98 24.99C25.98 20.5772 22.4028 17 17.99 17C13.5772 17 10 20.5772 10 24.99C10 29.4028 13.5772 32.98 17.99 32.98Z" stroke="#235643" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.9805 34.88C21.8805 36.15 23.3505 36.98 25.0305 36.98C27.7605 36.98 29.9805 34.76 29.9805 32.03C29.9805 30.37 29.1605 28.9 27.9105 28" stroke="#235643" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="6" width="28" height="13" rx="3" fill="#E40000"/>
<path d="M11.7365 10.5H11.0165V3.34H11.7465L15.6865 9.3V3.34H16.3965V10.5H15.6865L11.7365 4.54V10.5ZM20.0254 10.62C18.6054 10.62 17.6554 9.6 17.6554 8.08C17.6554 6.57 18.5954 5.53 19.9754 5.53C21.2854 5.53 22.1754 6.46 22.1754 7.83V8.17H18.3254C18.3754 9.35 18.9954 10.03 20.0354 10.03C20.8254 10.03 21.3354 9.69 21.5154 9.05H22.1754C21.9154 10.07 21.1654 10.62 20.0254 10.62ZM19.9754 6.12C19.0654 6.12 18.4654 6.72 18.3454 7.67H21.4854C21.4854 6.74 20.8854 6.12 19.9754 6.12ZM24.1716 10.5L22.5716 5.66H23.2816L24.2316 8.58C24.3416 8.9 24.4316 9.23 24.5316 9.62C24.6116 9.23 24.7716 8.74 24.8216 8.58L25.7816 5.66H26.4916L27.4416 8.58C27.5316 8.84 27.6516 9.26 27.7416 9.62C27.8416 9.22 27.8616 9.1 28.0316 8.58L28.9916 5.66H29.7116L28.0716 10.5H27.4016L26.4016 7.46C26.2816 7.1 26.2016 6.8 26.1416 6.51C26.0716 6.77 25.9916 7.06 25.8616 7.46L24.8616 10.5H24.1716Z" fill="white"/>
</svg>

`;

export const CryptoIcon = () => <SvgXml xml={cryptoIconsvg} width="100%" height="100%" />;