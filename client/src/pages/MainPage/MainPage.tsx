import { Banner } from '@/shared/ui/Banner'
import { ComparisonTable } from '@/shared/ui/ComparsionTable'
import { ProductDescription } from '@/shared/ui/ProductDescription'
import React from 'react'

type MainPageProps = {
  
}

export const MainPage: React.FC<MainPageProps> = ({}) => {
  return <div>
    <Banner/>
    <ProductDescription/>
    <ComparisonTable/>
  </div>
}

export default MainPage