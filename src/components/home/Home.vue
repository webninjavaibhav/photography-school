

<template>
  <div class="hero-section">
    <div class="container">
      <div class="hero-data">
        <div class="website-logo">
          <img src="@/assets/images/ips-logo.svg" alt="" />
        </div>
        <div class="hero-description">
          <div class="top-title">NEW COURSE</div>
          <h1 class="title">iPhone Photo Academy</h1>
          <p class="description">Sign up now to get notified when this course is available!</p>
          <InputComponent
            placeholder="Enter your Email Address"
            :isError="isError"
            @on-change="onTextChnageHadler"
          />
          <ButtonComponent @click="onSubmit">Please Notify Me</ButtonComponent>
        </div>
      </div>
      <div class="mobile-container">
        <MobileCarousel :autoplay="8000" :slides="slides" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { ref } from 'vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import InputComponent from '@/components/common/InputComponent.vue'
import MobileCarousel from '@/components/common/mobileCarousel/MobileCarousel.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
export default {
  setup() {
    /**
     *  References
     */
    const slides = ref<string[]>([
      'carousel-photo-01.jpg',
        'carousel-photo-02.jpg',
        'carousel-photo-03.jpg',
        'carousel-photo-04.jpg',
      ])
    const emailText = ref<string>('')
    const isError = ref<boolean>(false)

    /**
     *  Funtions
     */
    const onTextChnageHadler = (text: string) => {
      isError.value = false
      emailText.value = text
    }

    const onSubmit = () => {
      const rgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailText.value && rgx.test(emailText.value)) {
        router.push('/thank-you')
      } else {
        isError.value = true
      }
    }

    return {
      slides: slides.value,
      onTextChnageHadler,
      onSubmit,
      isError
    }
  },
  components: {
    MobileCarousel,
    InputComponent,
    ButtonComponent,
    ProgressBar
  }
}
</script>

<style scoped>
.container {
  max-width: 1512px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 62px 156px;
}
.progressBar {
  display: flex;
  justify-content: center;
  width: 224px;
  margin: auto;
  gap: 10px;
}

.hero-data {
  display: flex;
  flex-direction: column;
  gap: 181px;
}

.hero-description {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 449px;
}
.top-title {
  width: 128px;
  height: 28px;
  background: var(--Badge);
  border-radius: 32px;
  letter-spacing: 2px;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 63px;
  line-height: 63px;
}

.description {
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  max-width: 298px;
  margin-top: 16px;
}

@media (max-width: 1224px) {
  .container {
    padding: 62px 56px;
  }
}

@media (max-width: 790px) {
  .hero-description {
    margin: auto;
  }
  .container {
    grid-template-columns: 1fr;
    padding: 79px 16px;
  }
  .website-logo {
    display: none;
  }

  .title {
    font-size: 40px;
    line-height: 48px;
  }
  .description {
    margin-top: 0px;
    font-size: 22px;
    line-height: 30px;
  }
}
</style>
