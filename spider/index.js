/**
 * @file 百度贴吧《三体第二舰队覆灭记》爬虫
 * @author win7killer
 */

const https = require('https');
const fs = require('fs');
const $ = require('cheerio');

let url = 'https://tieba.baidu.com/p/1061691931?see_lz=1';

let pgNum = 1;
let maxNum = 5;

let totalNum = 1;
let totalStr = '';
let fileNum = 1;

function loopReq(pn = 1) {
    if (pn > maxNum) {
        console.log(`\n\n--------- done ---------\n\n`);
        return;
    }
    let req = https.get(`${url}&pn=${pn}`, (res) => {
        console.log(`pn: ${pn}`, '状态码：', res.statusCode);
        let content = '';
        res.setEncoding('utf8');
        res.on('data', (d) => {
            content += d;
        });
        res.on('end', () => {
            console.log(`pn${pn}, end`)
            reqEndFn(content);
        });
    }).on('error', (e) => {
        console.error(e, '------');
    });
    req.end();
}

function getTotalPn($dom) {
    totalNum = $dom.find('#thread_theme_7 .l_reply_num .red').eq(1).text();
    console.log(`总页数${totalNum}`);
}

function reqEndFn(content) {
    let $dom = $(content);
    let cStr = '';
    if (pgNum == 1) {
        totalNum = getTotalPn($dom);
    }
    $dom.find('.j_d_post_content').each((index, text) => {
        cStr += $.load(text, {
                normalizeWhitespace: true,
                decodeEntities: false,
                xmlMode: true
            })
            .html()
            // .text()
            .replace(/<br\/?>/gi, '\n')
            .replace(/<(a|div|span)[^\<\>]*>/gi, '')
            .replace(/<\/(a|div|span)>/gi, '')
            .replace(/\”\“/gi, '”\n    “')
            .replace(/\s{5,12}/g, '\n    ')
            .replace(/\n([^\s])/g, '\n    $1');
        cStr += '\n';
    });
    totalStr += cStr;

    if (pgNum == maxNum) {
        writeFile(totalStr, () => {
            totalStr = '';
            loopReq(++pgNum);
        });
    } else {
        loopReq(++pgNum);
    }
}

function writeFile(con, fbn = function() {}) {
    let num = Math.floor(pgNum / 5);
    // let num = 7;
    fs.open(`./note_${num}.txt`, 'a+', (err, fd) => {
        if (err) {
            throw new Error('open file error, ${err}');
        } else {
            fs.write(fd, con, 'utf-8', (err, written, string) => {
                if (err) {
                    throw new Error('open file error, ${err}');
                }
                fs.close(fd);
                fbn();
            });
        }
    })
}

function init() {
    loopReq(pgNum);
}

init();
