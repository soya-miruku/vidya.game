import { classNames } from '@/common/helpers';
import styles from '@/css/gradientButton.module.scss';

export interface IGradientButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  fontSize?: 'sm' | 'md' | 'lg';
  width?: number;
  height?: number;
}

export const GradientButton = ({onClick, disabled, children, className, fontSize, width, height}: IGradientButtonProps) => {
  return (
    <div style={{
      // width: width ? `${width}px` : '135px',
      // height: height ? `${height}px` : '40px',
    }} className={classNames('sm:w-[135px] w-[90px]', styles.button__container, className)}>
      <a onClick={onClick} className={styles.bordered__button}>
      <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logo-gradient" x1="50%" y1="0%" x2="75%" y2="100%" > 
              <stop offset="0%" stopColor="#F79533">
                  <animate attributeName="stop-color" values="#F79533; #F37055; #EF4E7B; #A166AB; #5073B8; #1098AD; #07B39B; #6DBA82; #F79533" dur="4s" repeatCount="indefinite"></animate>
              </stop>
              <stop offset="100%" stopColor="#F79533">
                  <animate attributeName="stop-color" values="#F37055; #EF4E7B; #A166AB; #5073B8; #1098AD; #07B39B; #6DBA82; #F79533; #F37055" dur="4s" repeatCount="indefinite"></animate>
              </stop>
          </linearGradient> 
        </defs>
          <rect className={styles.svg__button} height="100%" width="100%" />
        </svg>
        <p className={fontSize === 'lg' ? '!text-lg' : fontSize === 'md' ? '!text-body-sm' : fontSize === 'sm' ? '!text-body-xs' : ''}>{children}</p>
      </a>
    </div>
  )
}