export function AuthForm() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-5 shadow-sm text-center">
      <div className="space-y-1">
        <h2 className="font-semibold text-base">Welcome to Dev Studio</h2>
        <p className="text-sm text-muted-foreground">
          Sign in to access your personal dev hub.
        </p>
      </div>
      <a
        href="https://replit.com/auth_with_repl_site?domain=__REPL_DOMAIN__"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `https://replit.com/auth_with_repl_site?domain=${window.location.host}`;
        }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
      >
        Log in
      </a>
    </div>
  );
}
