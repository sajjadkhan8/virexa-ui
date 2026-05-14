export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-56 rounded-md bg-secondary" />
        <div className="h-4 w-80 rounded-md bg-secondary" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-28 rounded-2xl border border-border bg-card" />
        <div className="h-28 rounded-2xl border border-border bg-card" />
        <div className="h-28 rounded-2xl border border-border bg-card" />
      </div>
      <div className="h-80 rounded-2xl border border-border bg-card" />
    </div>
  )
}

