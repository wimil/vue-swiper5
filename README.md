# Vue-Swiper5
[Swiper5](https://swiperjs.com/) component for Vue, support pc and mobile, SPA

# Example

# Install
#### NPM

``` bash
npm install vue-swiper5 --save
```

### Mount

#### mount with global

``` javascript
import Vue from 'vue'
import VueSwiper5 from 'vue-swiper5'

// require styles
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)
```

#### mount with component

```javascript
// require styles
import 'swiper/css/swiper.css'

import { swiper } from 'vue-swiper5'

export default {
  components: {
    swiper
  }
}
```


#### custom swiper plugin

```javascript
import Swiper from 'swiper'
Swiper.use({
  name: 'pluginName',
  params: {
    pluginSwitch: false,
  },
  on: {
    init() {
      if (!this.params.pluginSwitch) return
      console.log('init')
    },
    // swiper callback...
  }
})
```


### Difference

**SSR and the only difference in the use of the SPA:**
- SPA worked by the `component`, find swiper instance by `ref attribute`.
- Other configurations, events are the same.

### SPA

```vue
<!-- The ref attr used to find the swiper instance -->
<template>
  <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
    <!-- slides -->
    <template v-slot:items>
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
    </template>
    <!-- Optional controls -->
    <template v-slot:controls>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-scrollbar"></div>
    </template>
  </swiper>
</template>

<script>
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          // some swiper options/callbacks
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // current swiper instance
      console.log('this is current swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    }
  }
</script>
```

### Async data example

```vue
<template>
  <swiper :options="swiperOption">
    <template v-slot:items>
        <div class="swiper-slide" v-for="(slide, index) in swiperSlides" :key="index">I'm Slide {{ slide }}</div>
    </template>
    <!-- Optional controls -->
    <template v-slot:controls>
        <div class="swiper-pagination"></div>
    </template>
  </swiper>
</template>

<script>
  export default {
    name: 'carrousel-items',
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        },
        swiperSlides: [1, 2, 3, 4, 5]
      }
    },
    mounted() {
      setInterval(() => {
        console.log('simulate async data')
        if (this.swiperSlides.length < 10) {
          this.swiperSlides.push(this.swiperSlides.length + 1)
        }
      }, 3000)
    }
  }
</script>
```

# API
Swiper's API and configuration can be used.
- [Swiper5 documents](https://swiperjs.com/api/)

