import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface ReplitUser {
  id: string;
  name: string;
  profileImage?: string;
  email?: string;
}

interface AuthContextValue {
  user: ReplitUser | null;
  isReady: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ReplitUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetch("/api/auth/user")
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => {
        setUser(u);
        setIsReady(true);
      })
      .catch(() => {
        setUser(null);
        setIsReady(true);
      });
  }, []);

  const signOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isReady, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
