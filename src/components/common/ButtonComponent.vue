<template>
  <button @click="onClick" class="button-component"><slot></slot></button>
</template>

<script lang="ts">
import { toRefs } from 'vue'

export default {
  props: {
    children: {
      type: String,
      require: true,
      default: () => ({})
    }
  },
  emits: ['click'],
  setup(props, context) {
    const { children } = toRefs(props)
    const onClick = () => {
      context.emit('click')
    }
    return { children, onClick }
  }
}
</script>

<style scoped>
.button-component {
  padding: 16px 35.5px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  cursor: pointer;
  color: #eeecec;
  width: fit-content;
  background: linear-gradient(135deg, #370c14 0%, #280c23 100%) padding-box,
    linear-gradient(to left, rgba(212, 28, 61, 1), rgba(134, 27, 131, 1)) border-box;
  border: 1px solid transparent;
  border-radius: 10px;
}
.button-component:hover {
  background: linear-gradient(135deg, #62051c 0%, #440c3a 100%) padding-box,
    linear-gradient(to left, rgba(212, 28, 61, 1), rgba(134, 27, 131, 1)) border-box;
  border: 1px solid transparent;
}

@media (max-width: 790px) {
  .button-component {
    width: 100%;
  }
}
</style>
