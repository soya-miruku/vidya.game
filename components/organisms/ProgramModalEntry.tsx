import { useRouter } from "next/router"
import { Modal } from "../atoms/Modal";
import { VTitle } from "../atoms/VTitle";
import { GeneratorDapp } from "../molecules/Dapp.Generator";

export interface IProgramModalEntryProps {
  onClose: () => void;
}

export const ProgramModalWrapper = ({children, onClose}) => {
  return (
    <Modal onClose={onClose} className="h-full py-vlrg flex flex-col">
      <div className="w-full h-full flex flex-col dark:bg-dark-300 bg-light-200 justify-center items-center rounded-xl">
        <div className="w-full flex justify-end p-vmd">
          <button onClick={onClose} type="button" className="bg-transparent text-accent-dark-200 dark:hover:bg-light-300 hover:bg-dark-300 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
          </button>
        </div>
        <div className="w-full h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </Modal>
  )
}

export const ProgramModalEntry = ({onClose}) => {
  const router = useRouter();
  const { slug } = router.query;

  if(!slug){ return (
    <ProgramModalWrapper onClose={onClose}>
      <VTitle type="h1">This Program does not exist</VTitle>
    </ProgramModalWrapper>
    )
  }

  if(slug === 'generator'){
    return (
      <ProgramModalWrapper onClose={onClose}>
        <GeneratorDapp/>
      </ProgramModalWrapper>
    )
  }
  else if(slug === 'multipass') {
    return (
      <ProgramModalWrapper onClose={onClose}>
        <VTitle type="h1">Multipass Multipass Multipass!!</VTitle>
      </ProgramModalWrapper>
    )
  }

  return (
    <ProgramModalWrapper onClose={onClose}>
      <VTitle type="h1">Program yet not implemented</VTitle>
    </ProgramModalWrapper>
  )
}