'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_AUTH_API || 'https://alpha-hackers-ikgr.onrender.com/api';

interface User { id: string; name: string; email: string; role: string; }
interface Profile {
  transporterName?: string;
  companyType?: string;
  ownedFleet?: number;
  areaOfOperation?: string[];
  industryExperience?: number;
  turnover?: number;
  contactName?: string;
  contactPhone?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (!token || !userStr) { router.push('/login'); return; }

    const u = JSON.parse(userStr) as User;
    setUser(u);

    fetch(`${API}/profile/${u.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => { if (data.profile) setProfile(data.profile); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) return (
    <main className="min-h-screen bg-soft-grey flex items-center justify-center">
      <p className="text-neutral-400">Loading...</p>
    </main>
  );

  const Stat = ({ label, value }: { label: string; value: string | number | undefined }) => (
    <div className="bg-white rounded-xl border border-neutral-100 p-5">
      <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-xl font-semibold text-deep-blue">{value ?? '—'}</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-soft-grey">
      {/* Top bar */}
      <header className="bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-deep-blue">
          Logistics<span className="text-cyan">Now</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-500">
            {user?.name} <span className="text-xs bg-cyan/10 text-cyan px-2 py-0.5 rounded-full ml-1">{user?.role}</span>
          </span>
          <button onClick={logout} className="text-sm text-red-500 hover:underline">Logout</button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-deep-blue">
            Welcome back, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-sm text-neutral-500 mt-1">Transporter Portal &mdash; LogisticsNow</p>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/profile" className="bg-white rounded-xl border border-neutral-100 p-5 hover:border-cyan transition-colors group">
            <div className="text-cyan text-2xl mb-2">📋</div>
            <p className="font-semibold text-deep-blue group-hover:text-cyan transition-colors">
              {profile ? 'Edit Profile' : 'Create Profile'}
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              {profile ? 'Update your transporter details' : 'Set up your company profile'}
            </p>
          </Link>
          <Link href="/#freight-predictor" className="bg-white rounded-xl border border-neutral-100 p-5 hover:border-cyan transition-colors group">
            <div className="text-cyan text-2xl mb-2">📊</div>
            <p className="font-semibold text-deep-blue group-hover:text-cyan transition-colors">Freight Predictor</p>
            <p className="text-xs text-neutral-400 mt-1">AI-powered rate & delay predictions</p>
          </Link>
          <Link href="/#lorri-guide" className="bg-white rounded-xl border border-neutral-100 p-5 hover:border-cyan transition-colors group">
            <div className="text-cyan text-2xl mb-2">🤖</div>
            <p className="font-semibold text-deep-blue group-hover:text-cyan transition-colors">LoRRI Assistant</p>
            <p className="text-xs text-neutral-400 mt-1">Chat with our logistics AI</p>
          </Link>
        </div>

        {/* Profile Overview */}
        {profile ? (
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Profile Overview</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Stat label="Company" value={profile.transporterName} />
              <Stat label="Type" value={profile.companyType} />
              <Stat label="Fleet Size" value={profile.ownedFleet} />
              <Stat label="Experience" value={profile.industryExperience ? `${profile.industryExperience} yrs` : undefined} />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Stat label="Turnover (₹)" value={profile.turnover?.toLocaleString('en-IN')} />
              <Stat label="Area of Operation" value={(profile.areaOfOperation || []).join(', ') || undefined} />
              <Stat label="Contact" value={profile.contactName} />
              <Stat label="Phone" value={profile.contactPhone} />
            </div>
          </section>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <p className="text-yellow-800 font-medium">Profile not set up yet</p>
            <p className="text-sm text-yellow-600 mt-1">Complete your transporter profile to unlock all features.</p>
            <Link href="/profile" className="inline-block mt-3 btn-primary !py-2 !text-sm">Create Profile</Link>
          </div>
        )}

        {/* Account Info */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Account</h2>
          <div className="bg-white rounded-xl border border-neutral-100 p-5 grid sm:grid-cols-3 gap-4 text-sm">
            <div><span className="text-neutral-400">Name:</span> <span className="text-deep-blue font-medium ml-1">{user?.name}</span></div>
            <div><span className="text-neutral-400">Email:</span> <span className="text-deep-blue font-medium ml-1">{user?.email}</span></div>
            <div><span className="text-neutral-400">Role:</span> <span className="text-deep-blue font-medium ml-1 capitalize">{user?.role}</span></div>
          </div>
        </section>
      </div>
    </main>
  );
}
