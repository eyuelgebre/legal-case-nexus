import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { 
  Briefcase, 
  User, 
  Tag, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Hash, 
  Calendar as CalendarIcon, 
  Gavel, 
  Building2 
} from 'lucide-react';
import { toast } from 'sonner';

interface NewCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewCaseModal({ isOpen, onClose }: NewCaseModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    type: 'Wills & Estates',
    priority: 'Medium',
    description: '',
    plaintiffs: [''],
    defendants: [''],
    fileNo: '',
    openedDayInCourt: '',
    injunctionDay: '',
    branchOfCourt: '',
    bench: ''
  });

  const handleAddParty = (type: 'plaintiffs' | 'defendants') => {
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], '']
    }));
  };

  const handleRemoveParty = (type: 'plaintiffs' | 'defendants', index: number) => {
    if (formData[type].length <= 1) return;
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handlePartyChange = (type: 'plaintiffs' | 'defendants', index: number, value: string) => {
    const newParties = [...formData[type]];
    newParties[index] = value;
    setFormData(prev => ({
      ...prev,
      [type]: newParties
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mandatory field check
    if (!formData.title || !formData.clientName || !formData.fileNo || !formData.openedDayInCourt) {
      toast.error('Missing Required Fields', { 
        description: 'Please ensure Title, Client, File No., and Opening Day are filled.' 
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast.success('Case Created', { 
      description: `Case "${formData.title}" (File: ${formData.fileNo}) has been successfully initialized.` 
    });
    
    setIsSubmitting(false);
    onClose();
    // Reset form
    setFormData({
      title: '',
      clientName: '',
      type: 'Wills & Estates',
      priority: 'Medium',
      description: '',
      plaintiffs: [''],
      defendants: [''],
      fileNo: '',
      openedDayInCourt: '',
      injunctionDay: '',
      branchOfCourt: '',
      bench: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl max-h-[90vh] flex flex-col bg-white">
        {/* Fixed Header */}
        <div className="bg-slate-900 px-6 py-6 text-white shrink-0">
          <DialogHeader>
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
                <Briefcase className="text-indigo-400" size={24} />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-white">Initialize New Case</DialogTitle>
                <DialogDescription className="text-slate-400 text-xs">
                  Provide detailed case information to create a new record.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
          {/* Scrollable Body - Native Scroll for better mobile accessibility */}
          <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            <div className="space-y-8 pb-4">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-2">Basic Information</h3>
                
                <div className="grid gap-2">
                  <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Tag size={14} /> Case Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Estate Planning: Harrison"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all text-base md:text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="client" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <User size={14} /> Client Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="client"
                      placeholder="Full legal name"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all text-base md:text-sm"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fileNo" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <Hash size={14} /> File No. <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fileNo"
                      placeholder="e.g., KLF-2024-001"
                      value={formData.fileNo}
                      onChange={(e) => setFormData({ ...formData, fileNo: e.target.value })}
                      className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all text-base md:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Case Type</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(val) => setFormData({ ...formData, type: val })}
                    >
                      <SelectTrigger className="h-11 bg-slate-50 border-slate-200 focus:bg-white w-full text-base md:text-sm">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200">
                        <SelectItem value="Wills & Estates">Wills & Estates</SelectItem>
                        <SelectItem value="Intellectual Property">Intellectual Property</SelectItem>
                        <SelectItem value="Family Law">Family Law</SelectItem>
                        <SelectItem value="Property Law">Property Law</SelectItem>
                        <SelectItem value="Tort Law">Tort Law</SelectItem>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Priority Level</Label>
                    <Select 
                      value={formData.priority} 
                      onValueChange={(val) => setFormData({ ...formData, priority: val })}
                    >
                      <SelectTrigger className="h-11 bg-slate-50 border-slate-200 focus:bg-white w-full text-base md:text-sm">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200">
                        <SelectItem value="High">
                          <div className="flex items-center gap-2 text-red-600 font-medium">
                            <AlertCircle size={14} /> High
                          </div>
                        </SelectItem>
                        <SelectItem value="Medium" className="text-amber-600 font-medium">Medium</SelectItem>
                        <SelectItem value="Low" className="text-blue-600 font-medium">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Parties Involved Section */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-2">Parties Involved</h3>
                
                <div className="space-y-3">
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>Plaintiffs</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleAddParty('plaintiffs')}
                      className="h-7 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-0 px-2 font-bold"
                    >
                      <Plus size={14} className="mr-1" /> Add Plaintiff
                    </Button>
                  </Label>
                  <div className="space-y-2">
                    {formData.plaintiffs.map((plaintiff, index) => (
                      <div key={`plaintiff-${index}`} className="flex gap-2">
                        <Input
                          placeholder={`Plaintiff ${index + 1} name`}
                          value={plaintiff}
                          onChange={(e) => handlePartyChange('plaintiffs', index, e.target.value)}
                          className="h-10 bg-slate-50 border-slate-200 focus:bg-white transition-all text-base md:text-sm"
                        />
                        {formData.plaintiffs.length > 1 && (
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleRemoveParty('plaintiffs', index)}
                            className="h-10 w-10 text-slate-400 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>Defendants</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleAddParty('defendants')}
                      className="h-7 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-0 px-2 font-bold"
                    >
                      <Plus size={14} className="mr-1" /> Add Defendant
                    </Button>
                  </Label>
                  <div className="space-y-2">
                    {formData.defendants.map((defendant, index) => (
                      <div key={`defendant-${index}`} className="flex gap-2">
                        <Input
                          placeholder={`Defendant ${index + 1} name`}
                          value={defendant}
                          onChange={(e) => handlePartyChange('defendants', index, e.target.value)}
                          className="h-10 bg-slate-50 border-slate-200 focus:bg-white transition-all text-base md:text-sm"
                        />
                        {formData.defendants.length > 1 && (
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleRemoveParty('defendants', index)}
                            className="h-10 w-10 text-slate-400 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Court Details Section */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-2">Court & Trial Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="openedDay" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <CalendarIcon size={14} /> Opening Day <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="openedDay"
                      type="date"
                      value={formData.openedDayInCourt}
                      onChange={(e) => setFormData({ ...formData, openedDayInCourt: e.target.value })}
                      className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all text-base md:text-sm"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="injunctionDay" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <CalendarIcon size={14} /> Injunction Day
                    </Label>
                    <Input
                      id="injunctionDay"
                      type="date"
                      value={formData.injunctionDay}
                      onChange={(e) => setFormData({ ...formData, injunctionDay: e.target.value })}
                      className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all text-base md:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="branch" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <Building2 size={14} /> Court Branch
                    </Label>
                    <Input
                      id="branch"
                      placeholder="e.g., Central Division"
                      value={formData.branchOfCourt}
                      onChange={(e) => setFormData({ ...formData, branchOfCourt: e.target.value })}
                      className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all text-base md:text-sm"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bench" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <Gavel size={14} /> Bench
                    </Label>
                    <Input
                      id="bench"
                      placeholder="e.g., Honorable Judge Smith"
                      value={formData.bench}
                      onChange={(e) => setFormData({ ...formData, bench: e.target.value })}
                      className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all text-base md:text-sm"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Additional Case Notes
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Brief overview of the matter..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[100px] bg-slate-50 border-slate-200 focus:bg-white transition-all resize-none text-base md:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Footer */}
          <DialogFooter className="px-6 py-4 bg-slate-50 border-t border-slate-100 shrink-0 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
              className="font-bold text-slate-500 hover:text-slate-900"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 shadow-lg shadow-indigo-600/20 h-11"
            >
              {isSubmitting ? 'Initializing...' : 'Create Case'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}