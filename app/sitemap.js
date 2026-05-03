export default function sitemap() {
  const baseUrl = 'https://www.claireworld.lol';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
