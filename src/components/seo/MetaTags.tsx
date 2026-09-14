import React, { useEffect } from 'react';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title = 'BLACKTECHSEC — Personal Technology Hub | Jair Alexis Martinez',
  description = 'Espacio tecnológico personal de Jair Alexis Martinez. Explorando tecnología, inteligencia artificial, ciberseguridad y desarrollo backend.',
  image = 'https://www.blacktechsec.com/img/profile.jpg',
  url = window.location.href,
  type = 'website'
}) => {
  useEffect(() => {
    // Document Title
    document.title = title;

    // Helper to update meta tag content
    const updateMeta = (nameOrProperty: string, value: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
      let el = document.querySelector(selector) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) el.setAttribute('property', nameOrProperty);
        else el.setAttribute('name', nameOrProperty);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    updateMeta('description', description);
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', image, true);
    updateMeta('og:url', url, true);
    updateMeta('og:type', type, true);
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description, image, url, type]);

  return null;
};
