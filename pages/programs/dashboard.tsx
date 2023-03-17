import { SwapInput } from "@/components/atoms/SwapInput"
import { useState, useEffect} from 'react'
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
import FirstChart from "@/hooks/dapps/dashboard/firstChart";
import { useAccount } from "@/hooks/useAccount";
export interface DashboardProps {

}

const Dashboard = ({}) => {
  const { pageTypes, bricks } = useContext(ReactBricksContext)  
  const { isDarkMode } = useDarkMode();
  const { chainId, user, library, isAuthenticated } = useAccount();
  const [trades, setTrades] = useState([])

  useEffect(() => {

    console.log('dashboard',user,library)

    
  
  }, [])
  
 //we'll change this later, inline styling is bad
let divstyle={
  color:'white'
 }
let priceStyle={
  marginTop:'10%',
}
 
 //shit loads p fast so mainly just used for not connected
 if(!user ){
return(
  <>
  <div style={divstyle}>
  <Layout displayCallout={false} useDarkFonts={!isDarkMode}>
    <div style={priceStyle}>
      <PricesSection source='coinGecko'/>
    </div>
    <div className="flex flex-col justify-between items-center py-vsm h-full">
      <div className="px-vsm">
      <VTitle type='h1'>How am I supposed to pull ur shit if ur not connected? {`>:(`}</VTitle>
   <div className='flex flex-col'>
          </div>
         
       
      </div>
      <div>
        
      </div>
    </div>
    </Layout>
    </div>
  </>
)
 }
 else
  return (
    <>
    <div style={divstyle}>
    <Layout displayCallout={false} useDarkFonts={!isDarkMode}>
    <div style={priceStyle}>
      <PricesSection source='coinGecko'/>
    </div>
      <div className="flex flex-col justify-between items-center py-vsm h-full">
        <div className="px-vsm">
        <VTitle type='h1'>I am a dashboard</VTitle>
      <UsePrevTrades chainId={chainId} user={user} library={library}/>
          <VidyaAccessories user={user} library={library} chainId={chainId} isAuthenticated={isAuthenticated}/>
        <div className='flex flex-col'>
            </div>
           
         
        </div>
        <div>
          
        </div>
      </div>
      </Layout>
      </div>
    </>
  )
}

export default Dashboard