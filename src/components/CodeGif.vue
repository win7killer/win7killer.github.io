<template>
<div class="code-pic-wrap">
    <p>{{showText}}</p>
    <div v-show="false" class="J_img_box" ref="J_img_box"></div>
    <div class="can-box" v-show="false">
        <canvas id="can" ref="can" class="can" width=200 height=200></canvas>
    </div>
    <div v-if="true" class="char_box" :style="{
            'line-height': lineHeight
        }">
        <tt v-for="(item, index) in charPic" :key="index" v-html="item"></tt>
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
import img1 from '@/img/1.png';
import img2 from '@/img/2.png';
import img3 from '@/img/3.png';
import img4 from '@/img/4.png';
import img5 from '@/img/5.png';
import img6 from '@/img/6.png';
import img7 from '@/img/7.png';
import img8 from '@/img/8.png';
import img9 from '@/img/9.png';
import img10 from '@/img/10.png';
import img11 from '@/img/11.png';
import img12 from '@/img/12.png';
import img13 from '@/img/13.png';
import img14 from '@/img/14.png';

let stream = '1';
const picNum = 14;
const space_node = '·';
CHAR_CFG['0'] = space_node;

export default {
    data () {
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
            imgList: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14,]
        };
    },
    mounted () {
        this.initCan();
        this.loadImg();
    },
    methods: {
        loop (opts) {
            let fpsText = this.debug ? `FPS: ${opts.fps}` : '';
            this.showText = `${fpsText}`;
            this.render(opts.timeCounter / 1000);
        },
        render () {
            this.showCode = this.charPic[this.picIndex];
            if (this.backLoop) {
                if (this.picIndex == this.picNum - 1 || this.picIndex == 0) {
                    this.dir = 0 - this.dir;
                }
                this.picIndex += this.dir;
            } else {
                this.dir = 1;
                if (this.picIndex >= this.picNum - 1) {
                    this.picIndex = 0;
                }
                this.picIndex += this.dir;
            }
        },
        initCan () {
            this.can = this.$refs.can;
            this.ctx = this.can.getContext('2d');
        },
        loadImg () {
            Promise.all(this.imgList)
                .then(res => {
                    res.forEach(item => {
                        let img = new Image();
                        img.src = item;
                        img.onload = res => {
                            this.drawCan(img);
                        };
                    });
                    initAnimate(this.loop, {
                        fpsLock: this.fpsLock,
                        debug: this.debug
                    });
                });
        },
        drawCan (oImg) {
            let {
                can,
                ctx,
            } = this;
            can.width = oImg.width > 100 ? 100 : oImg.width;
            can.height = can.width * 0.63 / this.lineHeight;
            ctx.drawImage(oImg, 0, 0, oImg.width, oImg.height, 0, 0, can.width, can.height);
            let imgData = ctx.getImageData(0, 0, can.width, can.height);
            this.takeCharPic(imgData);
        },
        takeCharPic (imgData) {
            let pos = [];
            for (let i = 0, data = imgData.data, l = data.length; i < l; i += 4) {
                if (data[i + 3] !== 0) {
                    let tempText = this.getText((data[i] + data[i + 1] + data[i + 2]) / 3);
                    pos[i] = tempText;
                } else {
                    pos[i] = space_node;
                }
                if (Math.floor(i / 4) % imgData.width === imgData.width - 1) {
                    pos[i] = `${space_node}\n`;
                }
            }
            this.charNode = pos.join('');
            this.charPic.push(this.charNode.replace(/\n/g, '</br>'));
        },
        getText (num) {
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
    width: 250%;
    transform-origin: 0 0;
    transform: scale(0.5);

    tt {
        color: #000;
        font-size: 12px;
        float: left;
    }
}

.code-box {
    position: fixed;
    right: 10px;
    top: 20px;
    background: #f90;
    padding: 20px;

    textarea {
        top: 0;
        left: 0;
        transform-origin: 0 0;
    }
}

.font-radio {
    display: inline-block;
}
</style>
