import { SwapInput } from "@/components/atoms/SwapInput"
import { VItemContainer } from "@/components/atoms/VItemContainer"
import { VTitle } from "@/components/atoms/VTitle"
import Layout from "@/components/layout"
import { cleanPage, PageViewer, ReactBricksContext } from "react-bricks";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useContext } from "react";
import { BasicCard, IBasicCardProps } from "@/components/molecules/BasicCard"
import { PricesSection, IPricesSectionProps } from '@/components/organisms/pricesSection';
import  UsePrevTrades  from "@/hooks/dapps/uniswap/usePrevTrades"
import VidyaAccessories from "@/hooks/dapps/inventory/VidyaAccessories";
export interface DashboardProps {

}

const Dashboard = ({}) => {
  const { pageTypes, bricks } = useContext(ReactBricksContext)  
  const { isDarkMode } = useDarkMode();
 


  return (
    <>
    <Layout displayCallout={false} useDarkFonts={!isDarkMode}>
      <div className="flex flex-col justify-between items-center py-vsm h-full">
        <div className="px-vsm">
        <VTitle type='h1'>I am a dashboard</VTitle>
        <UsePrevTrades/>
      <VidyaAccessories/>
        <div className='flex flex-col'>
              <PricesSection source='coinGecko'/>
            </div>
           
         
        </div>
        <div>
          
        </div>
      </div>
      </Layout>
    </>
  )
}

export default Dashboard