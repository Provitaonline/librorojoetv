<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-small is-white">
        <div class="hero-body">
          <div class="container is-fullhd has-text-centered">
            <g-link to="/cases" class="is-uppercase is-size-6">Casos de estudio</g-link>
          </div>
        </div>
      </section>
      <div>
        <g-image v-if="$page.caseCard.cardimage" :src="$page.caseCard.cardimage" fit="inside" />
      </div>
      <figcaption style="padding-left: 12px;"><div class="is-size-6 is-size-7-mobile" v-html="$page.caseCard.cardimagecaption"></div></figcaption>
      <div class="columns section is-size-6 is-size-7-mobile" style="margin-bottom: -96px;">
        <div class="column card-title">
          <p class="title is-uppercase is-size-4-mobile">{{$page.caseCard.title}}</p>
          <p>{{$page.caseCard.authors}}</p>
        </div>
        <div class="column is-narrow">
          <div class="card summary-box" style="box-shadow: none; border-style: solid;">
            <header class="card-header">
              <p class="card-header-title">
                Paisaje vegetal:&nbsp;<span v-html="$page.caseCard.landscapeunits"></span>
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <b>Localidad:</b> {{$page.caseCard.locality}}<br>
                <b>Estados:</b> {{$page.caseCard.states}}<br>
                <b>Área aprox.:</b> {{$page.caseCard.area | number}} km<sup>2</sup><br>
              </div>
              <table align="center" class="table is-size-6 is-size-7-mobile">
                <thead>
                  <tr style="background-color: #f8e7e8;">
                    <th v-for="value in $page.caseCard.cardtablecolumns" style="border: none;">{{value}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="value in $page.caseCard.cardtablerows">
                    <td v-for="item in value.split('|')">
                      <div v-if="threatCategoryIcons[item]" style="text-align: center;">
                        <b-tooltip :label="threatCategories[item].text" position="is-top" type="is-warning">
                          <div class="iconInTable" style="display: inline-block">
                            <img :src="threatCategoryIcons[item]">
                          </div>
                        </b-tooltip>
                      </div>
                      <div v-else>
                        {{item}}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <section class="section">
        <div class="tile is-vertical is-parent">
          <TextWithRefsAndPhotos class="tile is-child box is-size-5 is-size-6-mobile"
            :text="$page.caseCard.content"
            :refs="$page.caseCard.case.references"
            :isContent="true" />
          </TextWithRefsAndPhotos>
        </div>
      </section>
    </div>
  </Layout>
</template>

<page-query>
  query CaseCard ($path: String!) {
    caseCard: caseCard (path: $path) {
      title
      authors
      content
      cardimage
      cardimagecaption
      landscapeunits
      locality
      states
      area
      cardtablecolumns
      cardtablerows
      case {
        references {
          referencekey
          reference
        }
      }
    }
  }
</page-query>

<style lang="scss" scoped>
  @import "~/assets/style/_variables";

  .iconInTable {
    width: 30px;
    height: 30px;
  }

  .card-header-title {
    padding-left: 24px;
    padding-rigth: 24px;
    background-color: #f8e7e8;
  }

  @media only screen and (min-width: 769px) {
    .summary-box {
      margin-top: -12rem;
    }
  }

  @media only screen and (max-width: 768px) {
    .card-title {
      text-align: center;
    }
  }

  .summary-box {
    box-shadow: none;
    border: solid $primary 2px;
  }
</style>

<script>
  import {threatCategories} from '~/assets/js/siteConfig.js'
  import TextWithRefsAndPhotos from '~/components/TextWithRefsAndPhotos.vue'

  let threatCategoryIcons = {}
  for (let key in threatCategories) {
    threatCategoryIcons[key] = require('~/assets/svgs/' + key + '-icon.svg')
  }

  console.log(threatCategoryIcons)

  export default {
    data() {
      return {
        threatCategories: threatCategories,
        threatCategoryIcons: threatCategoryIcons
      }
    },
    mounted () {
    },
    components: {
      TextWithRefsAndPhotos
    }
  }

</script>
