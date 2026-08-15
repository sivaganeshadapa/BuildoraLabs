import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { submitLead, uploadAttachment } from '../lib/supabase/queries';
import { ArrowRight, CheckCircle, AlertCircle, Paperclip } from 'lucide-react';
import { fadeUp } from '../lib/animations';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'website',
    budget: '',
    message: ''
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      let attachmentUrl = null;
      if (file) {
        attachmentUrl = await uploadAttachment(file);
      }

      await submitLead({
        name: formData.name,
        email: formData.email,
        project_type: formData.projectType,
        budget: formData.budget,
        description: formData.message,
        attachment_url: attachmentUrl,
        status: 'New'
      });

      setStatus('success');
      setFormData({ name: '', email: '', projectType: 'website', budget: '', message: '' });
      setFile(null);
    } catch (err: any) {
      console.error('Lead submission failed:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  const inputClass = "w-full p-4 bg-[#1a1a1a] border border-[#333] rounded-lg text-[#E1E0CC] font-sans text-base transition-all min-h-[56px] focus:outline-none focus:border-gray-500 focus:bg-[#222]";
  const labelClass = "block mb-2 text-sm text-gray-400 font-medium";

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="md:pr-10"
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight mb-8 text-[#E1E0CC]">Ready to build your next idea?</h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light mb-12">
              Tell us what you're trying to build. We'll help you turn the idea into a practical, scalable digital product.
            </p>
            
            <div className="flex gap-4">
              <a href="#work" className="inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-base transition-all border border-[#333] hover:border-[#666] hover:bg-[#111] text-[#E1E0CC]">
                Explore Our Work
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#101010] border border-[#222] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden" 
          >
            <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay"></div>

            {status === 'success' ? (
              <div className="text-center py-16 relative z-10">
                <CheckCircle size={64} className="mx-auto mb-6 text-green-400" />
                <h3 className="text-3xl font-medium text-[#E1E0CC] mb-4">Project Request Received</h3>
                <p className="text-gray-400 text-sm mb-8">
                  Thank you for reaching out. A SILAVA engineer will review your requirements and contact you within 24 hours.
                </p>
                <button 
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-base transition-all border border-[#333] hover:border-[#666] hover:bg-[#111] text-[#E1E0CC]"
                  onClick={() => setStatus('idle')}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10">
                {status === 'error' && (
                  <div className="p-4 bg-red-900/10 border border-red-500/50 rounded-lg mb-6 flex items-center gap-3 text-red-400">
                    <AlertCircle size={20} />
                    <span className="text-sm">{errorMessage}</span>
                  </div>
                )}

                <div className="mb-6">
                  <label htmlFor="name" className={labelClass}>Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    disabled={status === 'submitting'}
                    className={inputClass}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className={labelClass}>Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    disabled={status === 'submitting'}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="projectType" className={labelClass}>Project Type</label>
                    <select 
                      id="projectType"
                      value={formData.projectType}
                      onChange={e => setFormData({...formData, projectType: e.target.value})}
                      disabled={status === 'submitting'}
                      className={inputClass}
                    >
                      <option value="website">Website</option>
                      <option value="webapp">Web Application</option>
                      <option value="mvp">MVP Development</option>
                      <option value="ai">AI Integration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className={labelClass}>Estimated Budget</label>
                    <select 
                      id="budget"
                      value={formData.budget}
                      onChange={e => setFormData({...formData, budget: e.target.value})}
                      disabled={status === 'submitting'}
                      className={inputClass}
                    >
                      <option value="">Select Budget...</option>
                      <option value="<5k">Under ₹5k</option>
                      <option value="5k-10k">₹5k - ₹10k</option>
                      <option value="10k-25k">₹10k - ₹25k</option>
                      <option value="25k+">₹25k+</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className={labelClass}>Project Details</label>
                  <textarea 
                    id="message" 
                    required 
                    rows={4} 
                    placeholder="Tell us about your goals, timeline, and core features..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    disabled={status === 'submitting'}
                    className={`${inputClass} resize-y`}
                  ></textarea>
                </div>

                <div className="mb-8">
                  <label htmlFor="attachment" className="flex items-center gap-2 cursor-pointer p-3 border border-dashed border-[#444] hover:border-[#666] rounded-lg transition-colors">
                    <Paperclip size={18} className="text-gray-400" />
                    <span className="text-gray-400 text-sm">{file ? file.name : 'Attach brief or specs (optional)'}</span>
                    <input 
                      type="file" 
                      id="attachment" 
                      onChange={e => setFile(e.target.files?.[0] || null)}
                      disabled={status === 'submitting'}
                      className="hidden"
                    />
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full flex justify-center items-center gap-2 bg-primary text-black font-medium text-base py-4 rounded-full hover:bg-white hover:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Submitting...' : (
                    <>Start Project <ArrowRight size={18} /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
      
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] pointer-events-none z-0" style={{
        background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)'
      }} />
    </section>
  );
}
