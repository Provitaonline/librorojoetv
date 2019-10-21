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
        dropDownItems += `
          <div class="dropdown-item">
            <p>` + re.reference + `</p>
          </div>
        `
      }
    })
    if (dropDownItems != '') {
      let dropdown = `
        <div style="margin-left: 0; display: inline;" class="dropdown reference-dropdown">
          <a @click="dropDownClick" class="dropdown-trigger" href="">` + match + `</a>
          <div style="width:50vw;" class="dropdown-menu">
            <div class="dropdown-content">` + dropDownItems + `</div>
          </div>
        </div>`
      return (dropdown.trim())
    }
    return match
  })
  return '<div>' + r  + '</div>'
}

function closeDropdowns(dropdownElements, el) {
  Array.from(dropdownElements).forEach(function (element) {
    if (element != el) {
      element.classList.remove('is-active');
    }
  })
}

function documentClickHandler() {
  let dropdownElements = document.getElementsByClassName('reference-dropdown')
  closeDropdowns(dropdownElements)
}

function documentKeyHandler(event) {
  if (event.keyCode === 27) {
    let dropdownElements = document.getElementsByClassName('reference-dropdown')
    closeDropdowns(dropdownElements)
  }
}

export default {
  name: 'TextWithReferences',
  props: {
    text: { type: String, required: true },
    refs: { type: Array, required: true }
  },
  data () {
    return {
      position: 'is-top-right'
    }
  },
  mounted() {
    document.addEventListener('click', documentClickHandler)
    document.addEventListener('keyup', documentKeyHandler)
  },
  beforeDestroy() {
    document.removeEventListener('click', documentClickHandler)
    document.removeEventListener('keyup', documentKeyHandler)
  },
  components: {
    VRuntimeTemplate
  },
  methods: {
    injectReferences: function() {
      return addReferenceDropdowns(this.text, this.refs)
    },
    dropDownClick: function(e) {
      closeDropdowns(document.getElementsByClassName('reference-dropdown'), e.target.parentElement)
      if (e.target.parentElement.offsetLeft > window.innerWidth / 2.3) {
        e.target.parentElement.classList.add('is-right')
      } else {
        e.target.parentElement.classList.remove('is-right')
      }
      e.target.parentElement.classList.toggle('is-active')
      e.preventDefault()
      e.stopPropagation()
    }
  }
}
</script>
