import { VImage } from '@/components/atoms/VImage'
import Link from 'next/link'

export default function FourOhFour() {
  return <div className='prose w-screen h-screen flex flex-col justify-center items-center gap-vmd text-center'>
    <h2 className='text-accent-dark-100'>404 - Page Not Found</h2>
    <VImage src='/aimbots/flexinator.png' width={400} height={600} objectFit='contain'></VImage>
    <Link href="/">
      <a className='text-accent-dark-200'>
        Go back home
      </a>
    </Link>
  </div>
}