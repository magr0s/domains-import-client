<script>
export default {
  name: 'DocNote',

  props: {
    title: {
      type: String,
      default: () => ('TIP')
    },

    message: {
      type: String,
      required: true
    }
  },

  render (h) {
    return h(
      'div',
      {
        class: {
          'doc-note': true
        }
      },
      [
        h(
          'p',
          {
            class: 'doc-note__title'
          },
          this.title
        ),

        h(
          'p',
          this.message
        )
      ]
    )
  }
}
</script>

<style lang="scss">
.doc-note {
  background-color: #eee;
  border-radius: 4px;
  margin: 16px 0;
  padding: 16px 24px;
  border-width: 0 5px;
  border-style: solid;
  border-color: #9e9e9e;
  letter-spacing: .5;

  > p {
    margin: 0;
  }

  &__title {
    font-weight: 500;
  }
}
</style>
