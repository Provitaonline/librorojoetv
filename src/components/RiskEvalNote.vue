<template>
  <div class="risk-eval-note message is-warning box">
    <div class="message-body is-size-7-mobile" v-html="$static.labels.global.riskEvalNoteText"></div>
  </div>
</template>

<style lang="scss">

  @import "~/assets/style/_variables";

  .risk-eval-note {
    margin-bottom: 0;
  }

  .risk-eval-note a {
    color: $link !important;
  }

  .risk-eval-note a:hover {
    color: $link-hover !important;
  }

</style>

<static-query>

  query {
    labels (id: "labels") {
      global {
        riskEvalNoteText
      }
    }
  }

</static-query>

<script>
  export default {
    name: 'RiskEvalNote'
  }
</script>
