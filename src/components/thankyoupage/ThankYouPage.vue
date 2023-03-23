<script lang="ts">
import ButtonComponent from '@/components/common/ButtonComponent.vue';
export default {
setup() {
  const onSubscride = () => {
    window.location.href = "https://www.youtube.com/user/iPhonePS"
  }
  return { onSubscride }
},
components: {
  ButtonComponent
}
}
</script>

<template>
  <div class="container">
    <h1 class="title">Thank You!</h1>
    <p class="description">You will get notified when iPhone Photo Academy becomes available</p>
    <ButtonComponent @click="onSubscride">Subscribe To Our Youtube Channel</ButtonComponent>
  </div>
</template>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .title {
    font-weight: 400;
    font-size: 32px;
    line-height: 48px;
    font-family: 'Montserrat', sans-serif;
  }
  .description {
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
    max-width: 318px;
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 16px;
  }
</style>
