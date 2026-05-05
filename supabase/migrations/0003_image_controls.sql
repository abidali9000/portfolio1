-- Per-image display controls. CSS object-position values are stored as
-- short keywords ("top", "center", "bottom-right"…) and translated to the
-- standard "x y" form at render time.

alter table public.projects
  add column if not exists cover_position text not null default 'center',
  add column if not exists cover_fit text not null default 'cover'
    check (cover_fit in ('cover','contain'));

alter table public.testimonials
  add column if not exists proof_image_position text not null default 'center';

alter table public.site_settings
  add column if not exists avatar_position text not null default 'center';
