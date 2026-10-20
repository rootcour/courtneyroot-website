import { getCollection, type CollectionEntry } from 'astro:content';

// A post is live when it isn't a draft AND its date has arrived.
// Future-dated posts stay hidden until a rebuild on or after their date
// (the daily GitHub Action in .github/workflows/scheduled-publish.yml handles that).
export const isLive = (data: CollectionEntry<'posts'>['data'], now = new Date()) =>
  !data.draft && data.date.valueOf() <= now.valueOf();

export async function getLivePosts() {
  const now = new Date();
  return (await getCollection('posts', ({ data }) => isLive(data, now)))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
