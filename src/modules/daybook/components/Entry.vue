<template>
  <div
    class="entry-container pointer p-3"
    @click="$router.push({ name: 'entry', params: { id: entrie.id } })"
  >
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">{{ day }}</span>
      <span class="mx-1 fs-5">{{ month }}</span>
      <span class="mx-2 fw-light">{{ yearDay }}</span>
    </div>

    <div class="entry-description">{{ shortText }}</div>
  </div>
</template>

<script>
import getDayMonthYear from "../helpers";
export default {
  props: {
    entrie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    shortText() {
      return this.entrie.text.length > 130
        ? this.entrie.text.substring(0, 130) + "..."
        : this.entrie.text;
    },
    day() {
      const { day } = getDayMonthYear(this.entrie.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entrie.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entrie.date);
      return yearDay;
    },
  },
};
</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all ease-in;

  &:hover {
    background: lighten($color: gray, $amount: 45);
    transition: 0.2s all ease-in;
  }

  .entry-description {
    font-size: 12px;
  }
}
</style>
