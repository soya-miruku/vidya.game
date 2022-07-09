import { StakingCard } from "../molecules/StakingCard"

export interface IStakingCardProps {
  title: string
}

export const GeneratingStakingInfo = ({}) => {
  return(
    <div className="w-full h-full flex flex-col">
      <div className="flex gap-vlrg w-full h-full justify-center flex-wrap lg:flex-nowrap md:flex-nowrap sm:flex-wrap mobile:flex-wrap">
        <StakingCard label1="Liquidity provided" title1="ETH/VIDYA" rate="0.156" bordered={false}/>
        <StakingCard label1="single sided" title1="VIDYA" rate="0.156" bordered={false}/>
      </div>
    </div>
  )
}