<script>
import BaseLayout from './BaseLayout'
import PageFooter from 'components/PageFooter'

export default {
  name: 'MainLayout',

  components: {
    BaseLayout,
    PageFooter
  },

  render (h) {
    return h(
      'BaseLayout',
      [
        h(
          'PageFooter',
          {
            slot: 'footer'
          }
        )
      ]
    )
  }
}
</script>
