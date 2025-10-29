import React from 'react';
import { Outlet } from 'react-router-dom';

export default function PortfolioLayout() {
  return (
    <section className="portfolio-layout">
      <Outlet />
    </section>
  );
}
