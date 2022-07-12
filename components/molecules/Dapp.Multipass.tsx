import { useMultiPassStats } from "@/hooks/dapps/multipass/useMultiPassStats"

export const MultiPassDapp = ({}) => {
  const { circulatingSupply, levelsBrought, levelsBurned, pooledEther, multipassBurned, multipassMinted, highestLevel } = useMultiPassStats();

  return (
    <div className="w-full h-full flex p-vsm px-vmd">
      <div className="flex flex-col">
        <p>circulatingSupply {circulatingSupply}</p>
        <p>levelsBrought {levelsBrought}</p>
        <p>levelsBurned {levelsBurned}</p>
        <p>pooledEther {pooledEther}</p>
        <p>multipassBurned {multipassBurned}</p>
        <p>multipassMinted {multipassMinted}</p>
        <p>highestLevel {highestLevel}</p>
      </div>
    </div>
  )
}