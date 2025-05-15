'use client';

import { useState, CSSProperties } from "react";
import { governanceAbi, contractAddress } from "@/lib/contract";
import { walletClient } from "@/lib/viemClient";

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7f7f7',
  },
  form: {
    width: '100%',
    maxWidth: '500px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 500,
    color: '#000',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    backgroundColor: '#f9f9f9',
    color: '#000',
    resize: 'none',
  },
  buttonContainer: {
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  disabledField: {
    opacity: 0.3,
    pointerEvents: 'none',
  },
  successMessage: {
    marginTop: '20px',
    textAlign: 'center',
    color: '#28a745',
    fontWeight: 500,
  },
};

async function switchToSepolia() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ethereum = (window as any).ethereum;
  if (!ethereum) {
    alert('MetaMask is not installed. Please install it to use this feature.');
    return;
  }

  const SEPOLIA_CHAIN_ID = '0xaa36a7';

  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: SEPOLIA_CHAIN_ID }],
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: SEPOLIA_CHAIN_ID,
              chainName: 'Sepolia Testnet',
              rpcUrls: ['https://rpc.sepolia.org'],
              nativeCurrency: {
                name: 'Sepolia ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              blockExplorerUrls: ['https://sepolia.etherscan.io'],
            },
          ],
        });
      } catch (addError) {
        console.error('We were unable to add the network:', addError);
      }
    } else {
      console.error('We were unable to switch networks:', switchError);
    }
  }
}

export function ProposalForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      if (!walletClient) {
        throw new Error("Wallet client is not initialized.");
      }

      const [account] = await walletClient.getAddresses();

      await walletClient.writeContract({
        account,
        address: contractAddress as `0x${string}`,
        abi: governanceAbi,
        functionName: 'createProposal',
        args: [title, description],
      });

      setSuccess(true);
      setTitle('');
      setDescription('');
    } catch (err) {
      if (
        err instanceof Error && (
          err?.message?.includes('does not match the target chain') ||
          err?.message?.includes('ContractFunctionExecutionError')
        )
      ) {
        console.warn('Incorrect network, switching to Sepolia...');
        await switchToSepolia();
      } else {
        console.error('Oops! Something went wrong:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Create Proposal</h2>
        <div style={{ marginBottom: '15px' }}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            style={{
              ...styles.input,
              ...(loading ? styles.disabledField : {}),
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the proposal title"
            required
            disabled={loading}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={styles.label}>Description</label>
          <textarea
            style={{
              ...styles.textarea,
              ...(loading ? styles.disabledField : {}),
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your proposal"
            rows={4}
            required
            disabled={loading}
          />
        </div>
        <div style={styles.buttonContainer}>
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Create'}
          </button>
        </div>
        {success && (
          <p style={styles.successMessage}>
            Proposal sent successfully ✅
          </p>
        )}
      </form>
    </div>
  );
}
