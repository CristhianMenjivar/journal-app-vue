<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-3 fw-light">{{ yearDay }}</span>
      </div>

      <div>
        <button
          v-if="entry.id"
          @click="deleteEntry"
          class="btn btn-danger mx-2"
        >
          <i class="fa fa-trash-alt"></i>
        </button>

        <input
          type="file"
          @change="onSelectedImage"
          ref="imageSelector"
          v-show="false"
          accept="image/png, image/jpeg"
        />

        <button class="btn btn-primary" @click="onSelectImage">
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>

    <hr />

    <div class="d-flex flex-column px-3 h-75">
      <textarea v-model="entry.text" placeholder="Qué sucedió hoy?"></textarea>
    </div>

    <img
      v-if="localImage"
      class="img-thumbnail img-entry"
      :src="localImage"
      alt="entry-picture"
    />
    <img
      v-else-if="entry.picture"
      class="img-thumbnail img-entry"
      :src="entry.picture"
      alt="entry-picture"
    />

    <Fab icon="fa-save" @on:click="saveEntry" />
  </template>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import getDayMonthYear from "../helpers";
import uploadImage from "../helpers/uploadImage";
import Swall from "sweetalert2";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },
  data() {
    return {
      entry: null,
      localImage: null,
      fileImage: null,
    };
  },
  methods: {
    ...mapActions("journal", [
      "updateEntries",
      "createEntries",
      "deleteEntries",
    ]),
    onSelectedImage(event) {
      const file = event.target.files[0];
      if (!file) {
        this.localImage = null;
        return;
      }

      this.fileImage = file;

      const fileReader = new FileReader();
      fileReader.onload = () => (this.localImage = fileReader.result);
      fileReader.readAsDataURL(file);
    },
    onSelectImage() {
      this.$refs.imageSelector.click();
    },
    loadEntry() {
      let entry;

      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
          picture: null,
        };
      } else {
        entry = this.getEntriesById(this.id);

        if (!entry) return this.$router.push({ name: "no-entry" });
      }

      this.entry = entry;
    },
    async saveEntry() {
      new Swall({
        title: " Espere por favor",
        allowOutsideClick: false,
      });

      Swall.showLoading();

      const picture = await uploadImage(this.fileImage);
      this.entry["picture"] = picture;

      if (this.entry.id) {
        await this.updateEntries(this.entry);
      } else {
        const id = await this.createEntries(this.entry);

        this.$router.push({
          name: "entry",
          params: {
            id,
          },
        });
      }

      this.localImage = null;

      // Swall.hideLoading();
      Swall.fire("Guardado", "Entrada registrada con exito", "success");
    },
    async deleteEntry() {
      const { isConfirmed } = await Swall.fire({
        title: "Estas seguro?",
        text: "Una vez borrado no se puede recuperar",
        showDenyButton: true,
        confirmButtonText: "Si, estoy seguro",
      });

      if (isConfirmed) {
        new Swall({
          title: " Espere por favor",
          allowOutsideClick: false,
        });

        Swall.showLoading();

        const id = await this.deleteEntries(this.entry.id);

        if (id)
          this.$router.push({
            name: "no-entry",
          });

        Swall.fire("Eliminado", "", "success");
      }
    },
  },
  created() {
    this.loadEntry();
  },
  watch: {
    id() {
      this.loadEntry();
    },
  },
  computed: {
    ...mapGetters("journal", ["getEntriesById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:hover {
    outline: none;
  }
}
.img-entry {
  width: 200px;
  height: 200px;
  position: fixed;
  bottom: 140px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
