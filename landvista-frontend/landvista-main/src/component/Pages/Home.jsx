import React from 'react'
import Navbar from '../homePage/navbar'
import Hero from '../homePage/hero'
import WhatWeOffer from '../homePage/whatWeOffer'
import InsightsSection from '../homePage/insights'
import OurCommitment from '../homePage/ourCommitment'
import Newsletter from '../homePage/newsLetter'
import TrustStrip from '../homePage/trustStrip'
import IntelligencePreview from '../homePage/intelligencePreview'
import HowItWorks from '../homePage/howItWorks'
import AccessQualification from '../homePage/accessQualification'
import GovernanceLayer from '../homePage/governanceLayer'

import Footer from '../homePage/footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustStrip />
      <WhatWeOffer />
      <InsightsSection />
      <Newsletter />
      <OurCommitment />
      <IntelligencePreview />
      <HowItWorks />
      <AccessQualification />
      <GovernanceLayer />

      <Footer />
    </>
  )
}

export default Home