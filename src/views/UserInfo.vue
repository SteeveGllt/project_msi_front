<template>
    <div class="px-8 py-4 mx-auto bg-white rounded-lg shadow-md overflow-auto" style="cursor: auto;">
        <div class="relative p-6 flex-auto">
            <div class="mb-3 pt-0  space-y-2">
                <label for="email">Email</label>
                <input id="email" type="text" v-model="this.user.email" placeholder="Small Input"
                       class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
                <label for="nom">Mot de passe actuel</label>
                <input id="nom" type="password" v-model="this.password" placeholder="Mot de passe actuel"
                       class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
                <label for="nom">Nouveau mot de passe</label>
                <input id="nom" type="password" v-model="this.newPassword" placeholder="Nouveau mot de passe"
                       class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
                <label for="nom">Confirmer nouveau mot de passe</label>
                <input id="nom" type="password" v-model="this.newPasswordConfirm" placeholder="Confirmer nouveau mot de passe"
                       class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>

                <button @click="updatePassword()">Modifier</button>
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

jwtInterceptorSetup();

const toast = useToast();
export default defineComponent({
    name: 'UserInfo',
    data(){
        return{
            apiUrl:"" as string,
            user:{} as User,
            password:"" as string,
            newPassword:"" as string,
            newPasswordConfirm:"" as string
        }
    },
    setup(){
        const userStore = useUserStore();
        return {userStore};
    },
    methods:{
        updatePassword(){
            axios.put(this.apiUrl + "change-password/" + this.user.id,{
                password: this.password,
                newPassword: this.newPassword,
                newPasswordConfirm: this.newPasswordConfirm
            }).then(res => {
                if(res.data.code === 500){
                    toast.error(res.data.message);
                }else{
                    toast.success(res.data.message);
                }
            }).catch(err => console.log(err));
        }
    },
    mounted() {
        this.apiUrl = import.meta.env.VITE_API_URL;
        axios.get(this.apiUrl + "utilisateur-info/" + this.userStore.user.id)
            .then(res => {
                let currentUser:User = {
                    id: res.data.id,
                    email: res.data.email,
                    nom: res.data.nom,
                    prenom: res.data.prenom,
                    color: "#"+res.data.color,
                    fontColor: res.data.fontColor
                }
                this.user = currentUser;
            })
    }
});
</script>
<style scoped>

</style>