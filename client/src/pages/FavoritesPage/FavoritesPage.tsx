import FavoritesList from '@/widget/FavoritesList/FavoritesList'
import React, { useEffect } from 'react'

type FavoritesPageProps = {
  
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({}) => {
  return <div>
    <>
    <FavoritesList/>
    </>
  </div>
}

export default FavoritesPage