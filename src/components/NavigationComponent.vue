<template>
  <div class="font-normal text-sm bg-[#C82A5A] md:w-full lg:w-52 lg:h-[70em] z-0 text-white md:max-lg:w-full">
    <div class="user hidden md:block md:max-lg:hidden">
      <div class="flex justify-center pt-12">
        <img src="../assets/img/avatar.png" class="w-14 h-14 rounded-full">
      </div>
      <div class="flex justify-center mt-2">
        <div class="font-bold" v-if="this.userStore.jwtToken != null">{{ this.userStore.user.prenom}}</div>
      </div>
      <div class="flex justify-center mt-2">
        <div class="text-xs">
          <button @click="logOut" class="border p-1 rounded hover:bg-white hover:text-[#C82A5A] duration-500">
            Déconnexion
          </button>
        </div>
      </div>
    </div>
    <div class="nav mt-12 pl-5 pr-5 hidden md:block md:max-lg:hidden">
      <div class="flex flex-col">
        <div class="flex space-x-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>
          </svg>
          <router-link :to="{name:'home', params:{isAll: 1}}">Tous les tickets</router-link>
        </div>
        <div class="flex space-x-2 items-center mt-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
          </svg>
          <router-link :to="{name:'home', params:{isAll: 0}}">Mes tickets</router-link>
        </div>
        <div class="mt-12 underline">Admin :</div>
        <!-- Autres liens internes -->
        <router-link  to="/etat" class="flex space-x-2 items-center mt-2">
          <div>Etat</div>
        </router-link>
        <router-link  to="/salle" class="flex space-x-2 items-center mt-2">
          <div>Salle</div>
        </router-link>
        <router-link  to="/user" class="flex space-x-2 items-center mt-2">
          <div>User</div>
        </router-link>

        <div class="mt-12 underline">Autres liens :</div>
        <!-- Autres liens externes-->
        <a class="flex space-x-2 items-center mt-7" href="http://lelo.lpmr.info" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"/>
          </svg>
          <div>Lelo</div>
        </a>
        <a class="flex space-x-2 items-center mt-7" href="https://xorux.groupemontroland.fr/" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="w-5 h-5"><path d="M64 32C28.7 32 0 60.7 0 96v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm48 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM64 288c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V352c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm56 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/></svg>
          <div>Xorux</div>
        </a>
        <a class="flex space-x-2 items-center mt-7" href="https://client.hyper-print.net/?Login=EetwPyPi566G6nY56WB/cg==&Pwd=2ep3oCMdoCUXhZf" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
          <div>Lycée</div>
        </a>
        <a class="flex space-x-2 items-center mt-7" href="https://client.hyper-print.net/?Login=EeeSMx%2BJrsq89risb5Rwvw==&Pwd=6t26exfswofYaFX" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
          <div>Collège</div>
        </a>
      </div>
    </div>
    <div class="flex justify-between items-center lg:hidden p-2">
      <div class="">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
        </svg>
      </div>
      <div>
        <div class="font-extrabold text-3xl">MSI</div>
      </div>
      <div class="">
        <div class="font-light">Toufick</div>
      </div>
    </div>
  </div>
</template>

<script>
import {useUserStore} from "@/stores/user";
import router from "@/router";

export default {
  name: "NavigationComponent",
  methods: {
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
}
</script>

<style scoped>

</style>