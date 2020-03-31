<script>
export default {
  name: 'ImportForm',

  data () {
    return {
      form: {
        domains: ''
      }
    }
  },

  methods: {
    clearDomains () {
      this.form.domains = ''
    },

    pasteDomains () {
      const paste = () => {
        return navigator.clipboard.readText()
          .then(text => (this.form.domains = text))
      }

      navigator.permissions.query({
        name: 'clipboard-read'
      })
        .then(({ state }) => {
          try {
            if (state === 'denied') throw new Error(this.$t('warnings.unblock-clipboard'))

            paste()
          } catch ({ message }) {
            this.$q.notify({
              type: 'warning',
              position: 'top',
              message
            })
          }
        })
    },

    onSubmit () {
      const list = this.form.domains.split('\n')
        .reduce((arr, value) => {
          value && arr.push(value)

          return arr
        }, [])

      try {
        if (!Array.isArray(list) || !list.length) {
          throw new Error(`${this.$t('errors.domains-not-parsed')}`)
        }

        this.$emit('import:start', list)
      } catch ({ message }) {
        this.$q.notify({
          type: 'negative',
          position: 'top',
          message
        })
      }
    }
  },

  render (h) {
    return h(
      'QForm',
      {
        class: 'full-height',

        on: {
          submit: this.onSubmit
        }
      },
      [
        h(
          'QBar',
          {
            class: 'q-mb-xs bg-transparent',

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
                  icon: 'las la-file',
                  round: true,
                  flat: true
                },

                on: {
                  click: this.clearDomains
                }
              },
              [
                h(
                  'QTooltip',
                  this.$t('tooltips.clear')
                )
              ]
            ),

            h(
              'QBtn',
              {
                props: {
                  icon: 'las la-paste',
                  round: true,
                  flat: true
                },

                on: {
                  click: this.pasteDomains
                }
              },
              [
                h(
                  'QTooltip',
                  this.$t('tooltips.paste')
                )
              ]
            )
          ]
        ),

        h(
          'QInput',
          {
            style: {
              height: 'calc(100% - 28px - 68px)'
            },

            attrs: {
              rows: 15
            },

            props: {
              value: this.form.domains,
              label: this.$t('labels.domainsList'),
              type: 'textarea',
              outlined: true,
              hint: this.$t('hints.domainsList'),

              inputStyle: {
                resize: 'none'
              }
            },

            on: {
              input: val => (this.form.domains = val)
            }
          }
        ),

        h(
          'div',
          {
            class: 'text-center q-mt-md'
          },
          [
            h(
              'QBtn',
              {
                class: 'bg-crystal-clear q-px-xl',

                props: {
                  label: this.$t('labels.start'),
                  type: 'submit',
                  disable: !this.form.domains,
                  unelevated: !this.form.domains,
                  size: 'lg'
                }
              }
            )
          ]
        )
      ]
    )
  }
}
</script>
