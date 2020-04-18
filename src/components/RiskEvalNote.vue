<template>
  <div class="risk-eval-note message is-warning box">
    <div class="message-body" v-html="$static.labels.global.riskEvalNoteText"></div>
  </div>
</template>

<style lang="scss" scoped>
  .risk-eval-note {
    margin-bottom: 0;
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
