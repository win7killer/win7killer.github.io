<template>
<div class="code-pic-wrap">
    <p>{{showText}}</p>
    <div
        v-show="false"
        class="J_img_box"
        ref="J_img_box"
    ></div>
    <div
        class="can-box"
        v-show="false"
    >
        <canvas
            id="can"
            ref="can"
            class="can"
            width=200
            height=200
        ></canvas>
    </div>
    <!-- <hr> -->
    <!-- <div
     class="font-radio"
     id="x"
 >X</div> -->
    <div
        v-if="true"
        class="char_box"
        :style="{
            transform: can.width > 10 ? 'scale(0.3)' : '',
            'line-height': lineHeight
        }"
    >
        <!-- <tt
     v-for="(item, index) in charPic"
     :key="index"
     v-html="item"
 ></tt> -->
        <tt v-html="showCode"></tt>
    </div>
    <!-- <pre class="code-box">
        <textarea :style="{
            zoom: '.5',
            'line-height': lineHeight
        }" name="" id="" cols="120" rows="50" :value="charNode"></textarea>
    </pre> -->
</div>
</template>

<script>
import initAnimate from '@/utils/animation_frame_lock';
import {
    Stream,
    parseGIF
} from '@/utils/Stream';
import {
    CHAR_CFG,
    CHAR_DEEP
} from '../common/utils';

let stream = '1';
const picNum = 14;

export default {
    data() {
        return {
            fpsLock: 10,
            picNum,
            debug: true,
            can: {},
            ctx: null,
            oImg: null,
            charPic: [],
            charNode: '',
            lineHeight: 1.4,
            picIndex: 0,
            dir: -1,
            showText: '',
            showCode: '',
            backLoop: true,
            imgList: (() => {
                let arr = [
                    // import (`@/img/0.gif`)
                    // import (`@/img/77.jpg`)

                ];
                console.log(picNum)
                for (let i = 0; i < picNum; i++) {
                    arr.push(import(`@/img/${i + 1}.png`));
                }
                console.log(arr);
                return arr;
            })()
        };
    },
    mounted() {
        this.initCan();
        this.loadImg();
        // this.getGifSteam();
    },
    methods: {
        loop(opts) {
            let fpsText = this.debug ? `FPS: ${opts.fps} --- ` : '';
            this.showText = `${fpsText}KeepTime: ${Math.floor(opts.timeCounter / 1000)} s`;
            this.render(opts.timeCounter / 1000);
        },
        render() {
            this.showCode = this.charPic[this.picIndex];
            // console.log(this.picIndex)
            if (this.backLoop) {
                if (this.picIndex == this.picNum - 1 || this.picIndex == 0) {
                    this.dir = 0 - this.dir;
                }
                this.picIndex += this.dir;
            } else {
                this.dir = 1;
                if (this.picIndex >= this.picNum - 1 ) {
                    this.picIndex = 0;

                }
                this.picIndex += this.dir;
            }

        },
        initCan() {
            this.can = this.$refs.can;
            this.ctx = this.can.getContext('2d');
        },
        // doParse() {
        //     console.log(222)
        //     var handler = {
        //         hdr(dd) {console.log(dd)},
        //         // gce(dd) {console.log(dd)},
        //         com(dd) {console.log(dd)},
        //         // app: {
        //         //     // TODO: Is there much point in actually supporting iterations?
        //         //     NETSCAPE: withProgress(doNothing)
        //         // },
        //         img(dd) {console.log(dd)},
        //         eof: function (block) {
        //             //toolbar.style.display = '';
        //             // pushFrame();
        //             // doDecodeProgress(false);
        //             // doText('Playing...');
        //             // doPlay();
        //             console.log(block);
        //         }
        //     };
        //     parseGIF(stream, handler);
        //     window.gifData = handler;
        //     console.log(handler);
        //     // console.log(stream);
        // },
        // getGifSteam() {
        //     var h = new XMLHttpRequest();
        //     h.overrideMimeType('text/plain; charset=x-user-defined');
        //     h.onload = e => {
        //         //doLoadProgress(e);
        //         console.log(e);
        //         // TODO: In IE, might be able to use h.responseBody instead of overrideMimeType.
        //         stream = new Stream(h.responseText);
        //         setTimeout(this.doParse, 0);
        //         console.log(h.responseText.substring(0, 100))
        //     };
        //     // h.onprogress = doLoadProgress;
        //     h.onerror = function () {
        //         console.log(111)
        //     };
        //     this.imgList[0].then((res) => {
        //         h.open('GET', res, true);
        //         h.send();
        //     })

        // },
        loadImg() {
            let img = new Image();
            let index = 0;
            img.onload = (res) => {
                // console.log(res);
                this.oImg = img;
                // console.log(this.oImg)
                setTimeout(() => {
                    this.drawCan();
                    if (this.imgList[index]) {
                        load.call(this);
                    } else {
                        if (this.charPic.length > 1) {
                            initAnimate(this.loop, {
                                fpsLock: this.fpsLock,
                                debug: this.debug
                            });
                        } else {
                            this.showCode = this.charPic[0];
                        }
                    }
                }, 50);

            };
            load.call(this);

            function load() {
                this.imgList[index++].then((res) => {
                    // console.log(res);
                    img.src = res;
                });
            }
        },
        drawCan() {
            let {
                can,
                ctx,
                oImg,
            } = this;
            // let oImg = this.$refs.J_img_box.getElementsByTagName('img')[0];
            can.width = oImg.width > 100 ? 100 : oImg.width;
            can.height = can.width * 0.63 / this.lineHeight;
            ctx.drawImage(oImg, 0, 0, oImg.width, oImg.height, 0, 0, can.width, can.height);
            let imgData = ctx.getImageData(0, 0, can.width, can.height);
            this.takeCharPic(imgData);
        },
        takeCharPic(imgData) {
            let pos = [];
            for (let i = 0, data = imgData.data, l = data.length; i < l; i += 4) {
                if (data[i + 3] !== 0) {
                    let tempText = this.getText((data[i] + data[i + 1] + data[i + 2]) / 3);
                    pos[i] = tempText;
                } else {
                    pos[i] = '·';
                }
                if (Math.floor(i / 4) % imgData.width === imgData.width - 1) {
                    pos[i] = '·\n';
                }
            }
            this.charNode = pos.join('');
            this.charPic.push(this.charNode.replace(/\n/g, '</br>'));
        },
        getText(num) {
            num = 255 - num;
            let temp = '';
            for (let k in CHAR_CFG) {
                if (k <= num) {
                    temp = CHAR_CFG[k];
                } else {
                    return temp;
                }
            }
            return temp;
        }
    }
};
</script>

<style lang="less" scoped>
.can {
    box-shadow: 2px 2px 5px #333;
}

.char_box {
    transform-origin: 0 0;
    transform: scale(.5);
    tt {
        color: #000;
        font-size: 14px;

    }
}

.code-box {
    position: fixed;
    right: 10px;
    top: 20px;
    background: #f90;
    padding: 20px;

    // width: 400px;
    // height: 400px;
    textarea {
        // position: absolute;
        top: 0;
        left: 0;
        transform-origin: 0 0;
    }
}

.font-radio {
    display: inline-block;
}
</style>
