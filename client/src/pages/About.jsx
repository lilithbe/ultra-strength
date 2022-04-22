import React from 'react'
import AboutPanel from '../components/containers/AboutPanel'
import TrainerPanel from '../components/containers/TrainerPanel'
import PageHeader from '../layout/main/PageHeader'



const About = () => {
  return (
    <div>
      <PageHeader pageTitle='About as' breadcrumbList={[{ label: 'home', to: '/', isCurrent: false }, { label: 'about', to: '/about', isCurrent: true }]} />
      <AboutPanel />
      <TrainerPanel />
    </div>
  )
}

export default About