<template>
  <div
    @click="checkClick"
    ref="invoiceWrap"
    class="flex flex-col fixed top-0 left-0 w-full h-screen overflow-scroll scrollbar-hide md:left-[90px]"
  >
    <form
      @submit.prevent="submitForm"
      class="relative p-14 max-w-[700px] w-full bg-slate-950 text-white shadow-md shadow-violet-950"
    >
      <Loading v-show="loading" />
      <h1
        class="mb-12 text-white text-3xl"
        v-if="!editInvoice"
      >
        New Invoice
      </h1>
      <h1
        class="mb-12 text-white text-3xl"
        v-else
      >
        Edit Invoice
      </h1>

      <!-- Bill From -->
      <div class="flex flex-col mb-12">
        <h4 class="text-violet-900 text-base mb-6">Bill From</h4>
        <div class="flex flex-col mb-6">
          <label for="billerStreetAddress">Street Address</label>
          <input
            required
            type="text"
            id="billerStreetAddress"
            v-model="form.billerStreetAddress"
          />
        </div>
        <div class="flex gap-4">
          <div class="flex flex-col flex-1 mb-6">
            <label for="billerCity">City</label>
            <input
              required
              type="text"
              id="billerCity"
              v-model="form.billerCity"
            />
          </div>
          <div class="flex flex-col flex-1 mb-6">
            <label for="billerZipCode">Zip Code</label>
            <input
              required
              type="text"
              id="billerZipCode"
              v-model="form.billerZipCode"
            />
          </div>
          <div class="flex flex-col flex-1 mb-6">
            <label for="billerCountry">Country</label>
            <input
              required
              type="text"
              id="billerCountry"
              v-model="form.billerCountry"
            />
          </div>
        </div>
      </div>

      <!-- Bill To -->
      <div class="flex flex-col mb-12">
        <h4 class="text-violet-900 text-base mb-6">Bill To</h4>
        <div class="flex flex-col mb-6">
          <label for="clientName">Client's Name</label>
          <input
            required
            type="text"
            id="clientName"
            v-model="form.clientName"
          />
        </div>
        <div class="flex flex-col mb-6">
          <label for="clientEmail">Client's Email</label>
          <input
            required
            type="text"
            id="clientEmail"
            v-model="form.clientEmail"
          />
        </div>
        <div class="flex flex-col mb-6">
          <label for="clientStreetAddress">Street Address</label>
          <input
            required
            type="text"
            id="clientStreetAddress"
            v-model="form.clientStreetAddress"
          />
        </div>
        <div class="flex gap-4">
          <div class="flex flex-col mb-6">
            <label for="clientCity">City</label>
            <input
              required
              type="text"
              id="clientCity"
              v-model="form.clientCity"
            />
          </div>
          <div class="flex flex-col mb-6">
            <label for="clientZipCode">Zip Code</label>
            <input
              required
              type="text"
              id="clientZipCode"
              v-model="form.clientZipCode"
            />
          </div>
          <div class="flex flex-col mb-6">
            <label for="clientCountry">Country</label>
            <input
              required
              type="text"
              id="clientCountry"
              v-model="form.clientCountry"
            />
          </div>
        </div>
      </div>

      <!-- Invoice Work Details -->
      <div class="flex flex-col">
        <div class="flex gap-6 flex-1">
          <div class="flex flex-col mb-6">
            <label for="invoiceDate">Invoice Date</label>
            <input
              disabled
              type="text"
              id="invoiceDate"
              v-model="form.invoiceDate"
            />
          </div>
          <div class="flex flex-col mb-6">
            <label for="paymentDueDate">Payment Due</label>
            <input
              disabled
              type="text"
              id="paymentDueDate"
              v-model="form.paymentDueDate"
            />
          </div>
        </div>
        <div class="flex flex-col flex-1 mb-6">
          <label for="paymentTerms">Payment Terms</label>
          <select
            required
            type="text"
            id="paymentTerms"
            v-model="form.paymentTerms"
          >
            <option value="30">Net 30 Days</option>
            <option value="60">Net 60 Days</option>
          </select>
        </div>
        <div class="flex flex-col flex-1 mb-6">
          <label for="productDescription">Product Description</label>
          <input
            required
            type="text"
            id="productDescription"
            v-model="form.productDescription"
          />
        </div>
        <div>
          <h3 class="mb-4 text-lg text-violet-900">Item List</h3>

          <table class="w-full">
            <tr class="flex gap-4 mb-4 text-left">
              <th class="basis-1/2">Item Name</th>
              <th class="basis-[10%]">Qty</th>
              <th class="basis-[20%]">Price</th>
              <th class="basis-[20%] self-center">Toal</th>
            </tr>
            <tr
              class="flex gap-4 relative mb-6"
              v-for="(item, index) in form.invoiceItemList"
              :key="index"
            >
              <td class="basis-1/2">
                <input
                  type="text"
                  v-model="item.itemName"
                />
              </td>
              <td class="basis-[10%]">
                <input
                  type="text"
                  v-model="item.qty"
                />
              </td>
              <td class="basis-[20%]">
                <input
                  type="text"
                  v-model="item.price"
                />
              </td>
              <td class="flex basis-[20%] self-center">
                ${{ (item.total = parseInt(item.qty) * parseInt(item.price)) }}
              </td>
              <img
                class="absolute top-[15px] right-0 w-4 h-4 cursor-pointer"
                @click="deleteInvoiceItem(item.id)"
                src="/assets/icons/delete.svg"
                alt=""
              />
            </tr>
          </table>

          <div
            @click="addNewInvoiceItem"
            class="flex button text-white bg-slate-950 items-center justify-center w-full"
          >
            <img
              src="/assets/icons/plus.svg"
              alt=""
              class="mr-1 w-4 h-4"
            />
            Add New Item
          </div>
        </div>
      </div>

      <!-- Save/Exit -->
      <div class="flex mt-14">
        <div>
          <button
            type="button"
            @click="closeInvoice"
            class="bg-red-800"
          >
            Cancel
          </button>
        </div>
        <div class="flex w-full justify-end">
          <button
            v-if="!editInvoice"
            type="submit"
            @click="saveDraft"
            class="bg-indigo-900"
          >
            Save Draft
          </button>
          <button
            v-if="!editInvoice"
            type="submit"
            @click="publishInvoice"
            class="bg-violet-900"
          >
            Create Invoice
          </button>
          <button
            v-if="editInvoice"
            type="submit"
            class="bg-violet-900"
          >
            Update Invoice
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import Loading from '@/components/Loading.vue'
import { useStore, type InvoiceItem } from '@/stores/store'
import { uid } from 'uid'
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const store = useStore()
const { editInvoice } = storeToRefs(store)
const route = useRoute()

