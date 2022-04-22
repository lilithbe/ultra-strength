import React from 'react'
import MainCarousel from '../components/carousers/MainCarousel'
import Testimonial from '../components/carousers/Testimonial'
import AboutPanel from '../components/containers/AboutPanel'
import PricePanel from '../components/containers/PricePanel'
import ServicesPanel from '../components/containers/ServicesPanel'
import TrainerPanel from '../components/containers/TrainerPanel'
import WorkingTimePanel from '../components/containers/WorkingTimePanel'

const Main = () => {
    return (
        <div>
            <MainCarousel />
            <AboutPanel />
            <PricePanel />
            <TrainerPanel />
            <ServicesPanel/>
            <WorkingTimePanel />
            <Testimonial />
        </div>
    )
}

export default Main