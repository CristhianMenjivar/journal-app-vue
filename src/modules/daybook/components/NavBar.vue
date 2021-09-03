<template>
  <nav class="navbar bg-primary">
    <i class="navbar-brand text-white">
      <img
        src="@/assets/logo.png"
        alt="Vue logo"
        height="24"
        class="d-inline-block aling-text-top mx-2"
      />

      {{ currentUser.name }}
    </i>

    <div class="d-flex">
      <button @click="onLogout" class="btn btn-outline-info mx-2">
        <i class="fa fa-sign-out-alt"></i>
      </button>
    </div>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";
import useAuh from "@/modules/auth/composables/useAuth";
export default {
  setup() {
    const router = useRouter();
    const { currentUser, logout } = useAuh();

    return {
      currentUser,
      onLogout: () => {
        logout();
        router.push({ name: "login" });
      },
    };
  },
};
</script>
