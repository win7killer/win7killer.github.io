<template>
<div class="code-pic-wrap">
    <p>{{showText}}</p>
    <div
        v-show="false"
        class="J_img_box"
        ref="J_img_box"
    ></div>
    <div class="can-box" v-show="false">
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
        class="char_box"
        :style="{
            transform: can.width > 10 ? 'scale(.5)' : '',
            'line-height': lineHeight
        }"
    >
        <!-- <tt
     v-for="(item, index) in htmlArr"
     :key="index"
     v-html="item"
 ></tt> -->
        <tt v-html="showHtml"></tt>
    </div>
    <!-- <pre class="code-box">
        <textarea :style="{
            zoom: '.5',
            'line-height': lineHeight
        }" name="" id="" cols="120" rows="50" :value="showChar"></textarea>
    </pre> -->
</div>
</template>

<script>
import initAnimate from '@/utils/animation_frame_lock';
import {
    Stream,
    parseGIF
} from '@/utils/Stream';
import { CHAR_CFG, CHAR_DEEP } from '../common/utils';
let charMap = CHAR_DEEP || {};
/**
 *
··················································
··················································
·······················/o-$:····*taz··············
·······················&··cx···/l··%··············
·······················7l·_2---m:·_x··············
·····················_l3*··~:~~:··3l_-············
···················q=················_zx··········
················-3r·····················q3-·······
···············,m-·······················,g~······
···············m/·//x/x//qqx···q88888qq/}·:&······
···············%···························}/·····
···············o/··························$······
················}t-······················-3,······
·················-o3~··················~z=-·······
··················/m:}mm}/········:/}%}···········
·················~a-8,······,,,,:m·/}·············
················,m·#!···········3;·m~·············
················$!lz············&·_q··············
············vvv3}:8-···········vv·m:··············
···········_&3337&_············%·/c/8:············
················at············vm}}l};·············
__________________________________________________
__________________________________________________
_______________________\J`X^____=}ut______________
_______________________B__]j___!(__M______________
_______________________i(_"u_`_P^_"j______________
_____________________~)&=__,.,,.__4)~`____________
___________________6*________________"tj__________
_________________0*_____________________60________
_______________'P________________________'q-______
_______________S\_\\j\j\\66j___6NNNNN6F!v_·Q______
_______________M___________________________v!_____
_______________J!__________________________X______
________________v}________________________V'______
__________________JV,__________________,t*________
__________________!P^vPPv!________^!vMv___________
_________________-u_#'______''''^P_!v_____________
________________'P_A:___________V-_P,_____________
________________X:)t____________Q_~$______________
____________111Vv^R____________11_P^______________
___________~BVVViB~____________M_\]\R.____________
________________u}____________1Pvv)v-_____________
 */

export default {
    data() {
        return {
            fpsLock: 10,
            debug: true,
            can: {},
            ctx: null,
            oImg: null,
            htmlArr: [],
            textAreaArr: [],
            charNode: '',
            lineHeight: 1.5,
            picIndex: 0,
            dir: -1,
            showText: '',
            showHtml: '',
            showChar: '',
            imgList: (() => {
                let arr = [
                    import (`@/img/heben.png`),
                ];
                // for (let i = 0; i < 14; i++) {
                //     arr.push(import(`@/img/${i + 1}.png`));
                // }
                return arr;
            })()
        };
    },
    mounted() {
        this.initCan();
        this.loadImg();
        window.textAreaArr = this.textAreaArr;
    },
    methods: {
        loop(opts) {
            let fpsText = this.debug ? `FPS: ${opts.fps} --- ` : '';
            this.showText = `${fpsText}KeepTime: ${Math.floor(opts.timeCounter / 1000)} s`;
            this.render(opts.timeCounter / 1000);
        },
        render() {
            this.showHtml = this.htmlArr[this.picIndex];
            this.showChar = this.textAreaArr[this.picIndex];
            // console.log(this.picIndex)
            if (this.picIndex == 13 || this.picIndex == 0) {
                this.dir = 0 - this.dir;
            }
            this.picIndex += this.dir;
        },
        initCan() {
            this.can = this.$refs.can;
            this.ctx = this.can.getContext('2d');
        },
        loadImg() {
            let img = new Image();
            let index = 0;
            img.onload = (res) => {
                this.oImg = img;
                setTimeout(() => {
                    this.drawCan();
                    if (this.imgList[index]) {
                        load.call(this);
                    } else {
                        if (this.htmlArr.length > 1) {
                            // console.log('go', this.htmlArr)
                            initAnimate(this.loop, {
                                fpsLock: this.fpsLock,
                                debug: this.debug
                            });
                        } else {
                            console.log(1111)
                            this.showHtml = this.htmlArr[0];
                        }
                    }
                }, 0);

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

.char_box tt {
    color: #000;
    font-size: 14px;
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
