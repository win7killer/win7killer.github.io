/**
 * @file 过度色测试
 * @author fe_bean
 */

/**
 * @function colorBar 生成颜色条数据
 * @returns {Array} 包含rgba元素数组的数组，如： [[255, 0, 0, 1]]
 */
function colorBar() {
    let cArr = [
        [255, 0, 0, 1]
    ];
    let length = 42;
    cArr = cArr.concat(a2b([255, 0, 0, 1], [255, 0, 255, 1], length + 1));
    cArr = cArr.concat(a2b([255, 0, 255, 1], [0, 0, 255, 1], length));
    cArr = cArr.concat(a2b([0, 0, 255, 1], [0, 255, 255, 1], length + 1));
    cArr = cArr.concat(a2b([0, 255, 255, 1], [0, 255, 0, 1], length));
    cArr = cArr.concat(a2b([0, 255, 0, 1], [255, 255, 0, 1], length + 1));
    cArr = cArr.concat(a2b([255, 255, 0, 1], [255, 0, 0, 1], length));
    return cArr;
}

/**
 * @function a2b 一个颜色过渡另一个颜色
 * @param {Array} a 颜色a
 * @param {Array} b 颜色b
 * @param {Int} total 过渡色数量，阶数
 * @returns {Array} 包含rgba元素数组的数组，如： [[255, 0, 0, 0.5]]
 */
function a2b(a = [255, 255, 0, 1], b = [255, 0, 0, 1], total = 256, needStart = false) {
    let res = []; // 总数组
    let aDiff = []; //
    a.forEach((item, index) => {
        let cha = b[index] - item;
        aDiff.push(cha);
    });

    aDiff.forEach((item, index) => {
        for (let i = 0, temp = a[index], per = item / total; i < total; i++) {
            if (+index !== 3) {
                temp += per;
                res[i] = res[i] || [];
                res[i][index] = Math.abs(Math.round(temp));
            } else {
                temp += per;
                res[i] = res[i] || [];
                res[i][index] = Math.abs(+temp.toFixed(2));
            }
        }
    });

    if (needStart) {
        res.unshift(a);
    }
    return res;
}

/**
 *
 * @param {Array} color 主色调
 * @param {Number} step 分步数
 * @returns {Array} 生成的数据
 */
function oneColorMap(color = [255, 0, 0, 1], step = 256) {
    let colorArr = a2b(color, [255, 255, 255, 1], 255, true);

    let res = [];
    colorArr.forEach((item, index) => {
        res.push(a2b(item, [0, 0, 0, 1], 255, true));
    });

    let tRes = matrixTurn90Deg(res);
    return tRes;
}

/**
 *
 * @param {Array} matrix 二维数组
 * @returns Array 转换后的matrix
 */
function matrixTurn90Deg(matrix = []) {
    let res = [];
    matrix.forEach((item, index) => {
        if (!(item instanceof Array)) {
            throw new Error('matrix is not a Matrix');
        }
        item.forEach((em, m) => {
            res[m] = res[m] || [];
            res[m].unshift(em);
        });
    });
    return res;
}

export default {
    colorBar,
    a2b,
    oneColorMap
};
