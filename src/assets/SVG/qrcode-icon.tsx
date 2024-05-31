import React from 'react';
import { SvgXml } from 'react-native-svg';

const qrCodeIcon = `
<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M34.3222 5.68506H35.3184V6.68123H34.3222V5.68506Z" fill="#235643"/>
<path d="M33.326 5.68506H34.3222V6.68123H33.326V5.68506Z" fill="#235643"/>
<path d="M32.3299 5.68506H33.326V6.68123H32.3299V5.68506Z" fill="#235643"/>
<path d="M31.3337 5.68506H32.3299V6.68123H31.3337V5.68506Z" fill="#235643"/>
<path d="M30.3375 5.68506H31.3337V6.68123H30.3375V5.68506Z" fill="#235643"/>
<path d="M29.3413 5.68506H30.3375V6.68123H29.3413V5.68506Z" fill="#235643"/>
<path d="M28.3452 5.68506H29.3413V6.68123H28.3452V5.68506Z" fill="#235643"/>
<path d="M26.3528 5.68506H27.349V6.68123H26.3528V5.68506Z" fill="#235643"/>
<path d="M24.3605 5.68506H25.3567V6.68123H24.3605V5.68506Z" fill="#235643"/>
<path d="M19.3797 5.68506H20.3758V6.68123H19.3797V5.68506Z" fill="#235643"/>
<path d="M18.3835 5.68506H19.3797V6.68123H18.3835V5.68506Z" fill="#235643"/>
<path d="M16.3912 5.68506H17.3873V6.68123H16.3912V5.68506Z" fill="#235643"/>
<path d="M14.3988 5.68506H15.395V6.68123H14.3988V5.68506Z" fill="#235643"/>
<path d="M12.4065 5.68506H13.4026V6.68123H12.4065V5.68506Z" fill="#235643"/>
<path d="M11.4103 5.68506H12.4065V6.68123H11.4103V5.68506Z" fill="#235643"/>
<path d="M10.4141 5.68506H11.4103V6.68123H10.4141V5.68506Z" fill="#235643"/>
<path d="M9.41797 5.68506H10.4141V6.68123H9.41797V5.68506Z" fill="#235643"/>
<path d="M8.4218 5.68506H9.41797V6.68123H8.4218V5.68506Z" fill="#235643"/>
<path d="M7.42564 5.68506H8.4218V6.68123H7.42564V5.68506Z" fill="#235643"/>
<path d="M6.42947 5.68506H7.42564V6.68123H6.42947V5.68506Z" fill="#235643"/>
<path d="M34.3222 6.68123H35.3184V7.6774H34.3222V6.68123Z" fill="#235643"/>
<path d="M28.3452 6.68123H29.3413V7.6774H28.3452V6.68123Z" fill="#235643"/>
<path d="M25.3567 6.68123H26.3528V7.6774H25.3567V6.68123Z" fill="#235643"/>
<path d="M24.3605 6.68123H25.3567V7.6774H24.3605V6.68123Z" fill="#235643"/>
<path d="M23.3643 6.68123H24.3605V7.6774H23.3643V6.68123Z" fill="#235643"/>
<path d="M22.3682 6.68123H23.3643V7.6774H22.3682V6.68123Z" fill="#235643"/>
<path d="M20.3758 6.68123H21.372V7.6774H20.3758V6.68123Z" fill="#235643"/>
<path d="M19.3797 6.68123H20.3758V7.6774H19.3797V6.68123Z" fill="#235643"/>
<path d="M12.4065 6.68123H13.4026V7.6774H12.4065V6.68123Z" fill="#235643"/>
<path d="M6.42947 6.68123H7.42564V7.6774H6.42947V6.68123Z" fill="#235643"/>
<path d="M34.3222 7.6774H35.3184V8.67356H34.3222V7.6774Z" fill="#235643"/>
<path d="M32.3299 7.6774H33.326V8.67356H32.3299V7.6774Z" fill="#235643"/>
<path d="M31.3337 7.6774H32.3299V8.67356H31.3337V7.6774Z" fill="#235643"/>
<path d="M30.3375 7.6774H31.3337V8.67356H30.3375V7.6774Z" fill="#235643"/>
<path d="M28.3452 7.6774H29.3413V8.67356H28.3452V7.6774Z" fill="#235643"/>
<path d="M24.3605 7.6774H25.3567V8.67356H24.3605V7.6774Z" fill="#235643"/>
<path d="M23.3643 7.6774H24.3605V8.67356H23.3643V7.6774Z" fill="#235643"/>
<path d="M22.3682 7.6774H23.3643V8.67356H22.3682V7.6774Z" fill="#235643"/>
<path d="M21.372 7.6774H22.3682V8.67356H21.372V7.6774Z" fill="#235643"/>
<path d="M19.3797 7.6774H20.3758V8.67356H19.3797V7.6774Z" fill="#235643"/>
<path d="M18.3835 7.6774H19.3797V8.67356H18.3835V7.6774Z" fill="#235643"/>
<path d="M15.395 7.6774H16.3912V8.67356H15.395V7.6774Z" fill="#235643"/>
<path d="M14.3988 7.6774H15.395V8.67356H14.3988V7.6774Z" fill="#235643"/>
<path d="M12.4065 7.6774H13.4026V8.67356H12.4065V7.6774Z" fill="#235643"/>
<path d="M10.4141 7.6774H11.4103V8.67356H10.4141V7.6774Z" fill="#235643"/>
<path d="M9.41797 7.6774H10.4141V8.67356H9.41797V7.6774Z" fill="#235643"/>
<path d="M8.4218 7.6774H9.41797V8.67356H8.4218V7.6774Z" fill="#235643"/>
<path d="M6.42947 7.6774H7.42564V8.67356H6.42947V7.6774Z" fill="#235643"/>
<path d="M34.3222 8.67356H35.3184V9.66973H34.3222V8.67356Z" fill="#235643"/>
<path d="M32.3299 8.67356H33.326V9.66973H32.3299V8.67356Z" fill="#235643"/>
<path d="M31.3337 8.67356H32.3299V9.66973H31.3337V8.67356Z" fill="#235643"/>
<path d="M30.3375 8.67356H31.3337V9.66973H30.3375V8.67356Z" fill="#235643"/>
<path d="M28.3452 8.67356H29.3413V9.66973H28.3452V8.67356Z" fill="#235643"/>
<path d="M26.3528 8.67356H27.349V9.66973H26.3528V8.67356Z" fill="#235643"/>
<path d="M25.3567 8.67356H26.3528V9.66973H25.3567V8.67356Z" fill="#235643"/>
<path d="M24.3605 8.67356H25.3567V9.66973H24.3605V8.67356Z" fill="#235643"/>
<path d="M23.3643 8.67356H24.3605V9.66973H23.3643V8.67356Z" fill="#235643"/>
<path d="M21.372 8.67356H22.3682V9.66973H21.372V8.67356Z" fill="#235643"/>
<path d="M18.3835 8.67356H19.3797V9.66973H18.3835V8.67356Z" fill="#235643"/>
<path d="M15.395 8.67356H16.3912V9.66973H15.395V8.67356Z" fill="#235643"/>
<path d="M12.4065 8.67356H13.4026V9.66973H12.4065V8.67356Z" fill="#235643"/>
<path d="M10.4141 8.67356H11.4103V9.66973H10.4141V8.67356Z" fill="#235643"/>
<path d="M9.41797 8.67356H10.4141V9.66973H9.41797V8.67356Z" fill="#235643"/>
<path d="M8.4218 8.67356H9.41797V9.66973H8.4218V8.67356Z" fill="#235643"/>
<path d="M6.42947 8.67356H7.42564V9.66973H6.42947V8.67356Z" fill="#235643"/>
<path d="M34.3222 9.66973H35.3184V10.6659H34.3222V9.66973Z" fill="#235643"/>
<path d="M32.3299 9.66973H33.326V10.6659H32.3299V9.66973Z" fill="#235643"/>
<path d="M31.3337 9.66973H32.3299V10.6659H31.3337V9.66973Z" fill="#235643"/>
<path d="M30.3375 9.66973H31.3337V10.6659H30.3375V9.66973Z" fill="#235643"/>
<path d="M28.3452 9.66973H29.3413V10.6659H28.3452V9.66973Z" fill="#235643"/>
<path d="M21.372 9.66973H22.3682V10.6659H21.372V9.66973Z" fill="#235643"/>
<path d="M20.3758 9.66973H21.372V10.6659H20.3758V9.66973Z" fill="#235643"/>
<path d="M19.3797 9.66973H20.3758V10.6659H19.3797V9.66973Z" fill="#235643"/>
<path d="M17.3873 9.66973H18.3835V10.6659H17.3873V9.66973Z" fill="#235643"/>
<path d="M12.4065 9.66973H13.4026V10.6659H12.4065V9.66973Z" fill="#235643"/>
<path d="M10.4141 9.66973H11.4103V10.6659H10.4141V9.66973Z" fill="#235643"/>
<path d="M9.41797 9.66973H10.4141V10.6659H9.41797V9.66973Z" fill="#235643"/>
<path d="M8.4218 9.66973H9.41797V10.6659H8.4218V9.66973Z" fill="#235643"/>
<path d="M6.42947 9.66973H7.42564V10.6659H6.42947V9.66973Z" fill="#235643"/>
<path d="M34.3222 10.6659H35.3184V11.6621H34.3222V10.6659Z" fill="#235643"/>
<path d="M28.3452 10.6659H29.3413V11.6621H28.3452V10.6659Z" fill="#235643"/>
<path d="M26.3528 10.6659H27.349V11.6621H26.3528V10.6659Z" fill="#235643"/>
<path d="M25.3567 10.6659H26.3528V11.6621H25.3567V10.6659Z" fill="#235643"/>
<path d="M24.3605 10.6659H25.3567V11.6621H24.3605V10.6659Z" fill="#235643"/>
<path d="M23.3643 10.6659H24.3605V11.6621H23.3643V10.6659Z" fill="#235643"/>
<path d="M22.3682 10.6659H23.3643V11.6621H22.3682V10.6659Z" fill="#235643"/>
<path d="M21.372 10.6659H22.3682V11.6621H21.372V10.6659Z" fill="#235643"/>
<path d="M19.3797 10.6659H20.3758V11.6621H19.3797V10.6659Z" fill="#235643"/>
<path d="M18.3835 10.6659H19.3797V11.6621H18.3835V10.6659Z" fill="#235643"/>
<path d="M12.4065 10.6659H13.4026V11.6621H12.4065V10.6659Z" fill="#235643"/>
<path d="M6.42947 10.6659H7.42564V11.6621H6.42947V10.6659Z" fill="#235643"/>
<path d="M34.3222 11.6621H35.3184V12.6582H34.3222V11.6621Z" fill="#235643"/>
<path d="M33.326 11.6621H34.3222V12.6582H33.326V11.6621Z" fill="#235643"/>
<path d="M32.3299 11.6621H33.326V12.6582H32.3299V11.6621Z" fill="#235643"/>
<path d="M31.3337 11.6621H32.3299V12.6582H31.3337V11.6621Z" fill="#235643"/>
<path d="M30.3375 11.6621H31.3337V12.6582H30.3375V11.6621Z" fill="#235643"/>
<path d="M29.3413 11.6621H30.3375V12.6582H29.3413V11.6621Z" fill="#235643"/>
<path d="M28.3452 11.6621H29.3413V12.6582H28.3452V11.6621Z" fill="#235643"/>
<path d="M26.3528 11.6621H27.349V12.6582H26.3528V11.6621Z" fill="#235643"/>
<path d="M24.3605 11.6621H25.3567V12.6582H24.3605V11.6621Z" fill="#235643"/>
<path d="M22.3682 11.6621H23.3643V12.6582H22.3682V11.6621Z" fill="#235643"/>
<path d="M20.3758 11.6621H21.372V12.6582H20.3758V11.6621Z" fill="#235643"/>
<path d="M18.3835 11.6621H19.3797V12.6582H18.3835V11.6621Z" fill="#235643"/>
<path d="M16.3912 11.6621H17.3873V12.6582H16.3912V11.6621Z" fill="#235643"/>
<path d="M14.3988 11.6621H15.395V12.6582H14.3988V11.6621Z" fill="#235643"/>
<path d="M12.4065 11.6621H13.4026V12.6582H12.4065V11.6621Z" fill="#235643"/>
<path d="M11.4103 11.6621H12.4065V12.6582H11.4103V11.6621Z" fill="#235643"/>
<path d="M10.4141 11.6621H11.4103V12.6582H10.4141V11.6621Z" fill="#235643"/>
<path d="M9.41797 11.6621H10.4141V12.6582H9.41797V11.6621Z" fill="#235643"/>
<path d="M8.4218 11.6621H9.41797V12.6582H8.4218V11.6621Z" fill="#235643"/>
<path d="M7.42564 11.6621H8.4218V12.6582H7.42564V11.6621Z" fill="#235643"/>
<path d="M6.42947 11.6621H7.42564V12.6582H6.42947V11.6621Z" fill="#235643"/>
<path d="M25.3567 12.6582H26.3528V13.6544H25.3567V12.6582Z" fill="#235643"/>
<path d="M20.3758 12.6582H21.372V13.6544H20.3758V12.6582Z" fill="#235643"/>
<path d="M17.3873 12.6582H18.3835V13.6544H17.3873V12.6582Z" fill="#235643"/>
<path d="M16.3912 12.6582H17.3873V13.6544H16.3912V12.6582Z" fill="#235643"/>
<path d="M15.395 12.6582H16.3912V13.6544H15.395V12.6582Z" fill="#235643"/>
<path d="M14.3988 12.6582H15.395V13.6544H14.3988V12.6582Z" fill="#235643"/>
<path d="M29.3413 13.6544H30.3375V14.6506H29.3413V13.6544Z" fill="#235643"/>
<path d="M28.3452 13.6544H29.3413V14.6506H28.3452V13.6544Z" fill="#235643"/>
<path d="M26.3528 13.6544H27.349V14.6506H26.3528V13.6544Z" fill="#235643"/>
<path d="M25.3567 13.6544H26.3528V14.6506H25.3567V13.6544Z" fill="#235643"/>
<path d="M23.3643 13.6544H24.3605V14.6506H23.3643V13.6544Z" fill="#235643"/>
<path d="M22.3682 13.6544H23.3643V14.6506H22.3682V13.6544Z" fill="#235643"/>
<path d="M20.3758 13.6544H21.372V14.6506H20.3758V13.6544Z" fill="#235643"/>
<path d="M19.3797 13.6544H20.3758V14.6506H19.3797V13.6544Z" fill="#235643"/>
<path d="M18.3835 13.6544H19.3797V14.6506H18.3835V13.6544Z" fill="#235643"/>
<path d="M17.3873 13.6544H18.3835V14.6506H17.3873V13.6544Z" fill="#235643"/>
<path d="M13.4026 13.6544H14.3988V14.6506H13.4026V13.6544Z" fill="#235643"/>
<path d="M11.4103 13.6544H12.4065V14.6506H11.4103V13.6544Z" fill="#235643"/>
<path d="M9.41797 13.6544H10.4141V14.6506H9.41797V13.6544Z" fill="#235643"/>
<path d="M6.42947 13.6544H7.42564V14.6506H6.42947V13.6544Z" fill="#235643"/>
<path d="M34.3222 14.6506H35.3184V15.6467H34.3222V14.6506Z" fill="#235643"/>
<path d="M31.3337 14.6506H32.3299V15.6467H31.3337V14.6506Z" fill="#235643"/>
<path d="M27.349 14.6506H28.3452V15.6467H27.349V14.6506Z" fill="#235643"/>
<path d="M26.3528 14.6506H27.349V15.6467H26.3528V14.6506Z" fill="#235643"/>
<path d="M25.3567 14.6506H26.3528V15.6467H25.3567V14.6506Z" fill="#235643"/>
<path d="M19.3797 14.6506H20.3758V15.6467H19.3797V14.6506Z" fill="#235643"/>
<path d="M17.3873 14.6506H18.3835V15.6467H17.3873V14.6506Z" fill="#235643"/>
<path d="M15.395 14.6506H16.3912V15.6467H15.395V14.6506Z" fill="#235643"/>
<path d="M13.4026 14.6506H14.3988V15.6467H13.4026V14.6506Z" fill="#235643"/>
<path d="M34.3222 15.6467H35.3184V16.6429H34.3222V15.6467Z" fill="#235643"/>
<path d="M31.3337 15.6467H32.3299V16.6429H31.3337V15.6467Z" fill="#235643"/>
<path d="M30.3375 15.6467H31.3337V16.6429H30.3375V15.6467Z" fill="#235643"/>
<path d="M28.3452 15.6467H29.3413V16.6429H28.3452V15.6467Z" fill="#235643"/>
<path d="M27.349 15.6467H28.3452V16.6429H27.349V15.6467Z" fill="#235643"/>
<path d="M26.3528 15.6467H27.349V16.6429H26.3528V15.6467Z" fill="#235643"/>
<path d="M24.3605 15.6467H25.3567V16.6429H24.3605V15.6467Z" fill="#235643"/>
<path d="M22.3682 15.6467H23.3643V16.6429H22.3682V15.6467Z" fill="#235643"/>
<path d="M19.3797 15.6467H20.3758V16.6429H19.3797V15.6467Z" fill="#235643"/>
<path d="M16.3912 15.6467H17.3873V16.6429H16.3912V15.6467Z" fill="#235643"/>
<path d="M14.3988 15.6467H15.395V16.6429H14.3988V15.6467Z" fill="#235643"/>
<path d="M12.4065 15.6467H13.4026V16.6429H12.4065V15.6467Z" fill="#235643"/>
<path d="M10.4141 15.6467H11.4103V16.6429H10.4141V15.6467Z" fill="#235643"/>
<path d="M8.4218 15.6467H9.41797V16.6429H8.4218V15.6467Z" fill="#235643"/>
<path d="M6.42947 15.6467H7.42564V16.6429H6.42947V15.6467Z" fill="#235643"/>
<path d="M29.3413 16.6429H30.3375V17.6391H29.3413V16.6429Z" fill="#235643"/>
<path d="M24.3605 16.6429H25.3567V17.6391H24.3605V16.6429Z" fill="#235643"/>
<path d="M21.372 16.6429H22.3682V17.6391H21.372V16.6429Z" fill="#235643"/>
<path d="M20.3758 16.6429H21.372V17.6391H20.3758V16.6429Z" fill="#235643"/>
<path d="M18.3835 16.6429H19.3797V17.6391H18.3835V16.6429Z" fill="#235643"/>
<path d="M16.3912 16.6429H17.3873V17.6391H16.3912V16.6429Z" fill="#235643"/>
<path d="M15.395 16.6429H16.3912V17.6391H15.395V16.6429Z" fill="#235643"/>
<path d="M14.3988 16.6429H15.395V17.6391H14.3988V16.6429Z" fill="#235643"/>
<path d="M13.4026 16.6429H14.3988V17.6391H13.4026V16.6429Z" fill="#235643"/>
<path d="M11.4103 16.6429H12.4065V17.6391H11.4103V16.6429Z" fill="#235643"/>
<path d="M10.4141 16.6429H11.4103V17.6391H10.4141V16.6429Z" fill="#235643"/>
<path d="M32.3299 17.6391H33.326V18.6353H32.3299V17.6391Z" fill="#235643"/>
<path d="M28.3452 17.6391H29.3413V18.6353H28.3452V17.6391Z" fill="#235643"/>
<path d="M26.3528 17.6391H27.349V18.6353H26.3528V17.6391Z" fill="#235643"/>
<path d="M25.3567 17.6391H26.3528V18.6353H25.3567V17.6391Z" fill="#235643"/>
<path d="M24.3605 17.6391H25.3567V18.6353H24.3605V17.6391Z" fill="#235643"/>
<path d="M23.3643 17.6391H24.3605V18.6353H23.3643V17.6391Z" fill="#235643"/>
<path d="M22.3682 17.6391H23.3643V18.6353H22.3682V17.6391Z" fill="#235643"/>
<path d="M20.3758 17.6391H21.372V18.6353H20.3758V17.6391Z" fill="#235643"/>
<path d="M19.3797 17.6391H20.3758V18.6353H19.3797V17.6391Z" fill="#235643"/>
<path d="M16.3912 17.6391H17.3873V18.6353H16.3912V17.6391Z" fill="#235643"/>
<path d="M15.395 17.6391H16.3912V18.6353H15.395V17.6391Z" fill="#235643"/>
<path d="M12.4065 17.6391H13.4026V18.6353H12.4065V17.6391Z" fill="#235643"/>
<path d="M10.4141 17.6391H11.4103V18.6353H10.4141V17.6391Z" fill="#235643"/>
<path d="M8.4218 17.6391H9.41797V18.6353H8.4218V17.6391Z" fill="#235643"/>
<path d="M6.42947 17.6391H7.42564V18.6353H6.42947V17.6391Z" fill="#235643"/>
<path d="M34.3222 18.6353H35.3184V19.6314H34.3222V18.6353Z" fill="#235643"/>
<path d="M33.326 18.6353H34.3222V19.6314H33.326V18.6353Z" fill="#235643"/>
<path d="M32.3299 18.6353H33.326V19.6314H32.3299V18.6353Z" fill="#235643"/>
<path d="M31.3337 18.6353H32.3299V19.6314H31.3337V18.6353Z" fill="#235643"/>
<path d="M30.3375 18.6353H31.3337V19.6314H30.3375V18.6353Z" fill="#235643"/>
<path d="M29.3413 18.6353H30.3375V19.6314H29.3413V18.6353Z" fill="#235643"/>
<path d="M19.3797 18.6353H20.3758V19.6314H19.3797V18.6353Z" fill="#235643"/>
<path d="M18.3835 18.6353H19.3797V19.6314H18.3835V18.6353Z" fill="#235643"/>
<path d="M16.3912 18.6353H17.3873V19.6314H16.3912V18.6353Z" fill="#235643"/>
<path d="M15.395 18.6353H16.3912V19.6314H15.395V18.6353Z" fill="#235643"/>
<path d="M13.4026 18.6353H14.3988V19.6314H13.4026V18.6353Z" fill="#235643"/>
<path d="M12.4065 18.6353H13.4026V19.6314H12.4065V18.6353Z" fill="#235643"/>
<path d="M11.4103 18.6353H12.4065V19.6314H11.4103V18.6353Z" fill="#235643"/>
<path d="M7.42564 18.6353H8.4218V19.6314H7.42564V18.6353Z" fill="#235643"/>
<path d="M6.42947 18.6353H7.42564V19.6314H6.42947V18.6353Z" fill="#235643"/>
<path d="M33.326 19.6314H34.3222V20.6276H33.326V19.6314Z" fill="#235643"/>
<path d="M31.3337 19.6314H32.3299V20.6276H31.3337V19.6314Z" fill="#235643"/>
<path d="M30.3375 19.6314H31.3337V20.6276H30.3375V19.6314Z" fill="#235643"/>
<path d="M29.3413 19.6314H30.3375V20.6276H29.3413V19.6314Z" fill="#235643"/>
<path d="M28.3452 19.6314H29.3413V20.6276H28.3452V19.6314Z" fill="#235643"/>
<path d="M27.349 19.6314H28.3452V20.6276H27.349V19.6314Z" fill="#235643"/>
<path d="M25.3567 19.6314H26.3528V20.6276H25.3567V19.6314Z" fill="#235643"/>
<path d="M23.3643 19.6314H24.3605V20.6276H23.3643V19.6314Z" fill="#235643"/>
<path d="M19.3797 19.6314H20.3758V20.6276H19.3797V19.6314Z" fill="#235643"/>
<path d="M18.3835 19.6314H19.3797V20.6276H18.3835V19.6314Z" fill="#235643"/>
<path d="M14.3988 19.6314H15.395V20.6276H14.3988V19.6314Z" fill="#235643"/>
<path d="M12.4065 19.6314H13.4026V20.6276H12.4065V19.6314Z" fill="#235643"/>
<path d="M10.4141 19.6314H11.4103V20.6276H10.4141V19.6314Z" fill="#235643"/>
<path d="M9.41797 19.6314H10.4141V20.6276H9.41797V19.6314Z" fill="#235643"/>
<path d="M6.42947 19.6314H7.42564V20.6276H6.42947V19.6314Z" fill="#235643"/>
<path d="M33.326 20.6276H34.3222V21.6238H33.326V20.6276Z" fill="#235643"/>
<path d="M31.3337 20.6276H32.3299V21.6238H31.3337V20.6276Z" fill="#235643"/>
<path d="M26.3528 20.6276H27.349V21.6238H26.3528V20.6276Z" fill="#235643"/>
<path d="M25.3567 20.6276H26.3528V21.6238H25.3567V20.6276Z" fill="#235643"/>
<path d="M23.3643 20.6276H24.3605V21.6238H23.3643V20.6276Z" fill="#235643"/>
<path d="M21.372 20.6276H22.3682V21.6238H21.372V20.6276Z" fill="#235643"/>
<path d="M20.3758 20.6276H21.372V21.6238H20.3758V20.6276Z" fill="#235643"/>
<path d="M18.3835 20.6276H19.3797V21.6238H18.3835V20.6276Z" fill="#235643"/>
<path d="M17.3873 20.6276H18.3835V21.6238H17.3873V20.6276Z" fill="#235643"/>
<path d="M15.395 20.6276H16.3912V21.6238H15.395V20.6276Z" fill="#235643"/>
<path d="M13.4026 20.6276H14.3988V21.6238H13.4026V20.6276Z" fill="#235643"/>
<path d="M12.4065 20.6276H13.4026V21.6238H12.4065V20.6276Z" fill="#235643"/>
<path d="M10.4141 20.6276H11.4103V21.6238H10.4141V20.6276Z" fill="#235643"/>
<path d="M9.41797 20.6276H10.4141V21.6238H9.41797V20.6276Z" fill="#235643"/>
<path d="M7.42564 20.6276H8.4218V21.6238H7.42564V20.6276Z" fill="#235643"/>
<path d="M34.3222 21.6238H35.3184V22.6199H34.3222V21.6238Z" fill="#235643"/>
<path d="M32.3299 21.6238H33.326V22.6199H32.3299V21.6238Z" fill="#235643"/>
<path d="M30.3375 21.6238H31.3337V22.6199H30.3375V21.6238Z" fill="#235643"/>
<path d="M28.3452 21.6238H29.3413V22.6199H28.3452V21.6238Z" fill="#235643"/>
<path d="M24.3605 21.6238H25.3567V22.6199H24.3605V21.6238Z" fill="#235643"/>
<path d="M22.3682 21.6238H23.3643V22.6199H22.3682V21.6238Z" fill="#235643"/>
<path d="M20.3758 21.6238H21.372V22.6199H20.3758V21.6238Z" fill="#235643"/>
<path d="M19.3797 21.6238H20.3758V22.6199H19.3797V21.6238Z" fill="#235643"/>
<path d="M18.3835 21.6238H19.3797V22.6199H18.3835V21.6238Z" fill="#235643"/>
<path d="M15.395 21.6238H16.3912V22.6199H15.395V21.6238Z" fill="#235643"/>
<path d="M14.3988 21.6238H15.395V22.6199H14.3988V21.6238Z" fill="#235643"/>
<path d="M13.4026 21.6238H14.3988V22.6199H13.4026V21.6238Z" fill="#235643"/>
<path d="M11.4103 21.6238H12.4065V22.6199H11.4103V21.6238Z" fill="#235643"/>
<path d="M9.41797 21.6238H10.4141V22.6199H9.41797V21.6238Z" fill="#235643"/>
<path d="M33.326 22.6199H34.3222V23.6161H33.326V22.6199Z" fill="#235643"/>
<path d="M32.3299 22.6199H33.326V23.6161H32.3299V22.6199Z" fill="#235643"/>
<path d="M27.349 22.6199H28.3452V23.6161H27.349V22.6199Z" fill="#235643"/>
<path d="M24.3605 22.6199H25.3567V23.6161H24.3605V22.6199Z" fill="#235643"/>
<path d="M22.3682 22.6199H23.3643V23.6161H22.3682V22.6199Z" fill="#235643"/>
<path d="M21.372 22.6199H22.3682V23.6161H21.372V22.6199Z" fill="#235643"/>
<path d="M19.3797 22.6199H20.3758V23.6161H19.3797V22.6199Z" fill="#235643"/>
<path d="M18.3835 22.6199H19.3797V23.6161H18.3835V22.6199Z" fill="#235643"/>
<path d="M16.3912 22.6199H17.3873V23.6161H16.3912V22.6199Z" fill="#235643"/>
<path d="M15.395 22.6199H16.3912V23.6161H15.395V22.6199Z" fill="#235643"/>
<path d="M12.4065 22.6199H13.4026V23.6161H12.4065V22.6199Z" fill="#235643"/>
<path d="M34.3222 23.6161H35.3184V24.6123H34.3222V23.6161Z" fill="#235643"/>
<path d="M33.326 23.6161H34.3222V24.6123H33.326V23.6161Z" fill="#235643"/>
<path d="M32.3299 23.6161H33.326V24.6123H32.3299V23.6161Z" fill="#235643"/>
<path d="M31.3337 23.6161H32.3299V24.6123H31.3337V23.6161Z" fill="#235643"/>
<path d="M30.3375 23.6161H31.3337V24.6123H30.3375V23.6161Z" fill="#235643"/>
<path d="M28.3452 23.6161H29.3413V24.6123H28.3452V23.6161Z" fill="#235643"/>
<path d="M27.349 23.6161H28.3452V24.6123H27.349V23.6161Z" fill="#235643"/>
<path d="M26.3528 23.6161H27.349V24.6123H26.3528V23.6161Z" fill="#235643"/>
<path d="M21.372 23.6161H22.3682V24.6123H21.372V23.6161Z" fill="#235643"/>
<path d="M19.3797 23.6161H20.3758V24.6123H19.3797V23.6161Z" fill="#235643"/>
<path d="M17.3873 23.6161H18.3835V24.6123H17.3873V23.6161Z" fill="#235643"/>
<path d="M16.3912 23.6161H17.3873V24.6123H16.3912V23.6161Z" fill="#235643"/>
<path d="M15.395 23.6161H16.3912V24.6123H15.395V23.6161Z" fill="#235643"/>
<path d="M14.3988 23.6161H15.395V24.6123H14.3988V23.6161Z" fill="#235643"/>
<path d="M11.4103 23.6161H12.4065V24.6123H11.4103V23.6161Z" fill="#235643"/>
<path d="M10.4141 23.6161H11.4103V24.6123H10.4141V23.6161Z" fill="#235643"/>
<path d="M34.3222 24.6123H35.3184V25.6084H34.3222V24.6123Z" fill="#235643"/>
<path d="M29.3413 24.6123H30.3375V25.6084H29.3413V24.6123Z" fill="#235643"/>
<path d="M26.3528 24.6123H27.349V25.6084H26.3528V24.6123Z" fill="#235643"/>
<path d="M24.3605 24.6123H25.3567V25.6084H24.3605V24.6123Z" fill="#235643"/>
<path d="M23.3643 24.6123H24.3605V25.6084H23.3643V24.6123Z" fill="#235643"/>
<path d="M21.372 24.6123H22.3682V25.6084H21.372V24.6123Z" fill="#235643"/>
<path d="M15.395 24.6123H16.3912V25.6084H15.395V24.6123Z" fill="#235643"/>
<path d="M9.41797 24.6123H10.4141V25.6084H9.41797V24.6123Z" fill="#235643"/>
<path d="M8.4218 24.6123H9.41797V25.6084H8.4218V24.6123Z" fill="#235643"/>
<path d="M7.42564 24.6123H8.4218V25.6084H7.42564V24.6123Z" fill="#235643"/>
<path d="M32.3299 25.6084H33.326V26.6046H32.3299V25.6084Z" fill="#235643"/>
<path d="M28.3452 25.6084H29.3413V26.6046H28.3452V25.6084Z" fill="#235643"/>
<path d="M25.3567 25.6084H26.3528V26.6046H25.3567V25.6084Z" fill="#235643"/>
<path d="M24.3605 25.6084H25.3567V26.6046H24.3605V25.6084Z" fill="#235643"/>
<path d="M21.372 25.6084H22.3682V26.6046H21.372V25.6084Z" fill="#235643"/>
<path d="M19.3797 25.6084H20.3758V26.6046H19.3797V25.6084Z" fill="#235643"/>
<path d="M18.3835 25.6084H19.3797V26.6046H18.3835V25.6084Z" fill="#235643"/>
<path d="M17.3873 25.6084H18.3835V26.6046H17.3873V25.6084Z" fill="#235643"/>
<path d="M14.3988 25.6084H15.395V26.6046H14.3988V25.6084Z" fill="#235643"/>
<path d="M13.4026 25.6084H14.3988V26.6046H13.4026V25.6084Z" fill="#235643"/>
<path d="M12.4065 25.6084H13.4026V26.6046H12.4065V25.6084Z" fill="#235643"/>
<path d="M11.4103 25.6084H12.4065V26.6046H11.4103V25.6084Z" fill="#235643"/>
<path d="M10.4141 25.6084H11.4103V26.6046H10.4141V25.6084Z" fill="#235643"/>
<path d="M7.42564 25.6084H8.4218V26.6046H7.42564V25.6084Z" fill="#235643"/>
<path d="M6.42947 25.6084H7.42564V26.6046H6.42947V25.6084Z" fill="#235643"/>
<path d="M26.3528 26.6046H27.349V27.6008H26.3528V26.6046Z" fill="#235643"/>
<path d="M22.3682 26.6046H23.3643V27.6008H22.3682V26.6046Z" fill="#235643"/>
<path d="M20.3758 26.6046H21.372V27.6008H20.3758V26.6046Z" fill="#235643"/>
<path d="M19.3797 26.6046H20.3758V27.6008H19.3797V26.6046Z" fill="#235643"/>
<path d="M18.3835 26.6046H19.3797V27.6008H18.3835V26.6046Z" fill="#235643"/>
<path d="M17.3873 26.6046H18.3835V27.6008H17.3873V26.6046Z" fill="#235643"/>
<path d="M16.3912 26.6046H17.3873V27.6008H16.3912V26.6046Z" fill="#235643"/>
<path d="M14.3988 26.6046H15.395V27.6008H14.3988V26.6046Z" fill="#235643"/>
<path d="M10.4141 26.6046H11.4103V27.6008H10.4141V26.6046Z" fill="#235643"/>
<path d="M8.4218 26.6046H9.41797V27.6008H8.4218V26.6046Z" fill="#235643"/>
<path d="M7.42564 26.6046H8.4218V27.6008H7.42564V26.6046Z" fill="#235643"/>
<path d="M34.3222 27.6008H35.3184V28.5969H34.3222V27.6008Z" fill="#235643"/>
<path d="M33.326 27.6008H34.3222V28.5969H33.326V27.6008Z" fill="#235643"/>
<path d="M32.3299 27.6008H33.326V28.5969H32.3299V27.6008Z" fill="#235643"/>
<path d="M31.3337 27.6008H32.3299V28.5969H31.3337V27.6008Z" fill="#235643"/>
<path d="M30.3375 27.6008H31.3337V28.5969H30.3375V27.6008Z" fill="#235643"/>
<path d="M29.3413 27.6008H30.3375V28.5969H29.3413V27.6008Z" fill="#235643"/>
<path d="M28.3452 27.6008H29.3413V28.5969H28.3452V27.6008Z" fill="#235643"/>
<path d="M25.3567 27.6008H26.3528V28.5969H25.3567V27.6008Z" fill="#235643"/>
<path d="M23.3643 27.6008H24.3605V28.5969H23.3643V27.6008Z" fill="#235643"/>
<path d="M22.3682 27.6008H23.3643V28.5969H22.3682V27.6008Z" fill="#235643"/>
<path d="M20.3758 27.6008H21.372V28.5969H20.3758V27.6008Z" fill="#235643"/>
<path d="M17.3873 27.6008H18.3835V28.5969H17.3873V27.6008Z" fill="#235643"/>
<path d="M14.3988 27.6008H15.395V28.5969H14.3988V27.6008Z" fill="#235643"/>
<path d="M12.4065 27.6008H13.4026V28.5969H12.4065V27.6008Z" fill="#235643"/>
<path d="M10.4141 27.6008H11.4103V28.5969H10.4141V27.6008Z" fill="#235643"/>
<path d="M9.41797 27.6008H10.4141V28.5969H9.41797V27.6008Z" fill="#235643"/>
<path d="M6.42947 27.6008H7.42564V28.5969H6.42947V27.6008Z" fill="#235643"/>
<path d="M34.3222 28.5969H35.3184V29.5931H34.3222V28.5969Z" fill="#235643"/>
<path d="M28.3452 28.5969H29.3413V29.5931H28.3452V28.5969Z" fill="#235643"/>
<path d="M26.3528 28.5969H27.349V29.5931H26.3528V28.5969Z" fill="#235643"/>
<path d="M24.3605 28.5969H25.3567V29.5931H24.3605V28.5969Z" fill="#235643"/>
<path d="M23.3643 28.5969H24.3605V29.5931H23.3643V28.5969Z" fill="#235643"/>
<path d="M21.372 28.5969H22.3682V29.5931H21.372V28.5969Z" fill="#235643"/>
<path d="M17.3873 28.5969H18.3835V29.5931H17.3873V28.5969Z" fill="#235643"/>
<path d="M16.3912 28.5969H17.3873V29.5931H16.3912V28.5969Z" fill="#235643"/>
<path d="M15.395 28.5969H16.3912V29.5931H15.395V28.5969Z" fill="#235643"/>
<path d="M14.3988 28.5969H15.395V29.5931H14.3988V28.5969Z" fill="#235643"/>
<path d="M10.4141 28.5969H11.4103V29.5931H10.4141V28.5969Z" fill="#235643"/>
<path d="M9.41797 28.5969H10.4141V29.5931H9.41797V28.5969Z" fill="#235643"/>
<path d="M7.42564 28.5969H8.4218V29.5931H7.42564V28.5969Z" fill="#235643"/>
<path d="M34.3222 29.5931H35.3184V30.5893H34.3222V29.5931Z" fill="#235643"/>
<path d="M32.3299 29.5931H33.326V30.5893H32.3299V29.5931Z" fill="#235643"/>
<path d="M31.3337 29.5931H32.3299V30.5893H31.3337V29.5931Z" fill="#235643"/>
<path d="M30.3375 29.5931H31.3337V30.5893H30.3375V29.5931Z" fill="#235643"/>
<path d="M28.3452 29.5931H29.3413V30.5893H28.3452V29.5931Z" fill="#235643"/>
<path d="M24.3605 29.5931H25.3567V30.5893H24.3605V29.5931Z" fill="#235643"/>
<path d="M23.3643 29.5931H24.3605V30.5893H23.3643V29.5931Z" fill="#235643"/>
<path d="M20.3758 29.5931H21.372V30.5893H20.3758V29.5931Z" fill="#235643"/>
<path d="M19.3797 29.5931H20.3758V30.5893H19.3797V29.5931Z" fill="#235643"/>
<path d="M16.3912 29.5931H17.3873V30.5893H16.3912V29.5931Z" fill="#235643"/>
<path d="M15.395 29.5931H16.3912V30.5893H15.395V29.5931Z" fill="#235643"/>
<path d="M14.3988 29.5931H15.395V30.5893H14.3988V29.5931Z" fill="#235643"/>
<path d="M13.4026 29.5931H14.3988V30.5893H13.4026V29.5931Z" fill="#235643"/>
<path d="M12.4065 29.5931H13.4026V30.5893H12.4065V29.5931Z" fill="#235643"/>
<path d="M11.4103 29.5931H12.4065V30.5893H11.4103V29.5931Z" fill="#235643"/>
<path d="M10.4141 29.5931H11.4103V30.5893H10.4141V29.5931Z" fill="#235643"/>
<path d="M9.41797 29.5931H10.4141V30.5893H9.41797V29.5931Z" fill="#235643"/>
<path d="M8.4218 29.5931H9.41797V30.5893H8.4218V29.5931Z" fill="#235643"/>
<path d="M7.42564 29.5931H8.4218V30.5893H7.42564V29.5931Z" fill="#235643"/>
<path d="M6.42947 29.5931H7.42564V30.5893H6.42947V29.5931Z" fill="#235643"/>
<path d="M34.3222 30.5893H35.3184V31.5854H34.3222V30.5893Z" fill="#235643"/>
<path d="M32.3299 30.5893H33.326V31.5854H32.3299V30.5893Z" fill="#235643"/>
<path d="M31.3337 30.5893H32.3299V31.5854H31.3337V30.5893Z" fill="#235643"/>
<path d="M30.3375 30.5893H31.3337V31.5854H30.3375V30.5893Z" fill="#235643"/>
<path d="M28.3452 30.5893H29.3413V31.5854H28.3452V30.5893Z" fill="#235643"/>
<path d="M25.3567 30.5893H26.3528V31.5854H25.3567V30.5893Z" fill="#235643"/>
<path d="M24.3605 30.5893H25.3567V31.5854H24.3605V30.5893Z" fill="#235643"/>
<path d="M23.3643 30.5893H24.3605V31.5854H23.3643V30.5893Z" fill="#235643"/>
<path d="M22.3682 30.5893H23.3643V31.5854H22.3682V30.5893Z" fill="#235643"/>
<path d="M19.3797 30.5893H20.3758V31.5854H19.3797V30.5893Z" fill="#235643"/>
<path d="M18.3835 30.5893H19.3797V31.5854H18.3835V30.5893Z" fill="#235643"/>
<path d="M16.3912 30.5893H17.3873V31.5854H16.3912V30.5893Z" fill="#235643"/>
<path d="M10.4141 30.5893H11.4103V31.5854H10.4141V30.5893Z" fill="#235643"/>
<path d="M9.41797 30.5893H10.4141V31.5854H9.41797V30.5893Z" fill="#235643"/>
<path d="M34.3222 31.5854H35.3184V32.5816H34.3222V31.5854Z" fill="#235643"/>
<path d="M32.3299 31.5854H33.326V32.5816H32.3299V31.5854Z" fill="#235643"/>
<path d="M31.3337 31.5854H32.3299V32.5816H31.3337V31.5854Z" fill="#235643"/>
<path d="M30.3375 31.5854H31.3337V32.5816H30.3375V31.5854Z" fill="#235643"/>
<path d="M28.3452 31.5854H29.3413V32.5816H28.3452V31.5854Z" fill="#235643"/>
<path d="M24.3605 31.5854H25.3567V32.5816H24.3605V31.5854Z" fill="#235643"/>
<path d="M23.3643 31.5854H24.3605V32.5816H23.3643V31.5854Z" fill="#235643"/>
<path d="M21.372 31.5854H22.3682V32.5816H21.372V31.5854Z" fill="#235643"/>
<path d="M20.3758 31.5854H21.372V32.5816H20.3758V31.5854Z" fill="#235643"/>
<path d="M14.3988 31.5854H15.395V32.5816H14.3988V31.5854Z" fill="#235643"/>
<path d="M13.4026 31.5854H14.3988V32.5816H13.4026V31.5854Z" fill="#235643"/>
<path d="M11.4103 31.5854H12.4065V32.5816H11.4103V31.5854Z" fill="#235643"/>
<path d="M34.3222 32.5816H35.3184V33.5778H34.3222V32.5816Z" fill="#235643"/>
<path d="M28.3452 32.5816H29.3413V33.5778H28.3452V32.5816Z" fill="#235643"/>
<path d="M24.3605 32.5816H25.3567V33.5778H24.3605V32.5816Z" fill="#235643"/>
<path d="M23.3643 32.5816H24.3605V33.5778H23.3643V32.5816Z" fill="#235643"/>
<path d="M22.3682 32.5816H23.3643V33.5778H22.3682V32.5816Z" fill="#235643"/>
<path d="M20.3758 32.5816H21.372V33.5778H20.3758V32.5816Z" fill="#235643"/>
<path d="M19.3797 32.5816H20.3758V33.5778H19.3797V32.5816Z" fill="#235643"/>
<path d="M18.3835 32.5816H19.3797V33.5778H18.3835V32.5816Z" fill="#235643"/>
<path d="M16.3912 32.5816H17.3873V33.5778H16.3912V32.5816Z" fill="#235643"/>
<path d="M15.395 32.5816H16.3912V33.5778H15.395V32.5816Z" fill="#235643"/>
<path d="M13.4026 32.5816H14.3988V33.5778H13.4026V32.5816Z" fill="#235643"/>
<path d="M12.4065 32.5816H13.4026V33.5778H12.4065V32.5816Z" fill="#235643"/>
<path d="M11.4103 32.5816H12.4065V33.5778H11.4103V32.5816Z" fill="#235643"/>
<path d="M10.4141 32.5816H11.4103V33.5778H10.4141V32.5816Z" fill="#235643"/>
<path d="M7.42564 32.5816H8.4218V33.5778H7.42564V32.5816Z" fill="#235643"/>
<path d="M6.42947 32.5816H7.42564V33.5778H6.42947V32.5816Z" fill="#235643"/>
<path d="M34.3222 33.5778H35.3184V34.574H34.3222V33.5778Z" fill="#235643"/>
<path d="M33.326 33.5778H34.3222V34.574H33.326V33.5778Z" fill="#235643"/>
<path d="M32.3299 33.5778H33.326V34.574H32.3299V33.5778Z" fill="#235643"/>
<path d="M31.3337 33.5778H32.3299V34.574H31.3337V33.5778Z" fill="#235643"/>
<path d="M30.3375 33.5778H31.3337V34.574H30.3375V33.5778Z" fill="#235643"/>
<path d="M29.3413 33.5778H30.3375V34.574H29.3413V33.5778Z" fill="#235643"/>
<path d="M28.3452 33.5778H29.3413V34.574H28.3452V33.5778Z" fill="#235643"/>
<path d="M25.3567 33.5778H26.3528V34.574H25.3567V33.5778Z" fill="#235643"/>
<path d="M22.3682 33.5778H23.3643V34.574H22.3682V33.5778Z" fill="#235643"/>
<path d="M20.3758 33.5778H21.372V34.574H20.3758V33.5778Z" fill="#235643"/>
<path d="M17.3873 33.5778H18.3835V34.574H17.3873V33.5778Z" fill="#235643"/>
<path d="M16.3912 33.5778H17.3873V34.574H16.3912V33.5778Z" fill="#235643"/>
<path d="M15.395 33.5778H16.3912V34.574H15.395V33.5778Z" fill="#235643"/>
<path d="M13.4026 33.5778H14.3988V34.574H13.4026V33.5778Z" fill="#235643"/>
<path d="M9.41797 33.5778H10.4141V34.574H9.41797V33.5778Z" fill="#235643"/>
<path d="M8.4218 33.5778H9.41797V34.574H8.4218V33.5778Z" fill="#235643"/>
</svg>

`;

const QRCodeIcon = () => {
  return <SvgXml xml={qrCodeIcon} />;
};

export default QRCodeIcon;