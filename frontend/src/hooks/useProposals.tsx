import { useQuery } from '@tanstack/react-query'
import { getContract } from 'viem'
import { publicClient } from '@/lib/viemClient'
import { governanceAbi, contractAddress } from '@/lib/contract'

export function useProposals() {
  return useQuery({
    queryKey: ['proposals'],
    queryFn: async () => {
      const contract = getContract({
        address: contractAddress as `0x${string}`,
        abi: governanceAbi,
        client: publicClient,
      })

      const result = await contract.read.getAllProposals()


      return result.map((proposal: { id: bigint; proposer: `0x${string}`; title: string; description: string }) => ({
        id: Number(proposal.id),
        proposer: proposal.proposer,
        title: proposal.title,
        description: proposal.description,
      }))
    },
  })
}
