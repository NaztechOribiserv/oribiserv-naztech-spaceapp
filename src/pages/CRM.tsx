import React, { useMemo, useState } from 'react';
import {
  LucideArrowUpRight, LucideBuilding2, LucideCalendarDays, LucideCheck,
  LucideChevronDown, LucideClock3, LucideDollarSign, LucideFilter,
  LucideMail, LucideMoreHorizontal, LucidePhone, LucidePlus, LucideSearch,
  LucideSlidersHorizontal, LucideSparkles, LucideTarget, LucideUsers,
  LucideX,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Contact {
  id: string;
  name: string;
  initials: string;
  company: string;
  role: string;
  email: string;
  status: 'Active' | 'Lead' | 'At risk';
  value: string;
  lastContact: string;
  tone: string;
}

const contacts: Contact[] = [
  { id: '1', name: 'Thandiwe Moyo', initials: 'TM', company: 'Moyo Creative', role: 'Founder & CEO', email: 'thandiwe@moyo.co.za', status: 'Active', value: 'R84,000', lastContact: '2h ago', tone: 'from-cyan-400 to-blue-500' },
  { id: '2', name: 'Liam van der Merwe', initials: 'LM', company: 'Cape Union Labs', role: 'Operations lead', email: 'liam@capeunion.io', status: 'Lead', value: 'R42,500', lastContact: 'Yesterday', tone: 'from-violet-400 to-fuchsia-500' },
  { id: '3', name: 'Anele Dlamini', initials: 'AD', company: 'Northstar Health', role: 'IT Director', email: 'anele@northstar.health', status: 'Active', value: 'R126,000', lastContact: '2d ago', tone: 'from-amber-300 to-orange-500' },
  { id: '4', name: 'Jason Pillay', initials: 'JP', company: 'Pillay & Partners', role: 'Partner', email: 'jason@pillaypartners.co.za', status: 'At risk', value: 'R18,750', lastContact: '8d ago', tone: 'from-emerald-300 to-teal-500' },
  { id: '5', name: 'Sibongile Khumalo', initials: 'SK', company: 'Khumalo Retail', role: 'General manager', email: 'sib@khumaloretail.co.za', status: 'Lead', value: 'R31,200', lastContact: '10d ago', tone: 'from-pink-300 to-rose-500' },
];

const pipeline = [
  { label: 'New leads', count: 12, total: 'R184k', color: 'bg-sky-400', cards: ['Kopano Systems', 'Mvelo Studio'] },
  { label: 'Qualified', count: 8, total: 'R326k', color: 'bg-violet-400', cards: ['Cape Union Labs', 'Khumalo Retail'] },
  { label: 'Proposal sent', count: 5, total: 'R248k', color: 'bg-amber-300', cards: ['Northstar Health', 'Pillay & Partners'] },
  { label: 'Negotiation', count: 3, total: 'R192k', color: 'bg-emerald-400', cards: ['Moyo Creative'] },
];

const activities = [
  { title: 'Proposal opened', detail: 'Thandiwe viewed the Managed Network proposal', time: '14 min ago', icon: LucideTarget, color: 'text-sky-300 bg-sky-400/10' },
  { title: 'New contact added', detail: 'Liam van der Merwe joined Cape Union Labs', time: '1 hour ago', icon: LucideUsers, color: 'text-violet-300 bg-violet-400/10' },
  { title: 'Follow-up scheduled', detail: 'Call with Anele Dlamini · Tomorrow, 09:30', time: '3 hours ago', icon: LucideCalendarDays, color: 'text-amber-200 bg-amber-300/10' },
];

export const CRM: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const filteredContacts = useMemo(() => contacts.filter((contact) => `${contact.name} ${contact.company} ${contact.email}`.toLowerCase().includes(search.toLowerCase())), [search]);
  const visibleContacts = showAll ? filteredContacts : filteredContacts.slice(0, 4);

  return (
    <div className="min-h-full pb-10">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-400"><LucideSparkles size={14} /> Revenue workspace</div>
          <h2 className="text-3xl font-display font-bold tracking-tight text-white md:text-4xl">Good morning, Naz</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">Keep your relationships moving forward. Here's the pulse of your customer pipeline.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"><LucideCalendarDays size={16} /> This month <LucideChevronDown size={14} className="text-muted" /></button>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-[#032137] shadow-retro-brand transition hover:bg-brand-400"><LucidePlus size={17} /> Add contact</button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Pipeline value', value: 'R950,400', delta: '+18.4%', icon: LucideDollarSign },
          { label: 'Active contacts', value: '1,284', delta: '+12.8%', icon: LucideUsers },
          { label: 'Won this month', value: 'R246,800', delta: '+24.6%', icon: LucideCheck },
          { label: 'Avg. deal cycle', value: '18 days', delta: '-3 days', icon: LucideClock3 },
        ].map((stat) => { const Icon = stat.icon; return <div key={stat.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 shadow-xl shadow-black/10"><div className="flex items-start justify-between"><div className="flex size-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400"><Icon size={18} /></div><span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[11px] font-bold text-emerald-300">{stat.delta}</span></div><p className="mt-5 text-xs font-medium text-muted">{stat.label}</p><p className="mt-1 text-2xl font-display font-bold text-white">{stat.value}</p></div> })}
      </div>

      <div className="mt-8 flex items-center gap-1 border-b border-white/[0.08]">
        {['Overview', 'Contacts', 'Deals', 'Tasks'].map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`border-b-2 px-4 py-3 text-sm font-semibold transition ${activeTab === tab ? 'border-brand-400 text-white' : 'border-transparent text-muted hover:text-white'}`}>{tab}</button>)}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 2xl:grid-cols-[1.4fr_0.8fr]">
        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-display text-lg font-bold text-white">Sales pipeline</h3><p className="mt-1 text-xs text-muted">Track every opportunity across your funnel.</p></div><button className="flex items-center gap-2 self-start rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-muted hover:text-white"><LucideSlidersHorizontal size={14} /> Customize</button></div>
          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">{pipeline.map((stage) => <div key={stage.label} className="rounded-xl border border-white/[0.07] bg-[#071827]/70 p-3"><div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2 text-xs font-semibold text-white"><span className={`size-2 rounded-full ${stage.color}`} />{stage.label}</div><button className="text-muted hover:text-white"><LucideMoreHorizontal size={16} /></button></div><p className="text-xl font-display font-bold text-white">{stage.total}</p><p className="mt-1 text-[11px] text-muted">{stage.count} opportunities</p><div className="mt-4 flex flex-col gap-2">{stage.cards.map((card, index) => <div key={card} className="rounded-lg border border-white/[0.07] bg-white/[0.04] p-3"><div className="flex items-start justify-between gap-2"><p className="text-xs font-semibold text-white">{card}</p><span className="text-[10px] text-muted">{index === 0 ? 'Now' : 'New'}</span></div><div className="mt-3 h-1 rounded-full bg-white/10"><div className={`h-1 rounded-full ${stage.color}`} style={{ width: `${48 + index * 20}%` }} /></div></div>)}</div></div>)}</div>
        </section>

        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 md:p-6"><div className="flex items-center justify-between"><div><h3 className="font-display text-lg font-bold text-white">Recent activity</h3><p className="mt-1 text-xs text-muted">Your team's latest moments.</p></div><button className="text-xs font-semibold text-brand-400 hover:text-brand-300">View all</button></div><div className="mt-6 flex flex-col gap-5">{activities.map((activity) => { const Icon = activity.icon; return <div key={activity.title} className="flex gap-3"><div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${activity.color}`}><Icon size={16} /></div><div className="min-w-0"><p className="text-sm font-semibold text-white">{activity.title}</p><p className="mt-1 text-xs leading-5 text-muted">{activity.detail}</p><p className="mt-1 text-[10px] text-muted/70">{activity.time}</p></div></div> })}</div><div className="mt-6 rounded-xl border border-brand-500/20 bg-brand-500/[0.06] p-4"><p className="text-xs font-bold text-brand-300">Next best action</p><p className="mt-1 text-xs leading-5 text-muted">Follow up with 3 qualified leads to stay on pace for your monthly target.</p><button className="mt-3 flex items-center gap-1 text-xs font-bold text-brand-300">Review leads <LucideArrowUpRight size={14} /></button></div></section>
      </div>

      <section className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 md:p-6"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div><h3 className="font-display text-lg font-bold text-white">Contacts</h3><p className="mt-1 text-xs text-muted">Your most recently updated relationships.</p></div><div className="flex flex-wrap items-center gap-2"><div className="relative"><LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search contacts" className="w-56 rounded-lg border border-white/10 bg-[#071827] py-2 pl-9 pr-3 text-xs text-white outline-none placeholder:text-muted/70 focus:border-brand-500" /></div><button className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-muted hover:text-white"><LucideFilter size={14} /> Filter</button></div></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[720px] text-left"><thead><tr className="border-b border-white/[0.08] text-[10px] uppercase tracking-[0.16em] text-muted"><th className="pb-3 pl-1 font-semibold">Contact</th><th className="pb-3 font-semibold">Company</th><th className="pb-3 font-semibold">Status</th><th className="pb-3 font-semibold">Value</th><th className="pb-3 font-semibold">Last contact</th><th className="pb-3" /></tr></thead><tbody>{visibleContacts.map((contact) => <tr key={contact.id} className="border-b border-white/[0.06] last:border-0"><td className="py-4 pl-1"><div className="flex items-center gap-3"><div className={`flex size-9 items-center justify-center rounded-full bg-gradient-to-br ${contact.tone} text-xs font-bold text-[#071827]`}>{contact.initials}</div><div><p className="text-sm font-semibold text-white">{contact.name}</p><p className="mt-0.5 text-xs text-muted">{contact.email}</p></div></div></td><td className="py-4"><div className="flex items-center gap-2 text-sm text-white"><LucideBuilding2 size={14} className="text-muted" />{contact.company}</div><p className="mt-0.5 pl-5 text-xs text-muted">{contact.role}</p></td><td className="py-4"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${contact.status === 'Active' ? 'bg-emerald-400/10 text-emerald-300' : contact.status === 'Lead' ? 'bg-sky-400/10 text-sky-300' : 'bg-rose-400/10 text-rose-300'}`}>{contact.status}</span></td><td className="py-4 text-sm font-semibold text-white">{contact.value}</td><td className="py-4 text-xs text-muted">{contact.lastContact}</td><td className="py-4 text-right"><button className="rounded-lg p-2 text-muted hover:bg-white/5 hover:text-white"><LucideMoreHorizontal size={17} /></button></td></tr>)}</tbody></table>{visibleContacts.length === 0 && <p className="py-8 text-center text-sm text-muted">No contacts match your search.</p>}</div><button onClick={() => setShowAll(!showAll)} className="mt-4 text-xs font-bold text-brand-400 hover:text-brand-300">{showAll ? 'Show less' : 'View all contacts'} <span aria-hidden="true">→</span></button></section>

      {showAddModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="add-contact-title"><motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b2034] p-6 shadow-2xl"><div className="flex items-center justify-between"><div><h3 id="add-contact-title" className="font-display text-xl font-bold text-white">Add contact</h3><p className="mt-1 text-xs text-muted">Create a new relationship record.</p></div><button onClick={() => setShowAddModal(false)} className="rounded-lg p-2 text-muted hover:bg-white/5 hover:text-white" aria-label="Close dialog"><LucideX size={18} /></button></div><form onSubmit={(event) => { event.preventDefault(); setShowAddModal(false); }} className="mt-6 flex flex-col gap-4"><label className="text-xs font-semibold text-muted">Full name<input required className="mt-2 w-full rounded-lg border border-white/10 bg-[#071827] px-3 py-2.5 text-sm text-white outline-none focus:border-brand-500" /></label><label className="text-xs font-semibold text-muted">Company<input required className="mt-2 w-full rounded-lg border border-white/10 bg-[#071827] px-3 py-2.5 text-sm text-white outline-none focus:border-brand-500" /></label><label className="text-xs font-semibold text-muted">Email<input required type="email" className="mt-2 w-full rounded-lg border border-white/10 bg-[#071827] px-3 py-2.5 text-sm text-white outline-none focus:border-brand-500" /></label><div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowAddModal(false)} className="flex-1 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/5">Cancel</button><button type="submit" className="flex-1 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-bold text-[#032137] hover:bg-brand-400">Save contact</button></div></form></motion.div></div>}
    </div>
  );
};
