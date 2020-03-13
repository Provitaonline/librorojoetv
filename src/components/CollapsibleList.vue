<template>
  <div>
    <div v-for="(parent, index) in list" :key="index">
      <div class="side-panel-item"
            v-bind:class="{'red-separator': (parent.children), 'top-line': (!index), current: ($route.path === parent.parentLink)}"
            style="display: flex; align-items: center; justify-content: space-between;">
        <g-link v-if="parent.parentLink" :to="parent.parentLink"><span v-html="parent.parentLabel"></span></g-link>
        <div v-else>{{parent.parentLabel}}</div>
        <div class="button is-transparent" v-if="parent.children" @click="toggle(index)">
          <font-awesome class="arrow" size="lg" :icon="['fas', !isOpen[index] ? 'angle-down' : 'angle-up']" />
        </div>
      </div>
      <b-collapse :open="isOpen[index]">
        <div
          class="side-panel-item child"
          v-bind:class="{'child-indented': (child.isIndented), 'gray-separator': (child.hasSeparator), current: !child.noHighlight && ($route.path === child.childLink)}"
          v-for="(child, index) in parent.children" :key="index">
          <g-link :to="child.childLink"><span v-html="child.childLabel"></span></g-link>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "~/assets/style/_variables";

  .current {
    background-color: $collapsible-list-current-item-background-color;
  }

  .child {
    padding-left: 24px;
    /*margin-left: 16px; */
  }

  .child-indented {
    padding-left: 32px;
    /*margin-left: 24px; */
  }

  .red-separator {
    border-bottom: 1px solid $primary
  }

  .gray-separator {
    border-bottom: 1px solid $collapsible-list-separator-color;
  }

  .top-line {
    border-top: 2px solid $collapsible-list-separator-color;
  }

  .is-transparent {
    background-color: transparent;
    border-width: 0px;
  }

  .arrow:hover {
    color: $primary;
  }

</style>

<script>

  export default {
    name: 'CollapsibleList',
    props: {
      list: {type: Array, required: true},
      allOpen: {type: Boolean, required: false, default: false}
    },
    data() {
      return {
          isOpen: {}
      }
    },
    methods: {
      toggle: function(index) {
        this.isOpen[index] = !this.isOpen[index]
      }
    },
    created() {
      this.list.forEach((item, index) => {
        if (item.children) {
          this.$set(this.isOpen, index, this.allOpen) // Make properties reactive
        }
      })
    }
  }

</script>
