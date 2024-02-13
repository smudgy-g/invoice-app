<template>
  <div v-if="invoicesLoaded">
    <div
      v-if="!mobile"
      class="app flex flex-col bg-slate-950 min-h-screen md:flex-row"
    >
      <Navigation />
      <div class="flex flex-col px-5 flex-1 relative">
        <Modal v-if="modal" />
        <Transition
          name="invoice"
          enter-active-class="transition-all duration-[0.8s]"
          leave-active-class="transition-all duration-[0.8s]"
          enter-from-class="-translate-x-[780px]"
          leave-to-class="-translate-x-[780px]"
        >
          <InvoiceModal v-if="invoiceModal" />
        </Transition>
        <RouterView />
      </div>
    </div>
    <div
      v-else
      class="flex flex-col text-center justify-center items-center h-screen text-white bg-slate-950"
    >
      <h2 class="text-2xl">
        Sorry, this app is not supported on mobile devices.
      </h2>
      <p class="mt-6">Please use a tablet or computer.</p>
    </div>
  </div>
  <div
    v-else
    class="w-full bg-slate-950 min-h-screen"
  >
    <Loading />
  </div>
</template>

<script setup lang="ts">
import InvoiceModal from './components/InvoiceModal.vue'
import Modal from '@/components/Modal.vue'
import Loading from '@/components/Loading.vue'
import Navigation from './components/Navigation.vue'
import { onMounted, ref } from 'vue'
import { useStore } from '@/stores/store'
import { storeToRefs } from 'pinia'

const store = useStore()
const { invoiceModal, modal, invoicesLoaded } = storeToRefs(store)

const mobile = ref<boolean>()

onMounted(() => {
  store.getInvoices()
  checkScreen()
  window.addEventListener('resize', checkScreen)
})

function checkScreen() {
  const windowWidth = window.innerWidth
  if (windowWidth <= 750) {
    mobile.value = true
    return
  }
  mobile.value = false
}
</script>
