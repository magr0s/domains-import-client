<script>
import DomainsImport from 'components/DomainsImport'

export default {
  name: 'PageIndex',

  components: {
    DomainsImport
  },

  methods: {
    pageTweak (offset, height) {
      return { height: `${height - offset}px` }
    }
  },

  render (h) {
    return h(
      'QPage',
      {
        class: 'flex flex-center',

        props: {
          padding: true,
          styleFn: this.pageTweak
        }
      },
      [
        h('DomainsImport')
      ]
    )
  }
}
</script>
