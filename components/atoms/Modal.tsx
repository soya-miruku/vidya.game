import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Backdrop } from './Backdrop';
import { classNames } from '@/common/helpers';
import styles from '@/css/modal.module.scss';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface IModalProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animation?: 'fade' | 'slide' | 'dropIn';
  onClose?: () => void;
}

const dropInModal = {
  hiddenModal: {
    y: '-100vh',
  },
  visibleModal: {
    y: '0',
    transition: {
      duration: 0.1,
      type: 'spring',
      stiffness: 500,
      damping: 25
    } 
  },
  exitModal: {
    y: '100vh',
  }
}

export const AnimatePresenceModal = ({ children }) => {
  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {children}
    </AnimatePresence>
  )
}

const theModal = ({onClose, className, style, children}) => {
  return (
    <Backdrop onClick={onClose}>
      <motion.div key='modal' 
      style={{
        ...style,
        zIndex: 9999,
      }} 
      variants={dropInModal} 
      initial='hiddenModal' 
      animate='visibleModal'
      exit='exitModal' 
      onClick={(e) => e.stopPropagation()} 
      className={classNames(styles.modal, 'relative flex justify-center items-center max-w-page-modal', className)}>
        {children}
      </motion.div>
    </Backdrop>
  )
}

export const Modal: React.FC<IModalProps> = ({children, className, style, onClose, animation}) => {

  // useEffect(() => {
  //   const modalRoot = document.getElementById('modal-root');
  //   const motionRef = React.createElement(theModal, {children, className, style, onClose});
  //   if(!modalRoot) return;

  //   modalRoot.appendChild(React.createElement(motionRef, {}) as any);

  //   return () => {
  //     modalRoot.removeChild(modalRoot.lastChild);
  //   }

  // }, [])

  return(
    createPortal(
      React.createElement(theModal, {children, className, style, onClose}),
      document.getElementById('modal-root')
    )
  )
}