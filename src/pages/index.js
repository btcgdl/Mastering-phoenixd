import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.ctaButtons}>
          <Link
            className="button button--secondary button--lg"
            to="/Install">
            🚀 Start Tutorial
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/Flags"
            style={{marginLeft: '1rem', color: 'white', borderColor: 'white'}}>
            📖 View Guides
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureList() {
  const features = [
    {
      title: '📚 Complete Tutorial',
      description: 'Learn step by step how to install, configure and use Phoenixd to process Lightning payments.',
      icon: '📚'
    },
    {
      title: '🎯 Practical Examples',
      description: 'Detailed guides with real examples and use cases to implement in your projects.',
      icon: '🎯'
    },
    {
      title: '🔧 Advanced Configuration',
      description: 'Master all available options and flags to optimize your Phoenixd server.',
      icon: '🔧'
    }
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className="col col--4">
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.cta}>
          <h2>Ready to master Phoenixd?</h2>
          <p>
            This tutorial will guide you from basic installation to advanced configurations 
            so you can implement Lightning payments in your applications.
          </p>
          <div className={styles.ctaButtons}>
            <Link
              className="button button--primary button--lg"
              to="/Install">
              📖 Start Tutorial
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/Flags">
              ⚙️ View Configurations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className="row">
          <div className="col col--3">
            <div className={styles.stat}>
              <h3>📖</h3>
              <h4>Step-by-Step Tutorial</h4>
              <p>Detailed guides</p>
            </div>
          </div>
          <div className="col col--3">
            <div className={styles.stat}>
              <h3>💡</h3>
              <h4>Real Examples</h4>
              <p>Practical use cases</p>
            </div>
          </div>
          <div className="col col--3">
            <div className={styles.stat}>
              <h3>⚙️</h3>
              <h4>Configuration</h4>
              <p>All options</p>
            </div>
          </div>
          <div className="col col--3">
            <div className={styles.stat}>
              <h3>🌟</h3>
              <h4>Updated</h4>
              <p>Recent content</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Lightning Network Server`}
      description="Learn how to configure and use Phoenixd, the Bitcoin payments server through Lightning Network. Complete installation and usage guide.">
      <HomepageHeader />
      <main>
        <FeatureList />
        <StatsSection />
        <CallToAction />
      </main>
    </Layout>
  );
}
