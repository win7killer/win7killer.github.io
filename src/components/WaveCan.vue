<template>
<div class="wave-box">
    <div class="outer-circle">
        <canvas
            id="wave_can"
            width=200
            height=200
        ></canvas>
        <div class="bg-wave"></div>
        <div class="inner-circle"></div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            can: null,
            ctx: null,
        };
    },
    mounted() {
        this.can = document.getElementById('wave_can');
        this.ctx = this.can.getContext('2d');
        this.initCan();
    },
    computed: {},
    components: {},
    methods: {
        initCan() {
            let ctx = this.ctx;
            this.makePath();
        },
        makePath() {
            let ctx = this.ctx;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, 100);
            ctx.lineTo(100, 100);
            ctx.lineTo(100, 0);
            ctx.closePath();
            ctx.stroke();

        }
    }
}
</script>

<style lang="less" scoped>
.outer-circle {
    border: 5px solid #333;
    width: 200px;
    height: 200px;
    background: #ffa;
    border-radius: 50%;
    position: relative;
    overflow: hidden;

    .inner-circle {
        border: 5px solid #333;
        box-shadow: 0 5px 10px #333;
        width: 100px;
        height: 100px;
        background: #faf;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .bg-wave {
        width: 200%;
        height: 100px;
        background: #f6e0b1;
        position: absolute;
        bottom: 0;
        left: 0;
        &::after {
            content: ' ';
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 12px;
            background: url('~@/img/wave.png') repeat-x;
        }
    }
}
</style>
