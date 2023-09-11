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
              Voulez vous vraiment supprimer la salle ?
            </p>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="this.afficherConfirmer = false">
              Fermer
            </button>
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="deleteSalle">
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
              <input id="libelle" type="text" v-model="libelle" placeholder="Libelle" class="p-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
         </div>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="this.afficherModifier = false">
              Fermer
            </button>
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="updateSalle">
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="afficherModifier" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>

  <!-- Modal Creation -->
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
            </div>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="this.afficherCreation = false">
              Fermer
            </button>
            <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="addSalle">
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="afficherCreation" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>

  <!-- modal info -->
  <div>
    <div v-if="afficherInfo" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-3xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              Comment est-ce que ça marche t-il donc ?
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="this.afficherInfo = false">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <div class="mb-3 pt-0  space-y-2">
              <p>Il faut fournir un CSV dont la <b>première</b> colonne contient le nom des salles. Une salle par ligne.</p>
            </div>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="this.afficherInfo = false">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="afficherInfo" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>

  <div class="flex justify-center pt-3 space-x-2 items-center">
    <div>
      <button @click="showCreation" class="bg-gray-200 rounded p-1">Ajouter</button>
    </div>
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
                Salles
                <button @click="showCreation" class="bg-gray-200 rounded p-1">Ajouter</button>
              </h3>
            </div>
            <div class="flex justify-center space-x-2">
              <div>
                <form @submit.prevent="onSubmit">
                  <div class="flex flex-row">
                    <div @click="afficherInfo = true" class="cursor-pointer">
                      <svg height="36" viewBox="0 0 48 48" width="36" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path d="M22 34h4v-12h-4v12zm2-30c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 36c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z"/></svg>
                    </div>
                    <input type="file" ref="fileInput" accept=".csv">
                    <button type="submit" class="bg-amber-200 p-1 rounded">Importer</button>
                  </div>
                </form>
              </div>
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
            Action
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="salle in salles">
          <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
              <span
                  class="ml-3 font-bold"
                  :class="[
                  colorTest === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
              >
                {{ salle.libelle }}
              </span>
          </th>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-2">
            <i class="fa-solid fa-pen fa-lg text-green-800 hover:text-green-600 duration-200" @click="editSalle(salle)"></i>
            <i class="fa-solid fa-trash fa-lg text-red-800 hover:text-red-600 duration-200" @click="showConfirmer(salle)"></i>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import type {Salle} from "@/interfaces/Salle";
import {useToast} from "vue-toastification";
import jwtInterceptorSetup from "@/Interceptors/JwtInterceptor"

jwtInterceptorSetup();

export default defineComponent({
  name: "SalleCrud",
  data() {
    return {
      apiUrl: "" as string,
      salles: [] as Salle[],
      salle: {} as Salle,
      idSalle: 0 as number,
      libelle: "" as string,
      modif: false as boolean,
      afficherConfirmer: false as boolean,
      afficherModifier: false as boolean,
      afficherCreation: false as boolean,
      afficherInfo: false as boolean,
      selectedSalle: {} as Salle,
      isShowModal: false as boolean,

      file: null as any,
    }
  },
  setup() {
    const toast = useToast();
    return {toast}
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
    axios.get(this.apiUrl + "salles")
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            let currentSalle: Salle = {
              id: res.data[i].id,
              libelle: res.data[i].libelle,
            }
            this.salles.push(currentSalle);
          }
        }).catch(err => {
      this.toast.error("Un problème est survenu !");
      console.log(err);
    });
  },
  methods: {
    async onSubmit() {
      //@ts-ignore
      this.file = this.$refs.fileInput.files[0];
      if (this.file != undefined){
        if (!this.file.name.endsWith('.csv')) {
          this.toast.error("Le fichier doit être un fichier CSV");
          return
        }
        let formData = new FormData();
        await formData.append('file', this.file)

        axios.post(this.apiUrl + "import-csv", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
            .then(res => {
              this.toast.success("Salle importée avec succès merci de rafraîchir la page !");
            })
            .catch(error => {
              this.toast.error("Un problème est survenu !");
              console.log(error);
            })
      }
      else {
        this.toast.error("Veuillez importer un fichier");
      }

    },
    addSalle() {
      if (this.libelle != "") {
        //@ts-ignore
        axios.post(this.apiUrl + "create-salle", this.salle = {
          'libelle': this.libelle,
        }).then(res => {
          let newSalle: Salle[] = res.data as Salle[]
          this.salles.push(newSalle[0]);
          this.afficherCreation = false;
          this.toast.success("Salle ajoutée avec succès !");
        }).catch(err => {
          this.toast.error("Un problème est survenu !");
          console.log(err);
        })
      } else {
        this.toast.error("Le champ ne peut pas être vide");
      }

    },
    deleteSalle() {
      axios.delete(this.apiUrl + "delete-salle/" + this.selectedSalle.id)
          .then(res => {
            const deletedSalleIndex: number = this.salles.indexOf(this.selectedSalle);
            this.salles.splice(deletedSalleIndex, 1);
            this.afficherConfirmer = false;
            this.toast.success("Salle supprimée avec succès !");
          }).catch(err => {
        this.toast.error("Un problème est survenu !");
        console.log(err);
      })
    },
    showConfirmer(salle: Salle) {
      this.afficherConfirmer = true;
      this.selectedSalle = salle;
    },
    showCreation() {
      this.afficherCreation = true;
      this.libelle = "";
    },
    editSalle(salle: Salle) {
      this.afficherModifier = true
      this.selectedSalle = salle
      this.libelle = this.selectedSalle.libelle
    },
    updateSalle() {
      if (this.libelle != "") {
        axios.put(this.apiUrl + "edit-salle/" + this.selectedSalle.id, {
          'libelle': this.libelle,
        }).then(res => {
          const lastUpdatedSalle = this.salles.find(salle => salle.id === this.selectedSalle.id) as Salle;
          lastUpdatedSalle.libelle = res.data[0].libelle;
          this.afficherModifier = false;
          this.toast.success("Salle modifiée avec succès !");
        }).catch(err => {
          this.toast.error("Un problème est survenu !");
          console.log(err);
        })
      } else {
        this.toast.error("Le champ ne peut pas être vide");
      }
    }
  }

})
</script>

<style scoped>

</style>
