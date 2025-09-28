'use client'

import { useState } from 'react'

import { Check, Plus, Heart, List as ListIcon } from 'lucide-react'

import { useLists } from '@/contexts/ListsContext'
import { useWishlist } from '@/contexts/WishlistContext'

import { Button } from '@/components/core/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/core/popover'

export default function FavoritesAndListsDropdown({ product, children }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { lists, addProductToList, removeProductFromList, isProductInList } = useLists()

  const [isOpen, setIsOpen] = useState(false)

  const handleToggleWishlist = async () => {
    try {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id)
      } else {
        addToWishlist(product)
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error)
    }
  }

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

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className='w-80 p-0' align='end'>
        <div className='p-4'>
          <div className='flex items-center gap-2 mb-4'>
            <Heart className='w-4 h-4' />
            <h3 className='font-medium'>Favoriler & Listeler</h3>
          </div>

          <div className='space-y-3 max-h-60 overflow-y-auto'>
            {/* Favoriler Kartı */}
            <div
              className='flex items-center justify-between p-3 rounded-lg border hover: dark:hover:bg-gray-800 cursor-pointer group transition-colors'
              onClick={handleToggleWishlist}
            >
              <div className='flex items-center gap-3 flex-1 min-w-0'>
                <Heart
                  className={`w-5 h-5 ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400'}`}
                  fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                />
                <div className='min-w-0 flex-1'>
                  <div className='font-medium text-sm'>Favoriler</div>
                  <div className='text-xs text-gray-500'>Beğendiğiniz ürünler</div>
                </div>
              </div>

              <Button
                variant={isInWishlist(product.id) ? 'default' : 'outline'}
                size='sm'
                className={`ml-2 min-w-[32px] h-8 ${
                  isInWishlist(product.id) ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'group-hover:bg-gray-100'
                }`}
              >
                {isInWishlist(product.id) ? <Check className='w-4 h-4' /> : <Plus className='w-4 h-4' />}
              </Button>
            </div>

            {/* Listeler */}
            {lists.length > 0 && (
              <>
                <div className='border-t pt-3'>
                  <div className='text-xs text-gray-500 mb-2 px-1'>LİSTELERİM</div>
                </div>

                {lists.map((list) => {
                  const isInList = isProductInList(list.id, product.id)

                  return (
                    <div
                      key={list.id}
                      className='flex items-center justify-between p-3 rounded-lg border hover: dark:hover:bg-gray-800 cursor-pointer group transition-colors'
                      onClick={() => handleToggleProductInList(list.id)}
                    >
                      <div className='flex items-center gap-3 flex-1 min-w-0'>
                        <ListIcon className='w-5 h-5 text-gray-400' />
                        <div className='min-w-0 flex-1'>
                          <div className='font-medium text-sm truncate'>{list.name}</div>
                          <div className='text-xs text-gray-500 truncate'>
                            {list.description || `${list.items.length} ürün`}
                          </div>
                        </div>
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
              </>
            )}
          </div>

          {lists.length === 0 && (
            <div className='mt-4 pt-3 border-t'>
              <p className='text-xs text-gray-500 text-center'>
                Yeni liste oluşturmak için Profil → Listelerim sayfasını ziyaret edin
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
