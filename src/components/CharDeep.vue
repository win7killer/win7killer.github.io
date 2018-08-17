<template>
<div>
    <canvas
        ref="can"
        width=w
        height=w
    ></canvas>
    <textarea name="" id="" cols="100" rows="10" :value="showCharColor"></textarea>
</div>
</template>

<script>
import Vue from 'vue';
export default {
    data() {
        return {
            w: 50,
            charColor: {},
            charColorArr: [],
            can: {},
            ctx: {},
            charStr: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~!@#$%^&*()_+-=|,.<>;:"\'/\\[]{}·',
        };

    },
    computed: {
        showCharColor() {
            return JSON.stringify(this.charColor, null, 4);
        }
    },
    mounted() {
        this.initCan();
        this.initChar();
        window.charColor = this.charColor;
    },
    methods: {
        initCan() {
            this.can = this.$refs.can;
            this.ctx = this.can.getContext('2d');
        },
        initChar() {
            let w = this.w;
            this.ctx.font = `${w}px monospace`;
            let arr = this.charStr.split('');
            arr.forEach(item => {
                this.ctx.textBaseline = 'middle';
                this.ctx.textAlign = 'center';
                this.ctx.clearRect(0, 0, w + 20, w + 20);
                this.ctx.fillText(item, w / 2, w / 2);
                let data = this.ctx.getImageData(0, 0, w, w);
                let res = this.handleCharColor(data.data);
                this.charColorArr.push({
                    char: item,
                    res: (res * 6.6).toFixed(0)
                });
            });
            this.charColorArr = this.charColorArr.sort((a, b) => {
                return a.res - b.res;
            });
            this.charColorArr.forEach(item => {
                Vue.set(this.charColor, item.res, item.char);
                // this.charColor[item.res] = item.char;
            });
        },
        handleCharColor(data) {
            // console.log(data.length);
            let num = 0;
            for (let i = 0, l = data.length; i < l; i += 4) {
                num += data[i + 3];
            }
            let res = num / (data.length / 4);
            // console.log(res);
            return res;
        }
    }
}
</script>
