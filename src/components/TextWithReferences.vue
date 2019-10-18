<template>
  <div>
	   <v-runtime-template :template="injectReferences()"></v-runtime-template>
  </div>
</template>

<style lang="scss">
  .dropdown {
    margin-left: 0 !important;
  }
</style>

<script>

import VRuntimeTemplate from "v-runtime-template"

function addReferenceDropdowns(data, references) {
  let r = data.replace(/\(.*?\)/g, function (match, offset) {
    let lookup = ((match.replace(/[{()}]/g, ''))).split(',');
    //this.refs.find(function(r) { return r.referencekey === lookup})
    let referenceEntry = references.find(function(r) { return r.referencekey === lookup[0]})
    if (referenceEntry) {
      let dropdown =
        `<b-dropdown>
          <a slot="trigger" href=""><b>` + match + `</b></a>
          <b-dropdown-item :custom="true">` + referenceEntry.reference +
          `</b-dropdown-item>
        </b-dropdown>
      `
      return (dropdown.trim())
    }
    return match
  })
  // console.log(r)
  return '<p>' + r + '</p>'
}

export default {
  name: 'TextWithReferences',
  props: {
    text: { type: String, required: true },
    refs: { type: Array, required: true }
  },
  /*beforeMount() {
    console.log('created', this.text)
    let r = Vue.compile(this.text)
  },
  render: function (createElement) {
    //return createElement('p', {domProps: {innerHTML: this.injectReferences()}})
    return createElement('p', {domProps: {innerHTML: '<div>HOLA</div><g-image>HOLA</g-image>'}})
    //return createElement('g-image', {attrs: {src: ''}})
  },*/
  data () {
    return {
    }
  },
  components: {
    VRuntimeTemplate
  },
  methods: {
    injectReferences: function() {
      return addReferenceDropdowns(this.text, this.refs)
      //return '<p><b-tooltip position="is-bottom" size="is-medium" multilined label="here is a e sdf sfd sdf sd fsdf s df s df sdf sd f sd fs df ssdsdfsdsfdfs  sfdsdfsdf">TEST REF</b-tooltip>' + this.text + '</p>'
      return '<p>fwef wef we rwe rt wer we rwe r wer we rw er we rwe r wer werwerwerwer <b-dropdown><a href="" slot="trigger"><b>(Huber 1988) </b></a><b-dropdown-item :custom="true">Arismendi, J. (2007). Presentación geográfica de las formas de relieve. Pp.128-183. En: M. Aguilera, R. Anderssen, J. Arismendi, J. Córdova Rodríguez, G. Elizalde, A.J. Gabaldón, M. González Sanabria, A. Hernández Arocha, O. Huber, V. Jiménez, J. Méndez Baamondes, N. Orihuela Guevara, R. Pérez-Hernández, A. Rosales, J. Vitoria & L. Vivas. Geo Venezuela. Tomo 2: Medio físico y recursos ambientales.</b-dropdown-item></b-dropdown>' + this.text + '</p>'
    }
  }
}
</script>
