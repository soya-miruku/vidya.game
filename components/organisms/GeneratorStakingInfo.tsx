import { StakingCard } from "../molecules/StakingCard"

export interface IStakingCardProps {
  title: string
}

export const GeneratingStakingInfo = ({}) => {
  return(
    <div className="w-full h-full flex flex-col">
      <div className="flex gap-vlrg w-full h-full justify-center flex-wrap lg:flex-nowrap md:flex-nowrap sm:flex-wrap mobile:flex-wrap">
        <StakingCard bordered={false} pool='eth'/>
        <StakingCard bordered={false} pool='single'/>
      </div>
    </div>
  )
}