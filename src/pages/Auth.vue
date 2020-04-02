<script>
import SignInForm from 'components/SignInForm'

export default {
  name: 'PageAuth',

  components: {
    SignInForm
  },

  methods: {
    pageTweak (offset, height) {
      return { height: `${height - offset}px` }
    }
  },

  render (h) {
    return h(
      'QPage',
      {
        class: 'flex flex-center',

        props: {
          padding: true,
          styleFn: this.pageTweak
        }
      },
      [
        h(
          'QCard',
          {
            class: 'shadow-15 q-pa-md',

            style: {
              width: '480px'
            }
          },
          [
            h(
              'QCardSection',
              [
                h('SignInForm')
              ]
            )
          ]
        )
      ]
    )
  }
}
</script>
