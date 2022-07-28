import { classNames } from '@/common/helpers'
import { useDetectIsMobileView } from '@/hooks/useDetectIsMobileView'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { types, Link } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'
import VRBText from './VRBText'
import VRBTitle from './VRBTitle'

export interface IVRBAccordionProps {
  index: number;
  title?: string
  description?: string
  defaultOpen?: boolean
  isFirst?: boolean
}

const VRBAccordion: types.Brick<IVRBAccordionProps> = ({
  index,
  title,
  defaultOpen,
  ...rest
}) => {
  const [ isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const { isMobileView } = useDetectIsMobileView();
  return (
    <Link {...rest}>
      <div id="accordion-open" data-accordion="open" className='w-full h-auto '>
        <button onClick={() => setIsOpen(!isOpen)} type="button" className={classNames("flex items-center justify-between w-full font-medium text-left focus:border-0 dark:bg-dark-300 bg-light-300 p-vlrg text-accent-dark-200 outline-none focus:outline-none", isOpen ? 'rounded-t-xl' : 'rounded-xl')}>
          <span className="flex items-center w-full">
            <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd">
              </path>
              </svg> <VRBTitle propName='title' type={isMobileView ? 'h5' : 'h4'}></VRBTitle>
            </span>
          <svg className={classNames('w-6 h-6 shrink-0', isOpen ? 'rotate-180' : '')} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <motion.div animate={{
          height: isOpen ? 'auto' : 0,
          overflow: isOpen ? 'visible' : 'hidden',
          opacity: isOpen ? 1 : 0
        }} className={isOpen ? 'dark:bg-dark-300 bg-light-300 rounded-b-xl' : 'hidden'}>
          <div className="p-5 font-light ">
            <VRBText propName='description' size='lg'></VRBText>
          </div>
        </motion.div>
      </div>
    </Link>
  )
}

VRBAccordion.schema = {
  name: blockNames.Accordion,
  label: 'Accordion',
  category: 'vidya elements',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    title: '',
    description: '',
  }),
  sideEditProps: [

  ],
}

export default VRBAccordion