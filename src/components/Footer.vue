<template>
<footer id="footer" class="footer">
    <div class="layout">
        <slot></slot>
        <div>Copyright ©{{timeLimit}} fe_bean</div>
    </div>
</footer>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            startYear: 2018,
            year: new Date().getFullYear()
        };
    },
    computed: {
        timeLimit() {
            if (this.year === this.startYear) {
                return this.year;
            } else {
                return `${this.startYear} - ${this.year}`;
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import "~@/css/theme.less";

.footer {
    color: @theme-text-color;
    background: @theme-bg-color;
    text-align: center;
    border-top: solid 1px #e6e6e6;
    padding: 20px 0;
    font-size: 14px;
    box-sizing: border-box;
    .layout {
        box-sizing: border-box;
    }
}
</style>
