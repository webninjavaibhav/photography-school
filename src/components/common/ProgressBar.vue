<template>
  <div class="progress" v-for="(_, index) in Array(totalSlide)" ref="progress">
    <div class="progress-done" v-if="activeSlide > index"></div>
    <div v-else-if="activeSlide === index" class="in-progress"></div>
    <div class="progress-pending" v-else></div>
  </div>
</template>

<script lang="ts">
import type { LooseRequired } from '@vue/shared';
import { onMounted, onUpdated, ref, toRefs} from 'vue'
interface IPropgressBar {
  activeSlide: number;
  timer: number;
  totalSlide: number;
}
export default {
  props: {
    activeSlide: {
      type: Number,
      require: true,
      default: () => 0
    },
    timer: {
      type: Number,
      require: true,
      default: () => 0
    },
    totalSlide: {
      type: Number,
      require: true,
      default: () => 0
    }
  },
  setup(props: Readonly<LooseRequired<IPropgressBar>>) {
    const progress = ref<any>(null)
    const { activeSlide,  timer, totalSlide } = toRefs(props)

    onMounted(() => {
      if (progress.value) {
        progress.value[0].children[0].style['animationDuration'] = `${
          Math.round(timer.value / 1000) + 0.3
        }s`
        progress.value[0].children[0].style['animationPlayState'] = 'running'
      }
    })

    onUpdated(() => {
      if (progress.value) {
        progress.value[activeSlide.value].children[0].style['animationDuration'] = `${
          Math.round(timer.value / 1000) + 0.3
        }s`
        progress.value[activeSlide.value].children[0].style['animationPlayState'] = 'running'
      }
    })

    return {
      activeSlide,
      totalSlide: totalSlide.value,
      progress
    }
  }
}
</script>

<style scoped>
.progress-pending {
  height: 1px;
  width: 100%;
  background: #3a3a3a;
  border-radius: 1px;
  margin: auto;
}
.progress-done {
  height: 1px;
  width: 100%;
  background: #eeecec;
  border-radius: 1px;
  margin: auto;
}
.progress {
  position: relative;
  height: 1px;
  width: 100%;
  background: #3a3a3a;
  border-radius: 1px;
  margin: auto;
  margin-top: 30px;
}
.progress .in-progress {
  position: absolute;
  background: #eeecec;
  border-radius: 1px;
  width: 100%;
  height: 1px;
  animation: progressbar-countdown;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: paused;
  animation-timing-function: linear;
}
@keyframes progressbar-countdown {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>
