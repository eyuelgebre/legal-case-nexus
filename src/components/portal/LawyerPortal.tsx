import React, { useState } from 'react';
import { 
  Megaphone, 
  BookOpen, 
  Search, 
  ExternalLink, 
  Clock, 
  ChevronRight,
  Filter,
  FileText,
  Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn, formatDate } from '../../lib/utils';
import { Announcement, SharedResource } from '../../types';

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'New Policy on Remote Work for 2024',
    content: 'The firm is updating its hybrid work policy effective January 1st. Please review the updated handbook section 4.2.',
    date: '2023-11-22',
    author: 'Human Resources',
    category: 'Policy',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f34e8fb3-70fc-4bcc-9ac1-2524b5b9795a/firm-announcement-1-1a0159e7-1772037916333.webp'
  },
  {
    id: '2',
    title: 'Lexington & Associates Wins Firm of the Year',
    content: 'We are proud to announce that our firm has been recognized for excellence in corporate litigation by the Capital City Bar Association.',
    date: '2023-11-20',
    author: 'Sarah Lexington',
    category: 'Firm News'
  },
  {
    id: '3',
    title: 'Mandatory Cybersecurity Training',
    content: 'All staff must complete the annual cybersecurity awareness module by the end of this month.',
    date: '2023-11-18',
    author: 'IT Department',
    category: 'Urgent'
  }
];

const RESOURCES: SharedResource[] = [
  { id: '1', title: 'Civil Litigation Template Pack', type: 'Template', category: 'Litigation', lastUpdated: '2023-11-15', downloadUrl: '#' },
  { id: '2', title: 'Firm Branding & Style Guide', type: 'Guidelines', category: 'Marketing', lastUpdated: '2023-10-20', downloadUrl: '#' },
  { id: '3', title: 'Employee Handbook 2023', type: 'Handbook', category: 'HR', lastUpdated: '2023-01-05', downloadUrl: '#' },
  { id: '4', title: 'Conflict of Interest Disclosure', type: 'Policy', category: 'Ethics', lastUpdated: '2023-09-12', downloadUrl: '#' },
  { id: '5', title: 'Estate Planning Interview Form', type: 'Template', category: 'Probate', lastUpdated: '2023-11-01', downloadUrl: '#' },
];

export default function LawyerPortal() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = RESOURCES.filter(r => 
    (activeCategory === 'All' || r.type === activeCategory) &&
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Firm-wide Portal</h1>
          <p className="text-slate-500 mt-1">Shared resources, firm news, and essential documentation for all staff.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200">
          <Clock size={16} />
          <span>Last sync: Just now</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Feed: Announcements */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Megaphone className="text-indigo-600" size={22} />
              Recent Announcements
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {ANNOUNCEMENTS.map((news, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={news.id} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group"
              >
                {news.image && (
                  <div className="h-48 overflow-hidden">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      news.category === 'Urgent' ? "bg-red-100 text-red-700" :
                      news.category === 'Policy' ? "bg-indigo-100 text-indigo-700" :
                      "bg-slate-100 text-slate-700"
                    )}>
                      {news.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{formatDate(news.date)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{news.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{news.content}</p>
                  <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs uppercase">
                        {news.author.charAt(0)}
                      </div>
                      <span className="text-xs font-semibold text-slate-500">By {news.author}</span>
                    </div>
                    <button className="text-indigo-600 font-bold text-sm flex items-center gap-1 hover:underline">
                      Read More <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar: Shared Resources */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <BookOpen className="text-indigo-600" size={22} />
              Resource Library
            </h2>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {['All', 'Template', 'Policy', 'Guidelines'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                    activeCategory === cat 
                      ? "bg-indigo-600 text-white" 
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredResources.map((res) => (
                <div key={res.id} className="p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-indigo-100 hover:bg-white transition-all group">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{res.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{res.category}</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full" />
                          <span className="text-[10px] font-medium text-slate-400">{formatDate(res.lastUpdated)}</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm font-bold hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center gap-2">
              <ExternalLink size={16} />
              Browse Global Archive
            </button>
          </div>

          <div className="bg-indigo-900 rounded-3xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold mb-2">Need Assistance?</h4>
              <p className="text-xs text-indigo-200 leading-relaxed mb-4">
                Contact the IT or HR department for portal-related questions or access permissions.
              </p>
              <button className="w-full py-2 bg-indigo-500 hover:bg-indigo-400 rounded-xl text-xs font-bold transition-all">
                Contact Support
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-800 rounded-full blur-3xl opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
}