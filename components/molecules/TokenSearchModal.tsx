import { classNames } from "@/common/helpers";
import { Modal } from "../atoms/Modal";
import { ITokenListSearchProps, TokenListSearch } from "./TokenListSearch";

export interface ITokenSearchModal extends ITokenListSearchProps {
}

export const TokenSearchModal = ({ onClose, forToken, tokenList, onSelect }) => {
  return (
    <Modal onClose={onClose}>
      <div className={classNames('relative dark:bg-dark-200 bg-light-100 backdrop-blur-xl p-1 max-w-2xl rounded-lgr shadow-xl sm:w-[27rem] w-full sm:h-auto h-full')}>
        <div className='flex justify-between items-start p-5 rounded-t border-b dark:border-dark-300 border-light-300'>
          <h3 className='text-xl font-semibold lg:text-2xl dark:text-light-200 text-dark-200'>{'Find Token'}</h3>
          <button onClick={onClose} type="button" className="bg-transparent text-accent-dark-200 dark:hover:bg-light-300 hover:bg-dark-300 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="modal">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
          </button>
        </div>
        <div className='p-2 w-full space-y-6 flex flex-col justify-center items-center'>
          <TokenListSearch tokenList={tokenList} forToken={forToken} onSelect={onSelect} onClose={onClose}></TokenListSearch>
        </div>
      </div>
    </Modal>
  )
}