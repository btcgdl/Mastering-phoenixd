import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import Translate from '@docusaurus/Translate';

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
            to="/Script">
            <Translate id="homepage.startTutorial">🚀 Start Tutorial</Translate>
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/Install"
            style={{marginLeft: '1rem', color: 'white', borderColor: 'white'}}>
            <Translate id="homepage.viewGuides">📖 View Guides</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureList() {
  const features = [
    {
      title: <Translate id="features.completeTutorial.title"> 📚 Complete Tutorial </Translate>,
      description: <Translate id="features.completeTutorial.description"> Learn step by step how to install, configure and use Phoenixd to process Lightning payments. </Translate>,
      icon: '📚'
    },
    {
      title: <Translate id="features.practicalExamples.title"> 🎯 Practical Examples </Translate>,
      description: <Translate id="features.practicalExamples.description"> Detailed guides with real examples and use cases to implement in your projects.</Translate>,
      icon: '🎯'
    },
    {
      title: <Translate id="features.advancedConfiguration.title"> 🔧 Advanced Configuration </Translate>,
      description: <Translate id="features.advancedConfiguration.description"> Master all available options and flags to optimize your Phoenixd server. </Translate>,
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
          <h2><Translate id="cta.title">Ready to master Phoenixd?</Translate></h2>
          <p>
            <Translate id="cta.description">
              This tutorial will guide you from basic installation to advanced configurations 
              so you can implement Lightning payments in your applications.
            </Translate>
          </p>
          <div className={styles.ctaButtons}>
            <Link
              className="button button--primary button--lg"
              to="/Script">
              <Translate id="cta.startTutorial">📖 Start Tutorial</Translate>
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/Config">
              <Translate id="cta.viewConfigurations">⚙️ View Configurations</Translate>
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
              <h4><Translate id="stats.stepByStep.title">Step-by-Step Tutorial</Translate></h4>
              <p><Translate id="stats.stepByStep.description">Detailed guides</Translate></p>
            </div>
          </div>
          <div className="col col--3">
            <div className={styles.stat}>
              <h3>💡</h3>
              <h4><Translate id="stats.realExamples.title">Real Examples</Translate></h4>
              <p><Translate id="stats.realExamples.description">Practical use cases</Translate></p>
            </div>
          </div>
          <div className="col col--3">
            <div className={styles.stat}>
              <h3>⚙️</h3>
              <h4><Translate id="stats.configuration.title">Configuration</Translate></h4>
              <p><Translate id="stats.configuration.description">All options</Translate></p>
            </div>
          </div>
          <div className="col col--3">
            <div className={styles.stat}>
              <h3>🌟</h3>
              <h4><Translate id="stats.updated.title">Updated</Translate></h4>
              <p><Translate id="stats.updated.description">Recent content</Translate></p>
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
