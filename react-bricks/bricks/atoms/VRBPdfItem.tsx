import { classNames } from '@/common/helpers'
import PDFViewer from '@/components/pdf-viewer'
import { useDetectIsMobileView } from '@/hooks/useDetectIsMobileView'
import { faFilePdf } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { types, Link } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'
import { FpsFileUploader } from '../Shared/FpsFileUploader'
import VRBText from './VRBText'
import VRBTitle from './VRBTitle'

export interface IVRBPdfItemrops {
  index: number;
  title?: string
  pdfUrl?: string
  defaultOpen?: boolean
  isFirst?: boolean
}

const VRBPdfItem: types.Brick<IVRBPdfItemrops> = ({
  index,
  title,
  pdfUrl,
  defaultOpen,
  ...rest
}) => {
  const [ isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const { isMobileView } = useDetectIsMobileView();
  return (
    <Link {...rest}>
      <div id="accordion-open" data-accordion="open" className='w-full h-auto '>
        <button onClick={() => setIsOpen(!isOpen)} type="button" className={classNames("flex items-center justify-between w-full font-medium text-left focus:border-0 dark:bg-dark-300 bg-light-300 p-vlrg text-accent-dark-200 outline-none focus:outline-none", isOpen ? 'rounded-t-xl' : 'rounded-xl')}>
          <span className="flex items-center w-full gap-vsm">
            <FontAwesomeIcon className='w-6 h-6' icon={faFilePdf}></FontAwesomeIcon>
            <VRBTitle propName='title' type={isMobileView ? 'h5' : 'h4'}></VRBTitle>
            </span>
          <svg className={classNames('w-6 h-6 shrink-0', isOpen ? 'rotate-180' : '')} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <motion.div animate={{
          height: isOpen ? 'auto' : 0,
          overflow: isOpen ? 'visible' : 'hidden',
          opacity: isOpen ? 1 : 0
        }} className={isOpen ? 'dark:bg-dark-300 bg-light-300 rounded-b-xl' : 'hidden'}>
          <div className="p-5 font-light ">
            <PDFViewer url={pdfUrl} height={isMobileView ? 480 : 955} width={isMobileView ? innerWidth - 80 : 680}/>
          </div>
        </motion.div>
      </div>
    </Link>
  )
}

VRBPdfItem.schema = {
  name: blockNames.VRBPdfItem,
  label: 'Pdf',
  category: 'vidya elements',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    title: '',
    pdfUrl: '',
  }),
  sideEditProps: [
    {
      name: 'pdfUrl',
      label: 'pdf Src',
      defaultOpen: true,
      type: types.SideEditPropType.Custom,
      component: (props) => FpsFileUploader({ ...props, acceptOnly: 'application/pdf'}),
    },
  ],
}

export default VRBPdfItem