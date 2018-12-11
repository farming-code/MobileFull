<template>
  <div>
    <child />
  </div>
</template>

<script>
import GoHome from '@/components/Common/GoHome';
export default {
  name: 'TheHostPortrait',
  components: {
    child: GoHome
  }
};
</script>

<style scoped>
</style>
