export default async (req, context) => {
  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const { name, email, projectType, budget, message, attachmentName, attachmentBase64 } = body;

    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'Name and email are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const DESTINATION_EMAIL = process.env.DESTINATION_EMAIL || 'flexconnect.in@gmail.com';

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #222; border-radius: 12px; background-color: #0d0d0d; color: #E1E0CC;">
        <div style="border-bottom: 1px solid #222; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #ffffff; margin: 0 0 6px 0; font-size: 22px;">New Project Lead Received</h2>
          <span style="font-size: 13px; color: #888;">SILAVA Digital Studio Inquiries</span>
        </div>
        <p style="margin: 8px 0;"><strong style="color: #fff;">Name:</strong> ${name}</p>
        <p style="margin: 8px 0;"><strong style="color: #fff;">Email:</strong> <a href="mailto:${email}" style="color: #4da6ff;">${email}</a></p>
        <p style="margin: 8px 0;"><strong style="color: #fff;">Project Type:</strong> ${projectType || 'Not specified'}</p>
        <p style="margin: 8px 0;"><strong style="color: #fff;">Estimated Budget:</strong> ${budget || 'Not specified'}</p>
        <div style="margin-top: 20px;">
          <strong style="color: #fff;">Project Details:</strong>
          <div style="background: #161616; padding: 14px; border-left: 3px solid #E1E0CC; margin-top: 8px; border-radius: 4px; white-space: pre-wrap; font-size: 14px; line-height: 1.5; color: #ddd;">
${message || 'No description provided.'}
          </div>
        </div>
        ${attachmentName ? `<p style="margin-top: 16px;"><strong style="color: #fff;">Attachment:</strong> ${attachmentName} (attached)</p>` : ''}
        <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #222; font-size: 12px; color: #666;">
          Delivered automatically from your website.
        </div>
      </div>
    `;

    if (RESEND_API_KEY) {
      const toEmails = DESTINATION_EMAIL.split(',').map(e => e.trim());
      const emailPayload = {
        from: 'SILAVA Studio <onboarding@resend.dev>',
        to: toEmails,
        reply_to: email,
        subject: `New Lead: ${name} (${projectType || 'Project Inquiry'})`,
        html: htmlContent,
      };

      if (attachmentName && attachmentBase64) {
        emailPayload.attachments = [
          {
            filename: attachmentName,
            content: attachmentBase64,
          }
        ];
      }

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify(emailPayload),
      });

      if (!res.ok) {
        const errorDetail = await res.text();
        console.error('Resend delivery failed:', errorDetail);
      }
    } else {
      console.warn('RESEND_API_KEY not found in environment');
    }

    return new Response(JSON.stringify({ success: true, message: 'Lead received successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error processing lead in Netlify function:', err);
    return new Response(JSON.stringify({ error: err.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
