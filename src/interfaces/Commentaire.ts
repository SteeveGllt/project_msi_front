import type {User} from "@/interfaces/User";

export interface Commentaire{
    id?:number,
    contenu:string,
    created?:Date,
    user?:User,
    ticket_id?:number
}