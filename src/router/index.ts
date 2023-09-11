import {createRouter, createWebHistory} from 'vue-router'
import Tickets from "@/views/Tickets.vue";
import Ticket from "@/views/Ticket.vue";
import {useUserStore} from "@/stores/user";
import type {UserStoreInterface} from "@/stores/user";
import EtatCrud from "@/views/EtatCrud.vue";
import UserCrud from "@/views/UserCrud.vue";
import SalleCrud from "@/views/SalleCrud.vue";
import Index from "@/layouts/Index.vue";
import Auth from "@/layouts/Auth.vue";
import UserInfo from "@/views/UserInfo.vue";
import userInfo from "@/views/UserInfo.vue";
import RecupPassword from "@/views/RecupPassword.vue";
import axios from "axios";
import {auto} from "@popperjs/core";
import NotFoundView from "@/views/NotFoundView.vue";

const ApiUrl = import.meta.env.VITE_API_URL;

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Index,
            children: [
                {
                    path: '/',
                    name: 'default',
                    component: Tickets,
                    beforeEnter(to, from) {
                        const usersStore = useUserStore();
                        const usersInfo: UserStoreInterface = usersStore.getUserStoreInterface;
                        if (!usersInfo.isLoged) return {name: 'login'};
                        else return {name:'home',params:{isAll:1}}
                    }
                },
                {
                    path: '/tickets/:isAll',
                    name: 'home',
                    component: Tickets,
                    beforeEnter(to, from) {
                        const usersStore = useUserStore();
                        const usersInfo: UserStoreInterface = usersStore.getUserStoreInterface;
                        if (!usersInfo.isLoged) return {name: 'login'};
                    }
                },
                {
                    path: '/etat',
                    name: 'etat',
                    component: EtatCrud,
                    beforeEnter(to, from) {
                        const usersStore = useUserStore();
                        const usersInfo: UserStoreInterface = usersStore.getUserStoreInterface;
                        if (!usersInfo.isLoged) return {name: 'login'}
                    }
                },
                {
                    path: '/salle',
                    name: 'salle',
                    component: SalleCrud,
                    beforeEnter(to, from) {
                        const usersStore = useUserStore();
                        const usersInfo: UserStoreInterface = usersStore.getUserStoreInterface;
                        if (!usersInfo.isLoged) return {name: 'login'}
                    }
                },
                {
                    path: '/user',
                    name: 'user',
                    component: UserCrud,
                    beforeEnter(to, from) {
                        const usersStore = useUserStore();
                        const usersInfo: UserStoreInterface = usersStore.getUserStoreInterface;
                        if (!usersInfo.isLoged) return {name: 'login'}
                    }
                },
                {
                    path: "/ticket/:id",
                    name: 'ticket',
                    component: Ticket,
                    beforeEnter(to, from) {
                        const usersStore = useUserStore();
                        const usersInfo: UserStoreInterface = usersStore.getUserStoreInterface;
                        if (!usersInfo.isLoged) return {name: 'login'}
                    }
                },
                {
                    path: "/user-info",
                    name:'userinfo',
                    component: UserInfo,
                    beforeEnter(to, from) {
                        const usersStore = useUserStore();
                        const usersInfo: UserStoreInterface = usersStore.getUserStoreInterface;
                        if (!usersInfo.isLoged) return {name: 'login'}
                    }
                },
                {
                    path:"/recup-password/:token",
                    name: 'RecupPassword',
                    component: RecupPassword,
                    beforeEnter(to,from,next){
                        let autorization:boolean = false;
                        axios.post( ApiUrl + "get-autorization",{
                            token:to.params.token,
                        }).then(res => {
                            autorization =  res.data.autorization;
                            to.params.id = res.data.user_id;
                            if(autorization == false){
                                next('login')
                            }else{
                                next()
                            }
                        }).catch(err => console.log(err))
                    }
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Auth,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFoundView
        }
    ]
})

export default router
