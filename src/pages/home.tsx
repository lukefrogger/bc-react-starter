import * as React from "react";
import { Hero, HeroProps } from 'unsafe-bc-react-components';

const HERO: HeroProps = {
  headline: {
    text: "Headline in the Hero",
  },
  description: {
    text: "Very short description here now",
  },
  button: {
    text: "Main CTA",
  },
  images: [
    {
      src:
        'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&w=1350&q=80',
      alt: 'Woman Red',
    },
    {
      src:
        'https://images.unsplash.com/photo-1538331269258-6c97a6bdeae0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&w=1350&q=80',
      alt: 'Woman Orange',
    },
    {
      src:
        'https://images.unsplash.com/photo-1515600051222-a3c338ff16f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&w=1350&q=80',
      alt: 'Man White',
    },
  ],
}

const Home = () => {

  return (
    <div>
      <h2>Home</h2>
      <Hero {...HERO} />
    </div>
  );
};

export default Home;
