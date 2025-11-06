import React from 'react';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
// import styles from './index.modules.css';
import Translate from '@docusaurus/Translate';

const projects = [
  {
    name: 'Alby Hub',
    url: 'https://github.com/getAlby/hub',
    logo: {
      light: '/img/AlbyDark.png',
      dark: '/img/AlbyLight.png',
    },
    description: 
        <Translate id="examples.albyHub.description">
            Alby Hub is a self-hosted Bitcoin Lightning node designed to be easy, connectable, and feature-rich, enabling users to run their own node anywhere and become self-sovereign.
        </Translate>
  },
  {
    name: 'BTCPay Server',
    url: 'https://github.com/btcpayserver/btcpayserver',
    logo: {
      light: '/img/btcpay.png',
      dark: '/img/btcpay.png',
    },
    description: 
        <Translate id="examples.btcpayServer.description">
            BTCPay Server is a free, open-source, and self-hosted Bitcoin payment processor that enables direct, peer-to-peer Bitcoin payments without fees or intermediaries.
        </Translate>
  },
  {
    name: 'Ambrosia-POS',
    url: 'https://github.com/btcgdl/Ambrosia-POS',
    logo: {
      light: 'https://btcgdl.github.io/Ambrosia-POS/img/logo.svg',
      dark: 'https://btcgdl.github.io/Ambrosia-POS/img/logo.svg',
    },
    description: 
        <Translate id="examples.ambrosiaPOS.description">
            Ambrosia-POS is a lightweight point of sale (POS) system designed to optimize daily operations like order, table, and finance management, featuring a React and Electron frontend and a Kotlin backend.
        </Translate>
  }
];

function Examples() {
  return (
    <Layout title="Phoenixd Examples" description="Examples of projects using phoenixd">
      <div className="examplesContainer">
        <h1 className="title"><Translate id="whoIsUsingPhoenixd">Who is using phoenixd?</Translate></h1>
        <div className="grid">
          {projects.map((project, index) => (
            <div key={index} className="card">
              <div className="logoContainer">
                <ThemedImage
                  alt={`${project.name} logo`}
                  className="logo"
                  sources={{
                    light: useBaseUrl(project.logo.light),
                    dark: useBaseUrl(project.logo.dark),
                  }}
                />
              </div>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="link">
                {project.name}
              </a>
              <p className="description">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Examples;
