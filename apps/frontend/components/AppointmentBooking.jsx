'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { createLead } from '../lib/api';

const callFitPoints = [
  'Businesses looking to convert their current website into a high-quality funnel.',
  'Founders taking offline operations online with a stronger digital system.',
  'Teams that want higher conversion rates and predictable lead flow.',
  'Businesses evaluating AI automation or backend architecture for scale.',
  'Companies searching for a reliable long-term technical partner.'
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

function formatDateValue(date) {
  return date.toISOString().split('T')[0];
}

function formatDateShort(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatMonth(date) {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getFirstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

function getCalendarDays(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = getDaysInMonth(date);
  const firstDay = getFirstDayOfMonth(date);
  
  const days = [];
  
  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }
  
  return days;
}

function isDateDisabled(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

export default function AppointmentBooking({ initialServiceId = 'consultation' }) {
  const router = useRouter();
  const serviceId = initialServiceId || 'consultation';

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    projectBrief: '',
    budgetRange: 'under-50k'
  });

  const calendarDays = useMemo(() => getCalendarDays(currentMonth), [currentMonth]);
  
  const isSlotSelected = Boolean(selectedDate && selectedTime);

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!isSlotSelected) {
      setError('Please select a date and time before submitting.');
      return;
    }

    setStatus('loading');

    try {
      const response = await createLead({
        ...form,
        serviceId,
        projectBrief: `${form.projectBrief}\n\nPreferred Call Slot: ${selectedDate} at ${selectedTime}`
      });

      const leadId = response?.data?.id;
      const query = leadId ? `?leadId=${encodeURIComponent(leadId)}` : '';
      router.push(`/booking-confirmation${query}`);
    } catch (submitError) {
      setError(submitError.message || 'Unable to submit details');
      setStatus('idle');
    }
  };

  const inputClass =
    'w-full px-3.5 py-2.5 text-sm bg-white/[0.07] border border-white/[0.12] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white/[0.10] transition-colors';

  return (
    <section className="rounded-3xl border border-white/[0.08] bg-gray-900/80 p-6 shadow-2xl shadow-black/30">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-400">Book Call</p>
          <h3 className="mt-2 text-2xl font-bold text-white">Schedule Your Call with Rajesh</h3>
          <p className="mt-2 text-sm font-semibold text-orange-300">Free 15-Minute Demo Call</p>
          <p className="mt-4 text-sm leading-relaxed text-gray-300">
            By the end of this brief call, you will have a clear plan for the next technical steps to
            generate consistent and reliable online results.
          </p>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
            This call is perfect for
          </p>
          <ul className="mt-3 space-y-3">
            {callFitPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="mt-1 text-orange-400">+</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-white/[0.1] bg-black/20 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white">Choose Date & Time</h4>
            </div>

            {/* Month Navigation */}
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={goToPreviousMonth}
                className="rounded-lg border border-white/[0.12] px-3 py-1.5 text-sm text-gray-300 hover:border-white/30 hover:text-white transition-colors"
              >
                ← Previous
              </button>
              <span className="text-sm font-semibold text-white">{formatMonth(currentMonth)}</span>
              <button
                type="button"
                onClick={goToNextMonth}
                className="rounded-lg border border-white/[0.12] px-3 py-1.5 text-sm text-gray-300 hover:border-white/30 hover:text-white transition-colors"
              >
                Next →
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="mb-4 rounded-lg border border-white/[0.1] bg-white/[0.02] p-3">
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {weekDays.map((day) => (
                  <div key={day} className="py-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, idx) => {
                  if (!date) {
                    return <div key={`empty-${idx}`} />;
                  }

                  const value = formatDateValue(date);
                  const disabled = isDateDisabled(date);
                  const selected = value === selectedDate;

                  return (
                    <button
                      key={value}
                      type="button"
                      disabled={disabled}
                      onClick={() => {
                        setSelectedDate(value);
                        setSelectedTime('');
                      }}
                      className={`aspect-square rounded-lg border text-xs font-medium transition-colors ${
                        disabled
                          ? 'border-white/[0.08] text-gray-600 cursor-not-allowed bg-white/[0.02]'
                          : selected
                          ? 'border-orange-500 bg-orange-500/15 text-orange-200'
                          : 'border-white/[0.12] text-gray-300 hover:border-white/30'
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Available Slots</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {timeSlots.map((slot) => {
                  const selected = slot === selectedTime;

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={!selectedDate}
                      onClick={() => setSelectedTime(slot)}
                      className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                        selected
                          ? 'border-orange-500 bg-orange-500/15 text-orange-200'
                          : 'border-white/[0.12] text-gray-300 hover:border-white/30 disabled:opacity-40 disabled:cursor-not-allowed'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Slot Display */}
            <div className="rounded-lg border border-white/[0.12] bg-white/[0.02] px-3 py-2 text-xs text-gray-400">
              {isSlotSelected
                ? `Selected: ${selectedDate} at ${selectedTime}`
                : 'Select a date and a time slot to continue.'}
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-white/[0.1] bg-white/[0.02] p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-400">Step 2</p>
              <h4 className="mt-1 text-lg font-bold text-white">Share Your Project Brief</h4>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Company (Optional)</label>
              <input
                name="company"
                value={form.company}
                onChange={onChange}
                placeholder="Your company name"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Project Brief</label>
              <textarea
                name="projectBrief"
                value={form.projectBrief}
                onChange={onChange}
                required
                rows={3}
                placeholder="Share goals, timeline, and expected outcome..."
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Budget Range</label>
              <select name="budgetRange" value={form.budgetRange} onChange={onChange} className={inputClass}>
                <option value="under-50k">Under 50K INR</option>
                <option value="50k-2l">50K to 2L INR</option>
                <option value="2l-plus">2L+ INR</option>
              </select>
            </div>

            {error ? (
              <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2.5">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-500 disabled:opacity-60 text-white font-bold rounded-xl transition-colors shadow-lg shadow-orange-900/30"
            >
              {status === 'loading' ? 'Submitting...' : 'Submit Details'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
