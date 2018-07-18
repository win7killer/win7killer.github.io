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
