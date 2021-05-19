import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow, mount } from "enzyme";
// import toJson from "enzyme-to-json";

it("renders without errors", () => {
  shallow(<App />);
});
