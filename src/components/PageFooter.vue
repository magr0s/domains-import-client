<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageFooter',

  computed: {
    settingsDrawer: {
      get () {
        return this.$store.getters['app/getSettingsDrawer']
      },

      set (value) {
        this.$store.dispatch('app/setSettingsDrawer', value)
      }
    },

    ...mapGetters({
      isImportProcess: 'app/isImportProcess'
    })
  },

  render (h) {
    return h(
      'QFooter',
      {
        class: 'bg-transparent'
      },
      [
        h(
          'QBar',
          {
            class: 'bg-transparent text-dark',

            props: {
              dense: true
            }
          },
          [
            h('QSpace'),

            h(
              'QBtn',
              {
                props: {
                  icon: 'las la-cog',
                  round: true,
                  flat: true,
                  disable: this.isImportProcess
                },

                on: {
                  click: () => (this.settingsDrawer = !this.settingsDrawer)
                }
              },
              [
                h(
                  'QTooltip',
                  this.$t('tooltips.settings')
                )
              ]
            )
          ]
        )
      ]
    )
  }
}
</script>
