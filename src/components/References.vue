<template>
  <div>
    <div v-if="hasHeading" class="is-size-5 has-text-centered">
      <div class="ref-header">
        <h1 class="ref-header-text">{{$static.labels.references.title}}</h1>
        <a @click="showMore = !showMore">
          <span v-if="!showMore"><font-awesome size="lg" :icon="['fas', 'angle-down']"/></span>
          <span v-else><font-awesome size="lg" :icon="['fas', 'angle-up']"/></span>
          <br>
        </a>
      </div>
    </div>
    <transition name="fade" appear>
      <div v-if="showMore || !hasHeading" style="padding: 0px;" class="tile is-child box is-size-6 is-size-7-mobile">
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

<static-query>
  query {
    labels (id: "labels") {
      references {
        title
      }
    }
  }
</static-query>

<style lang="scss" scoped>
  @import "~/assets/style/_variables";

  .ref-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    border-bottom: 16px solid $primary;
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
    background-color: $table-odd-row-background-color;
  }

  td {
    padding: 20px;
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
