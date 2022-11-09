import { classNames } from "@/common/helpers";
import { Modal } from "../atoms/Modal";
import { NumberInput } from "../atoms/NumberInput";
import { VButton } from "../atoms/VButton";
import { VText } from "../atoms/VText";

export interface ITokenSettingsProps {
  slippage: number;
  onSlippageChange: (slippage: number) => void;
  onClose: () => void;
}

export const TokenSettingsModal = ({ onClose, slippage, onSlippageChange }: ITokenSettingsProps) => {
  return (
    <Modal onClose={onClose} className="w-full h-full">
      <div className={classNames('relative dark:bg-dark-100/80 bg-light-200 backdrop-blur-xl p-1 max-w-2xl rounded-lgr shadow-xl lg:w-[28rem] w-full h-auto')}>
        <div className='flex justify-between items-start p-5 rounded-t border-b dark:border-dark-300 border-light-300'>
          <h3 className='text-xl font-semibold lg:text-2xl dark:text-light-200 text-dark-300'>Transaction Settings</h3>
          <VButton ariaLabel="closeModalButton" name="close-modal-btn" animate={false} padding={false} onClick={onClose} type="button" className="!px-0 bg-transparent  text-accent-dark-200 hover:text-accent-dark-200/80 hover:scale-[1.1] rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="modal">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
          </VButton>
        </div>
        <div className='pt-vlrg pb-vmd gap-y-6 flex flex-col justify-center px-vmd'>
          <div className="flex justify-center items-center gap-vsm lg:flex-nowrap flex-wrap"> 
            <VText size="lg" className="font-bold">Slippage</VText>
            <div role='group' className="border-2 border-accent-dark-200 hover:border-accent-dark-200/70 rounded-xl flex justify-end items-center">
              <NumberInput onChange={(e) => {
                onSlippageChange(e.target.valueAsNumber);
              }} className="bg-transparent ring-0 outline-none font-bold text-xl rounded-xl px-vsm py-vsm dark:text-light-200 text-dark-300" value={slippage}></NumberInput>
              <VText className="px-vmd font-extrabold" size="lg">%</VText>
            </div>
          </div>
          <VButton ariaLabel="confirmButton" onClick={onClose} primary>Confirm</VButton>
        </div>
      </div>
    </Modal>
  )
}