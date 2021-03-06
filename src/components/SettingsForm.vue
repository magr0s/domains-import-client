<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SettingsForm',

  data () {
    return {
      form: {
        serverIP: '',
        begetLogin: '',
        begetPassword: '',
        dreamhostLogin: '',
        dreamhostPassword: '',
        stackpathId: '',
        stackpathSecret: '',
        ispManagerURL: '',
        ispManagerLogin: '',
        ispManagerPassword: '',
        proxyLogin: '',
        proxyPassword: '',
        proxyURL: ''
      },

      pending: false,
      showBegetPassword: false,
      showDreamhostPassword: false,
      showIpsPassword: false,
      showProxyPassword: false
    }
  },

  computed: {
    ...mapGetters({
      settings: 'settings/getSettings'
    })
  },

  created () {
    this.$store.dispatch('settings/bind')
  },

  watch: {
    settings (data) {
      this.setFormFields(data)
    }
  },

  methods: {
    async onSubmit () {
      this.pending = true

      const { id = null } = this.settings

      try {
        await this.$store.dispatch('settings/save', { id, body: this.form })

        this.$q.notify({
          type: 'positive',
          position: 'top',
          message: this.$t('messages.settings.save')
        })
      } catch ({ message, errorCode }) {
        this.$q.notify({
          type: 'negative',
          position: 'top',
          message: errorCode || message
        })
      } finally {
        this.pending = false
      }
    },

    setFormFields (data) {
      const fields = Object.keys(this.form)

      Object.keys(data).length && fields.forEach((field) => {
        if (data[field]) this.form[field] = data[field]
      })
    }
  },

  render (h) {
    return h(
      'QForm',
      {
        attrs: {
          autocorrect: 'off',
          autocapitalize: 'off',
          autocomplete: 'off',
          spellcheck: false
        },

        on: {
          submit: this.onSubmit
        }
      },
      [
        h(
          'QList',
          [
            h(
              'QItemLabel',
              {
                class: 'q-pt-sm q-pb-xs text-weight-light text-primary text-caption',
                style: 'border-bottom: 1px solid #eee',

                props: {
                  header: true
                }
              },
              this.$t('labels.options.server')
            ),

            h(
              'QItem',
              {
                class: 'q-py-xs'
              },
              [
                h(
                  'QItemSection',
                  [
                    h(
                      'QInput',
                      {
                        props: {
                          value: this.form.serverIP,
                          label: this.$t('labels.serverIP'),
                          dense: true,

                          rules: [
                            val => (!!val || this.$t('errors.validation.required'))
                          ],

                          lazyRules: true
                        },

                        on: {
                          input: val => (this.form.serverIP = val)
                        }
                      }
                    )
                  ]
                )
              ]
            ),

            h(
              'QItemLabel',
              {
                class: 'q-pt-sm q-pb-xs text-weight-light text-primary text-caption',
                style: 'border-bottom: 1px solid #eee',

                props: {
                  header: true
                }
              },
              this.$t('labels.options.dreamhost')
            ),

            h(
              'QItem',
              {
                class: 'q-py-xs'
              },
              [
                h(
                  'QItemSection',
                  [
                    h(
                      'QInput',
                      {
                        props: {
                          value: this.form.dreamhostLogin,
                          label: this.$t('labels.login'),
                          dense: true,

                          rules: [
                            val => (!!val || this.$t('errors.validation.required'))
                          ],

                          lazyRules: true
                        },

                        on: {
                          input: val => (this.form.dreamhostLogin = val)
                        }
                      }
                    ),

                    h(
                      'QInput',
                      {
                        props: {
                          value: this.form.dreamhostPassword,
                          label: this.$t('labels.password'),
                          dense: true,
                          type: this.showDreamhostPassword ? 'text' : 'password',

                          rules: [
                            val => (!!val || this.$t('errors.validation.required'))
                          ],

                          lazyRules: true
                        },

                        on: {
                          input: val => (this.form.dreamhostPassword = val)
                        }
                      },
                      [
                        h(
                          'QBtn',
                          {
                            class: 'q-mt-xs',

                            props: {
                              icon: this.showDreamhostPassword ? 'las la-eye-slash' : 'las la-eye',
                              round: true,
                              dense: true,
                              flat: true,
                              size: 'sm'
                            },

                            on: {
                              click: () => (this.showDreamhostPassword = !this.showDreamhostPassword)
                            },

                            slot: 'append'
                          }
                        )
                      ]
                    )
                  ]
                )
              ]
            ),

            h(
              'QItemLabel',
              {
                class: 'q-pt-sm q-pb-xs text-weight-light text-primary text-caption',
                style: 'border-bottom: 1px solid #eee',

                props: {
                  header: true
                }
              },
              this.$t('labels.options.beget')
            ),

            h(
              'QItem',
              {
                class: 'q-py-xs'
              },
              [
                h(
                  'QItemSection',
                  [
                    h(
                      'QInput',
                      {
                        props: {
                          value: this.form.begetLogin,
                          label: this.$t('labels.login'),
                          dense: true,

                          rules: [
                            val => (!!val || this.$t('errors.validation.required'))
                          ],

                          lazyRules: true
                        },

                        on: {
                          input: val => (this.form.begetLogin = val)
                        }
                      }
                    ),

                    h(
                      'QInput',
                      {
                        props: {
                          value: this.form.begetPassword,
                          label: this.$t('labels.password'),
                          dense: true,
                          type: this.showBegetPassword ? 'text' : 'password',

                          rules: [
                            val => (!!val || this.$t('errors.validation.required'))
                          ],

                          lazyRules: true
                        },

                        on: {
                          input: val => (this.form.begetPassword = val)
                        }
                      },
                      [
                        h(
                          'QBtn',
                          {
                            class: 'q-mt-xs',

                            props: {
                              icon: this.showBegetPassword ? 'las la-eye-slash' : 'las la-eye',
                              round: true,
                              dense: true,
                              flat: true,
                              size: 'sm'
                            },

                            on: {
                              click: () => (this.showBegetPassword = !this.showBegetPassword)
                            },

                            slot: 'append'
                          }
                        )
                      ]
                    )
                  ]
                )
              ]
            ),

            h(
              'QItemLabel',
              {
                class: 'q-pt-sm q-pb-xs text-weight-light text-primary text-caption',
                style: 'border-bottom: 1px solid #eee',

                props: {
                  header: true
                }
              },
              this.$t('labels.options.stackpath')
            ),

            h(
              'QItem',
              {
                class: 'q-py-xs'
              },
              [
                h(
                  'QItemSection',
                  [
                    h(
                      'QInput',
                      {
                        props: {
                          value: this.form.stackpathId,
                          label: this.$t('labels.clientId'),
                          dense: true,

                          rules: [
                            val => (!!val || this.$t('errors.validation.required'))
                          ],

                          lazyRules: true
                        },

                        on: {
                          input: val => (this.form.stackpathId = val)
                        }
                      }
                    ),

                    h(
                      'QInput',
                      {
                        props: {
                          value: this.form.stackpathSecret,
                          label: this.$t('labels.token'),
                          dense: true,

                          rules: [
                            val => (!!val || this.$t('errors.validation.required'))
                          ],

                          lazyRules: true
                        },

                        on: {
                          input: val => (this.form.stackpathSecret = val)
                        }
                      }
                    )
                  ]
                )
              ]
            ),

            h(
              'QItemLabel',
              {
                class: 'q-pt-sm q-pb-xs text-weight-light text-primary text-caption',
                style: 'border-bottom: 1px solid #eee',

                props: {
                  header: true
                }
              },
              this.$t('labels.options.ispManager')
            ),

            h(
              'QItem',
              {
                class: 'q-py-xs'
              },
              [
                h(
                  'QItemSection',
                  [
                    h(
                      'QInput',
                      {
                        props: {
                          value: this.form.ispManagerURL,
                          label: this.$t('labels.domainURL'),
                          dense: true,

                          rules: [
                            val => (!!val || this.$t('errors.validation.required'))
                          ],

                          lazyRules: true
                        },

                        on: {
                          input: val => (this.form.ispManagerURL = val)
                        }
                      }
                    ),

                    h(
                      'QInput',
                      {
                        props: {
                          value: this.form.ispManagerLogin,
                          label: this.$t('labels.login'),
                          dense: true,

                          rules: [
                            val => (!!val || this.$t('errors.validation.required'))
                          ],

                          lazyRules: true
                        },

                        on: {
                          input: val => (this.form.ispManagerLogin = val)
                        }
                      }
                    ),

                    h(
                      'QInput',
                      {
                        props: {
                          value: this.form.ispManagerPassword,
                          label: this.$t('labels.password'),
                          dense: true,
                          type: this.showIpsPassword ? 'text' : 'password',

                          rules: [
                            val => (!!val || this.$t('errors.validation.required'))
                          ],

                          lazyRules: true
                        },

                        on: {
                          input: val => (this.form.ispManagerPassword = val)
                        }
                      },
                      [
                        h(
                          'QBtn',
                          {
                            class: 'q-mt-xs',

                            props: {
                              icon: this.showIpsPassword ? 'las la-eye-slash' : 'las la-eye',
                              round: true,
                              dense: true,
                              flat: true,
                              size: 'sm'
                            },

                            on: {
                              click: () => (this.showIpsPassword = !this.showIpsPassword)
                            },

                            slot: 'append'
                          }
                        )
                      ]
                    )
                  ]
                )
              ]
            ),

            h(
              'QItemLabel',
              {
                class: 'q-pt-sm q-pb-xs text-weight-light text-primary text-caption',
                style: 'border-bottom: 1px solid #eee',

                props: {
                  header: true
                }
              },
              this.$t('labels.options.proxy')
            ),

            h(
              'QItem',
              {
                class: 'q-py-xs'
              },
              [
                h(
                  'QItemSection',
                  [
                    h(
                      'QInput',
                      {
                        props: {
                          value: this.form.proxyURL,
                          label: this.$t('labels.proxyURL'),
                          dense: true,

                          rules: [
                            val => (!!val || this.$t('errors.validation.required'))
                          ],

                          lazyRules: true
                        },

                        on: {
                          input: val => (this.form.proxyURL = val)
                        }
                      }
                    ),

                    h(
                      'QInput',
                      {
                        class: 'q-mb-md',

                        props: {
                          value: this.form.proxyLogin,
                          label: this.$t('labels.login'),
                          dense: true
                        },

                        on: {
                          input: val => (this.form.proxyLogin = val)
                        }
                      }
                    ),

                    h(
                      'QInput',
                      {
                        class: 'q-mb-md',

                        props: {
                          value: this.form.proxyPassword,
                          label: this.$t('labels.password'),
                          dense: true,
                          type: this.showProxyPassword ? 'text' : 'password'
                        },

                        on: {
                          input: val => (this.form.proxyPassword = val)
                        }
                      },
                      [
                        h(
                          'QBtn',
                          {
                            class: 'q-mt-xs',

                            props: {
                              icon: this.showProxyPassword ? 'las la-eye-slash' : 'las la-eye',
                              round: true,
                              dense: true,
                              flat: true,
                              size: 'sm'
                            },

                            on: {
                              click: () => (this.showProxyPassword = !this.showIpsPassword)
                            },

                            slot: 'append'
                          }
                        )
                      ]
                    )
                  ]
                )
              ]
            )
          ]
        ),

        h(
          'div',
          {
            class: 'q-mt-xs q-px-sm q-mb-md'
          },
          [
            h(
              'QBtn',
              {
                class: 'full-width bg-crystal-clear',

                props: {
                  label: this.$t('labels.save'),
                  type: 'submit',
                  unelevated: true,
                  loading: this.pending,
                  disable: this.pending
                }
              },
              [
                h(
                  'QSpinnerDots',
                  { slot: 'loading' }
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
