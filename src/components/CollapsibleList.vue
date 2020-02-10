<template>
  <div>
    <div v-for="(parent, index) in list" :key="index">
      <div class="side-panel-item" style="display: flex; align-items: center; justify-content: space-between;">
        <g-link v-bind:class="{current: ($route.path === parent.parentLink)}" v-if="parent.parentLink" :to="parent.parentLink"><span v-html="parent.parentLabel"></span></g-link>
        <div v-else>{{parent.parentLabel}}</div>
        <button class="button is-white" v-if="parent.children" @click="toggle(index)">
          <font-awesome size="lg" :icon="['fas', !isOpen[index] ? 'angle-down' : 'angle-up']" />
        </button>
      </div>
      <b-collapse :open="isOpen[index]">
        <div class="side-panel-item child" v-bind:class="{'child-indented': (child.isIndented)}" v-for="(child, index) in parent.children" :key="index">
          <g-link v-bind:class="{current: ($route.path === child.childLink)}" :to="child.childLink"><span v-html="child.childLabel"></span></g-link>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .current {
    font-style: italic;
  }

  .child {
    margin-left: 16px;
  }

  .child-indented {
    margin-left: 24px;
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
