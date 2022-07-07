import { ToReadableNumber } from "@/common/helpers";
import { useGeneratorStats } from "@/hooks/dapps/generator/useGeneratorStats"
import { VTitle } from "../atoms/VTitle"
import { StatCard } from "../molecules/StatCard"

export const GeneratorStats = ({}) => {
  const {timeToCalculateRate, totalDistributed, vidyaRate} = useGeneratorStats();
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
          <VTitle type='h4'>{ToReadableNumber(vidyaRate).slice(0, 6)}</VTitle>
          <VTitle className="!text-accent-dark-200" type='h6'>VIDYA PER BLOCK</VTitle>
        </div>
      } label="Vidya Rate" />
      {/* <StatCard long title={
        <div className="flex justify-center items-end gap-x-2">
          <VTitle type='h4'> {timeToCalculateRate}</VTitle>
          <VTitle className="!text-accent-dark-200" type='h6'>Hours</VTitle>
        </div>
      } label="Time to calculate Rate" /> */}
    </div>
  )
}