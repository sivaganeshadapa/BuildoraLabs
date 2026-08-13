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
        status: 'new'
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

  return (
    <section id="contact" className="section bg-secondary" style={{ borderTop: '1px solid var(--border-color)', position: 'relative' }}>
      <div className="container">
        <div className="grid grid-cols-2" style={{ alignItems: 'center' }}>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{ paddingRight: 'var(--spacing-10)' }}
          >
            <h2 className="display" style={{ marginBottom: 'var(--spacing-6)' }}>Ready to build your next idea?</h2>
            <p className="text-body-lg" style={{ marginBottom: 'var(--spacing-10)' }}>
              Tell us what you're trying to build. We'll help you turn the idea into a practical, scalable digital product.
            </p>
            
            <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
              <a href="#work" className="btn btn-secondary glass">Explore Our Work</a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card glass" 
            style={{ padding: 'var(--spacing-10)' }}
          >
            {status === 'success' ? (
              <div className="text-center" style={{ padding: 'var(--spacing-16) 0' }}>
                <CheckCircle size={64} color="var(--success-color)" style={{ margin: '0 auto var(--spacing-6)' }} />
                <h3>Project Request Received</h3>
                <p className="text-body-sm" style={{ marginTop: 'var(--spacing-4)' }}>
                  Thank you for reaching out. A Buildora Labs engineer will review your requirements and contact you within 24 hours.
                </p>
                <button 
                  className="btn btn-secondary mt-xl" 
                  onClick={() => setStatus('idle')}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {status === 'error' && (
                  <div style={{ 
                    padding: 'var(--spacing-4)', backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                    border: '1px solid var(--error-color)', borderRadius: 'var(--radius-md)', 
                    marginBottom: 'var(--spacing-6)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', color: 'var(--error-color)'
                  }}>
                    <AlertCircle size={20} />
                    <span style={{ fontSize: '0.875rem' }}>{errorMessage}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    disabled={status === 'submitting'}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    disabled={status === 'submitting'}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)' }}>
                  <div className="form-group">
                    <label htmlFor="projectType">Project Type</label>
                    <select 
                      id="projectType"
                      value={formData.projectType}
                      onChange={e => setFormData({...formData, projectType: e.target.value})}
                      disabled={status === 'submitting'}
                    >
                      <option value="website">Website</option>
                      <option value="webapp">Web Application</option>
                      <option value="mvp">MVP Development</option>
                      <option value="ai">AI Integration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="budget">Estimated Budget</label>
                    <select 
                      id="budget"
                      value={formData.budget}
                      onChange={e => setFormData({...formData, budget: e.target.value})}
                      disabled={status === 'submitting'}
                    >
                      <option value="">Select Budget...</option>
                      <option value="<5k">Under $5k</option>
                      <option value="5k-10k">$5k - $10k</option>
                      <option value="10k-25k">$10k - $25k</option>
                      <option value="25k+">$25k+</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Details</label>
                  <textarea 
                    id="message" 
                    required 
                    rows={4} 
                    placeholder="Tell us about your goals, timeline, and core features..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    disabled={status === 'submitting'}
                    style={{ resize: 'vertical' }}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="attachment" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '12px', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                    <Paperclip size={18} color="var(--text-secondary)" />
                    <span style={{ color: 'var(--text-secondary)' }}>{file ? file.name : 'Attach brief or specs (optional)'}</span>
                    <input 
                      type="file" 
                      id="attachment" 
                      onChange={e => setFile(e.target.files?.[0] || null)}
                      disabled={status === 'submitting'}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-full"
                  disabled={status === 'submitting'}
                  style={{ marginTop: 'var(--spacing-4)' }}
                >
                  {status === 'submitting' ? 'Submitting...' : (
                    <>Start Project <ArrowRight size={18} style={{ marginLeft: '8px' }} /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
      
      {/* Background glow */}
      <div style={{ 
        position: 'absolute', bottom: 0, right: 0, width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0
      }} />
    </section>
  );
}
