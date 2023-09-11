<template>
  <div>
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div
            class="absolute top-0 w-full h-full bg-no-repeat bg-cover"
            :style="`background-image: url('${registerBg2}');`"
        ></div>
        <div class="container mx-auto px-4 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4">
              <div
                  class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div class="rounded-t mb-0 px-6 py-6">
                  <div class="text-center mb-3">
                    <h6 class="text-blueGray-500 text-sm font-bold">
                      MSI
                    </h6>
                  </div>
                  <div class="btn-wrapper text-center">
                  </div>
                  <hr class="mt-6 border-b-1 border-blueGray-300"/>
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form @submit.prevent="login">
                    <div class="relative w-full mb-3">
                      <label
                          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                          type="text" v-model="this.email" name="email"
                          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Email"
                      />
                    </div>

                    <div class="relative w-full mb-3">
                      <label
                          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                          type="password" v-model="this.password" name="password"
                          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                      />
                    </div>

                    <div class="text-center mt-6">
                      <button
                          class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div class="flex flex-wrap mt-6 relative">
                    <div class="w-1/2">
                        <button @click="generateToken()">Forgot password?</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import Navbar from "@/components/Navbars/AuthNavbar.vue";
import FooterSmall from "@/components/Footers/FooterSmall.vue";
import registerBg2 from "@/assets/img/illustration.png";
import axios from "axios";
import {useUserStore} from "@/stores/user";
import router from "@/router";
import jwtInterceptorSetup from "@/Interceptors/JwtInterceptor"
import {useToast} from "vue-toastification";

jwtInterceptorSetup();

export default defineComponent({
  name: "Auth",
  data() {
    return {
      registerBg2,
      email: "" as String,
      password: "" as String,
      apiUrl:"" as String,
    }
  },
  setup() {
    const toast = useToast();
    return {toast}
  },
  methods: {
    generateToken(){
      if(this.email === ""){
        this.toast.error("Veuillez rentrer un mail");
      }else{
        axios.post(this.apiUrl + "generate-token/" + this.email)
            .then(res => {
              if(res.data.code === 501){
                this.toast.error(res.data.message);
              }else if(res.data.code === 500){
                this.toast.error("Une erreur inconnu est survenue veuillez vous adressez ou gens qui ont des compétences en développement (et des cheveux)");
              }else{
                this.toast.success(res.data.message);
              }
            })
      }
    },
    login() {
      if ((this.email != null && this.email != "") && (this.password != null && this.password != "")) {
        axios.post(this.apiUrl + "login_check", {
          username: this.email,
          password: this.password,
        }).then(res => {
          localStorage.setItem('access_token', res.data.token);
          const usersStore = useUserStore();
          usersStore.changeUserLog();
          const username = (JSON.parse(atob(usersStore.jwtToken.split('.')[1]))).username;
          axios.get(this.apiUrl + "utilisateur/" + username)
              .then(res => {
                usersStore.user.id = res.data.id as number;
                usersStore.user.nom = res.data.nom as string;
                usersStore.user.prenom = res.data.prenom as string;
                usersStore.isLoginPage = false;
                localStorage.setItem('user_id', usersStore.user.id);
                localStorage.setItem('user_nom', usersStore.user.nom);
                localStorage.setItem('user_prenom', usersStore.user.prenom);
              })
              .catch(err => {
                this.toast.error("Un problème est survenu !");
              });
          router.push({name: 'home', params: {isAll: 1}});
        }).catch(error => {
          if (error.response == undefined) {
            this.toast.error("La connexion avec le serveur à échouer, réessaie plus tard !");
          } else if (error.response.status) {
            this.toast.error("Nom d'utilisateur ou mot de passe erroné !");
          }
        })
      } else {
        this.toast.error("Veuillez remplir les champs");
      }
    }
  },
  mounted(){
    const uesrsStore = useUserStore();
    uesrsStore.isLoginPage = true;
    this.apiUrl = import.meta.env.VITE_API_URL;
  },
  components: {
    Navbar,
    FooterSmall,
  },
})

</script>