const invoiceWrap = ref(null)
const loading = ref(false)
const form = reactive({
  docId: <string | null>null,
  billerStreetAddress: <null | string>null,
  billerCity: <null | string>null,
  billerZipCode: <null | string>null,
  billerCountry: <null | string>null,
  clientName: <null | string>null,
  clientEmail: <null | string>null,
  clientStreetAddress: <null | string>null,
  clientCity: <null | string>null,
  clientZipCode: <null | string>null,
  clientCountry: <null | string>null,
  invoiceDateUnix: <null | number>null,
  invoiceDate: <null | string>null,
  paymentTerms: <null | string>null,
  paymentDueDateUnix: <null | number>null,
  paymentDueDate: <null | string>null,
  productDescription: <null | string>null,
  invoicePending: <boolean | null>null,
  invoiceDraft: <boolean | null>null,
  invoiceItemList: <InvoiceItem[]>[],
  invoiceTotal: 0,
})

onMounted(() => {
  if (!editInvoice.value) {
    form.invoiceDateUnix = Date.now()
    form.invoiceDate = new Date(form.invoiceDateUnix).toLocaleDateString(
      'en-us',
      { day: 'numeric', month: 'short', year: 'numeric' }
    )
  }

  if (editInvoice.value) {
    const currentInvoice = store.currentInvoice
    if (currentInvoice) {
      form.docId = currentInvoice.docId
      form.billerStreetAddress = currentInvoice.billerStreetAddress
      form.billerCity = currentInvoice.billerCity
      form.billerZipCode = currentInvoice.billerZipCode
      form.billerCountry = currentInvoice.billerCountry
      form.clientName = currentInvoice.clientName
      form.clientEmail = currentInvoice.clientEmail
      form.clientStreetAddress = currentInvoice.clientStreetAddress
      form.clientCity = currentInvoice.clientCity
      form.clientZipCode = currentInvoice.clientZipCode
      form.clientCountry = currentInvoice.clientCountry
      form.invoiceDateUnix = currentInvoice.invoiceDateUnix
      form.invoiceDate = currentInvoice.invoiceDate
      form.paymentTerms = currentInvoice.paymentTerms
      form.paymentDueDateUnix = currentInvoice.paymentDueDateUnix
      form.paymentDueDate = currentInvoice.paymentDueDate
      form.productDescription = currentInvoice.productDescription
      form.invoicePending = !!currentInvoice.invoicePending
      form.invoiceDraft = !!currentInvoice.invoiceDraft
      form.invoiceItemList = currentInvoice.invoiceItemList
      form.invoiceTotal = currentInvoice.invoiceTotal
    }
  }
})

