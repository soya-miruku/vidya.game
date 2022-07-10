import { ToReadableNumber } from "@/common/helpers";
import { GeneratorContext } from "@/common/providers/GeneratorProvider";
import { useGeneratorStats } from "@/hooks/dapps/generator/useGeneratorStats"
import { useContext, useEffect } from "react";
import { VTitle } from "../atoms/VTitle"
import { StatCard } from "../molecules/StatCard"

export const GeneratorStats = ({}) => {
  const { totalDistributed, rewardRate, totalPriority } = useGeneratorStats();  
  const { state, setStats } = useContext(GeneratorContext);

  useEffect(() => {
    if(state.stats.totalDistributed !== totalDistributed || state.stats.rewardRate !== rewardRate || state.stats.totalPriority !== totalPriority) {
      console.log('statarino')
      setStats({
        totalDistributed,
        rewardRate,
        totalPriority
      });
    }
  }
  , [totalDistributed, rewardRate, totalPriority]);


  return (
    <div className="prose grid gap-vlrg w-full px-vsm flex-wrap grid-cols-2 mobile:grid-cols-1 justify-items-center">
      <StatCard long title={
        <div className="flex justify-center items-end gap-x-2">
          <VTitle type='h4'>{ToReadableNumber(totalDistributed)}</VTitle>
          <VTitle className="!text-accent-dark-200" type='h6'>VIDYA</VTitle>
        </div>
      } label="Total distributed" />
      <StatCard long title={
        <div className="flex justify-center items-end gap-x-2">
          <VTitle type='h4'>{ToReadableNumber(rewardRate).slice(0, 6)}</VTitle>
          <VTitle className="!text-accent-dark-200" type='h6'>VIDYA PER BLOCK</VTitle>
        </div>
      } label="Vidya Rate" />
    </div>
  )
}