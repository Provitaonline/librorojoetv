<template>
  <div>
	   <v-runtime-template :template="injectReferences()"></v-runtime-template>
  </div>
</template>

<style lang="scss">
  .dropdown {
    margin-left: 0 !important;
  }

  sup { vertical-align: top; font-size: 0.6em; }

</style>

<script>

import VRuntimeTemplate from "v-runtime-template"

function addReferenceDropdowns(data, references) {
  let r = data.replace(/\(.*?\)/g, function (match, offset) {
    let lookup = ((match.replace(/[{()}]/g, ''))).split(',');
    let dropDownItems = ''
    lookup.forEach(refItem => {
      refItem = refItem.replace(/\<i\>|\<\/i\>/g, '') // Get rid of italic markup
      let re = references.find(function(r) { return r.referencekey === refItem.trim()})
      if (re) {
        dropDownItems += '<b-dropdown-item :custom="true">' + re.reference + '</b-dropdown-item>'
      }
    })
    if (dropDownItems != '') {
      let dropdown =
        '<b-dropdown><a slot="trigger" href="">' + match + '</a>' + dropDownItems + '</b-dropdown>'
      return (dropdown.trim())
    }
    return match
  })
  return '<p>' + r + '</p>'
}

export default {
  name: 'TextWithReferences',
  props: {
    text: { type: String, required: true },
    refs: { type: Array, required: true }
  },
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
