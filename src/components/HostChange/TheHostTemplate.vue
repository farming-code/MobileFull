<template>
  <div>
    <child />
  </div>
</template>

<script>
import GoHome from '@/components/Common/GoHome';
export default {
  name: 'TheHostTemplate',
  components: {
    child: GoHome
  }

};
</script>

<style scoped>
</style>
