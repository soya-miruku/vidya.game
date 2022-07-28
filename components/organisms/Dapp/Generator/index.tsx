import { GeneratorContext } from "@/common/providers/GeneratorProvider"
import { useLoadUserPools } from "@/hooks/dapps/generator/useLoadUser"
import { useContext, useEffect, useMemo, useState } from "react"
import { AuthenticatedView, UnAuthenticatedView } from "@/components/atoms/AuthenticatedView"
import { VButton } from "@/components/atoms/VButton"
import { VItemContainer } from "@/components/atoms/VItemContainer"
import { VText } from "@/components/atoms/VText"
import { DappLogin } from "@/components/molecules/DappLogin"
import { AnimatePresenceModal } from "@/components/atoms/Modal"
import { VTable } from "@/components/atoms/VTable"
import { FormLayout } from "./FormLayout"
import { VTab, VTabs } from "@/components/atoms/VTabs"
import { PlaneWave } from "./PlaneWave"
import { useApprove } from "@/hooks/dapps/generator/useApprove"
import { useDepositLP } from "@/hooks/dapps/generator/useDepositLP"
import { VSimpleTabs } from "@/components/atoms/VSimpleTabs"
import { ConfirmationModal } from "@/components/molecules/ConfirmationModal"
import { useCommitLP } from "@/hooks/dapps/generator/useCommitLP"
import { useBreakCommitment } from "@/hooks/dapps/generator/useBreakCommitment"
import { useWithdrawLP } from "@/hooks/dapps/generator/useWithdrawLP"
import { useCountdown } from "@/hooks/useCountdown"
import { classNames } from "@/common/helpers"
import { useClaimRewards } from "@/hooks/dapps/generator/useClaimRewards"

