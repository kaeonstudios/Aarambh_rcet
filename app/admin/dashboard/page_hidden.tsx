"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, FileText, LogOut, Home,
  ChevronRight, TrendingUp, Calendar, Users,
  ExternalLink, Search, X, Star, Trash2, Play,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────
type Application = {
  _id: string;
  startup_name: string;
  team_head: string;
  phone: string;
  stage: string;
  description: string;
  member_count?: number;
  members?: { name: string }[];
  linkedin_url?: string;
  website_url?: string;
  pitch_video_url?: string;
  starred: boolean;
  created_at: string;
};

type View = "dashboard" | "applications";

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ active, onNavigate, onLogout }: {
  active: View;
  onNavigate: (v: View) => void;
  onLogout: () => void;
}) {
  return (
    <aside className="w-56 flex-shrink-0 border-r border-white/5 bg-surface flex flex-col h-screen sticky top-0">
      <div className="px-6 py-6 border-b border-white/5">
        <span className="font-display font-semibold text-xl tracking-tight">
          Aarambh<span className="gradient-text-gold font-bold">X</span>
          <span className="ml-2 text-xs font-mono text-white/30 normal-case">Admin</span>
        </span>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {([
          { id: "dashboard" as View, label: "Dashboard", icon: LayoutDashboard },
          { id: "applications" as View, label: "Applications", icon: FileText },
        ]).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              active === id
                ? "bg-gold-500/10 text-gold-400 border border-gold-500/20"
                : "text-white/50 hover:text-white hover:bg-white/5"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-white/5 space-y-1">
        <Link href="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all">
          <Home className="w-4 h-4" />
          Back to Site
        </Link>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}

// ─── Dashboard View ──────────────────────────────────────────────────────────
function DashboardView({ apps, onNavigate }: { apps: Application[]; onNavigate: (v: View) => void }) {
  const total  = apps.length;
  const starred = apps.filter((a) => a.starred).length;
  const recent  = apps.filter((a) => {
    const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 7);
    return new Date(a.created_at) >= cutoff;
  }).length;

  const stageMap: Record<string, number> = {};
  apps.forEach((a) => { stageMap[a.stage] = (stageMap[a.stage] || 0) + 1; });

  return (
    <div className="p-6 md:p-10 space-y-8">
      <header>
        <h1 className="text-3xl font-display font-semibold text-white">Overview</h1>
        <p className="text-white/40 mt-1 text-sm">AarambhX Control Panel</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={<FileText className="w-5 h-5 text-gold-400" />}   label="Total Applications" value={total} />
        <StatCard icon={<Star className="w-5 h-5 text-yellow-400" />}    label="Starred"           value={starred} accent="yellow" />
        <StatCard icon={<Calendar className="w-5 h-5 text-blue-400" />}  label="Last 7 Days"       value={recent}  accent="blue" />
      </div>

      {/* Stage Breakdown */}
      <div className="bg-surface border border-white/5 rounded-2xl p-6">
        <h2 className="font-semibold text-white flex items-center gap-2 mb-6">
          <TrendingUp className="w-4 h-4 text-gold-400" /> Applications by Stage
        </h2>
        {Object.keys(stageMap).length === 0 ? (
          <p className="text-white/30 text-sm text-center py-8">No applications yet.</p>
        ) : (
          <div className="space-y-3">
            {Object.entries(stageMap).sort((a, b) => b[1] - a[1]).map(([stage, count]) => (
              <div key={stage}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">{stage}</span>
                  <span className="text-white/40 font-mono">{count}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-gold-500 to-amber-500 rounded-full transition-all duration-700" style={{ width: `${(count / total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Submissions */}
      <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="font-semibold text-white">Recent Submissions</h2>
          <button onClick={() => onNavigate("applications")} className="text-xs text-gold-400 hover:text-gold-300 transition-colors flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        {apps.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-12">No applications yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-white/30 text-xs font-mono uppercase">
                <th className="text-left px-6 py-3">Startup</th>
                <th className="text-left px-6 py-3 hidden sm:table-cell">Founder</th>
                <th className="text-left px-6 py-3 hidden md:table-cell">Stage</th>
                <th className="text-left px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {apps.slice(0, 5).map((a) => (
                <tr key={a._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-3.5 font-medium text-white flex items-center gap-2">
                    {a.starred && <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />}
                    {a.startup_name}
                  </td>
                  <td className="px-6 py-3.5 text-white/60 hidden sm:table-cell">{a.team_head}</td>
                  <td className="px-6 py-3.5 hidden md:table-cell">
                    <span className="px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-mono">{a.stage}</span>
                  </td>
                  <td className="px-6 py-3.5 text-white/40 font-mono text-xs">
                    {new Date(a.created_at).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── Applications View ───────────────────────────────────────────────────────
function ApplicationsView({ apps, onStar, onDelete }: {
  apps: Application[];
  onStar: (id: string, starred: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState<"all" | "starred">("all");
  const [selected, setSelected] = useState<Application | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const filtered = apps.filter((a) => {
    const matchSearch =
      a.startup_name.toLowerCase().includes(search.toLowerCase()) ||
      a.team_head.toLowerCase().includes(search.toLowerCase()) ||
      a.stage.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || a.starred;
    return matchSearch && matchFilter;
  });

  // Update detail panel when apps list updates (e.g. after star)
  useEffect(() => {
    if (selected) {
      const updated = apps.find((a) => a._id === selected._id);
      if (updated) setSelected(updated);
    }
  }, [apps]);

  return (
    <div className="p-6 md:p-10 space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h1 className="text-3xl font-display font-semibold text-white">Applications</h1>
          <p className="text-white/40 mt-1 text-sm">{apps.length} total · {apps.filter(a=>a.starred).length} starred</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Filter Tabs */}
          <div className="flex bg-surface border border-white/10 rounded-xl p-1 text-xs font-medium gap-1">
            <button onClick={() => setFilter("all")} className={cn("px-3 py-1.5 rounded-lg transition-all", filter === "all" ? "bg-white/10 text-white" : "text-white/40 hover:text-white")}>All</button>
            <button onClick={() => setFilter("starred")} className={cn("px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5", filter === "starred" ? "bg-yellow-500/10 text-yellow-400" : "text-white/40 hover:text-white")}>
              <Star className="w-3 h-3" /> Starred
            </button>
          </div>
          {/* Search */}
          <div className="relative w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full bg-surface border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-500/40 transition-all" />
          </div>
        </div>
      </header>

      <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-16">
            {search ? "No matching applications." : "No applications yet."}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5 text-white/30 text-xs font-mono uppercase">
                  <th className="w-8 px-4 py-3"></th>
                  <th className="text-left px-4 py-3">Startup</th>
                  <th className="text-left px-4 py-3">Founder</th>
                  <th className="text-left px-4 py-3">Stage</th>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a._id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    {/* Star toggle */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onStar(a._id, !a.starred)}
                        className={cn("transition-colors", a.starred ? "text-yellow-400" : "text-white/20 hover:text-yellow-400")}
                        title={a.starred ? "Unstar" : "Star"}
                      >
                        <Star className={cn("w-4 h-4", a.starred && "fill-yellow-400")} />
                      </button>
                    </td>
                    <td className="px-4 py-3 font-medium text-white cursor-pointer hover:text-gold-400 transition-colors" onClick={() => setSelected(a)}>
                      {a.startup_name}
                    </td>
                    <td className="px-4 py-3 text-white/60">{a.team_head}</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-mono">{a.stage}</span>
                    </td>
                    <td className="px-4 py-3 text-white/40 font-mono text-xs">{new Date(a.created_at).toLocaleDateString("en-IN")}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setSelected(a)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors" title="View details">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { if (confirm(`Delete "${a.startup_name}"?`)) onDelete(a._id); }}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Detail Modal ── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div
            className="relative w-full max-w-2xl bg-surface border border-white/10 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gold top line */}
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent rounded-t-3xl" />

            <div className="p-8">
              {/* Header row */}
              <div className="flex items-start justify-between mb-6 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {selected.starred && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                    <span className="text-xs font-mono text-gold-400 uppercase tracking-wider">Application</span>
                  </div>
                  <h2 className="text-2xl font-display font-semibold text-white">{selected.startup_name}</h2>
                  <span className="mt-2 inline-block px-3 py-1 bg-gold-500/10 text-gold-400 text-xs font-mono rounded-full">{selected.stage}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Star from detail */}
                  <button
                    onClick={() => onStar(selected._id, !selected.starred)}
                    className={cn("p-2 rounded-xl glass transition-colors", selected.starred ? "text-yellow-400" : "text-white/30 hover:text-yellow-400")}
                  >
                    <Star className={cn("w-5 h-5", selected.starred && "fill-yellow-400")} />
                  </button>
                  {/* Delete from detail */}
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${selected.startup_name}"?`)) {
                        onDelete(selected._id);
                        setSelected(null);
                      }
                    }}
                    className="p-2 rounded-xl glass text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => setSelected(null)} className="p-2 rounded-xl glass hover:bg-white/10 transition-colors text-white/50 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <Detail label="Founder"    value={selected.team_head} />
                <Detail label="Phone"      value={selected.phone} />
                <Detail label="Team Size"  value={String(selected.member_count ?? (selected.members?.length ?? 1))} />
                <Detail label="Submitted"  value={new Date(selected.created_at).toLocaleString("en-IN")} />
              </div>

              {/* Team members */}
              {selected.members && selected.members.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs font-mono uppercase text-white/30 mb-2">Team Members</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.members.map((m, i) => (
                      <span key={i} className="px-3 py-1 rounded-full glass text-sm text-white/70">{m.name}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {selected.description && (
                <div className="mb-6">
                  <p className="text-xs font-mono uppercase text-white/30 mb-2">Problem / Description</p>
                  <p className="text-white/70 text-sm leading-relaxed bg-black/20 rounded-xl p-4">{selected.description}</p>
                </div>
              )}

              {/* Pitch Video Player */}
              {selected.pitch_video_url && (
                <div className="mb-6">
                  <p className="text-xs font-mono uppercase text-white/30 mb-3">Pitch Video</p>
                  {videoOpen ? (
                    <div className="rounded-2xl overflow-hidden bg-black border border-white/10">
                      {/* Embed YouTube / direct MP4 */}
                      {selected.pitch_video_url.includes('youtube') || selected.pitch_video_url.includes('youtu.be') ? (
                        <iframe
                          className="w-full aspect-video"
                          src={`https://www.youtube.com/embed/${extractYouTubeId(selected.pitch_video_url)}`}
                          allowFullScreen
                          title="Pitch Video"
                        />
                      ) : selected.pitch_video_url.includes('drive.google.com') ? (
                        <iframe
                          className="w-full aspect-video"
                          src={selected.pitch_video_url.replace('/view', '/preview')}
                          allowFullScreen
                          title="Pitch Video"
                        />
                      ) : (
                        <video controls className="w-full aspect-video">
                          <source src={selected.pitch_video_url} />
                          Your browser does not support this video format.
                        </video>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => setVideoOpen(true)}
                      className="w-full aspect-video rounded-2xl border border-white/10 bg-black/30 flex flex-col items-center justify-center gap-3 hover:bg-black/50 hover:border-gold-500/30 transition-all group"
                    >
                      <div className="w-14 h-14 rounded-full bg-gold-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-gold-400 fill-gold-400 translate-x-0.5" />
                      </div>
                      <span className="text-sm text-white/50 group-hover:text-white transition-colors">Click to play pitch video</span>
                    </button>
                  )}
                </div>
              )}

              {/* External Links */}
              <div className="flex flex-wrap gap-3">
                {selected.linkedin_url && (
                  <a href={selected.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                    LinkedIn <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {selected.website_url && (
                  <a href={selected.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                    Website <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {selected.pitch_video_url && (
                  <a href={selected.pitch_video_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gold-500/10 text-gold-400 rounded-xl text-sm hover:bg-gold-500/20 transition-colors">
                    Open Video Link <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function extractYouTubeId(url: string): string {
  const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  return match ? match[1] : '';
}

function StatCard({ icon, label, value, accent = "gold" }: {
  icon: React.ReactNode; label: string; value: number; accent?: string;
}) {
  const ring = accent === "yellow" ? "from-yellow-500/10" : accent === "blue" ? "from-blue-500/10" : "from-gold-500/10";
  return (
    <div className={cn("bg-surface border border-white/5 rounded-2xl p-6 bg-gradient-to-br to-transparent", ring)}>
      <div className="flex items-center gap-2 mb-4">{icon}<span className="text-xs font-mono text-white/40 uppercase">{label}</span></div>
      <p className="text-4xl font-display font-bold text-white">{value}</p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-mono uppercase text-white/30 mb-1">{label}</p>
      <p className="text-white/80 text-sm">{value}</p>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router  = useRouter();
  const [view, setView]       = useState<View>("dashboard");
  const [apps, setApps]       = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastCount, setLastCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchApps = useCallback(async () => {
    try {
      const r = await fetch("/api/applications");
      if (r.status === 401) { router.push("/admin/login"); return; }
      if (!r.ok) return;
      const json = await r.json();
      const list: Application[] = Array.isArray(json) ? json : json.data ?? [];

      setApps(list);

      // Auto-switch to applications tab when a new submission arrives
      if (lastCount > 0 && list.length > lastCount) {
        setView("applications");
      }
      setLastCount(list.length);
    } catch (e) {
      console.warn("[Admin] Fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, [lastCount, router]);

  // Initial load + polling every 15 s for real-time updates
  useEffect(() => {
    fetchApps();
    intervalRef.current = setInterval(fetchApps, 15_000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleStar = async (id: string, starred: boolean) => {
    // Optimistic update
    setApps((prev) => prev.map((a) => a._id === id ? { ...a, starred } : a));
    try {
      await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ starred }),
      });
    } catch (e) {
      console.error("Star error:", e);
      fetchApps(); // revert on failure
    }
  };

  const handleDelete = async (id: string) => {
    setApps((prev) => prev.filter((a) => a._id !== id)); // optimistic
    try {
      await fetch(`/api/applications/${id}`, { method: "DELETE" });
    } catch (e) {
      console.error("Delete error:", e);
      fetchApps(); // revert on failure
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar active={view} onNavigate={setView} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto">
        {/* Refresh indicator */}
        <div className="flex items-center justify-end px-6 pt-4">
          <button onClick={fetchApps} className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors">
            <RefreshCw className="w-3 h-3" /> Refresh
          </button>
        </div>
        {view === "dashboard"    && <DashboardView    apps={apps} onNavigate={setView} />}
        {view === "applications" && <ApplicationsView apps={apps} onStar={handleStar} onDelete={handleDelete} />}
      </main>
    </div>
  );
}
