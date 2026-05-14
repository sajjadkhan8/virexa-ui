export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-64 rounded-md bg-secondary" />
      <div className="grid gap-4 md:grid-cols-4">
        <div className="h-24 rounded-xl border border-border bg-card" />
        <div className="h-24 rounded-xl border border-border bg-card" />
        <div className="h-24 rounded-xl border border-border bg-card" />
        <div className="h-24 rounded-xl border border-border bg-card" />
      </div>
      <div className="h-96 rounded-xl border border-border bg-card" />
    </div>
  )
}

