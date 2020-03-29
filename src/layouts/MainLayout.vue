<script>
import BaseLayout from './BaseLayout'
import PageFooter from 'components/PageFooter'
import SettingsDrawer from 'components/SettingsDrawer'

export default {
  name: 'MainLayout',

  components: {
    BaseLayout,
    PageFooter,
    SettingsDrawer
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
        ),

        h(
          'SettingsDrawer'
        )
      ]
    )
  }
}
</script>
