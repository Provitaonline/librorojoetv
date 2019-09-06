<template>
  <div>
    <nav
      class="navbar header is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="/"
        >
        <img
          src="/images/librorojo.png"
          alt="Libro Rojo"
        >
        </a>

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
  /*.navbar-item img {
    max-height: 3.5rem;
  }*/
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
