<template>
<div class="vc-color-picker-wrapper clearfix layout">
    <div class="color-bar"
        @mousedown="msDown"
        @mousemove="msMove(getPosBar, $event)"
        @mouseup="msUp(getPosBar, $event)"
        @mouseout="msOut"
    >
        <span class="cur-bar" :style="{
            transform: barTransFormY
        }"></span>
    </div>
    <div class="color-canvas"
        @mousedown="msDown"
        @mousemove="msMove(getPosCanvas, $event)"
        @mouseup="msUp(getPosCanvas, $event)"
        @mouseout="msOut"
    :style="{ 'background': getBgColor }">
        <span :class="['cur-color', isDeep ? 'black' : '']" :style="{
                transform: canTransLate
            }"></span>
    </div>
</div>
</template>

<script>
import color from '@/utils/color';
export default {
    name: 'ColorPicker',
    data() {
        return {
            rgbArr: [255, 0, 0],
            bar: {
                posY: 0
            },
            colorCanPos: {
                x: 255,
                y: 0
            },
            colorBarArr: []
        };
    },
    props: {
        moveingPick: {
            type: Boolean,
            default: false,
        }
    },
    created() {
        this.colorBarArr = color.colorBar();
    },
    computed: {
        cBase() {
            return this.colorBarArr[this.bar.posY] || [255, 0, 0, 1];
        },
        barTransFormY() {
            return `translateY(${this.bar.posY}px)`;
        },
        canTransLate() {
            return `translate(${this.colorCanPos.x}px, ${this.colorCanPos.y}px)`;
        },
        colorCanArr() {
            // console.log('colorCanArr');
            return color.oneColorMap(this.cBase);
        },
        getBgColor() {
            let str = `rgba(${this.cBase.join()})`;
            let bg = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
                linear-gradient(to right, #fff, ${str})`;
            return bg;
        },
        pickedColorRgb() {
            return `rgb(${this.rgbArr.join()})`;
        },
        pickedColorHex() {
            return this.rgbToHex(this.pickedColorRgb);
        },
        isDeep() {
            let count = 0;
            this.rgbArr.forEach(item => {
                count += +item;
            });
            return count / this.rgbArr.length > 255 / 2;
        }
    },
    methods: {
        getPosBar(e) {
            this.bar.posY = e.offsetY || this.bar.posY;
            this.getPosCanvas();
        },
        getPosCanvas(e) {
            let x = this.colorCanPos.x = e ? e.offsetX - 1 : (this.colorCanPos.x || 255);
            let y = this.colorCanPos.y = e ? e.offsetY - 1 : (this.colorCanPos.y || 0);
            if (this.isDown && !e) {
                // cpu is too high
                if (this.moveingPick) {
                    this.rgbaArr = this.colorCanArr[y][x];
                    this.rgbArr = this.rgbaArr.slice(0, 3);
                    this.afterPicked();
                }
            } else {
                this.rgbaArr = this.colorCanArr[y][x];
                this.rgbArr = this.rgbaArr.slice(0, 3);
                this.afterPicked();
            }
        },
        rgbToHex(rgb = 'rgb(255, 0, 0)') {
            rgb = rgb.replace(/rgb\(/, '').replace(/\)/, '');
            let arr = rgb.split(/,\s?/) || [];
            let str = '';
            arr.forEach(item => {
                str += (+item).toString(16).padStart(2, '0');
            });
            str = str.toUpperCase();
            return str;
        },
        msDown(e) {
            this.isDown = true;
        },
        msMove(fn, e) {
            if (this.isDown) {
                fn.call(this, e);
            } else {
                return false;
            }
        },
        msUp(fn, e) {
            this.isDown = false;
            fn.call(this, e);
        },
        msOut(e) {
            this.isDown = false;
        },
        afterPicked() {
            this.$emit('afterPicked', {
                rgb: this.pickedColorRgb,
                hex: this.pickedColorHex,
                isDeep: this.isDeep
            });
        }
    }
};
</script>

<style lang="less">
.vc-color-picker-wrapper {
    margin-left: 100px;
    width: auto;
    position: relative;
    padding: 20px;
    .color-bar,
    .color-canvas {
        float: left;
        position: relative;
        // outline: 2px solid #999;
    }
    .color-bar {
        margin-right: 10px;
        width: 20px;
        height: 256px;
        background: linear-gradient(to bottom, #f00, #f0f, #00f, #0ff, #0f0, #ff0, #f00);
        .cur-bar {
            width: 100%;
            height: 1px;
            left: 0;
            pointer-events: none;
            display: inline-block;
            position: absolute;
            &::before,
            &::after {
                content: '';
                position: absolute;
                top: 50%;
                margin-top: -5px;
                border: 4px dashed rgba(0, 0, 0, 0);
            }
            &::before {
                left: 0;
                margin-left: -6px;
                border-left: 4px dashed #eee;
            }
            &::after {
                right: 0;
                margin-right: -6px;
                border-right: 4px dashed #eee;
            }
        }
    }
    .color-canvas {
        width: 256px;
        height: 256px;
        p {
            text-align: center;
        }
    }
    .cur-color {
        width: 11px;
        height: 11px;
        border-radius: 50%;
        border: 1px solid #fff;
        box-sizing: border-box;
        position: absolute;
        margin-top: -5px;
        margin-left: -5px;
        pointer-events: none;
        &.black {
            border-color: #000;
        }
    }
    .show-color {
        color: #fff;
    }
}
</style>
