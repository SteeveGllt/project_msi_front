<template>
  <div class="px-8 py-4 mx-auto bg-white rounded-lg shadow-md overflow-auto" style="cursor: auto;">
    <div class="lg:flex lg:items-center lg:justify-between">
      <div class="flex items-center">
        <div class="flex flex-col lg:space-x-2 lg:flex lg:flex-row">
          <span class="text-sm font-light text-gray-600">Création : {{ ticket.date_creation }}</span>
          <span class="text-sm font-light text-gray-600">Limite : {{ ticket.date_limite }}</span>
        </div>
        <div class="pl-2">
          <div v-if="this.editDate === false" @click="this.editDate = !this.editDate">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
            </svg>
          </div>
          <div v-else>
            <input type="date" v-model="this.date" @change="isChange = true" class="p-1 text-sm"/>
          </div>
        </div>
      </div>
      <div class="lg:flex lg:items-center lg:justify-between space-y-4 lg:ml-5">
        <div class="flex lg:space-x-2 flex-col lg:flex-row lg:items-center space-y-2">
          <div class="flex space-x-2">
            <div>Répondu ?</div>
            <div>
              <input type="checkbox" v-model="this.ticket.is_repondu" v-bind="this.ticket.id"
                     @change="changeIsRepondu">
            </div>
          </div>
        </div>
      </div>
      <div class="space-x-1 flex">
        <div v-for="user in ticket.users" :key="user.id" class="items-center">
          <div class="flex space-x-2 items-center">
            <div
                class="etat px-3 py-1 text-sm font-bold transition-colors duration-200 transform rounded cursor-pointer hover:bg-gray-500"
                :style="'--color:#' + user.color + ';' + '--color-text:#' + user.fontColor +';'">
              {{ user.prenom }}
              <button @click="removeUser(user.id)">X</button>
            </div>
          </div>
        </div>
        <div
            class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-red-600 rounded cursor-pointer hover:bg-red-500 flex"
            v-if="!ticket.users || ticket.users.length === 0">Aucun user tagué
        </div>
        <select v-model="currentUser" v-on:change="tagUser" class="px-3 py-1 border rounded text-sm">
          <option v-for="user in this.users" :value="user" :bind="user.id" class="p-2"
                  :style="'background-color:#' + user.color + ';color:#' + user.fontColor"> {{
              user.prenom
            }}
          </option>
        </select>
      </div>
      <div class="mb-2 mt-2 lg:space-y-0 lg:space-x-2 space-y-2 flex flex-col lg:flex-row items-start lg:items-center">
        <div class="flex items-center space-x-2">
          <select v-model="currentEtat"
                  :style="'background-color:#' + currentEtat.color + ';color:#' + currentEtat.fontColor"
                  v-on:change="changeEtat" class="px-3 py-1 border rounded text-sm">
            <option v-for="etat in this.etats" :value="etat" :bind="etat.id"
                    :style="'background-color:#' + etat.color + ';color:#' + etat.fontColor"> {{
                etat.libelle
              }}
            </option>
          </select>
        </div>
        <div>
          <select v-model="currentSalle" v-on:change="changeSalle" class="px-3 py-1 border rounded text-sm">
            <option v-for="salle in this.salles" :value="salle" :bind="salle.id" class="p-1 text-normal"> {{
                salle.libelle
              }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div>
      <div>
        <button class="bg-blue-600 text-white p-1 rounded text-sm"
                @click="afficherTransfer = true; this.descriptionTransfer = ticket.description">Transférer
          travaux
        </button>
      </div>
    </div>
    <div v-if="afficherTransfer"
         class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-7xl">
        <!--content-->
        <div
            class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              Transferer vers Travaux
            </h3>
            <button
                class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                @click="this.afficherTransfer = false">
                        <span class="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <div class="mb-3 pt-0  space-y-2">
              <label for="note">Laisse une note (Optionnel)</label>
              <textarea id="note" type="text" v-model="noteTransfer" placeholder="Note"
                        class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
            </div>
            <div class="mb-3 pt-0  space-y-2">
              <label for="mail">Mail</label>
              <textarea id="mail" type="text" v-model="descriptionTransfer" placeholder="Mail"
                        class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline h-96 w-full max-h-860-px"/>
            </div>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
                class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button" @click="this.afficherTransfer = false">
              Fermer
            </button>
            <button
                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button" @click="transferTravaux">
              Transférer
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="text-sm space-y-2 border-none flex items-center">
        <div class="flex items-center space-x-1">
          <div>De :</div>
          <input v-model="mail_expediteur" type="text" class="text-sm rounded border-none lg:w-96 md:w-1/2"
                 @input="isChange = true">
        </div>
      </div>
      <div class="text-sm space-y-2">
        <a @click="displayAllDestinataire()" class="link"
           v-if="ticket.mail_destinataire != undefined &&  ticket.mail_destinataire.length>2">{{ this.message }}
        </a>
        <div v-if="this.destinatairesAffiches.length <= 2">
          <div class="lg:flex lg:space-x-1">
            <div>A :</div>
            <div v-for="destinataire in this.destinatairesAffiches">
              {{ destinataire }}
            </div>
          </div>
        </div>
        <div class="lg:grid lg:grid-cols-3 lg:space-x-1" v-else>
          <div>A :</div>
          <div v-for="destinataire in this.destinatairesAffiches">
            {{ destinataire }}
          </div>
        </div>
      </div>
    </div>
    <div class="mt-2">
      <input v-model="objet" type="text"
             class="p-1 lg:w-1/2 w-full h-auto rounded-md lg:text-2xl md:text-xl font-bold text-gray-700 border-none"
             @input="isChange = true">
      <div class="mt-2">
        <textarea type="text" v-model="description"
                  class="p-1 w-full border-none rounded text-gray-600 h-96" @input="isChange = true"></textarea>
      </div>
      <div class="mt-2">
        <div @click="openImage" v-if="!image && this.piecesJointes.length !== 0">Afficher les pieces jointes</div>
        <div @click="closeImage" v-if="image">Cacher les pieces jointes</div>
        <div class="flex" v-if="image">
          <div v-for="jointe in this.piecesJointes" class="flex flex-row m-1">
            <div v-if="jointe.extension === 'png' || jointe.extension === 'jpg' || jointe.extension === 'jpeg'"
                 class="h-32 w-32">
              <img :src="this.imageUrl + jointe.path.slice(1)" class="pb-3">
            </div>
            <div v-else class="text-lg">
              <a :href="this.imageUrl + jointe.path.slice(1)" target="_blank">
                <i class="fa-solid fa-file-pdf"></i>
                Télécharger le fichier
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3 flex justify-center lg:mt-0 lg:justify-start">
      <button v-if="isChange === true" class="bg-green-200 p-1 rounded text-sm" @click="editTicket">Sauvegarder
      </button>
    </div>
  </div>
  <div>
    <div v-if="ticket.commentaire !== undefined" class="">
      <div class="flex flex-col rounded p-2 bg-white border"
           v-for="commentaire in ticket.commentaire">
        <div class="break-words">
          {{ commentaire.contenu }}
        </div>
        <div class="flex justify-between">
          <div>
            De {{ commentaire.user.nom }} {{ commentaire.user.prenom }}
          </div>
          <div v-if="commentaire.user.id == userStore.user.id">
            <button v-if="commentaire.id != undefined" @click="deleteCommentaire(commentaire.id)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
              </svg>
            </button>
          </div>
        </div>
        <div>
          à {{ commentaire.created }}
        </div>
      </div>
    </div>
    <div class="bg-white w-full rounded-xl mt-2  flex">
      <input class="w-full flex items-center rounded-lg p-2" placeholder="Commentaire" type="text"
             ref="commentaire" v-model="commentaire" @keyup.enter="addComment"/>
      <button class="comment-send flex justify-center items-center bg-red-500 w-10" @click="addComment()"
              type="submit">Ok
      </button>
    </div>
  </div>
</template>



<script lang="ts">
import {defineComponent} from "vue";
import type {Ticket} from "@/interfaces/Ticket";
import axios from "axios";
import type {Commentaire} from "@/interfaces/Commentaire";
import type {Etat} from "@/interfaces/Etat";
import type {Salle} from "@/interfaces/Salle";
import type {User} from "@/interfaces/User";
import {useUserStore} from "@/stores/user";
import {POSITION, useToast} from "vue-toastification";

import type {PieceJointe} from "@/interfaces/PieceJointe";
import jwtInterceptorSetup from "@/Interceptors/JwtInterceptor"

jwtInterceptorSetup();

const toast = useToast();
export default defineComponent({
  name: "Ticket",
  data: () => {
    return {
      ticket: {} as Ticket,
      etats: [] as Etat[],
      salles: [] as Salle[],
      users: [] as User[],
      commenaires: [] as Commentaire[],
      commentaire: "" as string,
      idTicket: 0 as number,
      message: "Voir plus" as string,
      destinatairesAffiches: [] as string[],
      apiUrl: "" as string,
      imageUrl: "" as string,
      currentEtat: {} as Etat,
      currentSalle: {} as Salle,
      currentUser: {} as User,
      afficherTransfer: false as boolean,
      descriptionTransfer: "" as string,
      noteTransfer: "" as string,

      //Ce qui va etre modifiable dans le ticket
      description: "" as string,
      objet: "" as string,
      mail_expediteur: "" as string,
      date: {} as Date,
      editDate: false as boolean,
      piecesJointes: [] as PieceJointe[],

      boolChangeEtat: false as boolean,
      boolChangeSalle: false as boolean,
      boolChangeIsRepondu: false as boolean,
      boolDescription: false as boolean,
      boolObjet: false as boolean,
      isChange: false as boolean,

      image: false as boolean
    }
  },
  setup() {
    const userStore = useUserStore();
    return {userStore};
  },
  methods: {
    openImage() {
      this.image = true
    },
    closeImage() {
      this.image = false
    },
    tagUser() {
      if (this.currentUser.id !== -1) {
        axios.put(this.apiUrl + "add-user/" + this.currentUser.id + "/ticket/" + this.idTicket)
            .then(res => {
              if (res.data.status !== 'error' && res.data.code !== 501) {
                this.ticket.users.push(this.currentUser);
                toast.success("Utilisateur ajouté !", {position: "bottom-right" as POSITION});
              }
            }).catch(err => {
          console.log(err)
          toast.error("Un problème est survenu !", {position: "bottom-right" as POSITION});
        })
      }
    },
    addComment() {
      const commentaire: string = this.commentaire;
      const comment: Commentaire = {
        contenu: commentaire
      }
      axios.post(this.apiUrl + "add-commentaire/" + this.idTicket, {
        'user': this.userStore.user,
        'commentaire': comment,
      }).then(res => {
        let newComment: Commentaire = {
          id: res.data.id,
          contenu: res.data.contenu,
          created: res.data.created,
          user: res.data.user,
        }
        this.commentaire = '';
        if (this.ticket.commentaire != undefined) {
          this.ticket.commentaire.push(newComment);
          toast.success("Commentaire ajouté", {position: "bottom-right" as POSITION});
        }
      }).catch(err => {
        console.log(err)
        toast.error("Un problème est survenu!", {position: "bottom-right" as POSITION});
      })
    },
    //Quand y'a beaucoup de destinataire ça surcharge un peu l'affichage donc on fait un bouton voir tout/voir moins
    displayAllDestinataire() {
      //this.destinairesAAffiches est un tableau de string dans lequel on va mettre les destinataires que l'on veut affiché
      if (this.ticket.mail_destinataire != undefined) {
        if (this.ticket.mail_destinataire?.length >= 3 && this.destinatairesAffiches.length < 3) {
          this.destinatairesAffiches.splice(0);
          for (let i = 0; i < this.ticket.mail_destinataire?.length; i++) {
            this.destinatairesAffiches.push(this.ticket.mail_destinataire[i]);
          }
          this.message = "Voir moins"
        } else {
          this.destinatairesAffiches.splice(0);
          for (let i = 0; i <= 1; i++) {
            this.destinatairesAffiches.push(this.ticket.mail_destinataire[i]);
          }
          this.message = "Voir tout"
        }
      }
    },
    editTicket() {
      if (this.boolChangeEtat) {
        axios.put(this.apiUrl + "ticket-change/" + this.ticket.id + "/etat/" + this.currentEtat.id)
            .then(res => {
              this.ticket.etat = this.currentEtat
              this.boolChangeEtat = false;
            }).catch(err => {
          console.log(err)
          toast.error("Un problème est survenu au niveau des états!", {position: "bottom-right" as POSITION});
        });
      }
      if (this.boolChangeSalle) {
        axios.put(this.apiUrl + "ticket-change/" + this.ticket.id + "/salle/" + this.currentSalle.id)
            .then(res => {
              this.ticket.salle = this.currentSalle;
              this.boolChangeSalle = false;
            }).catch(err => {
          console.log(err)
          toast.error("Un problème est survenu au niveau des salles!", {position: "bottom-right" as POSITION});
        });
      }
      axios.put(this.apiUrl + "edit-ticket/" + this.idTicket, {
        'mail_expediteur': this.mail_expediteur,
        'objet': this.objet,
        'description': this.description,
        'date_limite': this.date,
      }).then(res => {
        let editedTicket: Ticket = {
          id: res.data.id,
          mail_expediteur: res.data.mail_expediteur,
          mail_destinataire: res.data.mail_destinataire,
          objet: res.data.objet,
          description: res.data.description,
          is_repondu: res.data.is_repondu,
          date_creation: res.data.date_creation,
          date_limite: res.data.date_limite,
          etat: res.data.etat,
          commentaire: res.data.commentaires,
          users: res.data.users,
          salle: res.data.salle
        }
        this.ticket = editedTicket;
        toast.success("Ticket sauvegardé avec succès !", {position: "bottom-right" as POSITION});
      }).catch(err => {
        console.log(err)
        toast.error("Un problème est survenu ticket !", {position: "bottom-right" as POSITION});
      });
    },
    transferTravaux() {

      axios.post(this.apiUrl + "transfer-travaux/" + this.idTicket, {
        'description': this.descriptionTransfer,
        'note': this.noteTransfer,
        'user': this.userStore.user,
      }).then(res => {
        if (res.data.code === 200) {
          toast.success("Mail transferé !", {position: "bottom-right" as POSITION});
        } else {
          toast.error("Erreur lors du transfer du mail. Adressez vous aux gros bg qui ont développés le site", {position: "bottom-right" as POSITION});
        }

      }).catch(err => {
        toast.error("Erreur lors du transfer du mail. Adressez vous aux gros bg qui ont développés le site", {position: "bottom-right" as POSITION});
        console.log(err);
      })
      this.afficherTransfer = false;
    },
    changeEtat() {
      this.isChange = true
      this.boolChangeEtat = true;
      return this.boolChangeEtat
    },
    changeSalle() {
      this.isChange = true
      this.boolChangeSalle = true;
      return this.boolChangeSalle
    },
    changeIsRepondu() {
      this.isChange = true
      return this.ticket.is_repondu
    },
    removeUser(userId: number) {
      axios.delete(this.apiUrl + "delete-user/" + userId + "/ticket/" + this.ticket.id)
          .then(res => {
            this.ticket.users = this.ticket.users?.filter(user => user.id !== userId)
            toast.success("Utilisateur supprimé", {position: "bottom-right" as POSITION});
          }).catch(err => {
        console.log(err)
        toast.error("Un problème est survenu!", {position: "bottom-right" as POSITION});
      })
    },
    deleteCommentaire(commentaireId: number) {
      axios.delete(this.apiUrl + "delete-commentaire/" + commentaireId)
          .then(res => {
            this.ticket.commentaire = this.ticket.commentaire?.filter(commentaire => commentaire.id !== commentaireId)
            toast.success("Commentaire supprimé", {position: "bottom-right" as POSITION});
          })
          .catch(err => {
            console.log(err)
            toast.error("Un problème est survenu au niveau des états!", {position: "bottom-right" as POSITION});
          });
    },

  },
  mounted() {
    this.apiUrl = import.meta.env.VITE_API_URL;
    this.imageUrl = import.meta.env.VITE_IMAGE_URL;
    this.idTicket = +this.$route.params.id;
    axios.get(this.apiUrl + "etats")
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            let currentEtat: Etat = {
              id: res.data[i].id,
              libelle: res.data[i].libelle,
              ordre: res.data[i].ordre,
              color: res.data[i].color,
              fontColor: res.data[i].fontColor,
            }
            this.etats.push(currentEtat);
          }
          this.etats.sort((e1, e2) => e1.ordre - e2.ordre)
        }).catch(err => {
      console.log(err)
      toast.error("Erreur de chargement des états!", {position: "bottom-right" as POSITION});
    });
    axios.get(this.apiUrl + "utilisateurs")
        .then(res => {
          const userDefault: User = {
            id: -1,
            email: 'default',
            nom: 'default',
            prenom: 'Choisir',
            color: '56ba89',
            fontColor: 'ffffff'
          }
          this.users.push(userDefault);
          for (let i = 0; i < res.data.length; i++) {
            let currentUser: User = {
              id: res.data[i].id,
              email: res.data[i].email,
              nom: res.data[i].nom,
              prenom: res.data[i].prenom,
              color: res.data[i].color,
              fontColor: res.data[i].fontColor,
            }
            this.users.push(currentUser);
          }
          this.currentUser = userDefault;
        }).catch(err => {
      console.log(err)
      toast.error("Erreur de chargement des utilisateurs!", {position: "bottom-right" as POSITION});
    });
    axios.get(this.apiUrl + "salles")
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            let currentSalle: Salle = {
              id: res.data[i].id,
              libelle: res.data[i].libelle,
            }
            this.salles.push(currentSalle);
          }
        })
    axios.get(this.apiUrl + "ticket/" + this.idTicket)
        .then(res => {
          let currentTicket: Ticket = {
            id: res.data.id,
            mail_expediteur: res.data.mail_expediteur,
            mail_destinataire: res.data.mail_destinataire,
            objet: res.data.objet,
            description: res.data.description,
            is_repondu: res.data.is_repondu,
            date_creation: res.data.date_creation,
            date_limite: res.data.date_limite,
            etat: res.data.etat,
            salle: res.data.salle,
            commentaire: res.data.commentaires,
            users: res.data.users
          };
          let ticketsEtat: Etat = {
            id: currentTicket.etat?.id as number,
            libelle: currentTicket.etat?.libelle as string,
            ordre: currentTicket.etat?.ordre as number,
            color: currentTicket.etat?.color as string,
            fontColor: currentTicket.etat?.fontColor as string
          };
          let ticketsSalle: Salle = {
            id: currentTicket.salle?.id as number,
            libelle: currentTicket.salle?.libelle as string
          };
          this.currentEtat = ticketsEtat;
          this.currentSalle = ticketsSalle;
          this.ticket = currentTicket;
          this.objet = this.ticket.objet as string;
          this.description = this.ticket.description as string;
          this.mail_expediteur = this.ticket.mail_expediteur as string;
          this.date = this.ticket.date_limite as Date;
          this.displayAllDestinataire();
        })
        .catch(err => {
          console.log(err)
          toast.error("Erreur de chargement des données du tickets!", {position: "bottom-right" as POSITION});
        });
    axios.get(this.apiUrl + "piece-jointe/ticket/" + this.idTicket)
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            let currentPieceJointe: PieceJointe = {
              id: res.data[i].id,
              path: res.data[i].path,
              extension: res.data[i].path.split('.').pop()
            }
            this.piecesJointes.push(currentPieceJointe);
            console.log(currentPieceJointe);
            console.log(this.piecesJointes);
          }
        })
        .catch(err => {
          console.log(err)
          toast.error("Erreur de chargement des pièces jointes!");
        });
  }
})
</script>
