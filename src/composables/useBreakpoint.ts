import {
  computed, onMounted, onUnmounted, ref,
} from 'vue';

const defaultBreakpointMap = {
  sm: 768,
  md: 1024,
  lg: 1904,
};

export const useBreakpoint = (breakpointMap = defaultBreakpointMap) => {
  const screenWidth = ref(window?.innerWidth);
  const screenHeight = ref(window?.innerHeight);

  const onSizeChange = () => {
    screenWidth.value = window?.innerWidth;
    screenHeight.value = window?.innerHeight;
  };

  onMounted(() => window?.addEventListener('resize', onSizeChange));
  onUnmounted(() => window?.removeEventListener('resize', onSizeChange));

  const mediaCode = computed(() => {
    if (screenWidth.value < breakpointMap.sm
    ) return 'sm';
    else if (
      screenWidth.value >= breakpointMap.sm
        && screenWidth.value < breakpointMap.md
    ) return 'md';
    else if (
      screenWidth.value > breakpointMap.md 
    ) return 'lg';
    else return null;
  });

  return { screenWidth, screenHeight, mediaCode };
};
