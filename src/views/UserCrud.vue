<template>
  <!-- Modal Supprimer -->
  <div>
    <div v-if="afficherConfirmer"
         class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-3xl">
        <!--content-->
        <div
            class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              Suppression
            </h3>
            <button
                class="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                @click="this.afficherConfirmer = false">
              <span class="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
              Voulez vous vraiment supprimer l'utilisateur {{ user.email }} ?
            </p>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
                class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button" @click="this.afficherConfirmer = false">
              Fermer
            </button>
            <button
                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button" @click="deleteUser">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="afficherConfirmer" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>

  <!-- Modal Modifier -->
  <div>
    <div v-if="afficherModifier"
         class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-md">
        <!--content-->
        <div
            class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              Modification
            </h3>
            <button
                class="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                @click="this.afficherModifier = false">
              <span class="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <div class="mb-3 pt-0  space-y-2">
              <label for="email">Email</label>
              <input id="email" type="text" v-model="email" placeholder="Email"
                     class="p-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
              <label for="nom">Nom</label>
              <input id="nom" type="text" v-model="nom" placeholder="Nom"
                     class="px-2 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
              <label for="prenom">Prénom</label>
              <input id="prenom" type="text" v-model="prenom" placeholder="Prénom"
                     class="p-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
              <label for="color">Color</label>
              <input id="color" type="color" v-model="color" placeholder="Color"
                     class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
            </div>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
                class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button" @click="this.afficherModifier = false">
              Fermer
            </button>
            <button
                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button" @click="updateUser">
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="afficherModifier" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>

  <!-- Modal Création -->
  <div>
    <div v-if="afficherCreation"
         class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-md">
        <!--content-->
        <div
            class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              Création
            </h3>
            <button
                class="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                @click="this.afficherCreation = false">
              <span class="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <div class="mb-3 pt-0  space-y-2">
              <label for="email">Email</label>
              <input id="email" type="text" v-model="email" placeholder="Email"
                     class="p-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
              <label for="password" class="pt-5">Password</label>
              <input id="password" type="text" v-model="password" placeholder="Password"
                     class="p-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
              <label for="nom">Nom</label>
              <input id="nom" type="text" v-model="nom" placeholder="Nom"
                     class="p-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
              <label for="prenom">Prénom</label>
              <input id="prenom" type="text" v-model="prenom" placeholder="Prénom"
                     class="p-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
              <label for="color">Color</label>
              <input id="color" type="color" v-model="color" placeholder="Color"
                     class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
            </div>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
                class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button" @click="this.afficherCreation = false">
              Fermer
            </button>
            <button
                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button" @click="addUser">
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="afficherCreation" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>

  <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded -mt-12"
      :class="[colorTest === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <div class="flex justify-between">
            <div>
              <h3
                  class="font-semibold text-lg"
                  :class="[colorTest === 'light' ? 'text-blueGray-700' : 'text-white']"
              >
                Users
              </h3>
            </div>
            <div class="flex justify-center">
              <button @click="showCreation" class="bg-gray-200 rounded p-1">Ajouter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
        <tr>
          <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                colorTest === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >
            Email
          </th>
          <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                colorTest === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >
            Nom
          </th>
          <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                colorTest === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >
            Prénom
          </th>
          <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                colorTest === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >
            Couleur
          </th>
          <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                colorTest === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >
            Action
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users">
          <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
              <span
                  class="ml-3 font-bold"
                  :class="[
                  colorTest === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
              >
                {{ user.email }}
              </span>
          </th>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <marquee class="ml-3" v-if="user.prenom === 'Olivier' && user.nom === 'Bailly' "> {{
                user.nom
              }}
            </marquee>
            <span class="ml-3" v-else>{{ user.nom }}</span>
          </td>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <marquee class="ml-3" v-if="user.prenom === 'Olivier' && user.nom === 'Bailly' ">{{
                user.prenom
              }}
            </marquee>
            <span class="ml-3" v-else>{{ user.prenom }}</span>
          </td>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <span class="etat py-1 px-3 rounded-full h-6 w-6 ml-3" :style="'--color:#' + user.color"></span>
          </td>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-2">
            <i class="fa-solid fa-pen fa-lg text-green-800 hover:text-green-600 duration-200"
               @click="editUser(user)"></i>
            <i class="fa-solid fa-trash fa-lg text-red-800 hover:text-red-600 duration-200"
               @click="showConfirmer(user)"></i>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import axios from 'axios';
