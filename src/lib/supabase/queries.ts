import { supabase } from './client';
import type { Database } from './types';

type Project = Database['public']['Tables']['projects']['Row'];
type Service = Database['public']['Tables']['services']['Row'];
type Testimonial = Database['public']['Tables']['testimonials']['Row'];
type FAQ = Database['public']['Tables']['faq']['Row'];
type LeadInsert = Database['public']['Tables']['leads']['Insert'];

export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('year', { ascending: false });

  if (error) throw error;
  return data as Project[];
}

export async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('year', { ascending: false });

  if (error) throw error;
  return data as Project[];
}

export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data as Service[];
}

export async function getTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_verified', true)
    .eq('is_published', true);

  if (error) throw error;
  return data as Testimonial[];
}

export async function getFAQs() {
  const { data, error } = await supabase
    .from('faq')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data as FAQ[];
}

export async function submitLead(lead: LeadInsert) {
  const { data, error } = await supabase
    .from('leads')
    .insert([lead] as any)
    .select();

  if (error) throw error;
  return data;
}

export async function uploadAttachment(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('lead_attachments')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('lead_attachments')
    .getPublicUrl(filePath);

  return data.publicUrl;
}
