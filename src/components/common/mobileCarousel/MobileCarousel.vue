<template>
  <div class="phone-section">
    <div class="phone-image">
      <img class="phone-image-mokup" :src="mobileScreenUrl" />
      <div>
        <img :class="carouselImgClass" :src="activeImgUrl" alt="" />
        <img :class="carouselImgBgClass" :src="activeImgUrl" alt="" />
      </div>
      <img :class="smallCarouselImgClass" :src="lastImgUrl" alt="" />
      <img class="zoom-btn" src="@/assets/images/FE-test-assets.svg" alt="" />
      <div class="phone-screen-bg" src="" alt=""></div>
      <div class="phone-screen-thumbnail"></div>
      <button @click="onClickHandler"></button>
    </div>
    <div class="progress-bar" 
        v-if="slides?.length">
      <ProgressBar
        :activeSlide="activeSlide"
        :timer="autoPlayDefaultTimer"
        :totalSlide="totalSlidesLength"
      />
    </div>
  </div>
</template>

<script lang="ts">
import type { LooseRequired } from '@vue/shared'
import {
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted,
  type PropType,
  watchEffect
} from 'vue'
import type { IProps } from './mobileTypes'
import ProgressBar from '@/components/common/ProgressBar.vue'
import { getcurrentUrl } from '@/utils/utils'
import { useBreakpoint } from '@/composables/useBreakpoint'
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
    const autoPlayTimer = ref<number>(Math.round(autoPlayDefaultTimer.value / 1000))
    const isSlideChange = ref<boolean>(false)
    const breakpoint = useBreakpoint()
    const mediaCode = ref<string>('')

    /**
     *  Funtions
     */
    const autoPlayTimerHandler = () => {
      if (autoPlayTimer.value >= 0) {
        autoPlayTimer.value = --autoPlayTimer.value
      }
    }

    const fadeEffectHandler = (duration: number) => {
      isSlideChange.value = true
      setTimeout(() => {
        activeSlide.value =
          activeSlide.value === slidesItem.value.length - 1 ? 0 : activeSlide.value + 1
        isSlideChange.value = false
      }, duration)
    }

    const onClickHandler = () => {
      autoPlayTimer.value = Math.round(autoPlayDefaultTimer.value / 1000)
      fadeEffectHandler(100)
    }

    watch(
      () => breakpoint,
      () => {
        console.log(breakpoint.mediaCode.value)
      }
    )

    watchEffect(() => {
      mediaCode.value = breakpoint.mediaCode.value ? breakpoint.mediaCode.value : ''
    })

    /**
     *  Computeds
     */
    const activeImgUrl = computed(() =>
      getcurrentUrl(
        slidesItem.value?.length && mediaCode.value
          ? slidesItem.value?.[activeSlide.value]
          : '',
        mediaCode.value
      )
    )

    const totalSlidesLength = computed(() => slidesItem.value?.length || 0)

    const mobileScreenUrl = computed(() => getcurrentUrl('iPhone-mokup.png', mediaCode.value))

    const lastImgUrl = computed(() => {
      if (!activeSlide.value) {
        return getcurrentUrl(
          slidesItem.value?.length && mediaCode.value
            ? `small-${slidesItem.value?.[slidesItem.value?.length - 1]}`
            : '',
          mediaCode.value
        )
      }
      return getcurrentUrl(
        slidesItem.value?.length
          ? `small-${slidesItem.value?.[activeSlide.value - 1]}`
          : '',
        mediaCode.value
      )
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
        autoPlayTimer.value = Math.round(autoPlayDefaultTimer.value / 1000)
        fadeEffectHandler(300)
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
      autoPlayDefaultTimer,
      breakpoint,
      mobileScreenUrl,
      totalSlidesLength,
    }
  },
  provide: {},
  components: {
    ProgressBar,
  }
}
</script>

<style scoped>
.phone-image-mokup {
  max-width: 335px;
  position: absolute;
  z-index: 0;
}
.phone-screen-bg {
  background-color: black;
  left: 14px;
  top: 112.5px;
  position: absolute;
  width: 308px;
  height: 423px;
  z-index: 0;
}

.phone-screen-thumbnail {
  left: 26px;
  bottom: 69.6px;
  position: absolute;
  background-color: black;
  width: 42px;
  height: 42px;
  z-index: 0;
}
.carousel-img {
  max-width: 306px;
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
  max-width: 40px;
  left: 27px;
  bottom: 70.6px;
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
  bottom: 18px;
  transform: translate(-50px, -50px);
  cursor: pointer;
}
.phone-image {
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
  display: flex;
}
</style>
