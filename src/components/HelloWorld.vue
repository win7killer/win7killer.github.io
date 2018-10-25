<template>
    <div class="hello">
        {{msg}}
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            msg: '欢迎查看 Vue Demo，选择左侧你要查看的Demo'
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
    padding-top: 40px;
    font-size: 30px;
    line-height: 2;
}
</style>
