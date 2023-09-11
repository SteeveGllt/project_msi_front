<template>
  <!-- Modal Supprimer -->
  <div>
    <div v-if="afficherConfirmer" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-3xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              Suppression
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="this.afficherConfirmer = false">
              <span class="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
              Voulez vous vraiment supprimer l'état ?
            </p>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="this.afficherConfirmer = false">
              Fermer
            </button>
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="deleteEtat">
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
    <div v-if="afficherModifier" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-md">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              Modification
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="this.afficherModifier = false">
              <span class="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <div class="mb-3 pt-0  space-y-2">
              <label for="libelle">Libelle</label>
              <input id="libelle" type="text" v-model="libelle" placeholder="Libelle" class="p-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" :disabled="isEtatTermine"/>
              <label for="ordre">Ordre</label>
              <input id="ordre" type="number" v-model="ordre" placeholder="Ordre" class="p-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
              <label for="color">Color</label>
              <input id="color" type="color" v-model="color" placeholder="Color" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
            </div>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="this.afficherModifier = false">
              Fermer
            </button>
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="updateEtat">
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="afficherModifier" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>

  <!-- Modal Création -->
  <div>
    <div v-if="afficherCreation" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-md">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              Création
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="this.afficherCreation = false">
              <span class="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <div class="mb-3 pt-0  space-y-2">
              <label for="libelle">Libelle</label>
              <input id="libelle" type="text" v-model="libelle" placeholder="Libelle" class="p-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
              <label for="ordre">Ordre</label>
              <input id="ordre" type="number" v-model="ordre" placeholder="Ordre" class="p-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
              <label for="color">Color</label>
              <input id="color" type="color" v-model="color" placeholder="Color" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
            </div>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="this.afficherCreation = false">
              Fermer
            </button>
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="addEtat">
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
                Etats
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
            Libelle
          </th>
          <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                colorTest === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >
            Ordre
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
        <tr v-for="etat in etats">
          <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
              <span
                  class="ml-3 font-bold"
                  :class="[
                  colorTest === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
              >
                {{ etat.libelle }}
              </span>
          </th>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <span class="ml-3">{{ etat.ordre }}</span>

          </td>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <span class="etat py-1 px-3 rounded-full h-6 w-6 ml-3" :style="'--color:#' + etat.color"></span>
          </td>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-2">
            <i class="fa-solid fa-pen fa-lg text-green-800 hover:text-green-600 duration-200" @click="editEtat(etat)"></i>
            <i class="fa-solid fa-trash fa-lg text-red-800 hover:text-red-600 duration-200" @click="showConfirmer(etat)" v-if="etat.libelle !== 'Terminé'"></i>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import type {Etat} from "@/interfaces/Etat";
import axios from "axios";
import {useToast} from "vue-toastification";
import jwtInterceptorSetup from "@/Interceptors/JwtInterceptor"

jwtInterceptorSetup();

export default defineComponent({
  name: "EtatCrud",
  data() {
    return {
      apiUrl: "" as string,
      etats: [] as Etat[],
      etat: {} as Etat,
      idEtat: 0 as number,
      libelle: "" as string,
      ordre: 0 as number,
      color: "#FF0000" as string,
      modif: false as boolean,
      afficherConfirmer: false as boolean,
      afficherModifier: false as boolean,
      afficherCreation: false as boolean,
      selectedEtat: {} as Etat,
      isShowModal: false as boolean,
      isEtatTermine:false as boolean,

    }
  },
  setup() {
    const toast = useToast();
    return {toast}
  },
  mounted() {
    this.apiUrl = import.meta.env.VITE_API_URL;
    axios.get(this.apiUrl + "etats")
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            let currentEtat: Etat = {
              id: res.data[i].id,
              libelle: res.data[i].libelle,
              ordre: res.data[i].ordre,
              color: res.data[i].color
            }
            this.etats.push(currentEtat);
          }
          this.etats.sort((e1,e2) => e1.ordre - e2.ordre)
        }).catch(err => {
      this.toast.error("Un problème est survenu !");
      console.log(err);
    });
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
  methods: {
    addEtat() {
      if (this.libelle != "" && this.libelle !== "Terminé") {
        this.color = this.color.slice(1)
        axios.post(this.apiUrl + "create-etat", this.etat = {
          'libelle': this.libelle,
          'ordre': this.ordre,
          'color': this.color,
        }).then(res => {
          let newEtat: Etat = {
            id: res.data.id,
            libelle: res.data.libelle,
            ordre: res.data.ordre,
            color: res.data.color
          }
          this.etats.push(newEtat);
          this.afficherCreation = false;
          this.toast.success("Etat crée avec succès !");
        }).catch(err => {
          this.toast.error("Un problème est survenu !");
          console.log(err);
        })
      } else {
        if(this.libelle ==""){
          this.toast.error("Le champ libelle ne peut pas être vide");
        }else if(this.libelle === "Terminé"){
          this.toast.error("Le champ libelle ne doit pas être 'Terminé'");
        }
      }
    },
    deleteEtat() {
      axios.delete(this.apiUrl + "delete-etat/" + this.selectedEtat.id)
          .then(res => {
            const deletedEtatIndex: number = this.etats.indexOf(this.selectedEtat);
            this.etats.splice(deletedEtatIndex, 1);
            this.afficherConfirmer = false;
            this.toast.success("Etat supprimé avec succès !");
          }).catch(err => {
        this.toast.error("Un problème est survenu !");
        console.log(err);
      })
    },
    showConfirmer(etat: Etat) {
      this.afficherConfirmer = true;
      this.selectedEtat = etat;
    },
    showCreation() {
      this.afficherCreation = true;
      this.libelle = "";
      this.ordre = 0;
      this.color = "#FF0000";
    },
    editEtat(etat: Etat) {
      this.afficherModifier = true
      this.selectedEtat = etat
      this.libelle = this.selectedEtat.libelle
      this.isEtatTermine = this.selectedEtat.libelle === "Terminé";
      this.ordre = this.selectedEtat.ordre
      this.color = "#" + this.selectedEtat.color
    },
    updateEtat() {
      if (this.libelle != "") {
        if(this.selectedEtat.libelle !== this.libelle && this.selectedEtat.libelle === "Terminé"){
          this.toast.error("Petit H4CKERZ va on touche pas au Terminé");
        }else{
            this.color = this.color.slice(1)
            axios.put(this.apiUrl + "edit-etat/" + this.selectedEtat.id, {
              'libelle': this.libelle,
              'ordre': this.ordre,
              'color': this.color,
            }).then(res => {
              const lastUpdatedEtat = this.etats.find(etat => etat.id === this.selectedEtat.id) as Etat;
              lastUpdatedEtat.libelle = res.data.libelle;
              lastUpdatedEtat.ordre = res.data.ordre;
              lastUpdatedEtat.color = res.data.color;
              this.afficherModifier = false;
              if(res.data.code !== 500){
                this.toast.success("Etat modifié avec succès !");
              }else{
                this.toast.error(res.data.message);
              }
            }).catch(err => {
              this.toast.error("Un problème est survenu !");
              console.log(err);
            })
        }
      } else {
        if (this.libelle == "") {
          this.toast.error("Le champ libelle ne peut pas être vide");
        }
      }
    }
  }
})
</script>

<style scoped>

</style>
