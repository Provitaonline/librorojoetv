<template>
  <div>
    <nav
      class="navbar header"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <g-link class="navbar-item" to="/"><img src="/images/librorojo.png" alt="logo" /></g-link>
        <div class="navbar-burger" :class="{ 'is-active': showNav }" @click="showNav = !showNav">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': showNav }">
        <div class="navbar-end">
          <a class="navbar-item">
            Acerca de
          </a>

          <a class="navbar-item">
            Metodología
          </a>

          <a class="navbar-item">
            Mas información
          </a>

          <a class="navbar-item">
            Contacto
          </a>
        </div>
      </div>
    </nav>

    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .navbar {
    border-bottom: 6px solid #BE1421;
  }

  a.navbar-item {
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
  }

  .navbar-item img {
    max-height: 3rem;
  }
</style>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ],
      showNav: false
    }
  }
}
</script>
