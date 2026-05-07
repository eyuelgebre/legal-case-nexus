import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MoreVertical, 
  Search, 
  UserPlus, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { cn, formatDate } from '../lib/utils';
import { toast } from 'sonner';

const MOCK_CLIENTS = [
  { id: '1', name: 'Robert Harrison', email: 'robert.h@example.com', phone: '(555) 123-4567', activeCases: 2, status: 'Active', joined: '2023-01-12' },
  { id: '2', name: 'Alice Johnson', email: 'alice.j@corp.com', phone: '(555) 987-6543', activeCases: 1, status: 'Active', joined: '2023-05-20' },
  { id: '3', name: 'Mark Stevenson', email: 'mark.s@freemail.com', phone: '(555) 456-7890', activeCases: 0, status: 'Inactive', joined: '2022-11-05' },
  { id: '4', name: 'Sarah Connor', email: 'sconnor@resistance.net', phone: '(555) 000-1984', activeCases: 3, status: 'Active', joined: '2023-08-30' },
  { id: '5', name: 'Michael Smith', email: 'msmith@global.com', phone: '(555) 222-3333', activeCases: 1, status: 'Active', joined: '2023-10-14' },
];

export default function ClientManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Client Directory</h2>
          <p className="text-slate-500">Manage relationships and contact information.</p>
        </div>
        <button 
          onClick={() => toast.success('New client registration')}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm shadow-indigo-100"
        >
          <UserPlus size={18} />
          Add Client
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search clients by name, email, or phone..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg text-sm transition-all"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-slate-50 border-transparent text-sm rounded-lg px-3 py-2 focus:bg-white focus:border-indigo-500 transition-all outline-none">
              <option>All Clients</option>
              <option>Active Only</option>
              <option>Recent</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Client</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Contact</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Active Cases</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_CLIENTS.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{client.name}</p>
                        <p className="text-xs text-slate-500">Member since {formatDate(client.joined)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail size={14} className="text-slate-400" />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone size={14} className="text-slate-400" />
                        {client.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                      client.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                    )}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-100 h-1.5 rounded-full max-w-[60px] overflow-hidden">
                        <div 
                          className="bg-indigo-500 h-full transition-all" 
                          style={{ width: `${(client.activeCases / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{client.activeCases}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => toast.info(`Opening chat with ${client.name}`)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      >
                        <MessageSquare size={18} />
                      </button>
                      <button 
                         onClick={() => toast.info(`Opening profile for ${client.name}`)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      >
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}