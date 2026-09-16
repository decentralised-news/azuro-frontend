import cx from 'classnames'
import Image from 'next/image'
import { Href } from 'components/navigation'


type LogoProps = {
  className?: string
}

const Logo: React.FC<LogoProps> = (props) => {
  const { className } = props

  return (
    <Href to="/" className={cx('inline-flex items-center', className)} aria-label="SmartContractBets — home">
      <Image
        className="h-full w-auto"
        src="/images/logo.png"
        alt="SmartContractBets"
        width={710}
        height={160}
        priority
        unoptimized
      />
    </Href>
  )
}

export default Logo
