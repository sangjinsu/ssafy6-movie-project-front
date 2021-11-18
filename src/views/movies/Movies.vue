<template>
  <div>
    <Header />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header";

export default {
  name: "Movies",
  components: {
    Header,
  },
};
</script>

<style></style>
