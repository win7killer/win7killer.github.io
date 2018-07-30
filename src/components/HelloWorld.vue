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
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
