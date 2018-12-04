<template>
<div class="chicken-box">
    <div class="box">
        {{text}}
    </div>

    <div :class="{
        'chiken': true,
        'close-eye': closeEye
    }" @click="clickFn">
        <div class="body">

        </div>
        <div class="hair">
            <div class="hair_1"></div>
            <div class="hair_2"></div>
            <div class="hair_3"></div>
        </div>
        <div class="face">
            <div class="month"></div>
            <div class="eye eye_1" ref="eye1"></div>
            <div class="eye eye_2"></div>
        </div>
        <div class="hands">
            <div class="hand left"></div>
            <div class="hand right"></div>
        </div>
        <div class="foots">
            <div class="foot left"></div>
            <div class="foot right"></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            closeEye: false,
            text: '我是小笼包鸡'
        };
    },
    mounted() {
        this.$refs.eye1.addEventListener('animationend', () => {
            this.closeEye = false;
        });
    },
    methods: {
        clickFn() {
            clearTimeout(this.timmer);
            this.closeEye = true;
            this.text = '干嘛点我';
            this.timmer = setTimeout(() => {
                this.text = '我是小笼包鸡';
            }, 2000)
        }
    }
}
</script>


<style lang="less" scoped>
.box {
    width: 100px;
    height: 50px;
    border-radius: 20px;
    position: relative;
    background: #09f;
    text-align: center;
    color: #fff;
    line-height: 50px;
    top: -30px;
    left: 30px;
    z-index: 2;
    filter: drop-shadow(1px 2px 3px #999);
    /* margin-bottom: 100px; */
}

.box::after {
    content: ' ';
    position: absolute;
    left: 25px;
    bottom: -12px;
    width: 0;
    height: 0;
    border: 0 solid rgba(0, 0, 0, 0);
    border-top: 20px solid #09f;
    border-left: 20px solid rgba(0, 0, 0, 0);
    border-right: 0px solid rgba(0, 0, 0, 0);
    transform: rotateZ(-15deg);
}

.chiken {
    width: 200px;
    height: 140px;
    background: #fff;
    position: relative;
    border-radius: 46.5%;
    animation: gosome 3s ease-in-out infinite;
    z-index: 0;
    .hair {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
    }

    .hair_1,
    .hair_2,
    .hair_3 {
        width: 35px;
        height: 35px;
        background: #fff;
        border-radius: 50%;
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        top: 5px;
    }

    .hair .hair_1 {
        margin-left: -30px;
    }

    .hair .hair_3 {
        margin-left: 30px;
    }

    .face {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
        height: 60px;
    }

    .face .eye {
        width: 10px;
        height: 10px;
        background: #000;
        border-radius: 50%;
        position: absolute;
        top: 0;
    }

    .face .eye_1 {
        left: 0;
    }

    .face .eye_2 {
        right: 0;
    }

    .face .month {
        width: 30px;
        height: 60px;
        background: #f90;
        position: absolute;
        bottom: 5px;
        left: 50%;
        border-radius: 50% 20% 50% 20%;
        transform: translateX(-50%) rotateZ(35deg) rotateX(60deg) rotateY(20deg);
    }

    .hand {
        position: absolute;
        bottom: 20px;
        width: 50px;
        height: 45px;
        background: #eee;
        box-shadow: 0 -2px 2px #efefef inset;
        border-radius: 50%;
    }

    .hands .left {
        left: 20px;
        transform: rotateY(-10deg) rotateX(-40deg) rotateZ(10deg);
    }

    .hands .right {
        right: 20px;
        transform: rotateY(-10deg) rotateX(40deg) rotateZ(-10deg);
    }

    .foot {
        width: 28px;
        height: 30px;
        background: #222;
        position: absolute;
        bottom: -25px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 10% 10% 25% 25%;
        z-index: -1;
    }

    .foots .left {
        margin-left: -25px;
        animation: stepFoot 1s ease-in-out infinite;
    }

    .foots .right {
        margin-left: 25px;
        animation: stepFoot 1s ease-in-out infinite .5s;
    }
}

.close-eye {
    .eye_1 {
        animation: closeEye .8s ease-in;
    }
}

@keyframes closeEye {
    0%, 50%, 100% {
        transform: scaleY(1);
    }
    25%, 75% {
        transform: scaleY(.1);
    }
}

@keyframes gosome {
    0%, 100% {
        filter: drop-shadow(0px 0px 50px rgba(100, 216, 255, .8));
    }
    50% {
        filter: drop-shadow(0px 0px 0px rgba(100, 216, 255, .1));
    }
}

@keyframes stepFoot {
    0%, 100% {
        transform: translateX(-50%) translateY(0);

    }
    50% {
        transform: translateX(-50%) translateY(-8px);

    }
}
</style>
