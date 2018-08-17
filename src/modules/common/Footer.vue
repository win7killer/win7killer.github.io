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
