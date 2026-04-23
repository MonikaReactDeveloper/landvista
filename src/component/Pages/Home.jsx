import React from 'react'
import Navbar from '../homePage/navbar'
import Hero from '../homePage/hero'
import WhatWeOffer from '../homePage/whatWeOffer'
import InsightsSection from '../homePage/insights'
import OurCommitment from '../homePage/ourCommitment'
import Newsletter from '../homePage/newsLetter'
import Footer from '../homePage/footer'
import TrustStrip from '../homePage/trustStrip'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <WhatWeOffer/>
    <TrustStrip/>
    <InsightsSection/>
      <Newsletter/>
    <OurCommitment/>
    <Footer/>
  
    </>
  )
}

export default Home