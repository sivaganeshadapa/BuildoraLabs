import { useState } from 'react';
import type { FormEvent } from 'react';
import { submitLead, uploadAttachment } from '../lib/supabase/queries';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    
    // Basic validation
    const email = formData.get('email') as string;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    const file = formData.get('attachment') as File;
    
    try {
      let attachment_url = null;
      if (file && file.size > 0) {
        attachment_url = await uploadAttachment(file);
      }

      await submitLead({
        name: formData.get('name') as string,
        email,
        phone: formData.get('phone') as string,
        company: formData.get('company') as string,
        project_type: formData.get('project_type') as string,
        budget: formData.get('budget') as string,
        timeline: formData.get('timeline') as string,
        description: formData.get('description') as string,
        attachment_url,
      });

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      console.error(err);
      setError('We encountered an issue submitting your request. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="section bg-secondary">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="text-center mb-lg animate-fade-up">
          <h2>Tell Us What You Want to Build</h2>
          <p style={{ margin: '0 auto' }}>
            Whether you have a one-page business website, a startup concept, a marketplace idea, or a complete business platform in mind, let's discuss what it would take to build it.
          </p>
        </div>

        <div className="card animate-fade-up" style={{ animationDelay: '0.2s', padding: 'var(--spacing-6)' }}>
          {success ? (
            <div className="text-center" style={{ padding: 'var(--spacing-12) 0' }}>
              <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(74, 222, 128, 0.1)', color: 'var(--success-color)', marginBottom: 'var(--spacing-6)' }}>
                <CheckCircle size={32} />
              </div>
              <h3 style={{ color: 'var(--text-primary)' }}>Project request received.</h3>
              <p style={{ marginBottom: 'var(--spacing-8)' }}>Thank you for reaching out. Our engineering team will review your requirements and contact you shortly.</p>
              <button className="btn btn-secondary" onClick={() => setSuccess(false)}>
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', padding: 'var(--spacing-4)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--error-color)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <AlertCircle size={20} />
                  <span className="text-body-sm">{error}</span>
                </div>
              )}
              
              <div className="grid grid-cols-2">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input type="text" id="name" name="name" required disabled={loading} placeholder="Jane Doe" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required disabled={loading} placeholder="jane@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="form-group">
                  <label htmlFor="phone">Phone / WhatsApp</label>
                  <input type="tel" id="phone" name="phone" disabled={loading} placeholder="+1 (555) 000-0000" />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company / Project Name</label>
                  <input type="text" id="company" name="company" disabled={loading} placeholder="Acme Corp" />
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="form-group">
                  <label htmlFor="project_type">What are you looking to build?</label>
                  <select id="project_type" name="project_type" disabled={loading}>
                    <option value="Website">Website</option>
                    <option value="Web App">Web App</option>
                    <option value="MVP">MVP</option>
                    <option value="SaaS">SaaS</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Approximate Budget</label>
                  <select id="budget" name="budget" disabled={loading}>
                    <option value="Not sure yet">Not sure yet</option>
                    <option value="< $5k">&lt; $5k</option>
                    <option value="$5k - $10k">$5k - $10k</option>
                    <option value="$10k - $25k">$10k - $25k</option>
                    <option value="$25k+">$25k+</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="timeline">Desired Timeline</label>
                <select id="timeline" name="timeline" disabled={loading}>
                  <option value="As soon as possible">As soon as possible</option>
                  <option value="Within 1 month">Within 1 month</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3+ months">3+ months</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Project Details *</label>
                <textarea id="description" name="description" rows={5} required disabled={loading} placeholder="Tell us about the problem you want to solve or the product you want to build..."></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="attachment">Attach Requirements (Optional)</label>
                <input type="file" id="attachment" name="attachment" disabled={loading} style={{ padding: 'var(--spacing-2)', border: '1px dashed var(--border-color)', backgroundColor: 'transparent' }} />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 'var(--spacing-2)', marginBottom: 0 }}>PDF, DOCX, or ZIP files up to 10MB.</p>
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={loading} style={{ padding: 'var(--spacing-4)', marginTop: 'var(--spacing-4)' }}>
                {loading ? 'Submitting Request...' : (
                  <>Start a Conversation <ArrowRight size={18} style={{ marginLeft: 'var(--spacing-2)' }} /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
