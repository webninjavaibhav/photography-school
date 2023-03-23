<template>
  <div class="phone-section">
    <div class="phone-image">
      <div>
        <img :class="carouselImgClass" :src="getcurrentUrl(activeImgUrl)" alt="" />
        <img :class="carouselImgBgClass" :src="getcurrentUrl(activeImgUrl)" alt="" />
      </div>
      <img :class="smallCarouselImgClass" :src="getcurrentUrl(lastImgUrl)" alt="" />
      <img class="zoom-btn" src="../../../assets/images/FE-test-assets.svg" alt="" />
      <div class="phone-screen-bg" src="" alt=""></div>
      <div class="phone-screen-thumbnail"></div>
      <button @click="onClickHandler"></button>
    </div>
    <div class="progress-bar">
      <ProgressBar
        :activeSlide="activeSlide"
        :activeIndex="index"
        v-for="(_, index) in slides?.images?.length"
      />
    </div>
  </div>
</template>

<script lang="ts">
import type { LooseRequired } from '@vue/shared'
import { ref, computed, watch, onMounted, onUnmounted, defineProps, type PropType } from 'vue'
import type { IProps } from './mobileTypes'
import ProgressBar from '../ProgressBar.vue'
export default {
  props: {
    autoplay: {
      type: Object as PropType<IProps['autoplay']>,
      required: false
    },
    slides: {
      type: Object as PropType<IProps['slides']>,
      required: true,
      default: () => Object
    },
    activeSlide: {
      type: Object as PropType<IProps['activeSlide']>,
      required: true,
      default: () => 0
    }
  },
  setup(props: Readonly<LooseRequired<IProps>>) {
    /**
     *  Refrence
     */
    const slidesItem = ref<any>(props.slides)
    const activeSlide = ref<number>(props.activeSlide || 0)
    const intervalRef = ref<any>()
    const autoPlayDefaultTimer = ref<number>(props.autoplay ? props.autoplay : 8000)
    const autoPlayTimer = ref<number>(autoPlayDefaultTimer.value / 1000)
    const isSlideChange = ref<boolean>(false)

    /**
     *  Funtions
     */
    const autoPlayTimerHandler = () => {
      if (autoPlayTimer.value >= 0) {
        autoPlayTimer.value = --autoPlayTimer.value
      }
    }

    const fadeEffectHandler = () => {
      isSlideChange.value = true
      setTimeout(() => {
        activeSlide.value =
          activeSlide.value === slidesItem.value.images.length - 1 ? 0 : activeSlide.value + 1
        isSlideChange.value = false
      }, 300)
    }

    const getcurrentUrl = (url: string) => {
      return new URL(`../../../assets/images/${url}`, import.meta.url).href
    }

    const onClickHandler = () => {
      autoPlayTimer.value = autoPlayDefaultTimer.value
      fadeEffectHandler()
    }

    /**
     *  Computeds
     */
    const activeImgUrl = computed(() =>
      slidesItem.value.images?.length ? slidesItem.value.images[activeSlide.value] : ''
    )

    const lastImgUrl = computed(() => {
      if (!activeSlide.value) {
        return slidesItem.value?.images?.length
          ? slidesItem.value?.smallImages[slidesItem.value.images.length - 1]
          : ''
      }
      return slidesItem.value?.images?.length
        ? slidesItem.value?.smallImages[activeSlide.value - 1]
        : ''
    })

    const carouselImgClass = computed(() => `carousel-img ${isSlideChange.value ? 'fade' : ''}`)
    const carouselImgBgClass = computed(
      () => `carousel-img mobile-bg-img ${isSlideChange.value ? 'fade' : ''}`
    )
    const smallCarouselImgClass = computed(
      () => `small-carousel-img ${isSlideChange.value ? 'fade' : ''}`
    )

    /**
     *  watchs
     */
    watch(autoPlayTimer, (newTimer) => {
      if (newTimer < 0) {
        autoPlayTimer.value = autoPlayDefaultTimer.value / 1000
        fadeEffectHandler()
      }
    })

    /**
     *  lifecycle
     */
    onMounted(() => {
      intervalRef.value = setInterval(autoPlayTimerHandler, 1000)
    })

    onUnmounted(() => {
      clearInterval(intervalRef.value)
    })

    return {
      slidesItem,
      activeSlide,
      activeImgUrl,
      getcurrentUrl,
      lastImgUrl,
      onClickHandler,
      isSlideChange,
      carouselImgClass,
      smallCarouselImgClass,
      autoPlayTimer,
      carouselImgBgClass,
      autoPlayDefaultTimer
    }
  },
  components: {
    ProgressBar
  }
}
</script>

<style scoped>
.phone-screen-bg {
  background-color: black;
  left: 14px;
  top: 114.5px;
  position: absolute;
  width: 308px;
  height: 416px;
  z-index: 0;
}

.phone-screen-thumbnail {
  left: 27px;
  bottom: 73.6px;
  position: absolute;
  background-color: black;
  width: 42px;
  height: 42px;
  z-index: 0;
}
.carousel-img {
  background-color: black;
  left: 14px;
  top: 115.5px;
  position: absolute;
  z-index: 1;
  -webkit-animation: fadein 0.5s ease-in-out alternate;
  -moz-animation: fadein 0.5s ease-in-out alternate;
  animation: fadein 0.5s ease-in-out alternate;

  opacity: 1;
  transition: opacity 0.4s;
}

.mobile-bg-img {
  filter: blur(60px);
  z-index: -1;
  height: 596px;
  top: 47px;
  left: 33px;
  width: 256px;
}
.carousel-img.fade {
  opacity: 0;
}
.small-carousel-img {
  left: 27px;
  bottom: 73.6px;
  position: absolute;
  opacity: 1;
  z-index: 1;
  transition: opacity 0.3s;
}
.small-carousel-img.fade {
  opacity: 0;
}
.phone-section {
  padding-top: 72px;
  position: relative;
}
button {
  width: 47px;
  height: 47px;
  border-radius: 50%;
  outline: none;
  border: none;
  bottom: 0;
  position: absolute;
  left: 58%;
  bottom: 20px;
  transform: translate(-50px, -50px);
  cursor: pointer;
}
.phone-image {
  background-image: url('../../../assets/images/iPhone-mokup.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  max-width: 335px;
  margin: auto;
  height: 692px;
}
@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.zoom-btn {
  position: absolute;
  bottom: 172.2px;
  left: 104px;
  z-index: 1;
}

.progress-bar {
  width: 244px;
  margin: auto;
  gap: 8px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);  
}
</style>
