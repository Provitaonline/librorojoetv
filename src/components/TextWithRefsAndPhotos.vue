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

function addPopovers(data, references, photos) {
  let r = data.replace(/\(.*?\)/g, function (match, offset) {
    let lookup = ((match.replace(/[{()}]/g, ''))).split(',');
    let dropDownItems = ''
    let photoItems = ''
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
          <div class="dropdown-menu">
            <div class="dropdown-content">` + dropDownItems + `</div>
          </div>
        </div>`
      return (dropdown.trim())
    }
    if (photos) {
      lookup.forEach(refItem => {
        let pIdx = photos.findIndex(function(p) { return p.photokey === refItem.trim()})
        if (pIdx >= 0) {
          photoItems += `
            <a @click="photoClick">` + (pIdx > 0 ? ', ' :  '' ) + refItem.trim() + `</a><div class="modal photo-modal">
              <div @click="closePhotoModal" class="modal-background"></div>
              <div class="modal-content has-text-centered">
                <figure style="padding: 2%;">
                  <g-image :src="photos[` + pIdx + `].photourl"></g-image>
                </figure>
                <figcaption class="has-text-centered">
                  <div class="is-size-7 has-text-white" v-html="photos[` + pIdx + `].photocaption">
                  </div>
                </figcaption>
              </div>
              <button @click="closePhotoModal" class="modal-close is-large" aria-label="close"></button>
            </div>
          `
        }
      })
      if (photoItems != '') {
        return ('(' + photoItems.trim().replace(/\n|\r/g, "") + ')')
      }
    }
    return match
  })
  return '<div>' + r  + '</div>'
}

function closePopovers(elements, el) {
  Array.from(elements).forEach(function (element) {
    if (element != el) {
      element.classList.remove('is-active');
    }
  })
}

function documentClickHandler() {
  closePopovers(document.getElementsByClassName('reference-dropdown'))
}

function documentKeyHandler(event) {
  if (event.keyCode === 27) {
    closePopovers(document.getElementsByClassName('reference-dropdown'))
    closePopovers(document.getElementsByClassName('photo-modal'))
  }
}

export default {
  name: 'TextWithReferences',
  props: {
    text: { type: String, required: true },
    refs: { type: Array, required: true },
    photos: {type: Array, required: false}
  },
  data () {
    return {
      isImageModalActive: false
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
  computed: {
    imageModalActive() {
      return this.isImageModalActive
    }
  },
  methods: {
    injectReferences: function() {
      return addPopovers(this.text, this.refs, this.photos)
    },
    dropDownClick: function(e) {
      let referenceDropdownElement = e.target.closest('.reference-dropdown')
      closePopovers(document.getElementsByClassName('reference-dropdown'), referenceDropdownElement)
      let offset =  (window.innerWidth / 2) - referenceDropdownElement.offsetLeft - 40
      referenceDropdownElement.querySelector('.dropdown-menu').setAttribute('style', 'width:40vw; left: ' + Math.min(0,offset) + 'px')
      referenceDropdownElement.classList.toggle('is-active')
      e.preventDefault()
      e.stopPropagation()
    },
    photoClick: function(e) {
      e.target.nextElementSibling.classList.toggle('is-active')
    },
    closePhotoModal: function(e) {
      e.target.closest('.photo-modal').classList.toggle('is-active')
    }
  }
}
</script>
