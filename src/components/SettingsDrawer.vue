<script>
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
    }
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
          {
            class: 'bg-teal-4 text-white'
          },
          [
            h(
              'QIcon',
              {
                props: {
                  name: 'las la-cog',
                  size: 'sm'
                }
              }
            ),

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
                },

                on: {
                  click: () => (this.drawer = false)
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
