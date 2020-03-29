<script>
export default {
  name: 'BaseLayout',

  props: {
    view: {
      type: String,
      default: () => ('hHh lpR lFf')
    }
  },

  render (h) {
    return h(
      'QLayout',
      {
        props: {
          view: this.view
        }
      },
      [
        this.$slots.header,

        this.$slots.default,

        h(
          'QPageContainer',
          [
            h('RouterView')
          ]
        ),

        this.$slots.footer
      ]
    )
  }
}
</script>
