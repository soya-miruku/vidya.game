import { classNames } from "@/common/helpers"
import { GeneratorContext } from "@/common/providers/GeneratorProvider"
import { useLoadUserPools } from "@/hooks/dapps/generator/useLoadUser"
import { useAccount } from "@/hooks/useAccount"
import { useContext, useEffect, useMemo } from "react"
import { AuthenticatedView, UnAuthenticatedView } from "../atoms/AuthenticatedView"
import { SwapInput } from "../atoms/SwapInput"
import { VButton } from "../atoms/VButton"
import { VItemContainer } from "../atoms/VItemContainer"
import { VText } from "../atoms/VText"
import { VTitle } from "../atoms/VTitle"

export interface IGeneratorDappProps {

}

export const GeneratorDapp = ({}) => {
  const { Connect } = useAccount();
  const { state, updatePool, setCurrentPool } = useContext(GeneratorContext);
  const userResults = useLoadUserPools(Object.keys(state.pools));

  useEffect(() => {
    for(const userResult of userResults) {
      updatePool(userResult.pool.name, userResult.content);
    }
  }, [JSON.stringify(userResults)])

  const pools = useMemo(() => {
    return Object.keys(state.pools).map(name => state.pools[name]);
  }, [JSON.stringify(state.pools)])

  return (
    <>
      <UnAuthenticatedView>
        <div className="flex flex-col justify-center items-center text-center w-full h-full gap-y-vsm">
          <VTitle type='h4'>Please connect to your wallet</VTitle>
          <VText size="sm">Your wallet needs to be connected in order to use this feature</VText>
          <VButton onClick={Connect} className='flex justify-center' special>Connect Wallet</VButton>
        </div>
      </UnAuthenticatedView>
      <AuthenticatedView>
        <div className="flex flex-col justify-between items-center py-vsm h-full gap-y-vsm">
          <div className="flex justify-between w-full sm:flex-nowrap flex-wrap">
            <div className="flex flex-col w-full justify-start items-start gap-x-vlrg px-vlrg">
              <VTitle type='h4'>Current Pool - <span className="text-accent-dark-200">{state.currentPool}</span></VTitle>
              <div className="flex gap-x-vsm">
                <VText className="py-vsm" size="lg">Switch Pool: </VText>
                {pools.filter(pool => pool.name !== state.currentPool).map(pool => (<VButton padding={false} secondary animate={false} onClick={() => setCurrentPool(pool.name)}>{pool.name}</VButton>))}
              </div>
            </div>
            <div className="flex w-full justify-end items-center gap-vlrg sm:px-vmd px-vsm">
              <div className="border-[1px] border-violet-600 md:w-[350px] mobile:w-full sm:w-full p-vlrg gap-y-vsm flex flex-col">
                {pools.map((pool, index) => {
                  return (
                    <div key={index} className={classNames('w-full flex flex-col justify-center', index % 2 === 0 ? 'items-start' : 'items-end')}>
                      <VTitle type='h4'>{pool.name}</VTitle>
                      <VText size="lg">Balance : <span className="font-bold">{pool.accountBalance.toFixed(3)}</span></VText>
                      <VText size="lg">Total deposited : <span className="font-bold">{pool.deposited.toFixed(3)}</span></VText>
                      <VText size="lg">Total committed : <span className="font-bold">{pool.amountCommitted.toFixed(3)}</span></VText>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="px-vsm">
            <VItemContainer widthSize='full' heightSize='vhxl' dropShadow className='w-full h-full bg-gradient-to-br p-[1px] from-aimbotsRed-100/95 to-accent-dark-200/95 backdrop-blur-sm'>
              <div className='flex flex-col sm:p-vxl p-vlrg gap-y-vlrg h-full'>
                <SwapInput></SwapInput>
                <SwapInput></SwapInput>
                
              </div>
            </VItemContainer>
          </div>
          <div>
            
          </div>
        </div>
      </AuthenticatedView>
    </>
  )
}