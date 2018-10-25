<template>
<div class="code-pic-wrap">
    <p>{{showText}}</p>
    <div class="can-box">
        <!-- <canvas
            id="can"
            v-show="false"
            ref="can"
            class="can"
        ></canvas> -->
        <!-- <video
            crossorigin
            v-show="false"
            width=100
            height="auto"
            autoplay
            ref="video"
        >
            <source :src="videoSrc" type="video/webm">
        </video> -->
    </div>
    <div
        class="char_box"
        :style="{
            'line-height': lineHeight
        }"
    >
        <tt v-html="showCode"></tt>
    </div>
</div>
</template>

<script>
import initAnimate from '@/utils/animation_frame_lock';
// import videoSrc from '@/img/mov.mp4';
import vData from './vv.json';
// let vData = {};
import { CHAR_CFG, CHAR_DEEP } from '../common/utils';
let charMap = CHAR_DEEP || {};
export default {
    data() {
        return {
            fpsLock: 25,
            debug: true,
            can: {},
            ctx: null,
            videoEle: {},
            htmlArr: [],
            textAreaArr: [],
            showArr: [],
            // videoSrc,
            vData: vData || {},
            charNode: '',
            lineHeight: 1,
            picIndex: 0,
            dir: -1,
            allData: false,
            showText: '',
            showCode: '',
            showType: ''
        };
    },
    mounted() {
        this.videoEle = this.$refs.video;
        if (vData.arr) {
            this.allData = true;
            this.showArr = vData.arr;
            initAnimate(this.loop, {
                fpsLock: this.fpsLock,
                debug: this.debug
            });
        } else {
            this.showArr = this.htmlArr;
            this.initCan();
            this.loadVideo();
        }
    },
    methods: {
        loop(opts) {
            if (this.vData.arr) {

            } else {
                if (!this.allData) {
                    this.drawCan();
                } else {

                }
            }
            let fpsText = this.debug ? `FPS: ${opts.fps} --- ` : '';
            this.showText = `${fpsText}`;
            this.render();
        },
        render() {
            let arr = this.showArr;
            this.showCode = arr[this.picIndex++];
            this.showChar = arr[this.picIndex++];

            // console.log(arr.length);
            if (this.picIndex >= arr.length - 1) {
                this.picIndex = 0;
            }
        },
        initCan() {
            this.can = this.$refs.can;
            this.ctx = this.can.getContext('2d');
        },
        loadVideo() {
            this.videoEle.addEventListener('play', (e) => {
                initAnimate(this.loop, {
                    fpsLock: this.fpsLock,
                    debug: this.debug
                });
                this.videoEle.width = this.videoEle.videoWidth;
                this.videoEle.height = this.videoEle.videoHeight;
            });
            this.videoEle.addEventListener('ended', (e) => {
                console.log('end');
                // console.log(this.htmlArr);
                this.allData = true;
                window.htmlArr = this.htmlArr;
            });
        },
        drawCan() {
            let {
                can,
                ctx,
                videoEle
            } = this;
            if (videoEle.width > videoEle.videoHeight) {
                can.width = videoEle.width > 150 ? 150 : videoEle.width;
            } else {
                can.width = videoEle.width > 50 ? 50 : videoEle.width;
            }
            // can.height = can.width * 0.63 / this.lineHeight;
            can.height = can.width  * 0.63  * videoEle.height / videoEle.width;
            window.videoEle = videoEle;
            ctx.drawImage(videoEle, 0, 0, videoEle.width, videoEle.height, 0, 0, can.width, can.height);
            let imgData = ctx.getImageData(0, 0, can.width, can.height);
            this.takehtmlArr(imgData);
        },
        takehtmlArr(imgData) {
            let pos = [];
            for (let i = 0, data = imgData.data, l = data.length; i < l; i += 4) {
                if (data[i + 3] !== 0) {
                    let tempText = this.getText((data[i] + data[i + 1] + data[i + 2]) / 3);
                    pos[i] = tempText;
                } else {
                    pos[i] = charMap[0];
                }
                if (Math.floor(i / 4) % imgData.width === imgData.width - 1) {
                    pos[i] = `${charMap[0]}\n`;
                }
            }
            this.charNode = pos.join('');
            this.textAreaArr.push(this.charNode);
            this.htmlArr.push(this.charNode.replace(/\n/g, '</br>'));
            window.htmlArr  = this.htmlArr;
            window.textAreaArr = this.textAreaArr;
        },
        getText(num) {
            num = 255 - num;
            let temp = '';
            for (let k in charMap) {
                if (k <= num) {
                    temp = charMap[k];
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
    position: relative;
    white-space: nowrap;
    transform: scale(.5);
    tt {
    color: #000;
    font-size: 14px;
    position: absolute;
    left: 0;
    top: 0;
}
}

.code-box {
    position: fixed;
    right: 10px;
    top: 20px;
    background: #f90;
    padding: 20px; // width: 400px;
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
