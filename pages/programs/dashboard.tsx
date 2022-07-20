import { SwapInput } from "@/components/atoms/SwapInput"
import { VItemContainer } from "@/components/atoms/VItemContainer"
import { VTitle } from "@/components/atoms/VTitle"
import Layout from "@/components/layout"
import { BasicCard, IBasicCardProps } from "@/components/molecules/BasicCard"
import { PricesSection, IPricesSectionProps } from '../../components/organisms/pricesSection';
import  UsePrevTrades  from "@/hooks/dapps/uniswap/usePrevTrades"
export interface DashboardProps {

}

const Dashboard = ({}) => {

  return (
    <>
    <Layout>
      <div className="flex flex-col justify-between items-center py-vsm h-full">
        <div className="px-vsm">
        <VTitle type='h1'>I am a dashboard</VTitle>
        <UsePrevTrades/>
      
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