import React from "react";
import { Link } from 'react-router-dom'
// components
import Hero from '../components/Hero';

export default function Home() {
  return <>
    <Hero>
      <Link to="/products" className="btn btn-primary btn-heror">
        Our products
      </Link>
    </Hero>

  </>
}
