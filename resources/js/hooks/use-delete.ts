import { useState } from 'react'
import { router } from '@inertiajs/react'
import toast from 'react-hot-toast'
import type { RouteDefinition } from '@/wayfinder'

type DeleteOptions = {
  preserveState?: boolean
}

type AnyRoute = RouteDefinition<'delete'>

export function useDeleteWithToast() {
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteItem = (
    route: AnyRoute,
    successMessage = 'Data berhasil dihapus!',
    errorMessage = 'Terjadi kesalahan saat menghapus data.',
    options: DeleteOptions = { preserveState: true }
  ) => {
    setIsDeleting(true)

    router.delete(route, {
      preserveState: options.preserveState,
      onSuccess: () => {
        toast.success(successMessage)
        setIsDeleting(false)
      },
      onError: () => {
        toast.error(errorMessage)
        setIsDeleting(false)
      },
    })
  }

  return { deleteItem, isDeleting }
}
