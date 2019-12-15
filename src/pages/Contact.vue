<template>
  <Layout>
    <section class="hero is-small is-white">
      <div class="hero-body">
        <div class="is-uppercase has-text-centered">
          <h1 class="title">CONTACTO</h1>
        </div>
      </div>
      <div class="box">
        <g-image style="display: block; margin: auto;" src="~/assets/images/provita.png"></g-image>
        <div class="is-size-6 has-text-centered has-text-weight-semibold">
          <br><br><font-awesome size="2x" :icon="['fas', 'map-marker-alt']"/>
          <p v-html="$page.homeData.contact.address"></p>
          <br><font-awesome size="2x" :icon="['fas', 'phone']"/>
          <p>{{$page.homeData.contact.phone}}</p><br>
          <br><font-awesome size="2x" :icon="['fas', 'envelope']"/>
          <p><a :href="'mailto:' + $page.homeData.contact.email">{{$page.homeData.contact.email}}</a></p>
          <br><font-awesome size="2x" :icon="['fas', 'globe-americas']"/>
          <p><a :href="$page.homeData.contact.web">{{$page.homeData.contact.web}}</a></p>
        </div>
      </div>
    </section>
  </Layout>
</template>

<page-query>
  query Home {
    homeData: homeData (path: "/content/home") {
      contact {
        address
        phone
        email
        web
      }
    }
  }
</page-query>
