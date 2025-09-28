'use client'

import { useRouter } from 'next/navigation'

import { useState, useEffect, use } from 'react'

import { ArrowLeft, Edit2, Trash2, ListX, Plus } from 'lucide-react'

import { useLists } from '@/contexts/ListsContext'

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
} from '@/components/core/alert-dialog'
import { Input } from '@/components/core/input'
import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Textarea } from '@/components/core/textarea'
import ProductCard from '@/components/ecommerce/ProductCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/core/dialog'

export default function ListDetailPage({ params }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const { lists, updateList, deleteList, removeProductFromList, loading } = useLists()

  const [list, setList] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [formData, setFormData] = useState({ name: '', description: '' })

  useEffect(() => {
    if (!loading) {
      if (lists.length === 0) {
        // Eğer liste yoksa ana sayfaya yönlendir
        router.push('/profile/lists')
        return
      }

      const foundList = lists.find((l) => l.id === resolvedParams.id)
      if (foundList) {
        setList(foundList)
      } else {
        // Liste bulunamazsa ana sayfaya yönlendir
        router.push('/profile/lists')
      }
    }
  }, [lists, loading, resolvedParams.id, router])

  const handleEdit = () => {
    setFormData({ name: list.name, description: list.description })
    setIsEditModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateList(list.id, formData)
      setIsEditModalOpen(false)
      // Liste güncellendiğinde state'i de güncelle
      setList((prev) => ({ ...prev, ...formData }))
    } catch (error) {
      console.error('Error updating list:', error)
    }
  }

  const handleDelete = async () => {
    await deleteList(list.id)
    router.push('/profile/lists')
    setShowDeleteConfirm(false)
  }

  const handleRemoveFromList = async (productId) => {
    await removeProductFromList(list.id, productId)
    // Liste state'ini güncelle
    setList((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== productId),
    }))
  }

  if (loading) {
    return (
      <div className='space-y-6'>
        <div className='animate-pulse'>
          <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4'></div>
          <div className='h-32 bg-gray-200 dark:bg-gray-700 rounded mb-6'></div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className='h-80 bg-gray-200 dark:bg-gray-700 rounded'></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!list) {
    return (
      <div className='flex items-center justify-center min-h-96'>
        <div className='text-center'>
          <h2 className='text-xl font-semibold mb-2'>Liste bulunamadı</h2>
          <p className='text-gray-600 mb-4'>Bu liste artık mevcut değil veya silinmiş olabilir.</p>
          <button onClick={() => router.push('/profile/lists')} className='text-blue-600 hover:text-blue-700'>
            Listelerime Dön
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => router.push('/profile/lists')}
            className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Listelerime Dön
          </button>
        </div>
      </div>

      {/* Liste Bilgileri */}
      <Card>
        <CardHeader className='space-y-4'>
          <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>
            <div className='flex-1 min-w-0'>
              <CardTitle className='text-xl sm:text-2xl font-bold break-words'>{list.name}</CardTitle>
              {list.description && (
                <p className='text-gray-600 dark:text-gray-400 mt-3 text-sm sm:text-base leading-relaxed'>
                  {list.description}
                </p>
              )}
            </div>
            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 flex-shrink-0'>
              <Button
                variant='outline'
                onClick={handleEdit}
                className='flex items-center justify-center gap-2 h-9 text-sm'
              >
                <Edit2 className='w-4 h-4' />
                Düzenle
              </Button>
              <Button
                variant='outline'
                onClick={() => setShowDeleteConfirm(true)}
                className='flex items-center justify-center gap-2 text-red-600 hover:text-red-700 h-9 text-sm'
              >
                <Trash2 className='w-4 h-4' />
                Sil
              </Button>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row sm:items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-800'>
            <Badge variant='secondary' className='w-fit text-sm'>
              {list.items.length} ürün
            </Badge>
            <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500'>
              <span>Oluşturulma: {new Date(list.createdAt).toLocaleDateString('tr-TR')}</span>
              {list.updatedAt !== list.createdAt && (
                <span>Güncelleme: {new Date(list.updatedAt).toLocaleDateString('tr-TR')}</span>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className='w-[95vw] max-w-[400px] p-6'>
            <DialogHeader>
              <DialogTitle>Liste Düzenle</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-2'>Liste Adı</label>
                <Input
                  placeholder='Örn: Favori Elektronikler'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-2'>Açıklama (İsteğe bağlı)</label>
                <Textarea
                  placeholder='Bu liste hakkında kısa bir açıklama...'
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className='flex gap-2 pt-4'>
                <Button type='submit' className='flex-1'>
                  Güncelle
                </Button>
                <Button type='button' variant='outline' onClick={() => setIsEditModalOpen(false)}>
                  İptal
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Modal */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Listeyi Sil</AlertDialogTitle>
            <AlertDialogDescription>
              Bu listeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve listedeki tüm ürünler
              kaldırılacak.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className='bg-red-600 hover:bg-red-700'>
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Liste İçeriği */}
      {list.items.length === 0 ? (
        <Card className='text-center py-12'>
          <CardContent className='pt-6'>
            <ListX className='w-16 h-16 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>Bu listede henüz ürün yok</h3>
            <p className='text-gray-600 dark:text-gray-400 mb-6'>Ürün sayfalarından bu listeye ürün ekleyebilirsiniz</p>
            <div className='flex justify-center'>
              <Button className='flex items-center gap-2' onClick={() => router.push('/products')}>
                <Plus className='w-4 h-4' />
                Ürünlere Git
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {list.items.map((product) => (
            <div key={product.id} className='relative group'>
              <ProductCard product={product} />
              <Button
                variant='outline'
                size='sm'
                onClick={() => handleRemoveFromList(product.id)}
                className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 shadow-md hover:bg-red-50 hover:text-red-600'
              >
                <Trash2 className='w-4 h-4' />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
