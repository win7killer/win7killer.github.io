/**
 * @file 获取处理文章信息
 * @author fe_bean
 */


const fs = require('fs');
const path = require('path');
const SRC = path.resolve(__dirname, '../src');
const mapPath = path.resolve(SRC, 'docMap.json');
let files = {};

let getAllFiles = function (src, rule) {
    let matches = [];
    let dirs = fs.readdirSync(src);
    dirs.forEach(function (file) {
        let dir = path.resolve(src, file);
        let stat = fs.lstatSync(dir);
        if (stat.isDirectory()) {
            getAllFiles(dir, rule);
        } else {
            if (!/readme\.md$/i.test(dir)) {
                matches = dir.match(rule);
                if (matches) {
                    files[matches[1]] = dir;
                }
            }

        }
    });
    console.log(11111111);
};

function getMdEntry() {
    let paths = [{
        path: path.resolve(SRC, 'docs'),
        rule: /\/src\/(docs\/.*)\.md$/
    }];
    files = {};
    paths.forEach(function (obj) {
        getAllFiles(obj.path, obj.rule);
    });
    console.log(`----------------> md count:`, files);
    methods.handleFile(files).then(() => {
        methods.makeJson(fileData);
    });
    return files;
}

let fileData = {
    list: []
};
let methods = {
    init() {},
    getFiles() {

    },
    handleFile(map) {
        let arr = Object.entries(map);
        fileData.count = arr.length;
        return new Promise((resolve, reject) => {
            let count = 0;
            arr.forEach(item => {
                let stat = fs.lstatSync(item[1]);
                // console.log(stat.atime, '\n\n');
                fs.readFile(item[1], 'utf-8', (err, content) => {
                    if (err) {
                        reject(err);
                    }
                    let conStat = getSomeContentFromContent(content);
                    // console.log(content, '\n\n')
                    fileData.list.push({
                        name: item[0],
                        title: conStat.title,
                        author: conStat.author,
                        create_time: stat.birthtimeMs,
                        update_time: stat.mtimeMs,
                        size: stat.size,
                        stat,
                        summary: conStat.summary,
                        content: conStat.content,
                        source: content,
                        tag: '',
                        type: ''
                    });
                    count++;
                    if (count >= arr.length) {
                        resolve();
                    }
                })
            });
        });

    },
    makeJson(map = {}) {
        let confStr = JSON.stringify(map, null, 2);
        // console.log(confStr);
        fs.writeFileSync(mapPath, confStr);
    },
};
function getSomeContentFromContent(content = '') {
    let titleRole = /\#([^\t\r\n]+)\n?/;
    let authorRole = /\n?\-\s?author\:\s*([\w\d\_\-]+)\n?/;

    let conStat = {};
    let conStr = '';

    let titleMatch = content.match(titleRole);
    conStat.title = titleMatch ? titleMatch[1].trim() : 'unknown';

    let authorMatch = content.match(authorRole);
    conStat.author = authorMatch ? authorMatch[1].trim() : 'unknown';

    conStr = content.replace(titleRole, '');
    conStr = conStr.replace(authorRole, '');
    conStat.summary = conStr.replace(/[#\n\t\r\-\`\[\]\(\)]/g, ' ').slice(0, 200) + '...';
    conStat.content = conStr;
    return conStat;

}
getMdEntry();
module.exports = methods;
