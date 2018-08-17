import CHAR_DEEP from './char_deep.json';
export function padString(str = '', len = 2, padStr = '0', padEnd = false) {
    str = str + '';
    if (str.length < len) {
        for (let i = 0, l = len - str.length; i < l; i++) {
            if (padEnd) {
                str = str + padStr;
            } else {
                str = padStr + str;
            }
        }
    }
    return str;
};

const CHAR_CFG = {
    0: '·',
    15: '_',
    30: ',',
    45: ':',
    52: '-',
    62: '~',
    74: ';',
    84: '|',
    86: '!',
    94: '/',
    100: '\\',
    106: 'r',
    108: '=',
    112: 'l',
    118: '+',
    120: '?',
    122: 'c',
    124: 'v',
    132: 'f',
    134: '7',
    136: 'j',
    138: 't',
    142: ')',
    144: 'x',
    146: 'z',
    150: '}',
    158: '[',
    160: 'o',
    162: '2',
    166: 'a',
    168: 'h',
    170: 'k',
    174: '3',
    188: 'p',
    190: 'q',
    200: 'm',
    210: '$',
    212: '#',
    220: 'g',
    222: '8',
    242: '&',
    254: '%'
};

const CHAR_DEEP_1 = {
    84.3012: '0',
    57.9384: '1',
    78.4248: '2',
    71.9700: '3',
    80.1072: '4',
    79.6500: '5',
    87.4764: '6',
    54.7968: '7',
    96.0672: '8',
    87.5328: '9',
    83.7204: 'a',
    99.2424: 'b',
    73.0452: 'c',
    101.7132: 'd',
    87.7608: 'e',
    80.6004: 'f',
    94.8168: 'g',
    87.8256: 'h',
    60.0024: 'i',
    65.0244: 'j',
    87.8040: 'k',
    61.9356: 'l',
    103.4292: 'm',
    77.2296: 'n',
    79.0248: 'o',
    99.2808: 'p',
    99.4272: 'q',
    64.4232: 'r',
    80.6256: 's',
    66.2172: 't',
    73.4328: 'u',
    67.7712: 'v',
    87.3720: 'w',
    79.9368: 'x',
    79.3080: 'y',
    73.1028: 'z',
    98.7432: 'A',
    110.5884: 'B',
    81.9480: 'C',
    95.4420: 'D',
    104.9736: 'E',
    88.2456: 'F',
    97.5780: 'G',
    105.8904: 'H',
    67.5492: 'I',
    72.1344: 'J',
    100.8168: 'K',
    79.5864: 'L',
    115.0524: 'M',
    107.9520: 'N',
    95.0724: 'O',
    91.0548: 'P',
    113.2800: 'Q',
    104.4216: 'R',
    94.2132: 'S',
    88.0620: 'T',
    89.2596: 'U',
    81.0108: 'V',
    109.3812: 'W',
    95.7336: 'X',
    79.2312: 'Y',
    87.8004: 'Z',
    12.2592: '`',
    25.6704: '~',
    46.5480: '!',
    93.8052: '@',
    106.0752: '#',
    89.4936: '$',
    76.9416: '%',
    22.6704: '^',
    82.1616: '&',
    46.6128: '*',
    51.0372: '(',
    51.1500: ')',
    0.0000: '_',
    50.1108: '+',
    32.1552: '-',
    53.3112: '=',
    42.1500: '|',
    28.3344: ',',
    20.0388: '.',
    52.7448: '<',
    52.5708: '>',
    45.2304: ';',
    40.0872: ':',
    27.0168: '"',
    13.6920: '\'',
    43.3416: '/',
    43.2096: '\\',
    55.2072: '[',
    55.2588: ']',
    62.0688: '{',
    62.2392: '}'
};

export {
    CHAR_CFG,
    CHAR_DEEP
};
