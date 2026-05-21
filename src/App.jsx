import { useEffect, useState } from 'react';
import Header from './components/layout/Header.jsx';
import Background from './components/layout/Background.jsx';
import Footer from './components/layout/Footer.jsx';
import HomePage from './components/pages/HomePage.jsx';
import AboutPage from './components/pages/AboutPage.jsx';
import BlogPage from './components/pages/BlogPage.jsx';
import PostPage from './components/pages/PostPage.jsx';
import { projects, posts as localPosts, skills, socials } from './data/content.js';
import { fetchSanityPosts, isSanityConfigured } from './lib/sanity.js';

function routeFromPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] === 'blog' && parts.length > 1) return { page: 'post', activePost: parts.slice(1).join('/') };
  if (parts[0] === 'blog') return { page: 'blog', activePost: null };
  if (parts[0] === 'about') return { page: 'about', activePost: null };
  return { page: 'home', activePost: null };
}

function postPath(post) {
  if (!post.date) return `/blog/${post.slug}`;

  return `/blog/${post.date.replaceAll('-', '')}/${post.slug}`;
}

function postRouteId(post) {
  if (!post.date) return post.slug;

  return `${post.date.replaceAll('-', '')}/${post.slug}`;
}

export default function App() {
  const initialRoute = routeFromPath(window.location.pathname);
  const [page, setPageState] = useState(initialRoute.page);
  const [activePost, setActivePost] = useState(initialRoute.activePost);
  const [posts, setPosts] = useState(localPosts);

  useEffect(() => {
    const onPopState = () => {
      const nextRoute = routeFromPath(window.location.pathname);
      setPageState(nextRoute.page);
      setActivePost(nextRoute.activePost);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (!isSanityConfigured) return;

    let isMounted = true;

    fetchSanityPosts()
      .then((nextPosts) => {
        if (isMounted && nextPosts.length > 0) {
          setPosts(nextPosts);
        }
      })
      .catch((error) => {
        console.error('Failed to load Sanity posts, using local fallback.', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const setPage = (nextPage) => {
    setPageState(nextPage);
    setActivePost(null);
    const nextPath = nextPage === 'home' ? '/' : `/${nextPage}`;
    window.history.pushState(null, '', nextPath);
  };

  const openPost = (post) => {
    setActivePost(postRouteId(post));
    setPageState('post');
    window.history.pushState(null, '', postPath(post));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPost = posts.find((post) => postRouteId(post) === activePost);

  return (
    <>
      <Background />
      <Header page={page} setPage={setPage} />
      {page === 'about' && <AboutPage socials={socials} />}
      {page === 'blog' && <BlogPage posts={posts} setActivePost={openPost} />}
      {page === 'post' && <PostPage post={currentPost} setPage={setPage} />}
      {page === 'home' && <HomePage setPage={setPage} projects={projects} skills={skills} />}
      <Footer socials={socials} />
    </>
  );
}
