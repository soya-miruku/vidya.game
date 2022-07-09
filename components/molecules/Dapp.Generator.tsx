import { SwapInput } from "../atoms/SwapInput"
import { VItemContainer } from "../atoms/VItemContainer"
import { VTitle } from "../atoms/VTitle"

export interface IGeneratorDappProps {

}

export const GeneratorDapp = ({}) => {

  return (
    <>
      <div className="flex flex-col justify-between items-center py-vsm h-full">
        <div className="w-full flex justify-start px-vlrg">
          <div className="flex w-[350px] justify-center">
              <p>
                The VIDYA Staking platform rewards the best performing stakers with a portion of the total VIDYA supply. The rewards are calculated based on the total amount of VIDYA staked in the network.
              </p>
          </div>
        </div>
        <div className="px-vsm">
          <VItemContainer widthSize='v2xl' heightSize='vhxl' dropShadow className='w-full h-full bg-gradient-to-br p-[1px] from-aimbotsRed-100/95 to-accent-dark-200/95 backdrop-blur-sm'>
            <div className='flex flex-col sm:p-vxl p-vlrg gap-y-vlrg h-full'>
              <SwapInput></SwapInput>
              <SwapInput></SwapInput>
              
            </div>
          </VItemContainer>
        </div>
        <div>
          
        </div>
      </div>
    </>
  )
}