export function time(strTime, format = 'Y-M-D H:I:S') {
    if (!strTime || strTime.toString().trim() === '') {
        return '';
    }
    // 兼容后端unix时间戳（s）和前端(ms)
    strTime = strTime.toString().padEnd(13, '0') - 0;

    let date = new Date(strTime);
    let dateMap = {
        Y: date.getFullYear().toString(),
        y: date.getFullYear().toString().slice(2),
        M: (date.getMonth() + 1).toString().padStart(2, '0'),
        m: (date.getMonth() + 1).toString(),
        D: date.getDate().toString().padStart(2, '0'),
        d: date.getDate().toString(),

        hh: (date.getHours() % 12).toString(),
        h: (date.getHours()).toString(),
        H: date.getHours().toString(),

        i: date.getMinutes().toString(),
        I: date.getMinutes().toString().padStart(2, '0'),
        s: date.getSeconds().toString(),
        S: date.getSeconds().toString().padStart(2, '0'),

        A: date.getHours() >= 12 ? 'pm' : 'am',

        w: date.getDay().toString(),
        W: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
    };
    for (let k in dateMap) {
        format = format.replace(new RegExp(k, 'g'), dateMap[k]);
    }
    return format;
}
