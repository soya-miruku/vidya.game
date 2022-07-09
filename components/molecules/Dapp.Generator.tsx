import { SwapInput } from "../atoms/SwapInput"
import { VItemContainer } from "../atoms/VItemContainer"
import { VTitle } from "../atoms/VTitle"

export interface IGeneratorDappProps {

}

export const GeneratorDapp = ({}) => {

  return (
    <>
      <div className="flex flex-col justify-between items-center py-vsm h-full">
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