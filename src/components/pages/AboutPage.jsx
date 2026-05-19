import Icon from '../ui/Icon.jsx';

export default function AboutPage({ socials }) {
  return (
    <main className="about-page">
      <section className="about-layout" aria-labelledby="about-title">
        <div className="about-copy">
          <p className="eyebrow">About Me</p>
          <h1 id="about-title">Nik Nizmal Naem</h1>
          <p className="about-lede">Computer Science graduate focused on AI/ML, practical software, analytics, computer vision, and game-development experiments.</p>
          <p className="about-body">
            Head Specialist & Analyst in Remote Virtual Talent Management + Major Stock Shareholder <br />
            <span className="aside-text">(I watch Vtubers & bought their merch)</span> <br />
            Data Science & Analytics Professional Driving Insights in the Online Gaming Industry <br />
            <span className="aside-text">(I watch League of Legends Pro Play)</span>
          </p>
          <blockquote>
            If you ask me a question and I don't know the answer, I'm going to tell you that I don't know. But I know how to find the answer, and I will find the answer.
          </blockquote>
          <div className="hero-stats" aria-label="Quick facts">
          <span><strong>AI/ML</strong> enthusiast</span>
          <span><strong>Game dev</strong> curious</span>
          <span><strong>Minecraft</strong> veteran</span>
          </div>

          <div className="social-row">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target={social.href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer" aria-label={social.label}>
                <Icon name={social.icon} />
              </a>
            ))}
          </div>
        </div>
        <aside className="profile-card">
          <div className="profile-image">
            <img src="/images/me.png" alt="Nik Nizmal Naem" />
          </div>
          <div className="profile-identity">
            <h2>Nik Nizmal Naem</h2>
            <p>Computer Science graduate building AI/ML, vision, and practical software systems.</p>
          </div>

          <dl className="profile-facts" aria-label="Profile facts">
            <div><dt>Base</dt><dd>Kuala Lumpur</dd></div>
            <div><dt>Main stack</dt><dd>Python, React, ML</dd></div>
            <div><dt>Focus</dt><dd>AI, CV, backend</dd></div>
            <div><dt>Status</dt><dd className='profile-status'>Available</dd></div>
          </dl>

          <div className="profile-actions">
            <a href="mailto:niknizmal@yahoo.com">niknizmal@yahoo.com</a>
            <a href="https://github.com/nixcalibur" target="_blank" rel="noopener noreferrer">github.com/nixcalibur</a>
          </div>
        </aside>
      </section>
    </main>
  );
}
