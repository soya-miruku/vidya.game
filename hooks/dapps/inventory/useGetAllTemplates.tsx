import { getResults } from "@/contracts/helpers"
import { inventoryContract } from "@/contracts/inventory"
import { useAccount } from "@/hooks/useAccount"
import { useCalls } from "@usedapp/core"
import { useEffect, useState } from "react"
import { useQueries } from "react-query"

export interface ITemplateNFT {
  templateId: string
  name: string
  description: string
  image: string
  ipfs: string
  slot: number
  openSeaLink: string
}

export interface IGetAllTemplateIdsProps {
  startFrom?: number
  limit?: number
}

export const useGetAllTemplateIds = (props: IGetAllTemplateIdsProps = {
  startFrom: 1,
  limit: 10
}): {tokenIds: number[]} => {
  const { user, chainId } = useAccount();
  const contract = inventoryContract(chainId);
  const tokenIndexes = Array.from(Array(props.limit).keys());

  const calls = user && contract && tokenIndexes && tokenIndexes.map(tokenIndex => {
    if(tokenIndex < props.startFrom) {
      return null;
    }
    return {
      contract,
      method: 'itemTemplates',
      args: [tokenIndex]
    };
  }).filter((call) => call !== null) || [];

  const responses = useCalls(calls, {refresh: 10, isStatic: false}) ?? tokenIndexes.map(() => { return { value: null, error: null }; });
  const results = getResults(responses, null);

  const tokenIds = results.map((result) => result?.[0]);
  return { tokenIds };
}

export const mapTemplateToOpenSeaNFTLink = (templateId: number) => {
  switch (templateId) {
    case 1: return `https://opensea.io/assets/ethereum/0x9680223f7069203e361f55fefc89b7c1a952cdcc/${15}`;
    case 3: return `https://opensea.io/assets/ethereum/0x9680223f7069203e361f55fefc89b7c1a952cdcc/${776}`;
    case 7: return `https://opensea.io/assets/ethereum/0x9680223f7069203e361f55fefc89b7c1a952cdcc/${12}`;
    case 9: return `https://opensea.io/assets/ethereum/0x9680223f7069203e361f55fefc89b7c1a952cdcc/${22}`;
    case 11: return `https://opensea.io/assets/ethereum/0x9680223f7069203e361f55fefc89b7c1a952cdcc/${117}`;
    case 12: return `https://opensea.io/assets/ethereum/0x9680223f7069203e361f55fefc89b7c1a952cdcc/${11}`;
    case 13: return `https://opensea.io/assets/ethereum/0x9680223f7069203e361f55fefc89b7c1a952cdcc/${9}`;
    case 23: return `https://opensea.io/assets/ethereum/0x9680223f7069203e361f55fefc89b7c1a952cdcc/${119}`;
    case 30: return `https://opensea.io/assets/ethereum/0x9680223f7069203e361f55fefc89b7c1a952cdcc/${258}`;
    case 31: return `https://opensea.io/assets/ethereum/0x9680223f7069203e361f55fefc89b7c1a952cdcc/${265}`;
  }
}

export const useFetchTemplates = (templateIds: number[]): {templates: ITemplateNFT[]} => {
  const [templates, setTemplates] = useState<ITemplateNFT[]>([]);

  const results = useQueries(templateIds.filter((templateId) => !!templateId).map((templateId) => {
    return {
      queryKey: `template-${templateId}`,
      queryFn: async () => {
        const response = await fetch(`https://team3d.io/inventory/json/${templateId}.json`)
        return await response.json();
      }
    };
  }))

  useEffect(() => {
    if(!results || !results.length) return;
    const templateTemp = [];

    for(let i = 0; i < results.length; ++i) {
      const result = results[i];
      if(!results || result.isError || result.isLoading){
        continue;
      }

      templateTemp.push({...result.data, openSeaLink: mapTemplateToOpenSeaNFTLink(parseInt(result.data.template))});
    }

    setTemplates(templateTemp);

  }, [JSON.stringify(results)]);

  return {
    templates
  }
}