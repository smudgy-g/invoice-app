<template>
  <div
    v-if="currentInvoice"
    class="container text-zinc-300"
  >
    <RouterLink
      class="flex mb-8 items-center text-white"
      :to="{ name: 'home' }"
    >
      <img
        src="/assets/icons/caret-left.svg"
        alt="left arrow"
        class="w-8 h-8 mr-4"
      />
      Go Back
    </RouterLink>
    <div class="flex bg-slate-900 rounded-xl items-center py-6 px-8">
      <div class="flex items-center">
        <span class="mr-4">Status</span>
        <div
          class="status-button flex"
          :class="{
            paid: currentInvoice.invoicePaid,
            draft: currentInvoice.invoiceDraft,
            pending: currentInvoice.invoicePending,
          }"
        >
          <span v-if="currentInvoice.invoicePaid">Paid</span>
          <span v-if="currentInvoice.invoiceDraft">Draft</span>
          <span v-if="currentInvoice.invoicePending">Pending</span>
        </div>
      </div>
      <div class="flex flex-1 justify-end text-white">
        <button
          @click="toggleEditInvoice"
          class="bg-violet-900"
        >
          Edit
        </button>
        <button
          @click="deleteInvoice(currentInvoice.docId)"
          class="bg-red-800"
        >
          Delete
        </button>
        <button
          @click="updateStatusToPaid(currentInvoice.docId)"
          v-if="currentInvoice.invoicePending"
          class="bg-green-700"
        >
          Mark as Paid
        </button>
        <button
          v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
          @click="updateStatusToPending(currentInvoice.docId)"
          class="bg-orange-400"
        >
          Mark as Pending
        </button>
      </div>
    </div>

    <!-- Invoice Details -->
    <div class="flex flex-col bg-slate-900 rounded-xl p-12 mt-6">
      <div class="flex flex-1">
        <div class="flex flex-col">
          <p class="uppercase text-text-zinc-300 text-2xl mb-2">
            <span>#</span>{{ currentInvoice.invoiceId }}
          </p>
          <p>{{ currentInvoice.productDescription }}</p>
        </div>
        <div class="flex flex-col items-end flex-1">
          <p>{{ currentInvoice.billerStreetAddress }}</p>
          <p>{{ currentInvoice.billerCity }}</p>
          <p>{{ currentInvoice.billerZipCode }}</p>
          <p>{{ currentInvoice.billerCountry }}</p>
        </div>
      </div>
      <div class="flex mt-12 gap-4">
        <div class="flex flex-col flex-1">
          <h4 class="font-semibold mb-3">Invoice Date</h4>
          <p class="text-lg">
            {{ currentInvoice.invoiceDate }}
          </p>
          <h4 class="mt-8 font-semibold mb-3">Payment Date</h4>
          <p class="text-lg">
            {{ currentInvoice.paymentDueDate }}
          </p>
        </div>
        <div class="flex flex-col flex-1">
          <h4 class="font-semibold mb-3">Bill To</h4>
          <p class="text-xl mb-2">{{ currentInvoice.clientName }}</p>
          <p>{{ currentInvoice.clientStreetAddress }}</p>
          <p>{{ currentInvoice.clientCity }}</p>
          <p>{{ currentInvoice.clientZipCode }}</p>
          <p>{{ currentInvoice.clientCountry }}</p>
        </div>
        <div class="flex flex-col flex-[2_2_0%]">
          <h4 class="font-semibold mb-3">Sent To</h4>
          <p>{{ currentInvoice.clientEmail }}</p>
        </div>
      </div>
      <div class="flex flex-col mt-12">
        <div class="p-8 rounded-[20px_20px_0_0] bg-slate-800">
          <div class="flex mb-8 text-right text-violet-800">
            <p class="flex-3 text-left">Item Name</p>
            <p class="flex-1">QTY</p>
            <p class="flex-1">Price</p>
            <p class="flex-1">Total</p>
          </div>
          <div
            v-for="(item, index) in currentInvoice.invoiceItemList"
            :key="index"
            class="flex mb-8 text-right last-of-type:mb-0"
          >
            <p class="flex-1 text-left">{{ item.itemName }}</p>
            <p class="flex-1">{{ item.qty }}</p>
            <p class="flex-1">{{ item.price }}</p>
            <p class="flex-1">{{ item.total }}</p>
          </div>
        </div>
        <div class="flex p-8 bg-slate-950 items-center rounded-[0_0_20px_20px]">
          <p class="flex-1">Amount Due</p>
          <p class="flex-1 text-right text-2xl">
            €{{ currentInvoice.invoiceTotal.toFixed(2) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const { currentInvoice } = storeToRefs(store)
const route = useRoute()
const router = useRouter()

onMounted(() => {
  const invoiceId = route.params.invoiceId
  currentInvoice.value = store.setCurrentInvoice(invoiceId as string)
})

function toggleEditInvoice() {
  store.toggleEditInvoice()
  store.toggleInvoiceModal()
}

async function deleteInvoice(docId: string) {
  await store.deleteInvoiceFromDb(docId)
  router.push({ name: 'home' })
}

function updateStatusToPaid(docId: string) {
  store.updateStatusToPaid(docId)
}

function updateStatusToPending(docId: string) {
  store.updateStatusToPending(docId)
}
</script>
