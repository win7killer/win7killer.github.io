import { padString } from '@/common/utils';

export function time(strTime, format = 'Y-M-D H:I:S') {
    if (!strTime || strTime.toString().trim() === '') {
        return '';
    }
    // 兼容后端unix时间戳（s）和前端(ms)
    strTime = +padString(strTime, 13, '0', true);

    let date = new Date(strTime);
    let dateMap = {
        Y: date.getFullYear().toString(),
        y: date.getFullYear().toString().slice(2),
        M: padString(date.getMonth() + 1),
        m: (date.getMonth() + 1).toString(),
        D: padString(date.getDate()),
        d: date.getDate().toString(),
        hh: (date.getHours() % 12).toString(),
        h: (date.getHours()).toString(),
        H: padString(date.getHours().toString()),
        i: date.getMinutes().toString(),
        I: padString(date.getMinutes()),
        s: date.getSeconds().toString(),
        S: padString(date.getSeconds()),
        A: date.getHours() >= 12 ? 'pm' : 'am',
        w: date.getDay().toString(),
        W: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
    };
    for (let k in dateMap) {
        format = format.replace(new RegExp(k, 'g'), dateMap[k]);
    }
    return format;
};
