'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_AUTH_API || 'https://alpha-hackers-ikgr.onrender.com/api';

interface ProfileData {
  transporterName: string;
  companyType: string;
  registeredOfficeAddress: string;
  establishedYear: string;
  areaOfOperation: string;
  industryExperience: string;
  financialYear: string;
  turnover: string;
  netProfit: string;
  ownedFleet: string;
  contactName: string;
  contactDesignation: string;
  contactPhone: string;
  contactEmail: string;
}

const empty: ProfileData = {
  transporterName: '', companyType: '', registeredOfficeAddress: '',
  establishedYear: '', areaOfOperation: '', industryExperience: '',
  financialYear: '', turnover: '', netProfit: '', ownedFleet: '',
  contactName: '', contactDesignation: '', contactPhone: '', contactEmail: '',
};

function Field({ label, name, value, onChange, type = 'text', placeholder = '', area = false }: {
  label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; type?: string; placeholder?: string; area?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-neutral-500 mb-1.5">{label}</label>
      {area ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none resize-none"
          rows={3}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState<ProfileData>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (!token || !userStr) { router.push('/login'); return; }

    const user = JSON.parse(userStr);
    fetch(`${API}/profile/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        if (data.profile) {
          setIsEdit(true);
          const p = data.profile;
          setForm({
            transporterName: p.transporterName || '',
            companyType: p.companyType || '',
            registeredOfficeAddress: p.registeredOfficeAddress || '',
            establishedYear: p.establishedYear?.toString() || '',
            areaOfOperation: (p.areaOfOperation || []).join(', '),
            industryExperience: p.industryExperience?.toString() || '',
            financialYear: p.financialYear || '',
            turnover: p.turnover?.toString() || '',
            netProfit: p.netProfit?.toString() || '',
            ownedFleet: p.ownedFleet?.toString() || '',
            contactName: p.contactName || '',
            contactDesignation: p.contactDesignation || '',
            contactPhone: p.contactPhone || '',
            contactEmail: p.contactEmail || '',
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setMessage(''); setSaving(true);

    const token = localStorage.getItem('token');
    const payload = {
      ...form,
      establishedYear: form.establishedYear ? Number(form.establishedYear) : undefined,
      industryExperience: form.industryExperience ? Number(form.industryExperience) : undefined,
      turnover: form.turnover ? Number(form.turnover) : undefined,
      netProfit: form.netProfit ? Number(form.netProfit) : undefined,
      ownedFleet: form.ownedFleet ? Number(form.ownedFleet) : undefined,
      areaOfOperation: form.areaOfOperation ? form.areaOfOperation.split(',').map(s => s.trim()).filter(Boolean) : [],
    };

    try {
      const endpoint = isEdit ? `${API}/profile/update` : `${API}/profile/create`;
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) { setError(data.error || 'Save failed.'); return; }
      setMessage('Profile saved successfully!');
      setIsEdit(true);
    } catch {
      setError('Cannot connect to server.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: keyof ProfileData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  if (loading) return (
    <main className="min-h-screen bg-soft-grey flex items-center justify-center">
      <p className="text-neutral-400">Loading profile...</p>
    </main>
  );

  return (
    <main className="min-h-screen bg-soft-grey py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/dashboard" className="text-sm text-cyan hover:underline">&larr; Dashboard</Link>
            <h1 className="text-2xl font-bold text-deep-blue mt-1">Transporter Profile</h1>
          </div>
          <Link href="/" className="text-lg font-bold text-deep-blue">
            Logistics<span className="text-cyan">Now</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 space-y-8">
          {message && <div className="text-sm text-green-700 bg-green-50 px-4 py-2.5 rounded-lg">{message}</div>}
          {error && <div className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-lg">{error}</div>}

          {/* Company Information */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Company Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Transporter / Company Name *" name="transporterName" value={form.transporterName} onChange={handleChange('transporterName')} placeholder="ABC Logistics Pvt. Ltd." />
              <Field label="Company Type" name="companyType" value={form.companyType} onChange={handleChange('companyType')} placeholder="Pvt. Ltd. / LLP / Proprietorship" />
            </div>
            <Field label="Registered Office Address" name="registeredOfficeAddress" value={form.registeredOfficeAddress} onChange={handleChange('registeredOfficeAddress')} area placeholder="Full address" />
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Established Year" name="establishedYear" value={form.establishedYear} onChange={handleChange('establishedYear')} type="number" placeholder="2010" />
              <Field label="Industry Experience (years)" name="industryExperience" value={form.industryExperience} onChange={handleChange('industryExperience')} type="number" placeholder="15" />
            </div>
            <Field label="Area of Operation (comma-separated)" name="areaOfOperation" value={form.areaOfOperation} onChange={handleChange('areaOfOperation')} placeholder="Pan India, North India, South India" />
          </section>

          {/* Financial Details */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Financial Details</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Field label="Financial Year" name="financialYear" value={form.financialYear} onChange={handleChange('financialYear')} placeholder="2024-25" />
              <Field label="Turnover (₹)" name="turnover" value={form.turnover} onChange={handleChange('turnover')} type="number" placeholder="50000000" />
              <Field label="Net Profit (₹)" name="netProfit" value={form.netProfit} onChange={handleChange('netProfit')} type="number" placeholder="5000000" />
            </div>
          </section>

          {/* Fleet */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Fleet</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Owned Fleet Count" name="ownedFleet" value={form.ownedFleet} onChange={handleChange('ownedFleet')} type="number" placeholder="50" />
            </div>
          </section>

          {/* Contact Person */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Contact Person</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Contact Name" name="contactName" value={form.contactName} onChange={handleChange('contactName')} placeholder="Rajesh Kumar" />
              <Field label="Designation" name="contactDesignation" value={form.contactDesignation} onChange={handleChange('contactDesignation')} placeholder="Operations Manager" />
              <Field label="Phone" name="contactPhone" value={form.contactPhone} onChange={handleChange('contactPhone')} placeholder="+91 98765 43210" />
              <Field label="Email" name="contactEmail" value={form.contactEmail} onChange={handleChange('contactEmail')} type="email" placeholder="rajesh@company.com" />
            </div>
          </section>

          <button type="submit" disabled={saving} className="btn-primary w-full !py-2.5 disabled:opacity-50">
            {saving ? 'Saving...' : isEdit ? 'Update Profile' : 'Create Profile'}
          </button>
        </form>
      </div>
    </main>
  );
}
