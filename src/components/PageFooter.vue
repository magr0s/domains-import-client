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

  methods: {
    async signOut () {
      await this.$store.dispatch('auth/signOut')
        .then(() => (this.$router.push('/auth')))
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
            ),

            h(
              'QBtn',
              {
                props: {
                  icon: 'las la-power-off',
                  round: true,
                  flat: true,
                  disable: this.isImportProcess
                },

                on: {
                  click: this.signOut
                }
              },
              [
                h(
                  'QTooltip',
                  this.$t('tooltips.signOut')
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
