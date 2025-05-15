import SignInButton from '@/components/SignInButton'

export default function Home() {
  return (
    <main
      style={{
        padding: '2rem',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: 'black',
          }}
        >
          Governance proposal
        </h1>
        <SignInButton />
      </div>
    </main>
  );
}
