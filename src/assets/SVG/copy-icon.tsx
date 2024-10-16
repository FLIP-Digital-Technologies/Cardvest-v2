import React from 'react';
import { SvgXml } from 'react-native-svg';

const copySvg = `
<svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7818 13.4V16.4C15.7818 20.4 14.2964 22 10.583 22H7.05525C3.34182 22 1.85645 20.4 1.85645 16.4V12.6C1.85645 8.6 3.34182 7 7.05525 7H9.84033" stroke="#235643" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.7823 13.4H12.8116C10.5835 13.4 9.84082 12.6 9.84082 10.2V7L15.7823 13.4Z" stroke="#235643" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.7686 2H14.482" stroke="#235643" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.49805 5C6.49805 3.34 7.74205 2 9.28312 2H11.7154" stroke="#235643" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.4241 8V14.19C20.4241 15.74 19.2544 17 17.8154 17" stroke="#235643" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.4237 8H17.6386C15.5498 8 14.8535 7.25 14.8535 5V2L20.4237 8Z" stroke="#235643" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const CopyIcon = () => {
  return <SvgXml xml={copySvg} />;
};

export default CopyIcon;
