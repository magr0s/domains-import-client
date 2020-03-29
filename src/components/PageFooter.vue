<script>
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
    }
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
                  flat: true
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
