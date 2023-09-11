<template>
  <div class="px-8 py-4 mx-auto bg-white rounded-lg shadow-md overflow-auto" style="cursor: auto;">
    <div class="relative p-6 flex-auto">
      <div class="mb-3 pt-0  space-y-2">
        <label for="nom">Nouveau mot de passe</label>
        <input id="nom" type="password" v-model="this.newPassword" placeholder="Nouveau mot de passe"
               class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
        <label for="nom">Confirmer nouveau mot de passe</label>
        <input id="nom" type="password" v-model="this.newPasswordConfirm" placeholder="Confirmer nouveau mot de passe"
               class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>

        <button @click="changePassword()">Modifier le mot de passe</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useUserStore} from "@/stores/user";
import type {User} from "@/interfaces/User";
import axios from "axios";
import {useToast} from "vue-toastification";
import jwtInterceptorSetup from "@/Interceptors/JwtInterceptor"

const toast = useToast();
jwtInterceptorSetup();
export default defineComponent({
  name: 'RecupPassword',
  data(){
    return{
      apiUrl:"" as string,
      newPassword:"" as string,
      newPasswordConfirm:"" as string,
      idUser: 0 as number
    }
  },
  methods:{
    changePassword(){
      axios.put(this.apiUrl + "recup-password/"+this.idUser,{
        password: this.newPassword,
        passwordConfirm: this.newPasswordConfirm
      })
          .then(res => {
            if(res.data.code === 500){
              toast.error(res.data.message)
            }else if(res.data.code === 200){
              toast.success(res.data.message)
              this.$router.push("login");
            }
          }).catch(err => {
            toast.error("Une erreur est survenue, essayé plus tard");
            console.log(err)
      })
    },

  },
  mounted() {
    this.apiUrl = import.meta.env.VITE_API_URL;
    this.idUser = +this.$route.params.id;
    console.log(this.idUser);

  }
})
</script>

<style scoped>

</style>