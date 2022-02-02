
import React from 'react';
import {Swiper1,Header,OurProducts,MonthyDeals,News,LinesBg,LinesBottom, Series1, Testimonals, TestimonalsLines, InstagramPosts, Bils } from "./components"
import 'animate';

function App() {
  return (
    <div className="App">
      <Header/>
      <Swiper1/>
      <OurProducts/>
      <MonthyDeals/>
      <section className="news">
      <LinesBg/>
      <News/>
      <LinesBottom/>
      </section>
      <Series1/>
      <section className="testimonals">
      <TestimonalsLines/>
      <Testimonals/>
      </section>
      <InstagramPosts/>
      <Bils/>
    </div>
  );
}

export default App;
