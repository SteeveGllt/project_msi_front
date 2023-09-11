<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: isFirstPage }">
        <a class="page-link" href="#" aria-label="First" @click.prevent="goToPage(1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" :class="{ disabled: isFirstPage }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="goToPage(currentPage - 1)">
          <span aria-hidden="true">&lt;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pages" :key="page" :class="{ active: page === currentPage }">
        <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: isLastPage }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="goToPage(currentPage + 1)">
          <span aria-hidden="true">&gt;</span>
        </a>
      </li>
      <li class="page-item" :class="{ disabled: isLastPage }">
        <a class="page-link" href="#" aria-label="Last" @click.prevent="goToPage(totalPages)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name:'Pagination',
  props: {
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  emits: ['page-changed'],
  setup(props, { emit }){
    const totalPages = computed(() => Math.ceil(props.total / props.perPage));
    const isFirstPage = computed(() => props.currentPage === 1);
    const isLastPage = computed(() => props.currentPage === totalPages.value);
    const pages = computed(() => {
      const start = Math.max(1, props.currentPage - 2);
      const end = Math.min(totalPages.value, start + 4);
      const pagesArray = [];
      for (let i = start; i <= end; i++) {
        pagesArray.push(i);
      }
      return pagesArray;
    });

    function goToPage(page: number) {
      if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
        emit('page-changed', page);
      }
    }

    return {
      totalPages,
      isFirstPage,
      isLastPage,
      pages,
      goToPage,
    };
  },
});
</script>

<style>
.pagination {
  display: inline-block;
  margin: 20px 0;
}

.pagination li {
  display: inline-block;
  margin-right: 5px;
}

.pagination li a {
  display: block;
  padding: 5px 10px;
  border: 1px solid #ddd;
}

.pagination li.active a {
  background-color: #007bff;
  color: #fff;
}

.pagination li.disabled a {
  pointer-events: none;
  background-color: #eee;
  color: #bbb;
}
</style>
