import React from 'react';
import App from './App';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import LocationDetail from '../Components/LocationDetail/LocationDetail'

test("renders without errors", () => {
  const tree = shallow(<App />);
  expect(toJson(tree)).toMatchSnapshot();
});

describe("form testing", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<App />)
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  test("render the text 'Enter a site issue:'", () => {
    expect(wrapper.find('h3').text()).toContain('Enter a site issue')
  })

  test("render button with text 'Enter new issue'", () => {
    expect(wrapper.find('.enter-issue-btn .MuiButton-label').text()).toBe("Enter new issue")
  })

})