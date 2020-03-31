<script>
import { mapGetters } from 'vuex'
import { exportFile, date } from 'quasar'

export default {
  name: 'ResultTable',

  data () {
    return {
      pagination: {
        rowsPerPage: 0
      }
    }
  },

  computed: {
    columns () {
      return [
        {
          name: 'name',
          label: this.$t('columns.domain.name'),
          field: 'name',
          align: 'left'
        },
        {
          name: 'status',
          label: this.$t('columns.domain.status'),
          field: 'status',
          align: 'center',
          style: 'width: 50px'
        }
      ]
    },

    progress () {
      const isComplite = this.domainsList.filter(({ status }) => (status !== 'pending')).length
      const total = this.domainsList.length

      return isComplite / total
    },

    progressLabel () {
      const isComplite = this.domainsList.filter(({ status }) => (status !== 'pending')).length
      const total = this.domainsList.length

      return `${isComplite} / ${total}`
    },

    ...mapGetters({
      domainsList: 'domains/getList',
      isImportProcess: 'app/isImportProcess'
    })
  },

  methods: {
    export () {
      const isComplite = this.domainsList.filter(({ status }) => (status === 'ok'))
        .map(({ name }) => (name))

      const fileName = `domains ${date.formatDate(new Date(), 'YYYY-MM-DD HH-mm-ss')}.txt`

      exportFile(fileName, isComplite.join('\n'))
    }
  },

  render (h) {
    return h(
      'QTable',
      {
        class: 'full-height sticky-table',

        props: {
          columns: this.columns,
          data: this.domainsList,
          dense: true,
          separator: 'cell',
          pagination: this.pagination,
          flat: true,
          key: '__key',
          square: true,
          tableHeaderClass: 'bg-grey-2'
        },

        scopedSlots: {
          top: () => (
            h(
              'QBar',
              {
                class: 'full-width bg-transparent',

                props: {
                  dense: true
                }
              },
              [
                h(
                  'QBtn',
                  {
                    props: {
                      icon: 'las la-arrow-left',
                      round: true,
                      flat: true,
                      disable: this.isImportProcess
                    },

                    on: {
                      click: () => (this.$emit('close'))
                    }
                  },
                  [
                    h(
                      'QTooltip',
                      this.$t('tooltips.back')
                    )
                  ]
                ),

                h('QSpace'),

                h(
                  'QBtn',
                  {
                    props: {
                      icon: 'las la-download',
                      round: true,
                      flat: true,
                      disable: this.isImportProcess
                    },

                    on: {
                      click: this.export
                    }
                  },
                  [
                    h(
                      'QTooltip',
                      this.$t('tooltips.download')
                    )
                  ]
                )
              ]
            )
          ),

          bottom: () => (
            h(
              'QLinearProgress',
              {
                class: 'q-mt-sm',

                props: {
                  value: this.progress,
                  size: '25px',
                  color: 'secondary',
                  stripe: true
                }
              },
              [
                h(
                  'div',
                  {
                    class: 'absolute-full flex flex-center'
                  },
                  [
                    h(
                      'QBadge',
                      {
                        props: {
                          label: this.progressLabel,
                          color: 'grey-1',
                          textColor: 'dark'
                        }
                      }
                    )
                  ]
                )
              ]
            )
          ),

          'body-cell-status': (props) => {
            const { value } = props

            return h(
              'QTd',
              {
                props: { props }
              },
              [
                (value === 'ok')
                  ? h(
                    'QIcon',
                    {
                      props: {
                        name: 'las la-check',
                        color: 'positive'
                      }
                    }
                  )
                  : (value === 'pending')
                    ? h('QSpinnerIos')
                    : h(
                      'QIcon',
                      {
                        props: {
                          name: 'las la-times',
                          color: 'negative'
                        }
                      }
                    )
              ]
            )
          }
        }
      }
    )
  }
}
</script>

<style lang="scss" scoped>
.sticky-table ::v-deep {
  .q-table__top,
  .q-table__bottom {
    padding: 0;
  }

  .q-table__top {
    padding-bottom: 4px
  }

  .q-table__bottom {
    padding-top: 4px
  }

  .q-table__middle {
    max-height: 100%;
  }
  thead tr:first-child th {
    position: sticky;
    top: 0;
    opacity: 1;
    z-index: 1;
  }
  .q-linear-progress {
    z-index: 1;
  }
}
</style>
