//create by rldev25@gmail.com
import Swiper from "swiper";
import SwiperComponent from "./components/Swiper.vue";

const swiper = SwiperComponent;

const install = function(Vue, globalOptions) {
  if (globalOptions) {
    SwiperComponent.props.globalOptions.default = () => globalOptions;
  }
  Vue.component(SwiperComponent.name, SwiperComponent);
};

const VueSwiper = { Swiper, swiper, install };

export default VueSwiper;
export { Swiper, swiper, install };
