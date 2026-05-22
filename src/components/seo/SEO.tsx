interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: string;
}

export function SEO({ title, description, canonical, schema }: SEOProps) {
  const fullTitle = `${title} | WebAuthn & Web Crypto Showcase`;
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://SamyRai.github.io/web-crypto-auth-showcase/og-image.png" />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="1024" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://SamyRai.github.io/web-crypto-auth-showcase/og-image.png" />
      {canonical && <link rel="canonical" href={canonical} />}
      {schema && (
        <script type="application/ld+json">{schema}</script>
      )}
    </>
  );
}
