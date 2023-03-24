<template>
  <div class="input-container">
    <input
      :placeholder="placeholderValue"
      @input="(e: any) => onTextChage(e.target.value)"
      :class="`input-component ${isError ? 'input-error' : ''}`"
    />
    <img class="mail-img" src="@/assets/images/mail-icon.svg" alt="" />
    <div class="error-input" v-if="isError">Please enter a valid email</div>
    <div class="enter-input" v-if="placeholderRef && !isError">Enter your Email Address</div>
  </div>
</template>

<script lang="ts">
import { ref, toRefs } from 'vue'

export default {
  props: {
    children: {
      type: String,
      require: true,
      default: () => ({})
    },
    isError: {
      type: Boolean,
      require: false
    },
    placeholder: {
      type: String,
      require: false
    }
  },
  emits: ['on-change'],
  setup(props, context) {
    const { children, isError, placeholder: placeholderValue } = toRefs(props)
    const placeholderRef = ref(false)
    const onTextChage = (value: string) => {
      if (!value.length) placeholderRef.value = false
      else placeholderRef.value = true
      context.emit('on-change', value)
    }
    return { children, onTextChage, isError, placeholderRef, placeholderValue }
  }
}
</script>

<style scoped>
.error-input {
  position: absolute;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #d41c3d;
  top: 4px;
  left: 17px;
}
.enter-input {
  position: absolute;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #3a3a3a;
  top: 4px;
  left: 17px;
}
.input-container {
  position: relative;
}
.input-component {
  color: #eeecec;
  height: 62px;
  border: 1px solid #3a3a3a;
  border-radius: 6px;
  background: #171715;
  padding: 20px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  outline: none;
  position: relative;
  transition: 0.3s;
  caret-color: #eeecec;
}
.mail-img {
  position: absolute;
  right: 18px;
  top: 19px;
  bottom: 23px;
}
.input-error {
  border: 1px solid rgba(212, 28, 61, 1);
}
</style>
