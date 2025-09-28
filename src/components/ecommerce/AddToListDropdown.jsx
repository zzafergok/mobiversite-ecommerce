'use client'

import { useState } from 'react'
import { useLists } from '@/contexts/ListsContext'
import { Button } from '@/components/core/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/core/popover'
import { Check, Plus, List as ListIcon } from 'lucide-react'

export default function AddToListDropdown({ product, children }) {
  const { lists, addProductToList, removeProductFromList, isProductInList } = useLists()
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleProductInList = async (listId) => {
    try {
      if (isProductInList(listId, product.id)) {
        await removeProductFromList(listId, product.id)
      } else {
        await addProductToList(listId, product)
      }
    } catch (error) {
      console.error('Error toggling product in list:', error)
    }
  }

  if (lists.length === 0) {
    return null
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className='w-80 p-0' align='end'>
        <div className='p-4'>
          <div className='flex items-center gap-2 mb-3'>
            <ListIcon className='w-4 h-4' />
            <h3 className='font-medium'>Listeye Ekle</h3>
          </div>

          <div className='space-y-2 max-h-60 overflow-y-auto'>
            {lists.map((list) => {
              const isInList = isProductInList(list.id, product.id)

              return (
                <div
                  key={list.id}
                  className='flex items-center justify-between p-2 rounded-lg hover: dark:hover:bg-gray-800 cursor-pointer group'
                  onClick={() => handleToggleProductInList(list.id)}
                >
                  <div className='flex-1 min-w-0'>
                    <div className='font-medium text-sm truncate'>{list.name}</div>
                    {list.description && <div className='text-xs text-gray-500 truncate'>{list.description}</div>}
                    <div className='text-xs text-gray-400 mt-1'>{list.items.length} ürün</div>
                  </div>

                  <Button
                    variant={isInList ? 'default' : 'outline'}
                    size='sm'
                    className={`ml-2 min-w-[32px] h-8 ${
                      isInList ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'group-hover:bg-gray-100'
                    }`}
                  >
                    {isInList ? <Check className='w-4 h-4' /> : <Plus className='w-4 h-4' />}
                  </Button>
                </div>
              )
            })}
          </div>

          <div className='mt-4 pt-3 border-t'>
            <p className='text-xs text-gray-500 text-center'>
              Yeni liste oluşturmak için Profil → Listelerim sayfasını ziyaret edin
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
