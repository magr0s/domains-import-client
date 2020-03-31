<script>
import ImportPanel from './ImportPanel'
import ResultPanel from './ResultPanel'

export default {
  name: 'DomainsImport',

  components: {
    ImportPanel,
    ResultPanel
  },

  data () {
    return {
      panel: 'import'
    }
  },

  computed: {
    domainsList: {
      async set (value = []) {
        await this.$store.dispatch('domains/setList', value)
      },

      get () {
        return this.$store.getters['domains/getList']
      }
    }
  },

  methods: {
    async import (list) {
      this.panel = 'result'
      this.domainsList = list

      await this.$store.dispatch('app/setProcess', 'importing')

      this.$q.notify({
        type: 'info',
        position: 'top',
        message: this.$t('messages.importStarted')
      })

      await this.domainsList.reduce(async (promise, domain) => {
        await promise

        const { name } = domain

        return this.$store.dispatch('domains/importDomain', { name })
          .then(() => (this.$store.dispatch('domains/updateDomain', { ...domain, status: 'ok' })))
          .catch(() => (this.$store.dispatch('domains/updateDomain', { ...domain, status: 'fail' })))
      }, Promise.resolve())
        .then(() => (
          this.$q.notify({
            type: 'info',
            position: 'top',
            message: this.$t('messages.importFinished')
          })
        ))
        .then(() => (
          this.$store.dispatch('app/setProcess')
        ))
    }
  },

  render (h) {
    return h(
      'QCard',
      {
        class: 'shadow-15 q-pa-sm',

        style: {
          width: '640px',
          height: '60%',
          minHeight: '460px'
        }
      },
      [
        h(
          'QTabPanels',
          {
            class: 'full-height',

            props: {
              value: this.panel,
              animated: true
            },

            on: {
              input: val => (this.panel = val)
            }
          },
          [
            h(
              'QTabPanel',
              {
                props: {
                  name: 'import'
                }
              },
              [
                h(
                  'ImportPanel',
                  {
                    on: {
                      'import:start': this.import
                    }
                  }
                )
              ]
            ),

            h(
              'QTabPanel',
              {
                props: {
                  name: 'result'
                }
              },
              [
                h(
                  'ResultPanel',
                  {
                    on: {
                      close: () => (this.panel = 'import')
                    }
                  }
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
