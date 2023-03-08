import {forwardRef, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface ActiveLinksProps {
  children: ReactNode,
  href: string
}

const ActiveLink = forwardRef<HTMLAnchorElement, ActiveLinksProps>(({ children, href }, ref) => {

  const router = useRouter();

  const style = {
    fill: router.pathname === href ? "fill-white" : "fill-[#5A698F]",
  };

  return (
    <Link href={href} passHref legacyBehavior className={style.fill}>
      <a href={href} className={style.fill} ref={ref}>
        {children}
      </a>
    </Link>
  )
});

export default ActiveLink;