watch(
  () => form.paymentTerms,
  (paymentTerms: any) => {
    const futureDate = new Date()
    form.paymentDueDateUnix = futureDate.setDate(
      futureDate.getDate() + parseInt(paymentTerms)
    )
    form.paymentDueDate = new Date(form.paymentDueDateUnix).toLocaleDateString(
      'en-us',
      { day: 'numeric', month: 'short', year: 'numeric' }
    )
  }
)

function addNewInvoiceItem() {
  form.invoiceItemList.push({
    id: uid(),
    itemName: '',
    price: '',
    qty: '',
    total: 0,
  })
}

function deleteInvoiceItem(id: any) {
  const index = form.invoiceItemList.findIndex((item) => item.id === id)
  form.invoiceItemList.splice(index, 1)
}

function calculateInvoiceTotal() {
  form.invoiceTotal = 0
  form.invoiceItemList.forEach((item) => {
    form.invoiceTotal += item.total
  })
}

function publishInvoice() {
  form.invoicePending = true
}
function saveDraft() {
  form.invoiceDraft = true
}

async function uploadInvoice() {
  if (form.invoiceItemList.length <= 0) {
    alert('Please fill out work item.')
    return
  }

  loading.value = true
  calculateInvoiceTotal()

  try {
    const docRef = await addDoc(collection(db, 'invoices'), {
      invoiceId: uid(6),
      billerStreetAddress: form.billerStreetAddress,
      billerCity: form.billerCity,
      billerZipCode: form.billerZipCode,
      billerCountry: form.billerCountry,
      clientName: form.clientName,
      clientEmail: form.clientEmail,
      clientStreetAddress: form.clientStreetAddress,
      clientCity: form.clientCity,
      clientZipCode: form.clientZipCode,
      clientCountry: form.clientCountry,
      invoiceDate: form.invoiceDate,
      invoiceDateUnix: form.invoiceDateUnix,
      paymentTerms: form.paymentTerms,
      paymentDueDate: form.paymentDueDate,
      paymentDueDateUnix: form.paymentDueDateUnix,
      productDescription: form.productDescription,
      invoiceItemList: form.invoiceItemList,
      invoiceTotal: form.invoiceTotal,
      invoicePending: form.invoicePending,
      invoiceDraft: form.invoiceDraft,
      invoicePaid: null,
    })
    console.log('Document written with ID: ', docRef.id)
  } catch (error) {
    console.error('Error adding document: ', error)
  }

  loading.value = false
  store.getInvoices()
  store.toggleInvoiceModal()
}

async function updateInvoice() {
  if (form.invoiceItemList.length <= 0) {
    alert('Please fill out work item.')
    return
  }

  loading.value = true
  calculateInvoiceTotal()

  try {
    const docRef = doc(db, 'invoices', form.docId!)
    await updateDoc(docRef, {
      billerStreetAddress: form.billerStreetAddress,
      billerCity: form.billerCity,
      billerZipCode: form.billerZipCode,
      billerCountry: form.billerCountry,
      clientName: form.clientName,
      clientEmail: form.clientEmail,
      clientStreetAddress: form.clientStreetAddress,
      clientCity: form.clientCity,
      clientZipCode: form.clientZipCode,
      clientCountry: form.clientCountry,
      paymentTerms: form.paymentTerms,
      paymentDueDate: form.paymentDueDate,
      paymentDueDateUnix: form.paymentDueDateUnix,
      productDescription: form.productDescription,
      invoiceItemList: form.invoiceItemList,
      invoiceTotal: form.invoiceTotal,
    })
    console.log('Document written with ID: ', docRef.id)

    loading.value = false
    store.updateInvoice(form.docId!, route.params.invoiceId as string)
  } catch (error) {
    console.error('Error adding document: ', error)
  }
}

function submitForm() {
  if (editInvoice.value) {
    updateInvoice()
    return
  }
  uploadInvoice()
}
function closeInvoice() {
  store.toggleInvoiceModal()
  if (store.editInvoice) {
    store.toggleEditInvoice()
  }
}
function checkClick(e: any) {
  if (e.target === invoiceWrap.value) {
    store.toggleModal()
  }
}
</script>
@/stores/store
