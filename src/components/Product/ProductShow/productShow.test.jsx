import React from "react";
import { ProductsShow } from "./ProductsShow";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
test("should render product", () => {
	render(<ProductsShow />);
	const elem = screen.getByText("В наявності");
	expect(elem).toBeInTheDocument();
});
