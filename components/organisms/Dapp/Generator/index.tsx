import { classNames } from "@/common/helpers"
import { GeneratorContext } from "@/common/providers/GeneratorProvider"
import { useLoadUserPools } from "@/hooks/dapps/generator/useLoadUser"
import { useDetectDeviceSize } from "@/hooks/useDetectIsMobileView"
import { useContext, useEffect, useMemo, useState } from "react"
import { AuthenticatedView, UnAuthenticatedView } from "@/components/atoms/AuthenticatedView"
import { TokenInfo } from "@/common/providers/TokenListProvider"
import { SwapInput } from "@/components/atoms/SwapInput"
import { VButton } from "@/components/atoms/VButton"
import { VItemContainer } from "@/components/atoms/VItemContainer"
import { VText } from "@/components/atoms/VText"
import { VTitle } from "@/components/atoms/VTitle"
import { DappLogin } from "@/components/molecules/DappLogin"
import { AnimatePresenceModal } from "@/components/atoms/Modal"
import { TokenSearchModal } from "@/components/molecules/TokenSearchModal"
import { VTable } from "@/components/atoms/VTable"
import { Electricity } from "./Electricity"
import { FormLayout } from "./FormLayout"
import { VTab, VTabs } from "@/components/atoms/VTabs"
import { faDollar } from "@fortawesome/pro-regular-svg-icons"

export interface IGeneratorDappProps {

}

export const GeneratorDapp = ({}) => {
  const { state, updatePool, setCurrentPool } = useContext(GeneratorContext);
  const userResults = useLoadUserPools(Object.keys(state.pools));
  const [ balanceAmount, setBalanceAmount] = useState<number>(0);

  useEffect(() => {
    for(const userResult of userResults) {
      updatePool(userResult.pool.name, userResult.content);
    }
  }, [JSON.stringify(userResults)])

  const currentPool = useMemo(() => {
    const pool = state.pools[state.currentPool];
    return pool;
  }, [JSON.stringify(state.pools), state.currentPool])
  

  return (
    <>
      <UnAuthenticatedView>
        <DappLogin/>
      </UnAuthenticatedView>
      <AuthenticatedView>

        <div className="flex flex-col justify-center items-center p-vsm h-full">
        <div className="p-[5px] rounded-xl  relative z-[1]">
          {/* <div className="w-full absolute -top-4 z-[100]">
            <Electricity timeout={400} strength={30} length={'100%'} className=""/>
          </div> */}
          <VItemContainer widthSize='full' heightSize='full' dropShadow>
            <div className='flex flex-col sm:p-vlrg p-vsm gap-y-vmd h-full w-full'>
              <div className="w-full flex flex-col gap-vsm">
                <VTable 
                  borderWidth={0}
                  columns={[
                    {label: 'total deposited', align: 'center'}, 
                    {label: 'total committed', align: 'center'}, 
                    {label: 'rewards', align: 'center'}, 
                    {label: 'apr', align: 'center'}
                  ]} 
                  data={[
                    {0: <p>{currentPool.deposited.toFixed(3)}</p>,
                    1: <p>{currentPool.amountCommitted.toFixed(3)}</p>,
                    2: <div className="flex justify-center items-center gap-[2px]">
                          <p className="">{currentPool.claimAmount.toFixed(3)}</p> 
                          {currentPool.claimAmount > 0 && <button className="text-accent-dark-200 uppercase border-[1px] text-body-xs px-2 border-light-100 hover:border-accent-dark-100/50 rounded-lg">
                            Claim
                          </button>}
                        </div>,
                    3: <p className="text-accent-dark-100 !font-bold">{currentPool.apr.toFixed(3)}%</p>}
                    ]}
                  />
                </div>
              <VTabs defaultActiveIndex={0}>
                <VTab description='stake tokens to earn rewards' title={'stake'}>
                  <div className="w-full flex flex-col justify-center items-start gap-vmd text-center">
                  <VButton secondary animate={false} padding={false}>Enable VIDYA</VButton>
                  <FormLayout 
                    buttonText="stake"
                    currentPool={currentPool}
                    onInputChange={(e: number) => {
                      setBalanceAmount(e);
                    }}
                    inputDisabled={currentPool.accountBalance <= 0}
                    buttonDisabled={currentPool.accountBalance <= 0}
                    onSubmit={(e) => {}}
                    onMax={(value) => {
                      setBalanceAmount(value);
                    }}
                    inputValue={balanceAmount}
                    balance={currentPool.accountBalance}/>
                    <VText className="w-full" size="sm">You can choose to commit your tokens after you have staked at least more than 1 VIDYA token(s).</VText>
                    </div>
                </VTab>
                <VTab description='Lock your tokens for bonuses.' title='commit'>
                  <FormLayout 
                      buttonText="stake"
                      currentPool={currentPool}
                      onInputChange={(e: number) => {
                        setBalanceAmount(e);
                      }}
                      inputDisabled={currentPool.accountBalance <= 0}
                      buttonDisabled={currentPool.accountBalance <= 0}
                      onSubmit={(e) => {}}
                      onMax={(value) => {
                        setBalanceAmount(value);
                      }}
                      inputValue={balanceAmount}
                      balance={currentPool.accountBalance}/>
                </VTab>
                <VTab title="withdraw" description="Widthdraw Tokens from platform">
                  <FormLayout 
                      buttonText="stake"
                      currentPool={currentPool}
                      onInputChange={(e: number) => {
                        setBalanceAmount(e);
                      }}
                      inputDisabled={currentPool.accountBalance <= 0}
                      buttonDisabled={currentPool.accountBalance <= 0}
                      onSubmit={(e) => {}}
                      onMax={(value) => {
                        setBalanceAmount(value);
                      }}
                      inputValue={balanceAmount}
                      balance={currentPool.accountBalance}/>
                </VTab>
              </VTabs>
              
            </div>
          </VItemContainer>
        </div>
      </div>
      </AuthenticatedView>
    </>
  )
}