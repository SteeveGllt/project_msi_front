<template>
  <div>
    <a
      class="text-blueGray-500 block"
      href="#pablo"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
    >
      <div class="items-center flex space-x-2">
        <div class="font-bold text-sm text-white" v-if="this.userStore.jwtToken != null">{{ this.userStore.user.prenom}}</div>
        <span
          class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
        >
          <img src="../../assets/img/avatar.png"
               class="w-full rounded-full align-middle border-none shadow-lg"
            :src="image"
          />
        </span>
      </div>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <router-link to="/user-info" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
        Changer de mot de passe
      </router-link>
      <div class="h-0 my-2 border border-solid border-blueGray-100" />
      <a href="#" @click="logOut"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer"
      >
        Logout
      </a>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";

import image from "@/assets/img/avatar.png";
import {useUserStore} from "@/stores/user";
import router from "@/router";

export default {
  data() {
    return {
      dropdownPopoverShow: false,
      image: image,
    };
  },
  methods: {
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
    logOut() {
      let removeToken = localStorage.removeItem('access_token');
      if (removeToken == null) {
        const usersStore = useUserStore();
        usersStore.changeUserLog();
        localStorage.clear();
        router.push("/login");
      }
    }
  },
  setup() {
    const userStore = useUserStore();
    return {userStore};
  }
};
</script>
