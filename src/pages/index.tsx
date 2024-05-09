import React, { useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import Topography from '../js/ascii'

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  useEffect(() => {
    const topography = new Topography('ascii-background', 'Math.random()');

    let xOff = 0;
    let yOff = 0;
    let off = 900;

    topography.ascii(xOff,yOff);
    const container = document.querySelector('.headerContainer');

    let mouseX = 0;
    let mouseY = 0;
    let target;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      target = e.target;
    });

    const interval = setInterval(function() {
      let e = {clientX: mouseX, clientY: mouseY, target: target};

      if (container.contains(e.target)) {
        const centerX = container.offsetLeft + container.offsetWidth / 2;
        const centerY = container.offsetTop + container.offsetHeight / 2;
    
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        if (distanceX > 200) {
          xOff -= distanceX / off;
        }

        if (distanceX < -200) {
          xOff -= distanceX / off;
        }

        if (distanceY > 10) {
          yOff -= distanceY / off;
        }

        if (distanceY < -10) {
          yOff -= distanceY / off;
        }

        yOff = parseInt(yOff * 1000) / 1000;
        xOff = parseInt(xOff * 1000) / 1000;

        topography.ascii(xOff,yOff);
        console.log(xOff, yOff)
      }
    }, 50);

  }, []);

  return (
    <div className={clsx('headerContainer', styles.headerContainer)}>
      <div id='ascii-background' className={clsx('ascii', styles.ascii)}></div>
      <header className={clsx('header', styles.header)}>
      <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
      </header>
    </div>
  );
} 

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
