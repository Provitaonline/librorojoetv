<template>
  <div>
    <div v-if="hasHeading" class="is-size-5 has-text-centered">
      <div class="ref-header">
        <h1 class="ref-header-text">Bibliografía</h1>
        <a @click="showMore = !showMore">
          <span v-if="!showMore"><font-awesome size="lg" :icon="['fas', 'angle-down']"/></span>
          <span v-else><font-awesome size="lg" :icon="['fas', 'angle-up']"/></span>
          <br>
        </a>
      </div>
    </div>
    <transition name="fade" appear>
      <div v-if="showMore || !hasHeading" style="padding-top: 0px;" class="tile is-child box is-size-6 is-size-7-mobile">
        <table class="table">
          <tbody>
            <tr v-for="value in sortedReferences">
              <td>{{value.reference}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  @import "~/assets/style/_variables";

  .ref-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    border-bottom: 4px solid $primary;
    margin-bottom: 10px;
  }

  .ref-header-text {
    padding-bottom: 0;
    margin-bottom: 20px;
  }

  .table {
    word-break: break-word;
  }

  tr:nth-child(odd) {
    background-color: #F8F8F8;
  }

  td {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 0;
    padding-right: 0;
    border: none;
  }
</style>


<script>
  export default {
    name: 'References',
    props: {
      references: { type: Array, required: true },
      hasHeading: {type: Boolean, required: false, default: true}
    },
    data() {
      return {
        showMore: false
      }
    },
    computed: {
      sortedReferences: function() {
        return this.references.sort((a, b) => a.reference.localeCompare(b.reference))
      }
    }
  }
</script>
