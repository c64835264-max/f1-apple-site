import { getLatestNews } from "@/lib/fetchF1Data";

interface Props {
  teamName: string;
}
export async function NewsFeed({ teamName }: Props) {
  const news = await getLatestNews(teamName);

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-4">Latest News</h2>
      {news.length === 0 ? (
        <p className="text-sm italic">
          No news available. (Add a NewsAPI key or replace the fetcher in
          lib/fetchF1Data.ts to see real articles.)
        </p>
      ) : (
        <div className="space-y-4">
          {news.map((article) => (
            <div key={article.url} className="glass-panel p-4">
              <h3 className="font-semibold">{article.title}</h3>
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
              )}
              <p className="text-sm text-muted-foreground">
                {article.source.name} •{" "}
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
              <p className="mt-1 line-clamp-2">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-primary hover:underline"
              >
                Read full article
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}


