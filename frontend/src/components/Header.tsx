'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from './ConnectButton';
import { useWeb3 } from '@/providers/web3Provider';

export function Header() {
  const { isConnected } = useWeb3();
  const pathname = usePathname();

  const navItems = [
    { label: 'Create Proposal', href: '/create' },
    { label: 'List Proposals', href: '/proposals' },
  ];

  if (!isConnected || pathname === '/') return null;

  return (
    <header
      style={{
        backgroundColor: '#000',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
      }}
    >
      <nav style={{ display: 'flex', gap: '1.5rem' }}>
        {navItems.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              style={{
                color: isActive ? '#fff' : '#aaa',
                textDecoration: isActive ? 'underline' : 'none',
                fontWeight: isActive ? 'bold' : 'normal',
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <ConnectButton />
    </header>
  );
}