export const GeneratorDapp = ({}) => {
  const { state, updatePool, setCommitmentIndex } = useContext(GeneratorContext);
  const userResults = useLoadUserPools(Object.keys(state.pools));
  const [ stakeAmount, setStakeAmount ] = useState<number>(0);
  const [ commitAmount, setCommitAmount ] = useState<number>(0);
  const [ withdrawAmount, setWithdrawAmount ] = useState<number>(0);

  const [formError, setFormError] = useState<string>('');
  const [ showConfirmModal, setShowConfirmModal ] = useState(false);

  useEffect(() => {
    for(const userResult of userResults) {
      updatePool(userResult.pool.name, userResult.content);
    }
  }, [JSON.stringify(userResults)])

  const currentPool = useMemo(() => {
    const pool = state.pools[state.currentPool];
    return pool;
  }, [JSON.stringify(state.pools), state.currentPool])

  const [commitmentPeriodSelected, setCommitmentPeriodSelected] = useState<number>(currentPool.commitmentIndex-1);

  const [countdown] = useCountdown(currentPool.remainingUnlockTime);
  const [setAllowanceLimit, allowanceState] = useApprove(currentPool.type === 'LP' ? currentPool.lptoken : currentPool.token, currentPool.teller);
  const [stake, stakeState] = useDepositLP(currentPool.teller);
  const [commit, commitState] = useCommitLP(currentPool.teller);
  const [withdraw, withdrawStae] = useWithdrawLP(currentPool.teller);
  const [ claimReward, claimRewardState ] = useClaimRewards(currentPool.teller);
  const [breakCommitment, breakCommitmentState] = useBreakCommitment(currentPool.teller);
  
  const isPendingClaimingRewards = useMemo(() => claimRewardState.status === 'PendingSignature' || claimRewardState.status === 'Mining' , [claimRewardState.status]);
  const isPendingAllowance = useMemo(() => allowanceState.status === 'PendingSignature' || allowanceState.status === 'Mining', [allowanceState.status]);
  const isPendingStaking = useMemo(() => stakeState.status === 'PendingSignature' || stakeState.status === 'Mining', [stakeState.status]);
  const isPendingCommit = useMemo(() => (commitState.status === 'PendingSignature' || commitState.status === 'Mining'), [commitState.status]);
  const isPendingWithdraw = useMemo(() => withdrawStae.status === 'PendingSignature' || withdrawStae.status === 'Mining', [withdrawStae.status]);
  const isPendingBreakCommitment = useMemo(() => (breakCommitmentState.status === 'PendingSignature' || breakCommitmentState.status === 'Mining'), [breakCommitmentState.status]);

  useEffect(() => {
    if(currentPool.commitmentIndex <= 0) return;
    
    setCommitmentPeriodSelected(() => currentPool.commitmentIndex-1);
  }, [currentPool.commitmentIndex])

  const isCommitSuccess = useMemo(() => {
    const status = commitState.status === 'Success';
    if(status) {
      setCommitmentIndex(currentPool.name, commitmentPeriodSelected);
      setCommitAmount(0);
    }
    return status;
  }, [commitState.status]);

  const isWithdrawSuccess = useMemo(() => {
    const status = withdrawStae.status === 'Success';
    if(status) {
      setWithdrawAmount(0);
    }
    return status;
  }, [withdrawStae.status]);

  const isBreakCommitmentSuccess = useMemo(() => breakCommitmentState.status === 'Success', [breakCommitmentState.status]);
  const isClaimedRewardsSuccess = useMemo(() => claimRewardState.status === 'Success', [claimRewardState.status]);

  const isStakeSuccess = useMemo(() => {
    const status = stakeState.status === 'Success';
    if(status) {
      setStakeAmount(0);
    }
    return status;
  }, [stakeState.status]);
  
  const canUserStake = useMemo(() => (currentPool.accountBalance > 0 && !isPendingAllowance && stakeAmount > 0 && !isPendingStaking), [currentPool.accountBalance, isPendingAllowance, stakeAmount, isPendingStaking]);
  const canUserCommit = useMemo(() => (!isPendingAllowance && commitAmount > 0 && !isPendingCommit), [isPendingAllowance, commitAmount, isPendingCommit]);
  const canUserWithdraw = useMemo(() => (!isPendingAllowance && withdrawAmount > 0 && !isPendingWithdraw), [isPendingAllowance, withdrawAmount, isPendingWithdraw]);

  const stakingError = useMemo(() => formError ? formError : stakeState.errorMessage, [formError, stakeState.errorMessage]);
  const commitError = useMemo(() => formError ? formError : commitState.errorMessage || breakCommitmentState.errorMessage, [formError, commitState.errorMessage, breakCommitmentState.errorMessage]);
  const withdrawError = useMemo(() => formError ? formError : withdrawStae.errorMessage, [formError, withdrawStae.errorMessage]);
  const claimRewardError = useMemo(() => formError ? formError : claimRewardState.errorMessage, [formError, claimRewardState.errorMessage]);

  const handleStake = (e: any) => {
    e.preventDefault();
    const res = stake(stakeAmount);
    if(!res) {
      setFormError('Error Staking, please try again later');
    }
  }

  const handleCommit = (e: any) => {
    e.preventDefault();
    const res = commit(commitAmount, commitmentPeriodSelected+1);
    if(!res) {
      setFormError('Error Committing, please try again later');
    }
  }

  const handleWithdraw = (e: any) => {
    e.preventDefault();
    const res = withdraw(withdrawAmount);
    if(!res) {
      setFormError('Error Withdrawing, please try again later');
    }
  }

  const handleSetAllowance = (enable:boolean) => {
    if(enable) {
      setAllowanceLimit();
    }
    else {
      setAllowanceLimit(0);
    }
  }

  return (
    <>
      <AnimatePresenceModal>
        {showConfirmModal && <ConfirmationModal onClose={() => setShowConfirmModal(false)} onConfirm={() => {
            setShowConfirmModal(false);
            breakCommitment();
          }} 
          title="you are about to break your commitments" 
          description={`Are you sure you want to do this? the penalty will be: ${currentPool.commitmentOptions[currentPool.commitmentIndex].bonus/2}% in fee`} 
          confirmText="Break Commitment Anyway" 
          cancelText="On second thought..."/>}
      </AnimatePresenceModal>
      <UnAuthenticatedView>
        <DappLogin/>
      </UnAuthenticatedView>
      <AuthenticatedView>
        <PlaneWave/>
        <div className="flex flex-col justify-center items-center p-vsm sm:py-vsm py-vlrg sm:h-full h-auto overflow-y-auto object-center content-center justify-self-center">
        <div className="p-[5px] rounded-xl relative z-[1] h-auto overflow-y-auto scrollbar-none">
          <VItemContainer widthSize='full' heightSize='none' dropShadow>
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
                    {
                    0: <p>{currentPool.deposited.toFixed(3)}</p>,
                    1: <p>{currentPool.amountCommitted.toFixed(3)}</p>,
                    2: <div className={classNames('flex flex-col justify-center gap-[2px]', currentPool.claimAmount > 0 ? 'items-center' : ' items-start')}>
                          <div className="flex gap-[4px] items-center">
                            <p>{currentPool.claimAmount.toFixed(4)}</p> 
                            {currentPool.claimAmount > 0 && <VButton onClick={(_) => {
                              claimReward();
                            }} type='button' isLoading={isPendingClaimingRewards} className="!p-0 text-accent-dark-200 uppercase border-[1px] text-body-xs px-2 border-light-100 hover:border-accent-dark-100/50 rounded-lg">
                            Claim
                          </VButton>}
                          </div>
                          {currentPool.remainingUnlockTime > 0 && <p className='text-accent-dark-100'>{countdown}</p>}
              
                        </div>,
                    3: <p className="text-accent-dark-100 !font-bold">{currentPool.apr.toFixed(3)}%</p>}
                    ]}
                  />
                </div>
                {claimRewardError && <p className="text-aimbotsRed-100 w-ful text-center">{claimRewardError}</p>}
                {isClaimedRewardsSuccess && <p className="text-aimbotsGreen-100 w-full text-center">Successfully Claimed!</p>}
                <VTabs defaultActiveIndex={0}>
                  <VTab description='stake tokens to earn rewards' title={'stake'}>
                    <div className="w-full flex flex-col justify-center items-start gap-vmd text-center">
                      <div className="w-full flex gap-vmd items-center">
                        <VButton onClick={() => {
                          handleSetAllowance(!currentPool.approved);
                        }} disabled={isPendingAllowance} isLoading={isPendingAllowance} secondary animate={false} padding={false}>{currentPool.approved ? 'Disable VIDYA' : 'Enable VIDYA'}</VButton>
                        {currentPool.type === 'LP' &&
                          <VButton className="border-[1px] !px-vsm border-accent-dark-200 hover:border-accent-dark-600" animate={false} padding={false} onClick={() => window.open('https://app.uniswap.org/#/add/v2/ETH/0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30?chain=mainnet', '_blank')} >Create LP Token</VButton>
                        }
                      </div>
                      <FormLayout 
                        buttonText="stake"
                        currentPool={currentPool}
                        onInputChange={(e: number) => {
                          setStakeAmount(e);
                        }}
                        inputDisabled={currentPool.accountBalance <= 0 || isPendingStaking}
                        buttonDisabled={!canUserStake}
                        buttonLoading={isPendingStaking}
                        onSubmit={handleStake}
                        onMax={(value) => {
                          setStakeAmount(value);
                        }}
                        inputValue={stakeAmount}
                        balance={currentPool.accountBalance}/>
                        {stakingError && <p className="text-aimbotsRed-100 w-full">{stakingError}</p>}
                        {isStakeSuccess && <p className="text-aimbotsGreen-100 w-full">Successfully Staked!</p>}
                        <VText className="w-full" size="sm">You can choose to commit your tokens after you have staked at least more than 1 VIDYA token(s).</VText>
                      </div>
                  </VTab>
                  <VTab description='Lock your tokens for bonuses.' title='commit'>
                  <div className="w-full flex flex-col justify-center items-start gap-vmd text-center">
                    <FormLayout 
                        buttonText={currentPool.commitmentIndex > 0 ? 'expand commitment position' : 'commit'}
                        currentPool={currentPool}
                        onInputChange={(e: number) => {
                          setCommitAmount(e);
                        }}
                        inputDisabled={currentPool.depositAvailable <= 0 || isPendingCommit || isPendingBreakCommitment}
                        buttonDisabled={!canUserCommit}
                        buttonLoading={isPendingCommit}
                        onSubmit={handleCommit}
                        onMax={(value) => {
                          setCommitAmount(value);
                        }}
                        inputValue={commitAmount}
                        balance={currentPool.depositAvailable}>

                        <div className="w-full flex flex-col justify-center text-center gap-vsm py-vsm">
                          <VText size="lg" className="uppercase">commitment period</VText>
                          {currentPool.commitmentIndex > 0 && <div>
                            <VButton type="button" isLoading={isPendingBreakCommitment} disabled={isPendingBreakCommitment || isPendingCommit} onClick={() => setShowConfirmModal(true)} primary className="!bg-aimbotsRed-100">Break Commitments</VButton>
                          </div>}

                          <VSimpleTabs disabled={currentPool.commitmentIndex > 0} defaultActiveIndex={commitmentPeriodSelected} className="w-full justify-center gap-vsm flex-wrap" 
                          items={
                            (currentPool?.commitmentOptions||[]).map((option, index) => {
                              return {
                                label: <div className="flex flex-col justify-center items-center">
                                  <p className="border-b-[1px]">{option.days}days</p>
                                  <p>{option.bonus}%</p>
                                </div>,
                                value: option.bonus,
                                size: 'md',
                                bordered: true,
                              }
                            })  
                          } onChange={(val, index) => setCommitmentPeriodSelected(index)}/>
                        </div>
                        {commitError && <p className="text-aimbotsRed-100 w-full">{commitError}</p>}
                        {isCommitSuccess && <p className="text-aimbotsGreen-100 w-full">Successfully Committed </p>}
                        {isBreakCommitmentSuccess && <p className="text-aimbotsGreen-100 w-full">Commitment Successfully Broken</p>}
                      </FormLayout>
                    </div>
                  </VTab>
                  <VTab title="withdraw" description="Widthdraw Tokens from platform">
                    <div className="w-full flex flex-col justify-center items-start gap-vmd text-center">
                      <FormLayout 
                          buttonText="Withdraw"
                          currentPool={currentPool}
                          onInputChange={(e: number) => {
                            setWithdrawAmount(e);
                          }}
                          inputDisabled={currentPool.depositAvailable <= 0 || isPendingWithdraw}
                          buttonDisabled={!canUserWithdraw}
                          buttonLoading={isPendingWithdraw}
                          onSubmit={handleWithdraw}
                          onMax={(value) => {
                            setWithdrawAmount(value);
                          }}
                          inputValue={withdrawAmount}
                          balance={currentPool.depositAvailable}/>
                        {withdrawError && <p className="text-aimbotsRed-100 w-full">{withdrawError}</p>}
                        {isWithdrawSuccess && <p className="text-aimbotsGreen-100 w-full">Successfully Withdrawn!</p>}
                      </div>
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