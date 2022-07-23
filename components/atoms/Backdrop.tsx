import { motion } from 'framer-motion';

export interface IBackdropProps { 
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Backdrop = ({ children, onClick }: IBackdropProps) => {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} style={{zIndex: 9999}} className='fixed top-0 left-0 h-full w-full bg-black/70 backdrop-blur-md flex justify-center items-center' 
      onClick={() => {
        onClick && onClick();
      }}>
      {children}
    </motion.div>
  )
}