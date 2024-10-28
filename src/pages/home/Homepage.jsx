import React from 'react'
import Homemain from '../../components/Homemain'
import Category from '../../components/Category/Category'
import HomePageProductCard from '../../components/HomePageProductCard/HomePageProductCard'
import Badges from '../../components/Badges/Badges'
import Testimonial from '../../components/Testimonial/Testimonial'
import Footer from '../../components/footer/Footer'

function Homepage() {
  return (
    <>
      <Homemain />
      <Category/>
      <HomePageProductCard/>
      <Badges/>
      <Testimonial/>
      <Footer/>
    </>
  )
}

export default Homepage
