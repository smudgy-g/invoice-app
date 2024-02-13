<template>
  <div class="container text-white">
    <div class="flex mb-16">
      <div class="flex-1 flex-col">
        <h1 class="text-4xl">Invoices</h1>
        <span>There are {{ invoiceData.length }} total invoices</span>
      </div>
      <div class="flex-1 flex justify-end items-center relative">
        <div
          @click="toggleFilterMenu"
          class="flex items-center relative mr-10 cursor-pointer text-white"
        >
          <span class="text-sm"
            >Filter by status
            <span
              v-if="filterInvoice"
              class="text-sm"
              >: {{ filterInvoice }}</span
            ></span
          >
          <img
            src="/assets/icons/caret-down.svg"
            class="text-white w-6 h-6 ml-3"
            alt=""
          />
          <ul
            v-show="filterMenu"
            class="w-[150px] absolute top-[30px] list-none bg-slate-900 shadow-2xl rounded-md shadow-violet-800/90 text-base"
          >
            <li
              @click="filterInvoices"
              class="cursor-pointer py-2 px-4 hover:text-slate-900 hover:bg-white"
            >
              Draft
            </li>
            <li
              @click="filterInvoices"
              class="cursor-pointer py-2 px-4 hover:text-slate-900 hover:bg-white"
            >
              Pending
            </li>
            <li
              @click="filterInvoices"
              class="cursor-pointer py-2 px-4 hover:text-slate-900 hover:bg-white"
            >
              Paid
            </li>
            <li
              @click="filterInvoices"
              class="cursor-pointer py-2 px-4 hover:text-slate-900 hover:bg-white"
            >
              Clear Filters
            </li>
          </ul>
        </div>
        <div
          @click="newInvoice"
          class="button flex items-center py-2 px-3 bg-violet-900"
        >
          <div
            class="flex mr-2 rounded-full p-2 items-center justify-center bg-white"
          >
            <img
              src="/assets/icons/plus.svg"
              alt=""
              class="w-3 h-3"
            />
          </div>
          <span>New Invoice</span>
        </div>
      </div>
    </div>

    <!-- Invoices List -->
    <div v-if="invoiceData.length > 0">
      <Invoice
        v-for="(invoice, index) in filteredData"
        :invoice="invoice"
        :key="index"
      />
    </div>
    <div
      v-else
      class="flex flex-col mt-40 items-center"
    >
      <img
        src="/assets/images/illustration-empty.svg"
        alt="empty illustration"
        class="w-[214px] h-[200px]"
      />
      <h3 class="text-3xl mt-10">There is nothing here</h3>
      <p class="text-center max-w-sm mt-4 font-thin text-sm">
        Create a new invoice by clicking the New Invoice button and get started
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from '@/stores/store'
import Invoice from '@/components/Invoice.vue'
import { storeToRefs } from 'pinia'

const store = useStore()
const { invoiceData } = storeToRefs(store)

const filterMenu = ref(false)
const filterInvoice = ref<any>(null)

function toggleFilterMenu() {
  filterMenu.value = !filterMenu.value
}
function newInvoice() {
  store.toggleInvoiceModal()
}

function filterInvoices(e: any) {
  if (e.target.innerText === 'Clear Filters') {
    filterInvoice.value = null
    return
  }
  filterInvoice.value = e.target.innerText
}

const filteredData = computed(() => {
  return invoiceData.value.filter((invoice) => {
    if (filterInvoice.value === 'Draft') {
      return invoice.invoiceDraft === true
    }
    if (filterInvoice.value === 'Pending') {
      return invoice.invoicePending === true
    }
    if (filterInvoice.value === 'Paid') {
      return invoice.invoicePaid === true
    }
    return invoice
  })
})
</script>
