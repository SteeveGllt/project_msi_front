<template>
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
                class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                @click="this.afficherConfirmer = false">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
              Voulez vous vraiment supprimer le ticket {{ this.deletedTicketObject }} ?
            </p>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
                class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button" @click="this.afficherConfirmer = false">
              Close
            </button>
            <button
                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button" @click="deleteTicket">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="afficherConfirmer" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
  <div>
    <div v-if="afficherUserModal"
         class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-full my-6 mx-auto max-w-xs">
        <!--content-->
        <div
            class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              Tag
            </h3>
            <button
                class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                @click="this.afficherUserModal = false;this.currentUser = this.defaultUser">
                          <span
                              class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
            </button>
          </div>
          <!--body-->
          <div class="space-x-1 p-5 ">
            <div class="m-1 flex space-x-2 justify-center ">
              <select v-model="currentUser" @change="tagUser" class="px-3 py-1 border rounded text-sm">
                <option v-for="user in this.users" :value="user" :bind="user.id" class="p-2"
                        :style="'background-color:#' + user.color + ';color:#' + user.fontColor"> {{
                    user.prenom + " " + user.nom[0]
                  }}
                </option>
              </select>
              <div
                  class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-red-600 rounded cursor-pointer hover:bg-red-500"
                  v-if="!ticketUserTag.users || ticketUserTag.users.length === 0">Aucun user tagué
              </div>
            </div>
            <div class="flex flex-wrap space-x-2 justify-center items-center">
              <div v-for="user in ticketUserTag.users" :key="user.id" class="items-center m-1">
                <div class="flex space-x-2">
                  <div
                      class="etat px-3 py-1 text-sm font-bold transition-colors duration-200 transform rounded cursor-pointer hover:bg-gray-500"
                      :style="'--color:#' + user.color + ';' + '--color-text:#' + user.fontColor +';'">
                    {{ user.prenom }}
                    <button @click="removeUser(user.id)">X</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
            <button
                class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button" @click="this.afficherUserModal = false;this.currentUser = this.defaultUser">
              fermer
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="afficherUserModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
  <div>
    <ModalTermine class="z-50" v-if="this.afficherTerminer" @close="annulerTermine(ticketChangeEtat)"
                  @etat="this.changeEtat(ticketChangeEtat)"></ModalTermine>
  </div>
  <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded -mt-12"
      :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <div class="flex justify-between">
            <div>
              <h3
                  class="font-semibold text-lg" v-if="this.isAllTicket === 1"
                  :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
              >
                Tickets
              </h3>
              <h3
                  class="font-semibold text-lg" v-if="this.isAllTicket === 0"
                  :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
              >
                Mes tickets
              </h3>
              <h3
                  class="font-semibold text-lg" v-if="this.isAllTicket === 2"
                  :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
              >
                Terminer
              </h3>
            </div>
            <div class="relative flex flex-wrap items-stretch mb-3">
            <span
                class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1">
              <i class="fa-solid fa-magnifying-glass"></i>
            </span>
              <input type="text" placeholder="Search" v-model="search"
                     class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"/>
            </div>
          </div>
          <div class="flex justify-between" v-if="isAllTicket !==2">
            <div class="flex flex-row1">
              <div @click="filterNew" class="btn btn-filter text-sm" :class="{selected:isNewSelected}">Les
                plus
                récents
              </div>
              <div @click="filterUrgence" class="btn btn-filter text-sm"
                   :class="{selected:isUrgentSelected}">Les plus
                urgents
              </div>
            </div>
            <div class="space-x-2">
              <select v-model="searchEtat" v-on:change="filterEtat" class="border p-1 text-sm">
                <option v-for="etat in this.etats" :value="etat" v-bind="etat.id" class="p-1"
                        :style="'background-color:#' + etat.color + ';color:#' + etat.fontColor"> {{
                    etat.libelle
                  }}
                </option>
              </select>
              <button @click="this.tickets = this.ticketTemp" class="text-sm">Supprimer filtre</button>
            </div>
          </div>
          <div v-else-if="isAllTicket ===2">
            <div class="space-x-2">
              <select v-model="searchUser" v-on:change="filterUser" class="border p-1 text-sm">
                <option v-for="user in this.users" :value="user" v-bind="user.id" class="p-1"
                        :style="'background-color:#' + user.color + ';color:#' + user.fontColor"> {{
                    user.prenom + " " + user.nom[0]
                  }}
                </option>
              </select>
              <button @click="this.tickets = this.ticketTemp" class="text-sm">Supprimer filtre</button>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="w-full overflow-x-auto flex items-center">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse responsive-hidden"
             v-if="this.tickets.length !== 0">
        <thead>
        <tr>
          <th
              v-if="this.isAllTicket !==2"
              class="px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >
            Urgence
          </th>
          <th
              class="px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >
            Objet
          </th>
          <th
              class="px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left cursor-pointer"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
              @click="trierDestinataire('mail_expediteur')"
          ><i v-if="isProvenanceFlecheVisible" :class="sensFleche" class="fa-solid fa-arrow-right"></i>
            Provenance
          </th>
          <th
              class="px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >
            Description
          </th>
          <th
              class="px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left cursor-pointer"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
              @click="trierDate('date_creation')"
          ><i v-if="isCreationFlecheVisible" :class="sensFleche" class="fa-solid fa-arrow-right"></i>
            Création
          </th>
          <th
              class="px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left cursor-pointer"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
              @click="trierDate('date_limite')"
          ><i v-if="isLimiteFlecheVisible" :class="sensFleche" class="fa-solid fa-arrow-right"></i>
            Limite
          </th>
          <th
              class="px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left cursor-pointer"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
              @click="trierSalle('salle')"
          ><i v-if="isSalleFlecheVisible" :class="sensFleche" class="fa-solid fa-arrow-right"></i>
            Salle
          </th>
          <th
              class="px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >User
          </th>
          <th
              class="px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >État
          </th>
          <th
              class="px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >Copier
          </th>
          <th
              class="px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >Répondu
          </th>
          <th
              class="px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >Supprimer
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="ticket in filterTicket.slice(this.start,this.end)" @click="getOneTicket(ticket.id)"
            :class="{new: ticket.new,delete: ticket.delete}" class="cursor-default">
          <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left items-center"
              v-if="this.isAllTicket !==2">
              <span v-if="ticket.urgence === 0"
                    class="font-bold"
                    :class="[
                  color === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
              >
                Trkl
              </span>
            <span v-if="ticket.urgence === 1"
                  class="font-bold"
                  :class="[
                  color === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
            >
                 1 semaine
              </span>
            <span v-if="ticket.urgence === 2"
                  class="font-bold"
                  :class="[
                  color === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
            >
                3 jours
              </span>
            <span v-if="ticket.urgence === 3"
                  class="font-bold"
                  :class="[
                  color === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
            >
                Demain
              </span>
            <span v-if="ticket.urgence === 4"
                  class="font-bold"
                  :class="[
                  color === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
            >
                Aujourd'hui
              </span>
            <span v-if="ticket.urgence === 5"
                  class="font-bold"
                  :class="[
                  color === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
            >
                Retard
              </span>
          </th>
          <td class="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
            {{ ticket.objet.slice(0, 50) }}
            <span v-if="ticket.objet.length > 50">...</span>
          </td>
          <td
              class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            {{ ticket.mail_expediteur.slice(0, 15) }}
            <span v-if="ticket.mail_expediteur.length > 15">...</span>
          </td>
          <td
              class="border-t-0 px-2 border-l-0 border-r-0 text-xs  p-2 max-w-200-px"
          >
            {{ ticket.description.slice(0, 50) }}
            <span v-if="ticket.description.length > 50">...</span>
          </td>
          <td
              class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex flex-col"
          >
            <p>{{ ticket.date_creation.slice(0, 10) }}</p>
            <p>{{ ticket.date_creation.slice(11, 16) }}</p>
          </td>
          <td
              class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            {{ ticket.date_limite }}
          </td>
          <td
              class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            {{ ticket.salle.libelle }}
          </td>
          <td class="border-t-0 px-4 border-l-0 border-r-0 text-xs p-4 flex flex-wrap max-w-120-px"
              @click.stop="afficherTagUser(ticket)">
            <div class="users rounded p-1 text-sm m-0.5 grow flex justify-center max-w-[30px]"
                 :style="'--color:#' + user.color+ ';' + '--color-text:#' + user.fontColor "
                 v-for="user in ticket.users" v-if="ticket.users.length > 0">{{
                user.prenom[0] + user.nom[0]
              }}
            </div>
            <div class="users rounded p-1 text-sm" style="--color: #f36363;" v-else>Aucun</div>
          </td>
          <td
              class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            <select v-model="ticket.etat" @click.stop
                    :style="'background-color:#' + ticket.etat.color + ';color:#' + ticket.etat.fontColor"
                    @change="afficherTermine(ticket)" class="px-1 py-1 appearance-none border-none rounded text-sm ">
              <option v-for="etat in this.etats" :value="etat" :bind="etat.id" class="text-sm"
                      :style="'background-color:#' + etat.color + ';color:#' + etat.fontColor"> {{
                  etat.libelle
                }}
              </option>
            </select>
          </td>
          <td
              class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center hover:cursor-pointer"
              @click.stop="dupliquer(ticket)">
            <i class="fa-regular fa-copy fa-xl"></i>
          </td>
          <td
              class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
          >
            <input class="cursor-pointer" type="checkbox" v-model="ticket.is_repondu"
                   @click.stop="changeIsRepondu(ticket)">
          </td>
          <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs p-4 text-center cursor-pointer"
              @click.stop="showConfirmer(ticket)">
            <i class="fa-solid fa-trash fa-lg" style="color: #8e0101;"></i>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- c le responsive là -->
      <div v-if="this.width <= 400" class="flex flex-col">
        <div class="rounded overflow-hidden shadow-lg max-w-[328px]" v-for="ticket in this.filterTicket"
             @click="getOneTicket(ticket.id)">
          <div class="px-6 pt-4 pb-2 flex items-center">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  :style="'background-color:#' + ticket.etat.color + ';color:#' + ticket.etat.fontColor">{{ ticket.etat.libelle }}</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ ticket.salle.libelle }}</span>
          </div>
          <div
              class=" px-6 rounded-full space-x-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 flex flex-row w-auto"
              v-if="ticket.users.length !== 0">
            <div :style="'background-color:#' + user.color + ';color:#' + user.fontColor" class="p-2 rounded-full"
                 v-for="user in ticket.users">{{ user.nom[0] + user.prenom[0] }}
            </div>
          </div>
          <div v-else class="   text-sm font-semibold text-gray-700 mr-2 mb-2 flex flex-row w-auto">
            <p class=" mx-6 bg-red-600 text-white px-2 py-1 rounded-full">Pas 2 User</p>
          </div>
          <div class="px-6">
            <div class="font-bold text-md mb-2">{{ ticket.mail_expediteur }}</div>
            <div class="font-bold text-xl mb-2">{{ ticket.objet }}</div>
            <p class="text-gray-700 text-base">
              {{ ticket.description.slice(0, 150) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="this.tickets.length === 0"
       class="flex justify-center items-center text-center bg-white rounded shadow-lg p-2">
    <p v-if="this.isAllTicket === 0">Vous n'avez pas 2 Ticket</p>
    <p v-if="this.isAllTicket === 1">Pas 2 Ticket</p>
    <p v-if="this.isAllTicket === 2">Pas 2 Ticket terminé</p>
  </div>
  <pagination :total="tickets.length" :per-page="perPage" :current-page="currentPage" @page-changed="onPageChanged"
              class="responsive-hidden"/>
</template>

<script lang="ts">
import type {Ticket} from '@/interfaces/Ticket';
import {defineComponent} from 'vue';
import axios from "axios";
import type {Etat} from '@/interfaces/Etat';
import type {Commentaire} from "@/interfaces/Commentaire";
import type {User} from "@/interfaces/User";
import {useUserStore} from "@/stores/user";
import router from "@/router";
import Pagination from '@/components/Pagination.vue';
import ModalTermine from "@/components/ModalTermine.vue";
import {POSITION} from "vue-toastification";
import {computeStyles} from "@popperjs/core";

import jwtInterceptorSetup from "@/Interceptors/JwtInterceptor"

jwtInterceptorSetup();

export default defineComponent({
  name: 'Tickets',
  components: {ModalTermine, Pagination},
  data: () => {
    return {
      tickets: [] as Ticket[],
      allTickets: [] as Ticket[],
      etats: [] as Etat[],
      users: [] as User[],
      commentaires: [] as Commentaire[],
      commentaire: "" as String,
      userName: "" as String,
      afficherConfirmer: false as boolean,
      selectedTicket: {} as Ticket,
      apiUrl: "" as string,
      isChangeBackground: false as boolean,
      userTagged: [] as User[],
      deletedTicketObject: "" as string,
      isAllTicket: 0 as number,
      search: "" as string,
      searchEtat: {} as Etat,
      searchUser: {} as User,
      ticketTemp: [] as Ticket[],
      end: 0 as number,
      currentPage: 1 as number,
      start: 0 as number,
      perPage: 10 as number,
      dateAujourdhui: new Date().getTime() as number,
      width: window.innerWidth as number,
      isNewSelected: true as boolean, //Pour mettre une classe sur les boutons "Les plus récents" et "Les plus urgents" quand on les sélectionne
      isUrgentSelected: false as boolean,
      currentSort: "" as string,
      currentSortDir: "" as string,
      afficherTerminer: false as boolean,
      afficherUserModal: false as boolean,
      ticketUserTag: {} as Ticket,
      currentUser: {} as User,
      ticketChangeEtat: {} as Ticket,
      isCreationFlecheVisible: false as boolean,
      isLimiteFlecheVisible: false as boolean,
      isProvenanceFlecheVisible: false as boolean,
      isSalleFlecheVisible: false as boolean,
      sensFleche: "rotate-90" as string,
      defaultUser: {
        id: -1,
        email: ' ',
        nom: ' ',
        prenom: 'Utilisateur',
        color: '56ba89',
        fontColor: 'ffffff'
      } as User,
      defaultEtat: {
        id: -1,
        libelle: "Etat",
        ordre: -100,
        color: "ffffff",
        fontColor: "000000",
      }
    }
  },
  setup() {
    const userStore = useUserStore();
    return {userStore};
  },
  computed: {
    filterTicket() {
      return this.tickets.filter((ticket: Ticket) => {
        if (ticket.description != undefined) {
          return (ticket.description.toLowerCase().includes(this.search.toLowerCase()) || ticket.objet.toLowerCase().includes(this.search.toLowerCase()) || ticket.salle?.libelle.toLowerCase().includes(this.search.toLowerCase()) || ticket.mail_expediteur?.toLowerCase().includes(this.search.toLowerCase()))
        }
      })
    },
  },
  props: {
    color: {
      default: "light",
      validator: function (value: any) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },
  methods: {
    tagUser() {
      if (this.currentUser.id !== -1) {
        axios.put(this.apiUrl + "add-user/" + this.currentUser.id + "/ticket/" + this.ticketUserTag.id)
            .then(res => {
              if (res.data.status !== 'error' && res.data.code !== 501) {
                this.ticketUserTag.users.push(this.currentUser);
              }
            }).catch(err => {
          console.log(err)
        })
      }
    },
    removeUser(userId: number) {
      axios.delete(this.apiUrl + "delete-user/" + userId + "/ticket/" + this.ticketUserTag.id)
          .then(res => {
            this.ticketUserTag.users = this.ticketUserTag.users?.filter(user => user.id !== userId)
          }).catch(err => {
        console.log(err)
      })
    },
    afficherTagUser(ticket: Ticket) {
      this.ticketUserTag = ticket;
      this.afficherUserModal = true;
    },
    annulerTermine(ticket: Ticket) {
      this.afficherTerminer = false;
      axios.get(this.apiUrl + "get-etat-ticket/" + ticket.id)
          .then(res => {
            let etat: Etat = {
              id: res.data.id,
              libelle: res.data.libelle,
              ordre: res.data.ordre,
              color: res.data.color,
              fontColor: res.data.fontColor
            }
            ticket.etat = etat;
          })
    },
    afficherTermine(ticket: Ticket) {
      this.ticketChangeEtat = ticket;
      if (ticket.etat.libelle === "Terminé") {
        this.afficherTerminer = true;
      } else {
        this.changeEtat(ticket);
      }
    },
    checkAscDesc(s: any) {
      this.isUrgentSelected = false;
      this.isNewSelected = false;
      //Si ce que l'on chercher à filter correspond déjà à ce qui a été filtrer avant, alors on change le sens
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    },
    checkSensFleche() {
      if (this.currentSortDir === 'asc') {
        this.sensFleche = 'rotate-90';
      } else if (this.currentSortDir === 'desc') {
        this.sensFleche = '-rotate-90';
      }
    },
    //J'ai essayé de faire une fonction pour tout histoire d'etre DRY mais c'est impossible avec les dates et les types d'interfaces
    trierDestinataire(s: string) {
      this.checkAscDesc(s);
      this.tickets = this.tickets.sort((a: Ticket, b: Ticket) => {
        let modifier = 1;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (a.mail_expediteur < b.mail_expediteur) return -1 * modifier;
        if (a.mail_expediteur > b.mail_expediteur) return 1 * modifier;
        return 0;
      })
      this.isProvenanceFlecheVisible = true;
      this.isSalleFlecheVisible = false;
      this.isCreationFlecheVisible = false;
      this.isLimiteFlecheVisible = false;
      this.checkSensFleche();
    },
    trierSalle(s: any) {
      this.checkAscDesc(s);
      this.tickets = this.tickets.sort((a: Ticket, b: Ticket) => {
        let modifier = 1;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (a.salle.libelle < b.salle.libelle) return -1 * modifier;
        if (a.salle.libelle > b.salle.libelle) return 1 * modifier;
        return 0;
      })
      this.isSalleFlecheVisible = true;
      this.isProvenanceFlecheVisible = false;
      this.isCreationFlecheVisible = false;
      this.isLimiteFlecheVisible = false;
      this.checkSensFleche();
    },
    trierDate(s: any) {
      this.checkAscDesc(s);
      let modifier = 1;
      if (s === 'date_creation') {
        this.isCreationFlecheVisible = true;
        this.isSalleFlecheVisible = false;
        this.isProvenanceFlecheVisible = false;
        this.isLimiteFlecheVisible = false;
      } else if (s === 'date_limite') {
        this.isLimiteFlecheVisible = true;
        this.isSalleFlecheVisible = false;
        this.isProvenanceFlecheVisible = false;
        this.isCreationFlecheVisible = false;
      }
      this.checkSensFleche();
      if (this.currentSortDir === 'desc') {
        modifier = -1;
      }
      this.tickets.sort((a: Ticket, b: Ticket) => {
        //@ts-ignore
        if (a[s] <= b[s]) return -1 * modifier;
        //@ts-ignore
        if (a[s] >= b[s]) return 1 * modifier;
        return 0;
      })
    },
    changeEtat(ticket: Ticket) {
      axios.put(this.apiUrl + "ticket-change/" + ticket.id + "/etat/" + ticket.etat?.id)
          .then(res => {
            if (ticket.etat.libelle === "Terminé" && (this.isAllTicket === 1 || this.isAllTicket === 0)) {
              const deletedTickedIndex: number = this.tickets.indexOf(ticket);
              this.tickets.splice(deletedTickedIndex, 1);
              if (this.afficherTerminer) {
                this.afficherTerminer = false;
              }
            } else if (ticket.etat.libelle !== "Terminé" && this.isAllTicket === 2) {
              const deletedTickedIndex: number = this.tickets.indexOf(ticket);
              this.tickets.splice(deletedTickedIndex, 1);
            }
          }).catch(err => console.log(err));
    },
    filterEtat() {
      if (this.searchEtat.id !== this.defaultEtat.id) {
        if (this.searchEtat.libelle === "Terminé") {
          this.$router.push({name: 'home', params: {isAll: 2}})
        } else {
          this.tickets = this.ticketTemp;
          this.tickets = this.tickets.filter((ticket: Ticket) => ticket.etat?.id === this.searchEtat.id)
        }
      }
    },
    filterUser() {
      this.tickets = this.ticketTemp;
      this.tickets = [];
      if (this.defaultUser.id !== this.searchUser.id) {
        this.ticketTemp.forEach((ticket: Ticket) => ticket.users?.forEach((user) => {
          if (user.id === this.searchUser.id) {
            this.tickets.push(ticket);
          }
        }))
      }
    },
    filterNew() {
      this.tickets.sort((a: Ticket, b: Ticket) => (a.date_creation < b.date_creation ? 1 : -1));
      this.isNewSelected = true;
      if (this.isUrgentSelected) {
        this.isUrgentSelected = false;
      }
      this.isCreationFlecheVisible = false;
      this.isLimiteFlecheVisible = false;
      this.isProvenanceFlecheVisible = false;
      this.isSalleFlecheVisible = false;
    },
    filterUrgence() {
      //@ts-ignore
      this.tickets.sort((a: Ticket, b: Ticket) => (a.urgence < b.urgence ? 1 : -1));
      this.isUrgentSelected = true;
      if (this.isNewSelected) {
        this.isNewSelected = false;
      }
      this.isCreationFlecheVisible = false;
      this.isLimiteFlecheVisible = false;
      this.isProvenanceFlecheVisible = false;
      this.isSalleFlecheVisible = false;
    },
    onPageChanged(page: number) {
      this.currentPage = page;
      this.start = (this.currentPage - 1) * this.perPage;
      this.end = this.start + this.perPage;
    },
    getOneTicket(idTicket: number) {
      this.$router.push({name: 'ticket', params: {id: idTicket}})
    },
    changeIsRepondu(ticket: Ticket) {
      axios.put(this.apiUrl + "ticket-change-repondu/" + ticket.id)
          .then(res => {
            ticket.is_repondu;
          }).catch(err => console.log(err))
    },
    dupliquer(ticket: Ticket) {
      axios.post(this.apiUrl + "create-ticket", ticket)
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
              users: res.data.users,
              urgence: ticket.urgence,
              new: true
            };
            let ticketIndex: number = this.tickets.findIndex(x => x.id === ticket.id);
            let ticketTemp: Ticket = this.tickets[ticketIndex];
            let modifier: number;
            if (ticketIndex === this.end - 1) {
              modifier = -1;
            } else {
              modifier = 1;
            }
            this.tickets.splice(ticketIndex + modifier, 0, currentTicket);
          })
          .catch(err => console.log(err.response.data));
    },
    showConfirmer(ticket: Ticket) {
      this.afficherConfirmer = true;
      this.selectedTicket = ticket;
      this.deletedTicketObject = ticket.objet as string;
    },
    deleteTicket() {
      this.selectedTicket.delete = true;
      this.afficherConfirmer = false;
      setTimeout(() => {
        axios.delete(this.apiUrl + "delete-ticket/" + this.selectedTicket.id)
            .then(res => {
              const deletedTickedIndex: number = this.tickets.indexOf(this.selectedTicket);
              this.tickets.splice(deletedTickedIndex, 1);
            })
            .catch(err => console.log(err));
      }, 400);
    },
    async getTickets() {
      setTimeout(() => {
        if (this.isAllTicket == 1) {
          this.tickets = this.allTickets;
        } else {
          this.tickets = [];
          for (let i = 0; i < this.allTickets.length; i++) {
            if (this.allTickets[i].users.length != 0 && this.allTickets[i].users != undefined) {
              this.allTickets[i].users.forEach(userTicket => {
                if (this.userStore.user.id !== undefined) {
                  if (userTicket.id === +this.userStore.user.id) {
                    this.tickets.push(this.allTickets[i]);
                  }
                }
              })
            }
          }
        }
        this.ticketTemp = this.tickets;
        this.start = (this.currentPage - 1) * this.perPage;
        this.end = this.start + this.perPage;
      }, 200);
    },
    logOut() {
      let removeToken = localStorage.removeItem('access_token');
      if (removeToken == null) {
        const usersStore = useUserStore();
        usersStore.changeUserLog();
        router.push("/login");
      }
    },
    getUrgence(ticket: Ticket): number {
      //Pour regarder le nombre de jour qui sépare une date d'aujourd'hui, il faut convertir les dates en millisecondes
      //Ensuite on fait la différence entre les deux dates et on compare avec le temps en millisecondes de la durée que l'on cherche
      //Exemple : 604800000 = 7 jours donc si la différence entre les 2 est > à 604800000 alors la date limite est dans plus de 7 jours

      //D'abord on converti la date que l'on récupère en milliseconds et pour ça il faut la passer en mm/dd/yyyy
      const dateTicketString: string = ticket.date_limite.toString();
      const dateParts: string[] = dateTicketString.split("-");
      const dateTicket: number = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]).getTime();
      //Ensuite on défini nos intervales en millisecondes
      const uneSemaine: number = 604800000;
      const troisJours: number = 259200000;
      const deuxJours: number = 172800000;
      const unJour: number = 86400000;
      //On calcule la différence
      const difference: number = dateTicket - this.dateAujourdhui;
      //Et on compare
      let urgence: number = 0;
      if (difference > uneSemaine) {
        //Plus d'une semaine
        urgence = 0;
      } else {
        if (difference < troisJours && difference > unJour) {
          //Moins de trois jours
          urgence = 2;
        } else {
          if (difference < deuxJours && difference > unJour) {
            urgence = 3;
            //Demain
          } else {
            if (difference <= unJour && difference >= 0) {
              urgence = 4;
              //Aujourd'hui
            } else {
              if (difference < 0) {
                urgence = 5;
                //Date dépassée
              } else {
                urgence = 1;
                //Moins d'une samaine
              }
            }
          }
        }
      }
      return urgence;
    },
    getFini() {
      axios.get(this.apiUrl + "tickets-termine")
          .then(res => {
            for (let i = 0; i < res.data.length; i++) {
              let currentTicket: Ticket = {
                id: res.data[i].id,
                mail_expediteur: res.data[i].mail_expediteur.toLowerCase(),
                mail_destinataire: res.data[i].mail_destinataire,
                objet: res.data[i].objet,
                description: res.data[i].description,
                is_repondu: res.data[i].is_repondu,
                date_creation: res.data[i].date_creation,
                date_limite: res.data[i].date_limite,
                etat: res.data[i].etat,
                salle: res.data[i].salle,
                commentaire: res.data[i].commentaires,
                users: res.data[i].users,
              }
              const urgence = this.getUrgence(currentTicket);
              currentTicket.urgence = urgence;

              this.tickets.push(currentTicket);
            }
            this.ticketTemp = this.tickets;
            this.start = (this.currentPage - 1) * this.perPage;
            this.end = this.start + this.perPage;
          })
          .catch(err => console.log(err));
    }
  },
  mounted() {
    console.log(this.width)
    this.isAllTicket = +this.$route.params.isAll;
    if (this.width == 1920) {
      this.perPage = 12;
    } else if (this.width <= 1800 && this.width > 1600) {
      this.perPage = 8;
    } else if (this.width <= 1600) {
      this.perPage = 5;
    }
    this.apiUrl = import.meta.env.VITE_API_URL;
    if (this.isAllTicket == 1 || this.isAllTicket == 0) {
      axios.get(this.apiUrl + "tickets-date-limite")
          .then(res => {
            for (let i = 0; i < res.data.length; i++) {
              let currentTicket: Ticket = {
                id: res.data[i].id,
                mail_expediteur: res.data[i].mail_expediteur.toLowerCase(),
                mail_destinataire: res.data[i].mail_destinataire,
                objet: res.data[i].objet,
                description: res.data[i].description,
                is_repondu: res.data[i].is_repondu,
                date_creation: res.data[i].date_creation,
                date_limite: res.data[i].date_limite,
                etat: res.data[i].etat,
                salle: res.data[i].salle,
                commentaire: res.data[i].commentaires,
                users: res.data[i].users,
              }
              const urgence = this.getUrgence(currentTicket);
              currentTicket.urgence = urgence;
              this.allTickets.push(currentTicket);
            }
          })
          .catch(err => console.log(err));
      this.getTickets();
      setTimeout(() => {
        this.filterNew();
      }, 400);

    } else {
      this.getFini()
    }

    if (this.users.length === 0) {
      axios.get(this.apiUrl + "utilisateurs")
          .then(res => {
            this.users.push(this.defaultUser);
            this.currentUser = this.defaultUser;
            this.searchUser = this.defaultUser;
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
          }).catch(err => {
        console.log(err)
      });
    }

    axios.get(this.apiUrl + "etats")
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            let currentEtat: Etat = {
              id: res.data[i].id,
              libelle: res.data[i].libelle,
              ordre: res.data[i].ordre,
              color: res.data[i].color,
              fontColor: res.data[i].fontColor
            }
            this.etats.push(currentEtat);
          }
          this.etats.push(this.defaultEtat);
          this.etats.sort((e1, e2) => e1.ordre - e2.ordre)
          this.searchEtat = this.defaultEtat;
        }).catch(err => console.log(err));
  },
  beforeRouteUpdate(to, from, next) {
    this.isAllTicket = +to.params.isAll;
    if (this.isAllTicket == 0 || this.isAllTicket == 1) {
      this.getTickets();
    } else {
      this.tickets = [];
      this.getFini();
    }
    next();
  },
});
</script>

<style>
table {
  z-index: 5;
}
</style>
