import * as React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode
}

export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {
  isCurrentPage?: boolean
}

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean
  href?: string
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, separator = <ChevronRight className="h-4 w-4" />, ...props }, ref) => {
    return <nav ref={ref} aria-label="breadcrumb" className={cn("flex items-center text-sm", className)} {...props} />
  },
)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, isCurrentPage, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn("inline-flex items-center", className)}
        aria-current={isCurrentPage ? "page" : undefined}
        {...props}
      />
    )
  },
)
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, asChild = false, href, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : href ? Link : "span"
    const linkProps = href && !asChild ? { href } : {}

    return (
      <div className="flex items-center">
        <Comp ref={ref} className={cn("text-gray-500 hover:text-gray-900", className)} {...linkProps} {...props} />
        {href && <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />}
      </div>
    )
  },
)
BreadcrumbLink.displayName = "BreadcrumbLink"

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink }

