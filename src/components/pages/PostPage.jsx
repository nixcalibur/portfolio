import { PortableText } from '@portabletext/react';
import { urlFor } from '../../lib/sanity.js';

function ArticleBlock({ block }) {
  if (block.type === 'heading') return <h2>{block.text}</h2>;
  if (block.type === 'subheading') return <h3>{block.text}</h3>;
  if (block.type === 'quote') return <blockquote>{block.text}</blockquote>;
  if (block.type === 'code') return <pre><code>{block.text}</code></pre>;
  if (block.type === 'divider') return <hr />;
  if (block.type === 'placeholder') return <p className="article-placeholder">{block.text}</p>;

  if (block.type === 'image') {
    return (
      <figure className="article-image">
        <img src={block.src} alt={block.alt} />
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  }

  if (block.type === 'list') {
    return (
      <ul>
        {block.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  }

  return <p>{block.text}</p>;
}

const portableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value)?.width(1200).auto('format').url();
      if (!imageUrl) return null;

      return (
        <figure className="article-image">
          <img src={imageUrl} alt={value.alt || ''} />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
    code: ({ value }) => <pre><code>{value.code}</code></pre>,
  },
};

export default function PostPage({ post, setPage }) {
  if (!post) {
    return (
      <main className="blog-page">
        <article className="section-shell article-page">
          <button className="pixel-button" type="button" onClick={() => setPage('blog')}>Back to blog</button>
          <h1>Post not found</h1>
        </article>
      </main>
    );
  }

  return (
    <main className="blog-page">
      <article className="section-shell article-page">
        <button className="pixel-button" type="button" onClick={() => setPage('blog')}>Back to blog</button>
        <header className="article-header">
          <p className="eyebrow">{post.date || 'Draft'}</p>
          {post.tags.length > 0 && <h3 className="article-tags">{post.tags.join(', ')}</h3>}
          <h1>{post.title}</h1>
          {post.summary && <p>{post.summary}</p>}
        </header>
        {post.coverImage && (
          <figure className="article-image">
            <img src={urlFor(post.coverImage)?.width(1200).auto('format').url()} alt={post.coverImage.alt || post.title} />
            {post.coverImage.caption && <figcaption>{post.coverImage.caption}</figcaption>}
          </figure>
        )}
        <div className="article-content">
          {post.body ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : post.content?.length > 0 ? (
            post.content.map((block, index) => <ArticleBlock key={`${block.type}-${index}`} block={block} />)
          ) : (
            <p className="article-placeholder">No post content yet. Add a body in Sanity Studio and publish it.</p>
          )}
        </div>
      </article>
    </main>
  );
}
