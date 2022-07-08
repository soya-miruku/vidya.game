import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Backdrop } from './Backdrop';
import { classNames } from '@/common/helpers';
import styles from '@/css/modal.module.scss';

export interface IModalProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animation?: 'fade' | 'slide' | 'dropIn';
  onClose?: () => void;
}

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      stiffness: 500,
      damping: 25
    } 
  },
  exit: {
    y: '100vh',
    opacity: 0
  }
}

export const AnimatePresenceModal = ({ children }) => {
  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {children}
    </AnimatePresence>
  )
}

export const Modal: React.FC<IModalProps> = ({children, className, style, onClose, animation}) => {
  return(
    <Backdrop onClick={onClose}>
      <motion.div style={{
        ...style,
        zIndex: 9999,
      }} variants={dropIn} initial='hidden' animate='visible' exit='exit' onClick={(e) => e.stopPropagation()} className={classNames(styles.modal, 'flex justify-center items-center', className)}>
        {children}
      </motion.div>
    </Backdrop>
  )
}