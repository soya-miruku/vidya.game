import { VideoContext } from '@/common/providers/VideoProvider';
import { motion } from 'framer-motion';
import { useContext } from 'react';

export interface IBackdropProps { 
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Backdrop = ({ children, onClick }: IBackdropProps) => {
  const { setShouldPause } = useContext(VideoContext);

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} style={{zIndex: 9999}} className='fixed top-0 left-0 h-full w-full bg-black/70 backdrop-blur-md flex justify-center items-center' 
      onClick={() => {
        setShouldPause(() => false);
        onClick && onClick();
      }}>
      {children}
    </motion.div>
  )
}