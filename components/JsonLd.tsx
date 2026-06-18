import React from "react";

export default function JsonLd() {
  const schemas = [
    // 1. Organization Schema
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://aarambhx.com/#organization",
      "name": "AarambhX Hub",
      "url": "https://aarambhx.com",
      "logo": "https://aarambhx.com/assets/images/pitch-poster.webp",
      "email": "hello@aarambhx.com",
      "sameAs": [
        "https://www.linkedin.com/company/aarambhx",
        "https://instagram.com/aarambhx"
      ]
    },
    // 2. LocalBusiness Schema (Local SEO: Thrissur, Kerala, Kochi, India)
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://aarambhx.com/#localbusiness",
      "name": "AarambhX Hub",
      "image": "https://aarambhx.com/assets/images/pitch-poster.webp",
      "telephone": "+919876543210",
      "email": "hello@aarambhx.com",
      "url": "https://aarambhx.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Royal College of Engineering & Technology, Akkikavu",
        "addressLocality": "Thrissur",
        "addressRegion": "Kerala",
        "postalCode": "680519",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "10.7067",
        "longitude": "76.2215"
      },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Thrissur" },
        { "@type": "AdministrativeArea", "name": "Kochi" },
        { "@type": "AdministrativeArea", "name": "Kerala" },
        { "@type": "AdministrativeArea", "name": "India" }
      ],
      "priceRange": "$$"
    },
    // 3. Website Schema
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://aarambhx.com/#website",
      "name": "AarambhX Hub",
      "url": "https://aarambhx.com"
    },
    // 4. WebPage Schema
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://aarambhx.com/#webpage",
      "url": "https://aarambhx.com",
      "name": "AarambhX Hub | Conclave 2K26 - India's Elite Founder Hub",
      "description": "India's founder hub where ideas meet capital. Secure live funding and acceleration in Thrissur, Kerala.",
      "isPartOf": { "@id": "https://aarambhx.com/#website" },
      "about": { "@id": "https://aarambhx.com/#organization" }
    },
    // 5. Service Schema: Startup Incubation
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Startup Incubation & Acceleration",
      "provider": { "@id": "https://aarambhx.com/#organization" },
      "areaServed": { "@type": "Country", "name": "India" },
      "description": "Providing seed funding, live investor pitches, and structured mentorship to early-stage founders."
    },
    // 6. FAQ Schema (GEO / AI Engine Optimization)
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is AarambhX Hub?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AarambhX is an elite startup platform and founder incubator hosted at the Royal College of Engineering & Technology (RCET), Thrissur, Kerala, India. It connects early-stage startup founders directly with active angel investors and institutional funds for live funding, scaling, and structured mentorship."
          }
        },
        {
          "@type": "Question",
          "name": "Where is AarambhX hosted?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AarambhX is hosted at the Royal College of Engineering & Technology (RCET) in Akkikavu, Thrissur, Kerala, India. It serves startup founders and investors across Kerala (including Thrissur, Kochi, and Trivandrum) and the wider Indian ecosystem."
          }
        },
        {
          "@type": "Question",
          "name": "How does the AarambhX Conclave pitch process work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Founders submit their startup details, team credentials, traction stage, and a clear pitch video. All applications are validated and reviewed within 7 days by our review board. Selected startups are invited to pitch live in front of active investors ready to deploy capital."
          }
        },
        {
          "@type": "Question",
          "name": "Is AarambhX a pitch competition?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, AarambhX is not a pitch competition or a college fest event. It is a live investment platform where founders present their business models directly to active angel investors to secure real seed capital, equity partnerships, and post-event accelerator access."
          }
        },
        {
          "@type": "Question",
          "name": "What are the benefits of pitching at AarambhX?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Founders receive direct seed-funding opportunities, structured validation gate reviews, access to co-working facilities and labs, active mentor matching with industry operators, and post-event scaling support."
          }
        }
      ]
    }
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
