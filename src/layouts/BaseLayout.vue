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
        class: 'bg-blue-grey-1',

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
