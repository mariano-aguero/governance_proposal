import { ReactCustomQueryProvider } from "./reactCustomQueryProvider"

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactCustomQueryProvider>
      {children}
    </ReactCustomQueryProvider>
  );
}
