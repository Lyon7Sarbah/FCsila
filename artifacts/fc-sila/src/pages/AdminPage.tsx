import { useState, useEffect, useCallback } from 'react';

const API = '/api';

interface Registration {
  id: number;
  child_name: string;
  child_age: string;
  age_group: string | null;
  experience: string | null;
  parent_name: string;
  phone: string;
  email: string;
  medical: string | null;
  lang: string;
  status: string;
  notes: string | null;
  created_at: string;
}

interface Stats {
  all: number; pending: number; accepted: number; waitlisted: number; rejected: number; trial_booked: number;
  ageCounts: { all: number; '7-10': number; '11-15': number };
}

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  pending:      { label: 'Pending',       color: '#f59e0b', bg: '#1a1000' },
  trial_booked: { label: 'Trial Booked',  color: '#60a5fa', bg: '#001020' },
  accepted:     { label: 'Accepted',      color: '#34d399', bg: '#001a0a' },
  waitlisted:   { label: 'Waitlisted',    color: '#a78bfa', bg: '#100018' },
  rejected:     { label: 'Rejected',      color: '#f87171', bg: '#1a0000' },
};

const EXPERIENCE_MAP: Record<string, string> = {
  none: 'None – Beginner',
  some: 'Some – Casual',
  club: 'Club experience',
};

