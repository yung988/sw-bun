import { type ReactNode } from 'react'

type PageLayoutProps = {
  children: ReactNode
  maxWidth?: 'default' | 'wide' | 'narrow'
  paddingTop?: 'default' | 'small' | 'large'
  paddingBottom?: boolean
  className?: string
  flexLayout?: boolean
}

export default function PageLayout({
  children,
  maxWidth = 'default',
  paddingTop = 'default',
  paddingBottom = true,
  className = '',
  flexLayout = false,
}: PageLayoutProps) {
  const maxWidthClasses = {
    default: 'max-w-[1250px]',
    wide: 'max-w-[1400px]',
    narrow: 'max-w-[900px]',
  }

  const paddingTopClasses = {
    default: 'pt-32 md:pt-40 lg:pt-44',
    small: 'pt-24 md:pt-32 lg:pt-36',
    large: 'pt-40 md:pt-48 lg:pt-52',
  }

  if (flexLayout) {
    return (
      <main className={`min-h-screen bg-white flex flex-col ${className}`}>
        <div className={`mx-auto ${maxWidthClasses[maxWidth]} px-6 ${paddingTopClasses[paddingTop]} flex-1 flex flex-col w-full`}>
          {children}
        </div>
      </main>
    )
  }

  return (
    <main className={`min-h-screen bg-white ${paddingBottom ? 'pb-24' : ''} ${className}`}>
      <div className={`mx-auto ${maxWidthClasses[maxWidth]} px-6 ${paddingTopClasses[paddingTop]} py-16 md:py-24 lg:py-28`}>
        {children}
      </div>
    </main>
  )
}

