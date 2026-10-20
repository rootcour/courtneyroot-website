import rss from '@astrojs/rss';
import { getLivePosts } from '../lib/posts';
import { SITE } from '../site';

export async function GET(context) {
  const posts = await getLivePosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/writing/${p.id}/`,
    })),
  });
}
