import {defineStore} from 'pinia'
import axios from "axios";
import type {User} from "@/interfaces/User";
import { isTokenExpired } from "@/Interceptors/JwtInterceptor";


export const useUserStore = defineStore('user', {
    state: () => ({
        isLoged:false as Boolean,
        jwtToken: "" as String,
        user: {} as User,
        isLoginPage: false as boolean,
    }),
    getters: {
        getUserStoreInterface(): UserStoreInterface {
            const result: UserStoreInterface = {
                isLoged: this.isLoged,
                jwtToken: this.jwtToken,
            }
            return result;
        }
    },
    actions: {
        changeUserLog() {
            let authToken = localStorage.getItem('access_token');
            let resultIsLog: boolean = false;
            if(authToken !== null){
                resultIsLog = !isTokenExpired(authToken);
            }
            if(resultIsLog){
                this.jwtToken = authToken as String;
                this.isLoged = true;
                //@ts-ignore
                this.user.id = localStorage.getItem('user_id')
                //@ts-ignore
                this.user.nom = localStorage.getItem('user_nom')
                //@ts-ignore
                this.user.prenom = localStorage.getItem('user_prenom')
            }
            else{
                this.isLoged = false;
                this.jwtToken = "";
            }
        }
    }
})
export interface UserStoreInterface {
    isLoged: Boolean,
    jwtToken: String,
}

