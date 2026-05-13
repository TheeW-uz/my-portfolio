'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Tab = 'projects' | 'achievements' | 'experience' | 'stats';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${activeTab}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${activeTab}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({});
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    setLoading(true);
    try {
      await fetch(`/api/admin/${activeTab}/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white mb-2">
              <ArrowLeft size={16} /> Back to Site
            </Link>
            <h1 className="text-4xl font-black italic">Portfolio <span className="text-gradient">Control Center</span></h1>
            <p className="text-gray-500 mt-2">Manage your authentic achievements and records.</p>
          </div>
          <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
            {(['projects', 'achievements', 'experience', 'stats'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                  activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr,2fr] gap-12">
          {/* Form */}
          <div className="glass p-8 rounded-3xl border border-white/10 h-fit">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus size={20} className="text-primary" /> Add New {activeTab.slice(0, -1)}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'projects' && (
                <>
                  <Input label="Title" name="title" value={formData.title} onChange={(v) => setFormData({...formData, title: v})} />
                  <Textarea label="Description" name="description" value={formData.description} onChange={(v) => setFormData({...formData, description: v})} />
                  <Input label="Tech Stack (comma separated)" name="techStack" value={formData.techStack} onChange={(v) => setFormData({...formData, techStack: v.split(',')})} />
                  <Input label="Live Link" name="liveLink" value={formData.liveLink} onChange={(v) => setFormData({...formData, liveLink: v})} />
                  <Input label="Github Link" name="githubLink" value={formData.githubLink} onChange={(v) => setFormData({...formData, githubLink: v})} />
                  <Input label="Results/Impact" name="results" value={formData.results} onChange={(v) => setFormData({...formData, results: v})} />
                </>
              )}
              {activeTab === 'achievements' && (
                <>
                  <Input label="Title" name="title" value={formData.title} onChange={(v) => setFormData({...formData, title: v})} />
                  <Input label="Issuer" name="issuer" value={formData.issuer} onChange={(v) => setFormData({...formData, issuer: v})} />
                  <Input label="Date" name="date" value={formData.date} onChange={(v) => setFormData({...formData, date: v})} />
                  <Input label="Link" name="link" value={formData.link} onChange={(v) => setFormData({...formData, link: v})} />
                  <select 
                    className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 outline-none"
                    value={formData.type || 'Certificate'}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="Certificate">Certificate</option>
                    <option value="Award">Award</option>
                    <option value="Presentation">Presentation</option>
                  </select>
                </>
              )}
              {activeTab === 'experience' && (
                <>
                  <Input label="Company" name="company" value={formData.company} onChange={(v) => setFormData({...formData, company: v})} />
                  <Input label="Role" name="role" value={formData.role} onChange={(v) => setFormData({...formData, role: v})} />
                  <Input label="Duration" name="duration" value={formData.duration} onChange={(v) => setFormData({...formData, duration: v})} />
                  <Textarea label="Description" name="description" value={formData.description} onChange={(v) => setFormData({...formData, description: v})} />
                </>
              )}
              {activeTab === 'stats' && (
                <>
                  <Input label="Label" name="label" value={formData.label} onChange={(v) => setFormData({...formData, label: v})} />
                  <Input label="Value" name="value" value={formData.value} onChange={(v) => setFormData({...formData, value: v})} />
                </>
              )}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                Save Entry
              </button>
            </form>
          </div>

          {/* List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-6">Existing Entries</h2>
            {data.length === 0 ? (
              <div className="glass p-12 rounded-3xl border border-white/5 text-center text-gray-500 italic">
                No entries found in this category.
              </div>
            ) : (
              data.map((item) => (
                <div key={item.id} className="glass p-6 rounded-2xl border border-white/5 flex justify-between items-center group">
                  <div>
                    <h3 className="font-bold text-lg">{item.title || item.company || item.label}</h3>
                    <p className="text-sm text-gray-500">{item.issuer || item.role || item.value}</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", name }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{label}</label>
      <input 
        name={name}
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, name }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{label}</label>
      <textarea 
        name={name}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all resize-none"
      />
    </div>
  );
}
