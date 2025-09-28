'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useState } from 'react'

import { Plus, Edit2, Trash2, FolderOpen } from 'lucide-react'

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
import { Badge } from '@/components/core/badge'
import { Input } from '@/components/core/input'
import { Button } from '@/components/core/button'
import { Textarea } from '@/components/core/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/core/dialog'

export default function ListsPage() {
  const router = useRouter()
  const { lists, createList, updateList, deleteList, loading } = useLists()

  const [editingList, setEditingList] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', description: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingList) {
        await updateList(editingList.id, formData)
        setEditingList(null)
      } else {
        await createList(formData)
        setIsCreateModalOpen(false)
      }
      setFormData({ name: '', description: '' })
    } catch (error) {
      console.error('Error saving list:', error)
    }
  }

  const handleEdit = (list) => {
    setEditingList(list)
    setFormData({ name: list.name, description: list.description })
  }

  const [deleteListId, setDeleteListId] = useState(null)

  const handleDelete = async () => {
    if (deleteListId) {
      await deleteList(deleteListId)
      setDeleteListId(null)
    }
  }

  if (loading) {
    return (
      <div className='space-y-6'>
        <div className='animate-pulse'>
          <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4'></div>
          <div className='space-y-3'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='h-32 bg-gray-200 dark:bg-gray-700 rounded'></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div className='flex-1'>
          <h1 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white'>Listelerim</h1>
          <p className='text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base'>
            Ürünlerinizi organize etmek için listeler oluşturun
          </p>
        </div>

        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className='flex items-center gap-2 w-full sm:w-auto justify-center'>
              <Plus className='w-4 h-4' />
              <span className='text-sm sm:text-base'>Yeni Liste</span>
            </Button>
          </DialogTrigger>
          <DialogContent className='w-[95vw] max-w-[400px] p-6'>
            <DialogHeader>
              <DialogTitle>Yeni Liste Oluştur</DialogTitle>
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
                  Oluştur
                </Button>
                <Button type='button' variant='outline' onClick={() => setIsCreateModalOpen(false)}>
                  İptal
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Modal */}
      {editingList && (
        <Dialog open={!!editingList} onOpenChange={() => setEditingList(null)}>
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
                <Button type='button' variant='outline' onClick={() => setEditingList(null)}>
                  İptal
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Modal */}
      <AlertDialog open={!!deleteListId} onOpenChange={() => setDeleteListId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Listeyi Sil</AlertDialogTitle>
            <AlertDialogDescription>
              Bu listeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
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

      {lists.length === 0 ? (
        <Card className='text-center py-10'>
          <CardContent className='pt-6 flex flex-col items-center gap-4'>
            <FolderOpen className='w-16 h-16 text-gray-400 mx-auto' />
            <h3 className='text-lg font-medium text-gray-900 dark:text-white'>Henüz liste oluşturmadınız</h3>
            <p className='text-gray-600 dark:text-gray-400'>
              İlk listenizi oluşturun ve ürünlerinizi organize etmeye başlayın
            </p>
            <div className='flex justify-center'>
              <Button onClick={() => setIsCreateModalOpen(true)} className='flex items-center gap-2'>
                <Plus className='w-4 h-4' />
                İlk Listemi Oluştur
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:gap-6'>
          {lists.map((list) => (
            <Card
              key={list.id}
              className='relative overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group'
              onClick={() => router.push(`/profile/lists/${list.id}`)}
            >
              <CardHeader className='pb-3 pr-16'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1 min-w-0'>
                    <CardTitle className='text-lg sm:text-xl font-semibold truncate group-hover:text-blue-600 transition-colors'>
                      {list.name}
                    </CardTitle>
                    {list.description && (
                      <p className='text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed line-clamp-2'>
                        {list.description}
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className='pr-16'>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3 flex-wrap'>
                    <Badge variant='secondary' className='text-xs font-medium'>
                      {list.items.length} ürün
                    </Badge>
                    <span className='text-xs text-gray-500'>
                      {new Date(list.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>

                  {list.items.length > 0 && (
                    <div className='flex items-center gap-2'>
                      <span className='text-xs text-gray-500'>Ürünler:</span>
                      <div className='flex -space-x-2'>
                        {list.items.slice(0, 3).map((product) => (
                          <div
                            key={product.id}
                            className='w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden bg-gray-100'
                          >
                            <Image
                              src={product.image}
                              alt={product.title}
                              width={32}
                              height={32}
                              className='w-full h-full object-cover'
                            />
                          </div>
                        ))}
                        {list.items.length > 3 && (
                          <div className='w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center'>
                            <span className='text-xs font-medium text-gray-600 dark:text-gray-300'>
                              +{list.items.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>

              {/* Düzenle/Sil butonları */}
              <div className='absolute top-4 right-4 z-10'>
                <div className='flex flex-col gap-2 sm:flex-row sm:gap-1'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleEdit(list)
                    }}
                    className='h-9 w-9 p-0 bg-white dark:bg-gray-800 shadow-lg border-gray-300 hover: touch-manipulation'
                    title='Listeyi düzenle'
                  >
                    <Edit2 className='w-4 h-4 text-gray-600' />
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setDeleteListId(list.id)
                    }}
                    className='h-9 w-9 p-0 bg-white dark:bg-gray-800 shadow-lg border-red-200 hover:bg-red-50 touch-manipulation'
                    title='Listeyi sil'
                  >
                    <Trash2 className='w-4 h-4 text-red-600' />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
