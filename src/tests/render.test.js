import { shallow,configure } from "enzyme";
import React from "react";
import { ProductsShow } from "../components";

it("should render product",()=>{
   const componentRender = shallow(<ProductsShow/>)
   const wrapper =  componentRender.find(".wrapper-products");
   expect(wrapper.length).toBe(1);
})