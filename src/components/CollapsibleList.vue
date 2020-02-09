<template>
  <div>
    <div v-for="(parent, index) in list" :key="index">
      <b-collapse :open="false">
        <div style="display: flex; justify-content: space-between;" slot="trigger" slot-scope="props">
          <g-link v-bind:class="{current: ($route.path === parent.parentLink)}" v-if="parent.parentLink" :to="parent.parentLink">{{parent.parentLabel}}</g-link>
          <div v-else>{{parent.parentLabel}}</div>
          <div v-if="parent.children"><font-awesome size="lg" :icon="['fas', !props.open ? 'angle-down' : 'angle-up']" /></div>
        </div>
        <div style="margin-left: 16px;" v-for="(child, index) in parent.children" :key="index">
          <g-link v-bind:class="{current: ($route.path === child.childLink)}" :to="child.childLink">{{child.childLabel}}</g-link>
        </div>
      </b-collapse>
    </div>
    {{$route.path}}
  </div>
</template>

<style lang="scss" scoped>

  .current {
    font-style: italic;
  }

</style>

<script>

  export default {
    name: 'CollapsibleList',
    props: {
      list: {type: Array, required: true}
    }
  }

</script>
