<template>
  <div class="swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <slot name="items"></slot>
    </div>

    <slot name="controls"></slot>

    <!-- If we need pagination 
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-scrollbar"></div>
    -->
  </div>
</template>

<script>
import Swiper from "swiper";
const DEFAULT_EVENTS = [
  "beforeDestroy",
  "slideChange",
  "slideChangeTransitionStart",
  "slideChangeTransitionEnd",
  "slideNextTransitionStart",
  "slideNextTransitionEnd",
  "slidePrevTransitionStart",
  "slidePrevTransitionEnd",
  "transitionStart",
  "transitionEnd",
  "touchStart",
  "touchMove",
  "touchMoveOpposite",
  "sliderMove",
  "touchEnd",
  "click",
  "tap",
  "doubleTap",
  "imagesReady",
  "progress",
  "reachBeginning",
  "reachEnd",
  "fromEdge",
  "setTranslate",
  "setTransition",
  "resize",
  "observerUpdate"
];

export default {
  name: "swiper",
  props: {
    options: {
      type: Object
    },
    globalOptions: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data() {
    return {
      swiper: null
    };
  },
  ready() {
    if (!this.swiper) {
      this.mountInstance();
    }
  },
  activated() {
    this.update();
  },
  updated() {
    this.update();
  },
  beforeDestroy() {
    this.$nextTick(function() {
      if (this.swiper) {
        this.swiper.destroy && this.swiper.destroy();
        delete this.swiper;
      }
    });
  },
  methods: {
    update() {
      if (this.swiper) {
        this.swiper.update && this.swiper.update();
        this.swiper.navigation && this.swiper.navigation.update();
        this.swiper.pagination && this.swiper.pagination.render();
        this.swiper.pagination && this.swiper.pagination.update();
      }
    },
    mountInstance() {
      const swiperOptions = Object.assign({}, this.globalOptions, this.options);
      this.swiper = new Swiper(this.$el, swiperOptions);
      this.bindEvents();
      this.$emit("ready", this.swiper);
    },
    bindEvents() {
      const vm = this;
      DEFAULT_EVENTS.forEach(eventName => {
        this.swiper.on(eventName, function() {
          vm.$emit(eventName, ...arguments);
          vm.$emit(
            eventName.replace(/([A-Z])/g, "-$1").toLowerCase(),
            ...arguments
          );
        });
      });
    }
  }
};
</script>

<style>
</style>