export default function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem('admin_token') || '');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [rows, setRows] = useState<Registration[]>([]);
  const [stats, setStats] = useState<Stats>({ all: 0, pending: 0, accepted: 0, waitlisted: 0, rejected: 0, trial_booked: 0, ageCounts: { all: 0, '7-10': 0, '11-15': 0 } });
  const [filterStatus, setFilterStatus] = useState('all');
  const [ageGroupFilter, setAgeGroupFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Registration | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [savingId, setSavingId] = useState<number | null>(null);

  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  const fetchStats = useCallback(async () => {
    if (!token) return;
    try {
      const r = await fetch(`${API}/admin/stats`, { headers });
      if (r.ok) setStats(await r.json());
    } catch {}
  }, [token]);

  const fetchRows = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '200', offset: '0' });
      if (filterStatus !== 'all') params.set('status', filterStatus);
      if (ageGroupFilter !== 'all') params.set('age_group', ageGroupFilter);
      if (search) params.set('search', search);
      const r = await fetch(`${API}/admin/registrations?${params}`, { headers });
      if (r.ok) {
        const data = await r.json();
        setRows(data.rows);
      }
    } catch {} finally { setLoading(false); }
  }, [token, filterStatus, ageGroupFilter, search]);

  useEffect(() => { fetchStats(); }, [fetchStats]);
  useEffect(() => { fetchRows(); }, [fetchRows]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const r = await fetch(`${API}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!r.ok) { setLoginError('Incorrect password'); return; }
      const { token: t } = await r.json();
      sessionStorage.setItem('admin_token', t);
      setToken(t);
    } catch { setLoginError('Connection error'); } finally { setLoginLoading(false); }
  };

  const updateStatus = async (id: number, status: string) => {
    setSavingId(id);
    try {
      const r = await fetch(`${API}/admin/registrations/${id}`, {
        method: 'PATCH', headers,
        body: JSON.stringify({ status }),
      });
      if (r.ok) {
        const updated = await r.json();
        setRows(prev => prev.map(row => row.id === id ? updated : row));
        if (selectedRow?.id === id) setSelectedRow(updated);
        fetchStats();
      }
    } catch {} finally { setSavingId(null); }
  };

  const saveNotes = async (id: number) => {
    setSavingId(id);
    try {
      const r = await fetch(`${API}/admin/registrations/${id}`, {
        method: 'PATCH', headers,
        body: JSON.stringify({ notes: notesDraft }),
      });
      if (r.ok) {
        const updated = await r.json();
        setRows(prev => prev.map(row => row.id === id ? updated : row));
        setSelectedRow(updated);
      }
    } catch {} finally { setSavingId(null); }
  };

  const deleteRow = async (id: number) => {
    if (!confirm('Delete this registration? This cannot be undone.')) return;
    try {
      await fetch(`${API}/admin/registrations/${id}`, { method: 'DELETE', headers });
      setRows(prev => prev.filter(r => r.id !== id));
      if (selectedRow?.id === id) setSelectedRow(null);
      fetchStats();
    } catch {}
  };

  const handleExport = () => {
    window.open(`${API}/admin/export.csv?token=${encodeURIComponent(token)}`, '_blank');
    // Use token in header approach via fetch and blob
    fetch(`${API}/admin/export.csv`, { headers })
      .then(r => r.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `registrations-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  // LOGIN SCREEN
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#030303' }}>
        <div className="w-full max-w-sm mx-4">
          <div className="text-center mb-8">
            <div className="text-4xl font-black text-white uppercase tracking-tighter">FC SILA</div>
            <div className="text-xs font-black uppercase tracking-widest mt-1" style={{ color: '#FDE100' }}>Admin Dashboard</div>
          </div>
          <form onSubmit={handleLogin} className="rounded-2xl border p-8 space-y-5" style={{ background: '#0d0d0d', borderColor: '#1a1a1a' }}>
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider mb-2" style={{ color: '#FDE100' }}>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm"
                style={{ background: '#0a0a0a', border: '1px solid #252525', color: '#fff', outline: 'none' }}
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            {loginError && <div className="text-sm text-red-400 text-center">{loginError}</div>}
            <button type="submit" disabled={loginLoading}
              className="w-full py-3 rounded-full font-black uppercase tracking-wider text-sm transition-all hover:brightness-110"
              style={{ background: '#FDE100', color: '#000', cursor: loginLoading ? 'wait' : 'pointer' }}>
              {loginLoading ? 'Logging in…' : 'Log In →'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const sm = STATUS_META;

  return (
    <div className="min-h-screen" style={{ background: '#030303', color: '#fff' }}>
      {/* Top bar */}
      <div className="border-b px-6 py-4 flex items-center justify-between" style={{ background: '#080808', borderColor: '#1a1a1a' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm" style={{ background: '#FDE100', color: '#000' }}>S</div>
          <div>
            <div className="font-black text-white text-sm uppercase tracking-wide">FC SILA Admin</div>
            <div className="text-[10px]" style={{ color: '#555' }}>Registration Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExport}
            className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border transition-colors hover:bg-green-900"
            style={{ borderColor: '#34d399', color: '#34d399' }}>
            ↓ Export CSV
          </button>
          <button onClick={() => { sessionStorage.removeItem('admin_token'); setToken(''); }}
            className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border transition-colors hover:bg-white/5"
            style={{ borderColor: '#333', color: '#888' }}>
            Log Out
          </button>
        </div>
      </div>

      <div className="p-6 max-w-screen-2xl mx-auto">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {[
            { key: 'all', label: 'Total' },
            { key: 'pending', label: 'Pending' },
            { key: 'trial_booked', label: 'Trial Booked' },
            { key: 'accepted', label: 'Accepted' },
            { key: 'waitlisted', label: 'Waitlisted' },
            { key: 'rejected', label: 'Rejected' },
          ].map(({ key, label }) => {
            const meta = sm[key] || { color: '#fff', bg: '#111' };
            const isActive = filterStatus === key;
            return (
              <button key={key} onClick={() => setFilterStatus(key)}
                className="rounded-xl p-4 text-left transition-all hover:brightness-110"
                style={{ background: isActive ? meta.bg : '#0d0d0d', border: `1px solid ${isActive ? meta.color : '#1a1a1a'}` }}>
                <div className="text-2xl font-black" style={{ color: isActive ? meta.color : '#fff' }}>
                  {(stats as any)[key] ?? 0}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest mt-0.5" style={{ color: '#555' }}>{label}</div>
              </button>
            );
          })}
        </div>

        {/* Age Group Tabs */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[10px] font-black uppercase tracking-widest mr-1" style={{ color: '#444' }}>Age Group</span>
          {[
            { key: 'all',   label: 'All Groups',      count: stats.ageCounts?.all ?? stats.all,      icon: '⚽' },
            { key: '7-10',  label: 'Foundation 7–10', count: stats.ageCounts?.['7-10'] ?? 0,          icon: '🟡' },
            { key: '11-15', label: 'Development 11–15', count: stats.ageCounts?.['11-15'] ?? 0,       icon: '🟠' },
          ].map(({ key, label, count, icon }) => {
            const isActive = ageGroupFilter === key;
            return (
              <button
                key={key}
                onClick={() => setAgeGroupFilter(key)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all"
                style={{
                  background: isActive ? '#FDE100' : '#0d0d0d',
                  color: isActive ? '#000' : '#666',
                  border: `1px solid ${isActive ? '#FDE100' : '#1a1a1a'}`,
                  boxShadow: isActive ? '0 0 12px rgba(253,225,0,0.3)' : 'none',
                }}
              >
                <span>{icon}</span>
                <span>{label}</span>
                <span
                  className="px-1.5 py-0.5 rounded-full text-[10px] font-black"
                  style={{ background: isActive ? 'rgba(0,0,0,0.2)' : '#1a1a1a', color: isActive ? '#000' : '#555' }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="flex gap-3 mb-5">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, phone, email…"
            className="flex-1 max-w-sm px-4 py-2.5 rounded-xl text-sm"
            style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', color: '#fff', outline: 'none' }}
          />
          <button onClick={fetchRows} className="px-4 py-2.5 rounded-xl text-sm font-bold" style={{ background: '#1a1a1a', color: '#888' }}>
            Search
          </button>
        </div>

        <div className="flex gap-5 items-start">
          {/* Table */}
          <div className="flex-1 overflow-x-auto rounded-2xl border" style={{ borderColor: '#1a1a1a', background: '#0d0d0d' }}>
            {loading ? (
              <div className="p-12 text-center text-gray-600 text-sm">Loading…</div>
            ) : rows.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-4xl mb-3">📋</div>
                <div className="text-gray-600 text-sm">No registrations yet</div>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                    {['#', 'Child', 'Age', 'Parent', 'Phone', 'Status', 'Date', ''].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest" style={{ color: '#444' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(row => {
                    const meta = sm[row.status] || { label: row.status, color: '#888', bg: '#111' };
                    const isSelected = selectedRow?.id === row.id;
                    return (
                      <tr key={row.id}
                        onClick={() => { setSelectedRow(row); setNotesDraft(row.notes || ''); }}
                        className="cursor-pointer transition-colors"
                        style={{ borderBottom: '1px solid #111', background: isSelected ? '#141414' : 'transparent' }}>
                        <td className="px-4 py-3 font-mono text-xs" style={{ color: '#555' }}>#{row.id}</td>
                        <td className="px-4 py-3 font-bold text-white">{row.child_name}</td>
                        <td className="px-4 py-3" style={{ color: '#888' }}>{row.age_group || row.child_age}</td>
                        <td className="px-4 py-3" style={{ color: '#aaa' }}>{row.parent_name}</td>
                        <td className="px-4 py-3 font-mono text-xs" style={{ color: '#FDE100' }}>{row.phone}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                            style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.color}30` }}>
                            {meta.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: '#555' }}>
                          {new Date(row.created_at).toLocaleDateString('ru-RU')}
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={e => { e.stopPropagation(); deleteRow(row.id); }}
                            className="text-xs text-red-800 hover:text-red-500 transition-colors">✕</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Detail panel */}
          {selectedRow && (
            <div className="w-80 flex-shrink-0 rounded-2xl border overflow-hidden" style={{ background: '#0d0d0d', borderColor: '#1a1a1a' }}>
              <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#1a1a1a' }}>
                <div className="font-black text-sm text-white">#{selectedRow.id} Details</div>
                <button onClick={() => setSelectedRow(null)} className="text-gray-600 hover:text-white">✕</button>
              </div>
              <div className="p-5 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
                {/* Info fields */}
                {[
                  { label: 'Child', value: selectedRow.child_name },
                  { label: 'Age', value: selectedRow.age_group || selectedRow.child_age },
                  { label: 'Experience', value: EXPERIENCE_MAP[selectedRow.experience || ''] || selectedRow.experience || '—' },
                  { label: 'Parent', value: selectedRow.parent_name },
                  { label: 'Phone', value: selectedRow.phone, yellow: true },
                  { label: 'Email', value: selectedRow.email, yellow: true },
                  { label: 'Language', value: selectedRow.lang?.toUpperCase() || '—' },
                  { label: 'Medical', value: selectedRow.medical || '—' },
                  { label: 'Submitted', value: new Date(selectedRow.created_at).toLocaleString('ru-RU') },
                ].map(({ label, value, yellow }) => (
                  <div key={label}>
                    <div className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color: '#444' }}>{label}</div>
                    <div className="text-sm font-medium" style={{ color: yellow ? '#FDE100' : '#ddd' }}>{value}</div>
                  </div>
                ))}

                {/* Status buttons */}
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: '#444' }}>Change Status</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {Object.entries(sm).map(([key, meta]) => (
                      <button key={key}
                        disabled={savingId === selectedRow.id || selectedRow.status === key}
                        onClick={() => updateStatus(selectedRow.id, key)}
                        className="py-1.5 px-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all"
                        style={{
                          background: selectedRow.status === key ? meta.bg : '#111',
                          color: selectedRow.status === key ? meta.color : '#555',
                          border: `1px solid ${selectedRow.status === key ? meta.color : '#222'}`,
                          opacity: savingId === selectedRow.id ? 0.5 : 1,
                        }}>
                        {meta.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: '#444' }}>Notes</div>
                  <textarea rows={3} value={notesDraft}
                    onChange={e => setNotesDraft(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs resize-none"
                    style={{ background: '#0a0a0a', border: '1px solid #252525', color: '#ccc', outline: 'none' }}
                    placeholder="Add internal notes…" />
                  <button onClick={() => saveNotes(selectedRow.id)}
                    disabled={savingId === selectedRow.id}
                    className="mt-1.5 w-full py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all"
                    style={{ background: '#FDE100', color: '#000', opacity: savingId === selectedRow.id ? 0.6 : 1 }}>
                    {savingId === selectedRow.id ? 'Saving…' : 'Save Notes'}
                  </button>
                </div>

                {/* Quick actions */}
                <div className="pt-2 border-t" style={{ borderColor: '#1a1a1a' }}>
                  <a href={`mailto:${selectedRow.email}`}
                    className="block text-center py-2 rounded-lg text-xs font-black uppercase tracking-wider mb-2 transition-all hover:brightness-110"
                    style={{ background: '#0a1a00', color: '#34d399', border: '1px solid #34d39930' }}>
                    ✉ Email Parent
                  </a>
                  <a href={`https://wa.me/${selectedRow.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                    className="block text-center py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all hover:brightness-110"
                    style={{ background: '#001a00', color: '#25D366', border: '1px solid #25D36630' }}>
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
