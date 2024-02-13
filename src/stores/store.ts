import { ref } from 'vue'
import { defineStore } from 'pinia'
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export type InvoiceItem = {
  id: any
  itemName: string
  qty: string
  price: string
  total: number
}

export interface InvoicePayload {
  docId: string
  invoiceId: string
  billerStreetAddress: string
  billerCity: string
  billerZipCode: string
  billerCountry: string
  clientName: string
  clientEmail: string
  clientStreetAddress: string
  clientCity: string
  clientZipCode: string
  clientCountry: string
  invoiceDateUnix: number
  invoiceDate: string
  paymentTerms: string
  paymentDueDateUnix: number
  paymentDueDate: string
  productDescription: string
  invoiceItemList: InvoiceItem[]
  invoiceTotal: number
  invoicePending: string | boolean
  invoiceDraft: string | boolean
  invoicePaid: string | boolean
}

export const useStore = defineStore('store', () => {
  const invoiceModal = ref(false)
  const modal = ref(false)
  const invoiceData = ref<InvoicePayload[]>([])
  const invoicesLoaded = ref(false)
  const editInvoice = ref(false)
  const currentInvoice = ref<InvoicePayload | null>()

  function toggleInvoiceModal() {
    invoiceModal.value = !invoiceModal.value
  }

  function toggleModal() {
    modal.value = !modal.value
  }

  function toggleEditInvoice() {
    editInvoice.value = !editInvoice.value
  }

  async function getInvoices() {
    try {
      const querySnapshot = await getDocs(collection(db, 'invoices'))

      querySnapshot.forEach((doc) => {
        if (
          !invoiceData.value.some(
            (invoice: InvoicePayload) => invoice.docId === doc.id
          )
        ) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoicePaid: doc.data().invoicePaid,
          }
          setInvoiceData(data)
          invoicesLoaded.value = true
        }
      })
    } catch (error) {
      console.log('Error fetching invoices', error)
    }
  }

  async function deleteInvoiceFromDb(docId: string) {
    try {
      await deleteDoc(doc(db, 'invoices', docId))
      deleteInvoiceFromState(docId)
    } catch (error) {
      console.log(error)
    }
  }

  async function updateStatusToPaidDB(docId: string) {
    const docRef = doc(db, 'invoices', docId)
    await updateDoc(docRef, {
      invoicePaid: true,
      invoicePending: false,
    })
  }

  async function updateStatusToPendingDB(docId: string) {
    const docRef = doc(db, 'invoices', docId)
    await updateDoc(docRef, {
      invoicePaid: false,
      invoicePending: true,
      invoiceDraft: false
    })
  }

  async function updateInvoice(docId: string, routeId: string) {
    deleteInvoiceFromState(docId)
    await getInvoices()
    toggleInvoiceModal()
    setCurrentInvoice(routeId)
  }

  function deleteInvoiceFromState(docId: string) {
    invoiceData.value = invoiceData.value.filter(
      (invoice) => invoice.docId !== docId
    )
  }

  function setInvoiceData(payload: InvoicePayload) {
    invoiceData.value.push(payload)
  }

  function setCurrentInvoice(id: string) {
    const index = invoiceData.value.findIndex(
      (invoice) => invoice.invoiceId === id
    )
    return (currentInvoice.value = invoiceData.value[index])
  }

  function updateStatusToPaid(docId: string) {
    invoiceData.value.forEach((invoice) => {
      if (invoice.docId === docId) {
        invoice.invoicePaid = true
        invoice.invoicePending = false
      }
    })
    updateStatusToPaidDB(docId)
  }

  function updateStatusToPending(docId: string) {
    invoiceData.value.forEach((invoice) => {
      if (invoice.docId === docId) {
        invoice.invoicePaid = false
        invoice.invoicePending = true
        invoice.invoiceDraft = false
      }
    })
    updateStatusToPendingDB(docId)
  }

  return {
    invoiceModal,
    modal,
    toggleInvoiceModal,
    toggleModal,
    getInvoices,
    invoiceData,
    invoicesLoaded,
    setCurrentInvoice,
    editInvoice,
    toggleEditInvoice,
    currentInvoice,
    updateInvoice,
    deleteInvoiceFromDb,
    updateStatusToPaid,
    updateStatusToPending
  }
})
