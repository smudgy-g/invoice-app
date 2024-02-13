<template>
  <div class="z-[100] fixed flex justify-center items-center h-screen w-full">
    <div
      class="rounded-2xl py-8 px-10 max-w-md bg-slate-800 text-white text-center shadow-2xl shadow-violet-950/60"
    >
      <p>Are you sure you want to exit? Your changes will no be saved.</p>
      <div class="flex mt-6 w-full justify-end">
        <button
          type="button"
          @click="closeModal"
          class="bg-white text-black flex-1"
        >
          Back
        </button>
        <button
          type="button"
          @click="closeInvoice"
          class="bg-red-800 flex-1"
        >
          Exit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'

const store = useStore()

function closeModal() {
  store.toggleModal()
}

function closeInvoice() {
  store.toggleModal()
  store.toggleInvoiceModal()
  if(store.editInvoice) {
    store.toggleEditInvoice()
  }
}
</script>