import type {User} from "@/interfaces/User";
import {useToast} from "vue-toastification";
import jwtInterceptorSetup from "@/Interceptors/JwtInterceptor"

jwtInterceptorSetup();

const toast = useToast();
export default defineComponent({
  name: "UserCrud",
  data() {
    return {
      apiUrl: "" as string,
      users: [] as User[],
      user: {} as User,
      idUser: 0 as number,
      email: "" as string,
      password: "" as string,
      nom: "" as string,
      prenom: "" as string,
      color: "#FF0000" as string,
      afficherConfirmer: false as boolean,
      afficherModifier: false as boolean,
      afficherCreation: false as boolean,
      selectedUser: {} as User,


    };
  },
  props: {
    colorTest: {
      default: "light",
      validator: function (value: any) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },
  mounted() {
    this.apiUrl = import.meta.env.VITE_API_URL;
    axios.get(this.apiUrl + "utilisateurs")
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            let currentUser: User = {
              id: res.data[i].id,
              email: res.data[i].email,
              nom: res.data[i].nom,
              prenom: res.data[i].prenom,
              color: res.data[i].color,
            }
            this.users.push(currentUser);
          }
        }).catch(err => console.log(err));
  },
  methods: {
    addUser() {
      if (this.email != "" && this.password != "" && this.nom != "" && this.prenom != "") {
        this.color = this.color.slice(1)
        axios.post(this.apiUrl + "create-utilisateur", this.user = {
          'email': this.email,
          'password': this.password,
          'nom': this.nom,
          'prenom': this.prenom,
          'color': this.color
        }).then(res => {
          let newUser: User = {
            id: res.data.id,
            email: res.data.email,
            password: res.data.password,
            nom: res.data.nom,
            prenom: res.data.prenom,
            color: res.data.color
          }
          this.users.push(newUser);
          this.afficherCreation = false;
          toast.success("User créé avec succès !");
        }).catch(err => {
          toast.error("Un problème est survenu !");
          console.log(err);
        })
      } else {
        toast.error("Certains champs sont vides");
      }
    },
    deleteUser() {
      axios.delete(this.apiUrl + "delete-utilisateur/" + this.selectedUser.id)
          .then(res => {
            const deletedUserIndex: number = this.users.indexOf(this.selectedUser);
            this.users.splice(deletedUserIndex, 1);
            this.afficherConfirmer = false;
            toast.success("Utilisateur supprimé avec succès !");
          }).catch(err => {
        toast.error("Un problème est survenu !");
        console.log(err);
      })
    },
    updateUser() {
      if (this.email != "" && this.nom != "" && this.prenom != "") {
        this.color = this.color.slice(1)
        axios.put(this.apiUrl + "edit-utilisateur/" + this.selectedUser.id, {
          'email': this.email,
          'nom': this.nom,
          'prenom': this.prenom,
          'color': this.color
        }).then(res => {
          const lastUpdatedUser = this.users.find(user => user.id === this.selectedUser.id) as User;
          lastUpdatedUser.email = res.data[0].email;
          lastUpdatedUser.nom = res.data[0].nom;
          lastUpdatedUser.prenom = res.data[0].prenom;
          lastUpdatedUser.color = res.data[0].color;
          this.afficherModifier = false;
          toast.success("Utilisateur modifié avec succès !");
        }).catch(err => {
          toast.error("Un problème est survenu !");
          console.log(err);
        })
      } else {
        toast.error("Le champ libelle ne peut pas être vide");
      }
    },
    showConfirmer(user: User) {
      this.afficherConfirmer = true;
      this.selectedUser = user;
    },
    showCreation() {
      this.afficherCreation = true;
      this.email = "";
      this.password = "";
      this.nom = "";
      this.prenom = "";
      this.color = "#FF0000";
    },
    editUser(user: User) {
      this.afficherModifier = true
      this.selectedUser = user
      this.email = this.selectedUser.email as string
      this.nom = this.selectedUser.nom as string
      this.prenom = this.selectedUser.prenom as string
      this.color = "#" + this.selectedUser.color
    },
  }
})
</script>

<style scoped>

</style>
