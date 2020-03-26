import React from 'react';
import ContentLoader from 'react-content-loader';
// import { Container } from './styles';

export default function TableLoading() {
  return (
    <ContentLoader
      speed={3}
      viewBox="0 0 400 140"
      backgroundColor="#eaeaea"
      foregroundColor="#d7d3d3"
    >
      <rect x="136" y="99" rx="0" ry="0" width="2" height="2" />
      <rect x="4" y="88" rx="4" ry="4" width="386" height="20" /> {/** 3 */}
      <rect x="4" y="116" rx="4" ry="4" width="386" height="20" /> {/** 4 */}
      <rect x="2" y="10" rx="4" ry="4" width="52" height="9" />
      <rect x="4" y="60" rx="4" ry="4" width="386" height="20" /> {/** 2 */}
      <rect x="4" y="31" rx="4" ry="4" width="386" height="20" /> {/** 1 */}
      <rect x="62" y="10" rx="4" ry="4" width="52" height="9" />
      <rect x="123" y="10" rx="4" ry="4" width="52" height="9" />
      <rect x="183" y="10" rx="4" ry="4" width="52" height="9" />
      <rect x="243" y="10" rx="4" ry="4" width="52" height="9" />
      <rect x="303" y="10" rx="4" ry="4" width="52" height="9" />
      {/* <rect x="336" y="145" rx="4" ry="4" width="52" height="10" />
      <rect x="8" y="145" rx="4" ry="4" width="52" height="10" /> */}
    </ContentLoader>
  );
}
