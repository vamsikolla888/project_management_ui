import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DottedSeparator } from './dotted-separator'
import { Navigation } from './navigation'

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full ">
      <Link href="/">
        <div className="flex items-center space-x-6 text-violet-700 font-bold text-sm pb-3">
          <Image src="logo.svg" alt="logo" width={30} height={20} />
          <span>Do Systems</span>
        </div>
      </Link>
      <DottedSeparator />
      <Navigation />
    </aside>
  )
}