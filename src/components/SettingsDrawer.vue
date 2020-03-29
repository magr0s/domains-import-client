<script>
export default {
  name: 'SettingsDrawer',

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
        )
      ]
    )
  }
}
</script>
