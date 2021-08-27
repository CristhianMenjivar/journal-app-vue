<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <h1>Hola mundo</h1>
    <button class="btn btn-primary" @click="goToDyabook">primary</button>
    <button class="btn btn-secondary">secondary</button>
    <button class="btn btn-success">success</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToDyabook() {
      this.$router.push({
        name: "daybook",
      });
    },
  },
};
</script>
