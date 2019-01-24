<template>
  <div class="home">
    <Hero/>
    <Intro/>
    <SignIn v-if="!authenticated"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import Intro from "@/components/Intro.vue";
import SignIn from "@/components/SignIn.vue";

export default {
  name: "home",
  components: {
    Hero,
    Intro,
    SignIn
  },
  computed: {
    authenticated: function() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>
