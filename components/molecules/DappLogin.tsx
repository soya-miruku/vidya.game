import { useAccount } from "@/hooks/useAccount";
import { VButton } from "../atoms/VButton";
import { VText } from "../atoms/VText";
import { VTitle } from "../atoms/VTitle";

export const DappLogin = () => {
  const { Connect } = useAccount();

  return (
    <div className="flex flex-col justify-center items-center text-center w-full h-full gap-y-vsm">
      <VTitle type='h4'>Please connect to your wallet</VTitle>
      <VText size="sm">Your wallet needs to be connected in order to use this feature</VText>
      <VButton onClick={Connect} className='flex justify-center' special>Connect Wallet</VButton>
    </div>
  )
}