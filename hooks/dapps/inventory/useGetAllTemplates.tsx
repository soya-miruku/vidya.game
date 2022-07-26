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

  // console.log(results);
  const tokenIds = results.map((result) => result?.[0]);
  return { tokenIds };
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

      templateTemp.push(result.data);
    }

    setTemplates(templateTemp);

  }, [JSON.stringify(results)]);

  return {
    templates
  }
}