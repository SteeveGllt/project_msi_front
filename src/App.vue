<template>
    <router-view :key="$route.fullPath"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import NavigationComponent from "@/components/NavigationComponent.vue";
import {useUserStore} from "@/stores/user";
import axios from "axios";
import {POSITION, useToast} from "vue-toastification";
const toast = useToast();
export default defineComponent({
    name: 'App',
    components: {NavigationComponent},

    data() {
        return {
            userStoreData: {} as any,
            timer:0 as number,
            apiUrl: "" as string,
        }
    },
    methods: {
        async newMails(){
            if(this.userStoreData.isLoged) {
                this.timer = setInterval(() => {
                    axios.get(this.apiUrl + "tickets/logs")
                        .then(res => {
                            if(res.data.nouveaux_mails === true){
                                toast.info("Nouveau tickets dispo");
                            }
                        })
                },60000)
            }
        }
    },
    mounted() {
        this.apiUrl = import.meta.env.VITE_API_URL;
        const userStore = useUserStore();
        userStore.changeUserLog();
        this.userStoreData = userStore;
        this.newMails()
    }
})
</script>
