<template>
  
  <div class="loader-wrapper" v-show="false">
    <div class="loader-index"><span></span></div>
    <svg>
      <defs></defs>
      <filter id="goo">
       
      </filter>
    </svg>
  </div>
  <BaseLoading />
  <router-view v-show="!loading"></router-view>
  
</template>

<script>
import BaseLoading from "@/components/BaseLoading";
export default {
  name: "App",
  components: {
    BaseLoading
  },
  data() {
    return {
      loading: true,
    };
  },
  watch: {
    $route() {
      setTimeout(() => {
        this.loading = !this.loading;
      }, 1000);
      this.loading = !this.loading;
    },
  },
  mounted() {
    this.loading = false;
  },
};
</script>

