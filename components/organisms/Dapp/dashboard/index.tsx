import { SwapInput } from "@/components/atoms/SwapInput"
import { useEffect, useState } from "react"
import { cleanPage, PageViewer, ReactBricksContext } from "react-bricks";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useContext } from "react";
import { useAccount } from "@/hooks/useAccount";
import Dashboard from "pages/programs/dashboard"


function DashboardIndex(props:any)  {
  const { pageTypes, bricks } = useContext(ReactBricksContext)  
  const { isDarkMode } = useDarkMode();
  const { chainId, user, library } = useAccount();
  const [userProp, setUserProp] = useState(user)
  
  useEffect(() => {
   console.log('dashboard index', library)
    console.log('uuu',userProp)
  }, [library])
  
 //we'll change this later, inline styling is bad


  return (
    <>
    <Dashboard/>
    </>
  )
}

export default DashboardIndex