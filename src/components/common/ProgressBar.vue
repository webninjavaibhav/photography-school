<template>
    <div class="progress">
      <div class="progress-done" v-if="activeSlide > activeIndex"></div>
      <div v-else-if="activeSlide === activeIndex" class="in-progress"></div>
      <div class="progress-pending" v-else></div>
    </div>
  </template>
  
  <script lang="ts">
  import { computed, ref, toRefs } from 'vue'
  
  export default {
    props: {
      activeSlide: {
        type: Number,
        require: true
      },
      activeIndex: {
        type: Number,
        require: true
      }
    },
    emits: ['on-change'],
    setup(props: any, context) {
      const { activeSlide, activeIndex } = toRefs(props)
      const timer = ref(props.timer)
      const totalSlide = ref(props.totalSlide)
      const onTextChage = (value: string) => {
        context.emit('on-change', value)
      }
  
      const isDone = computed(() => activeIndex.value < activeSlide.value)
  
      return {
        onTextChage,
        activeSlide,
        timer,
        totalSlide,
        activeIndex: activeIndex.value,
        isDone
      }
    }
  }
  </script>
  
  <style scoped>
  .progress-pending {
    height: 1px;
    width: 55px;
    background: #3a3a3a;
    border-radius: 1px;
    margin: auto;
  }
  .progress-done {
    height: 1px;
    width: 55px;
    background: #eeecec;
    border-radius: 1px;
    margin: auto;
  }
  .progress {
    position: relative;
    height: 1px;
    width: 55px;
    background: #3a3a3a;
    border-radius: 1px;
    margin: auto;
    margin-top: 30px;
  }
  .progress .in-progress {
    position: absolute;
    background: #eeecec;
    border-radius: 1px;
    width: 0px;
    height: 1px;
    animation: progres 9s linear;
  }
  @keyframes progres {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
  </style>