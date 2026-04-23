'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createLead } from '../lib/api';

export default function LeadForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    serviceId: 'web-dev',
    projectBrief: '',
    budgetRange: 'under-50k',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('loading');

    try {
      const response = await createLead(form);
      setForm({
        name: '',
        email: '',
        company: '',
        serviceId: 'web-dev',
        projectBrief: '',
        budgetRange: 'under-50k',
      });
      router.push(`/booking-confirmation?leadId=${encodeURIComponent(response.data.id)}`);
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  };

  const inputClass =
    'w-full px-3.5 py-2.5 text-sm bg-white/[0.07] border border-white/[0.12] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white/[0.10] transition-colors';

  return (
    <form
      id="consultation-form"
      onSubmit={onSubmit}
      className="bg-gray-900 border border-white/[0.08] rounded-3xl p-7 shadow-2xl"
    >
      <h3 className="text-xl font-bold text-white mb-1">Book Your Free Consultation</h3>
      <p className="text-sm text-gray-400 mb-6">Share your goals and we will design your delivery roadmap.</p>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Name</label>
          <input id="name" name="name" value={form.name} onChange={onChange} required
            placeholder="Your full name"
            className={inputClass} />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={onChange} required
            placeholder="you@company.com"
            className={inputClass} />
        </div>

        <div>
          <label htmlFor="company" className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Company</label>
          <input id="company" name="company" value={form.company} onChange={onChange} required
            placeholder="Your company name"
            className={inputClass} />
        </div>

        <div>
          <label htmlFor="serviceId" className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Service Need</label>
          <select id="serviceId" name="serviceId" value={form.serviceId} onChange={onChange}
            className={inputClass}>
            <option value="web-dev">Web Development</option>
            <option value="backend-dev">Backend Engineering</option>
            <option value="ai-automation">AI and Automation</option>
            <option value="crm-portal">CRM Portal & Systems</option>
            <option value="mobile-app">Mobile App Development</option>
            <option value="saas-platform">SaaS Platform Development</option>
            <option value="consultation">Strategy Consultation</option>
          </select>
        </div>

        <div>
          <label htmlFor="projectBrief" className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Project Brief</label>
          <textarea
            id="projectBrief"
            name="projectBrief"
            value={form.projectBrief}
            onChange={onChange}
            rows={3}
            required
            placeholder="Briefly describe your project goals..."
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="budgetRange" className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Budget Range</label>
          <select id="budgetRange" name="budgetRange" value={form.budgetRange} onChange={onChange}
            className={inputClass}>
            <option value="under-50k">Under 50K INR</option>
            <option value="50k-2l">50K to 2L INR</option>
            <option value="2l-plus">2L+ INR</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors shadow-lg shadow-orange-900/30 mt-2"
        >
          {status === 'loading' ? 'Submitting...' : 'Start My Project →'}
        </button>

        {error && (
          <p className="text-sm text-red-400 text-center bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2.5">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
