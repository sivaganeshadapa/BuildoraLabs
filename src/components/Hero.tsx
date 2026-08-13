export default function Hero() {
  return (
    <section className="section text-center animate-fade-up">
      <h1 className="display" style={{ marginBottom: 'var(--spacing-6)', maxWidth: '900px', margin: '0 auto var(--spacing-6)' }}>
        We Turn Ideas Into Working Digital Products.
      </h1>
      <p className="text-body-lg" style={{ margin: '0 auto var(--spacing-10)', maxWidth: '800px' }}>
        Websites, web applications, MVPs, prototypes and business systems — designed, developed, deployed and supported by an engineering-focused development studio.
      </p>
      
      <div className="hero-buttons" style={{ display: 'flex', gap: 'var(--spacing-4)', justifyContent: 'center', marginBottom: 'var(--spacing-12)' }}>
        <a href="#contact" className="btn btn-primary">
          Start Your Project
        </a>
        <a href="#work" className="btn btn-secondary">
          View Our Work
        </a>
      </div>
      
      <p className="text-body-sm" style={{ color: 'var(--text-tertiary)', maxWidth: '500px', margin: '0 auto' }}>
        From concept to production — design, development, deployment, security and ongoing support.
      </p>

      <style>{`
        .hero-buttons {
          flex-direction: column;
        }
        .hero-buttons .btn {
          width: 100%;
        }
        @media (min-width: 640px) {
          .hero-buttons {
            flex-direction: row;
          }
          .hero-buttons .btn {
            width: auto;
            min-width: 200px;
          }
        }
      `}</style>
    </section>
  );
}
