<template>
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import HelloWorld from '@/features/HelloWorld/components/HelloWorld.vue';

export default defineComponent({
  name: 'Home',

  components: {
    HelloWorld,
  },
});
</script>
