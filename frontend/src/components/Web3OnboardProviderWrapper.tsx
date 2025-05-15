'use client';

import { useMemo } from "react";
import { Web3OnboardProvider, init } from "@web3-onboard/react";
import { onboardConfig } from "@/lib/onboard.config";
import { Web3Provider } from '@/providers/web3Provider'

export function Web3OnboardProviderWrapper({ children }: { children: React.ReactNode }) {
  const web3Onboard = useMemo(() => init(onboardConfig), []);

  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <Web3Provider>
        {children}
      </Web3Provider>
    </Web3OnboardProvider>
  );
}
