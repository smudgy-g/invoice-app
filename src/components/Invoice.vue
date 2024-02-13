<template>
  <RouterLink
    :to="{ name: 'invoice', params: { invoiceId: props.invoice.invoiceId } }"
    class="flex no-underline cursor-pointer gap-4 mb-4 text-white rounded-lg py-7 px-8 bg-slate-900 items-center"
  >
    <div class="flex items-center basis-[60%] gap-4">
      <span class="uppercase flex-1">#{{ props.invoice.invoiceId }}</span>
      <span class="due-date flex-1">{{ props.invoice.paymentDueDate }}</span>
      <span class="person flex-1">{{ props.invoice.clientName }}</span>
    </div>
    <div class="flex gap-4 basis-[40%] items-center">
      <span class="flex-1 font-semibold"
        >€{{ props.invoice.invoiceTotal }}</span
      >
      <div
        class="status-button flex"
        :class="{
          paid: props.invoice.invoicePaid,
          draft: props.invoice.invoiceDraft,
          pending: props.invoice.invoicePending,
        }"
      >
        <span v-if="props.invoice.invoicePaid">Paid</span>
        <span v-if="props.invoice.invoiceDraft">Draft</span>
        <span v-if="props.invoice.invoicePending">Pending</span>
      </div>
      <div>
        <img
          src="/assets/icons/caret-right.svg"
          alt="arrow right"
          class="w-8 h-8"
        />
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { InvoicePayload } from '@/stores/store'

const props = defineProps<{ invoice: InvoicePayload }>()
</script>
