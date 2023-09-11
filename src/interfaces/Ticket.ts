import type {Etat} from "@/interfaces/Etat";
import type {User} from "@/interfaces/User";
import type {Commentaire} from "@/interfaces/Commentaire";
import type {Salle} from "@/interfaces/Salle";

export interface Ticket{
    id:number,
    mail_expediteur:string,
    mail_destinataire?:string[],
    objet:string,
    description:string,
    is_repondu?:boolean,
    date_creation:Date,
    date_limite:Date,
    etat:Etat,
    commentaire?:Commentaire[],
    users:User[],
    salle:Salle,
    urgence?:number,
    //0 > 1 semaine;  1 < 1 semaine; 2 < 3 jours; 4 demain; 4 aujourd'hui; 5 en retard
    new?:boolean,//Pour voir si un ticket est nouveau ou pas pour ajouter une animations
    delete?:boolean,//Pareil mais pour supprimer
}