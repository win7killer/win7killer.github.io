<script>
export default {
    props: {
        id: {
            type: String,
            default: ''
        }
    },
    render(createElement) {
        return createElement(
            this.id,
        )
    }
}
</script>
