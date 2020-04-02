<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignInForm',

  data () {
    return {
      form: {
        email: '',
        password: ''
      },

      pending: false
    }
  },

  methods: {
    onSubmit () {
      this.pending = true

      this.signIn(this.form)
        .then(() => (this.$router.push('/')))
        .catch(({ code }) => {
          this.$q.notify({
            type: 'negative',
            position: 'top',
            message: this.$t(`errors.${code}`)
          })
        })
        .finally(() => (this.pending = false))
    },

    ...mapActions({
      signIn: 'auth/signIn'
    })
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
          'QInput',
          {
            props: {
              value: this.form.email,
              label: this.$t('labels.email'),
              type: 'email',

              rules: [
                value => (!!value || this.$t('errors.validation.required')),
                value => (/.+@.+/.test(value) || this.$t('errors.validation.signature'))
              ],

              lazyRules: true
            },

            on: {
              input: val => (this.form.email = val)
            }
          },
          [
            h(
              'QIcon',
              {
                props: {
                  name: 'las la-at'
                },

                slot: 'before'
              }
            )
          ]
        ),

        h(
          'QInput',
          {
            props: {
              label: this.$t('labels.password'),
              value: this.form.password,
              type: 'password',

              rules: [
                value => (!!value || this.$t('errors.validation.required'))
              ],

              lazyRules: true
            },

            on: {
              input: val => (this.form.password = val)
            }
          },
          [
            h(
              'QIcon',
              {
                props: {
                  name: 'las la-key',
                  size: '20px'
                },

                slot: 'before'
              }
            )
          ]
        ),

        h(
          'div',
          {
            class: 'q-mt-xs q-px-sm text-center'
          },
          [
            h(
              'QBtn',
              {
                class: 'q-px-xl bg-crystal-clear',

                props: {
                  label: this.$t('labels.signIn'),
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
