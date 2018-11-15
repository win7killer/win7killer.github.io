<template>
<div class="tab-box clearfix">
    <a href="javascript:;" class="prev" @click="goPrev">prev</a>
    <a href="javascript:;" class="next" @click="goNext">next</a>
    <div class="overhide">
        <ul class="list clearfix" ref="list" :style="{
            transform: `translateX(-${getTranslateX}px)`
        }">
            <li :class="{
                item: true,
                cur: index === curIndex
            }" v-for="(item, index) of list" :key="index + item">{{item}}</li>
        </ul>
    </div>


</div>
</template>

<script>
export default {
    data() {
        return {
            curIndex: 0,
            curItem: undefined,
            posArr: [],
            transList: [],
            list: '哈哈 是多少 撒大声地 搜索 是 的速度速度速度 s ds sad 是多少 sd 是的 撒大声地'.split(' ')
        };
    },
    created() {},
    mounted() {
        let refDom = this.$refs.list;
        console.log(refDom.children);
        let posArr = [];
        // refDom.children
        [...refDom.children].forEach(item => {
            console.log(item.offsetLeft)
            posArr.push(item.offsetLeft);

        });
        posArr.forEach((item, index) => {
            if (posArr[index + 1] > 6 * window.remSize) {
                this.transList.push(item);
            } else {
                this.transList.push(0);
            }
        })
    },
    components: {},
    computed: {
        getTranslateX() {
            console.log(this.curIndex);
            if (this.transList[this.curIndex + 1] < 6 * window.remSize) {
                return 0;
            } else {
                return this.transList[this.curIndex]
            }
            return this.transList[this.curIndex];
            // 不相等
        },
    },
    methods: {
        goTabByIndex(index = 0) {
            this.curIndex = index;
        },
        goPrev() {
            this.curIndex > 0 && this.curIndex--;
        },
        goNext() {
            this.curIndex < this.list.length - 1 && this.curIndex++;
        }
    },
}
</script>

<style lang="less" scpoed>
ul {
    margin: 0;
    padding: 0;
    li {
        list-style: none;
    }
}
.tab-box {
    .overhide {
        width: 6rem;
        height: 1rem;
        overflow: hidden;
        margin: 0 auto;
    }
    .prev {
        float: left;
        width: .5rem;
        height: 100%;
        background: #0f9;
    }
    .next {
        float: right;
        width: .5rem;
        height: 100%;
        background: #0f9;
    }
    .list {
        position: relative;
        transform: translateX(0);
        display: flex;

        background: #f90;
        .item {
            // flex: 1;
            background: #09f;
            float: left;
            padding: .2rem;
            box-sizing: border-box;
            border-right: 1px solid #333;
            white-space: nowrap;
        }

        .cur {
            background: #f09;
        }
    }
}
</style>
