<template>
  <button @click="$emit('on:click')" class="btn btn-primary">
    <li :class="iconClass"></li>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "fa-plus",
    },
  },
  computed: {
    iconClass() {
      return `fa fa-2x ${this.icon}`;
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  border-radius: 50%;
  bottom: 20px;
  height: 80px;
  position: fixed;
  right: 20px;
  width: 80px;
}
</style>
