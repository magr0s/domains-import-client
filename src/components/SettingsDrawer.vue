<script>
import { mapGetters } from 'vuex'
import SettingsForm from './SettingsForm'

export default {
  name: 'SettingsDrawer',

  components: {
    SettingsForm
  },

  computed: {
    drawer: {
      get () {
        return this.$store.getters['app/getSettingsDrawer']
      },

      set (value) {
        return this.$store.dispatch('app/setSettingsDrawer', value)
      }
    },

    ...mapGetters({
      settings: 'settings/getSettings'
    })
  },

  created () {
    this.$store.dispatch('settings/bind')
  },

  render (h) {
    return h(
      'QDrawer',
      {
        props: {
          value: this.drawer,
          side: 'right',
          behavior: 'mobile',
          elevated: true
        },

        on: {
          input: val => (this.drawer = val)
        }
      },
      [
        h(
          'QToolbar',
          [
            h(
              'QToolbarTitle',
              {
                style: 'min-width: 200px'
              },
              this.$t('labels.settings')
            ),

            h('QSpace'),

            h(
              'QBtn',
              {
                props: {
                  icon: 'las la-times',
                  round: true,
                  flat: true,
                  dense: true
                }
              },
              [
                h(
                  'QTooltip',
                  this.$t('tooltips.close')
                )
              ]
            )
          ]
        ),

        h('SettingsForm')
      ]
    )
  }
}
</script>
