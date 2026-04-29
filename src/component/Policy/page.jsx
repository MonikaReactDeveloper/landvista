import React from 'react'
import Navbar from '../homePage/navbar'
import Footer from '../homePage/footer'
import PolicyHero from './Hero'
import ZoneSelector from './ZoneSelector'
import ZoneOverview from './ZoneOverview'
import SectorMapping from './SectorMapping'
import SignalsEngine from './SignalsEngine'
import IntelligenceFilters from './Filter'


const PolicyPage = () => {
  return (
   <>
   <Navbar/>
   <PolicyHero/>
   <ZoneSelector/>
   <ZoneOverview/>
   <SectorMapping/>
   <SignalsEngine/>
<IntelligenceFilters/>
   <Footer/>
   </>
  )
}

export default PolicyPage