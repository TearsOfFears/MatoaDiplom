
import React from 'react';
import {Swiper1,Header,OurProducts,MonthyDeals,News,LinesBg,LinesBottom, Series} from "./components"
import 'animate';

function App() {
  return (
    <div className="App">
      <Header/>
      <Swiper1/>
      <OurProducts/>
      <MonthyDeals/>
     
      <section class="news">
      <LinesBg/>
      <News/>
      <LinesBottom/>
      </section>
      <Series/>
    </div>
  );
}

export default App;
