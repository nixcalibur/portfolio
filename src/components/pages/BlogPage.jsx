function BlogPostRow({ post, setActivePost }) {
  return (
    <button className="blog-row" type="button" onClick={() => setActivePost(post)}>
      <span className="blog-date">{post.date || 'Draft'}</span>
      <span className="blog-title">{post.title}</span>
      <span className="blog-summary">{post.summary || 'No summary yet.'}</span>
    </button>
  );
}

export default function BlogPage({ posts, setActivePost }) {
  return (
    <main className="blog-page">
      <section className="blog-index" aria-labelledby="blog-title">
        <div className="blog-heading">
          <h1>shitloreposting</h1>
          <p>Engineering notes, project logs, and occasional structured nonsense.</p>
        </div>

        <div className="blog-list">
          {posts.length > 0 ? (
            posts.map((post) => <BlogPostRow key={post.slug} post={post} setActivePost={setActivePost} />)
          ) : (
            <p className="blog-empty">No posts found.</p>
          )}
        </div>
      </section>
    </main>
  );
}
