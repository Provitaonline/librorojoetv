<template>
  <div>
	   <v-runtime-template :template="injectReferencesAndModalPhotos()"></v-runtime-template>
  </div>
</template>

<style lang="scss">
  .dropdown {
    margin-left: 0 !important;
  }

  sup { vertical-align: top; font-size: 0.6em; }

  @media only screen and (min-width: 769px) {
    .inline-figure > figure, .inline-figure > fig-caption {
      max-width: 80%;
      margin: 0 auto;
    }
  }

  .d-content {
    margin-bottom: 2rem;
  }

</style>

<script>

import VRuntimeTemplate from "v-runtime-template"

function addPopovers(data, references, photos) {
  let r = data.replace(/\(.*?\)/g, function (match) {
    let lookup = ((match.replace(/[{()}]/g, ''))).split(',')
    let dropDownItems = ''
    let photoItems = ''
    lookup.forEach(refItem => {
      refItem = refItem.replace(/\<i\>|\<\/i\>/g, '') // Get rid of italic markup
      let re = references.find(function(r) { return r.referencekey === refItem.replace('&#x26;', '&').trim()})
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
      let i = 0
      lookup.forEach(refItem => {
        let pIdx = photos.findIndex(function(p) { return p.photokey === refItem.trim()})
        if (pIdx >= 0) {
          photoItems += `
            <a @click="photoClick">` + (i++ > 0 ? ', ' :  '' ) + refItem.trim() + `</a><div class="modal photo-modal">
              <div @click="closePhotoModal" class="modal-background"></div>
              <div class="modal-content has-text-centered">
                <figure style="padding: 2%;">
                  <g-image style="max-height: calc(100vh - 120px); width: auto;" :src="photos[` + pIdx + `].photourl"></g-image>
                </figure>
                <figcaption class="has-text-centered">
                  <div class="is-size-6 is-size-7-mobile has-text-white" v-html="photos[` + pIdx + `].photocaption">
                  </div>
                </figcaption>
              </div>
              <button @click="closePhotoModal" class="modal-close is-large" aria-label="close"></button>
            </div>
          `
        }
      })
      if (photoItems != '') {
        // Get rid of all blanks to avoid formatting glitches
        return ('(' + photoItems.trim().replace(/\n\s*|\r\s*/g, "") + ')')
      }
    }
    return match
  })
  return '<div>' + r  + '</div>'
}

function processContent(text, photos) {

  // Replace mardownified content <p> with <div> so that <div> elements can be inserted
  let r = text.replace(/<p>/g, '<div class="d-content">').replace(/<\/p>/g, '</div>')

  r = r.replace(/\{.*?\}/g, function (match, offset) {
    let item = ((match.replace(/[{\{\}}]/g, '')))
    let pIdx = photos.findIndex(function(p) { return p.photokey === item.trim()})

    if (pIdx >= 0) {
      return `
        <div class="inline-figure has-text-centered">
          <br>
          <figure style="padding: 2%;">
            <g-image :src="photos[` + pIdx + `].photourl"></g-image>
          </figure>
          <figcaption style="max-width: 80%; margin: 0 auto;">
            <div class="is-size-6 is-size-7-mobile" v-html="photos[` + pIdx + `].photocaption"></div>
          </figcaption>
          <br>
        </div>
      `
    } else {
      return match
    }
  })

  return r
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
    photos: {type: Array, required: false},
    isContent: {type: Boolean, required: false}
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
    injectReferencesAndModalPhotos: function() {
      let text
      if (this.isContent) {
        text = processContent(this.text, this.photos)
      } else {
        text = this.text
      }
      return addPopovers(text, this.refs, this.photos)
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
