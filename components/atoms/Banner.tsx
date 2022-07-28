import { classNames } from "@/common/helpers";

export interface IBannerProps {
  imageSrc: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  roundedSide?: 'right' | 'left' | 'none';
  children?: React.ReactNode;
  className?: string;
}

export const Banner = ({ imageSrc, objectFit, roundedSide, children, className }: IBannerProps) => {
  return (
    <div className={classNames('w-full h-full mt-[130px] py-vlrg flex flex-col gap-vmd', roundedSide === 'left' ? 'items-end' : roundedSide === 'right' ? 'items-start' : '')}>
      <div className={
        classNames('dark:shadow-btn-dark shadow-btn-light h-full sm:min-h-[500px] min-h-[225px] bg-gradient-to-b from-black/80 to-primary-100 bg-blend-multiply prose flex flex-col justify-end items-start',
        roundedSide === 'right' ? 'rounded-tr-2xl rounded-br-2xl w-[95%]' : roundedSide === 'left' ? 'rounded-tl-2xl rounded-bl-2xl w-[95%]' : 'w-full',  
        className)}
         style={{
          backgroundImage: `url("${imageSrc}")`,
          backgroundPosition: 'center center',
          backgroundSize: objectFit,
          backgroundRepeat: 'no-repeat',
         }}
         >
      </div>
      <div className={classNames('flex flex-col sm:w-1/2 w-full space-y-5 justify-start sm:p-vmd p-vsm', roundedSide === 'left' ? 'items-end' : roundedSide === 'right' ? 'items-start' : '')}>
        {children}
      </div>
    </div>
  )
}