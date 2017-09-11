import React from 'react';
import { shallow } from 'enzyme';

import App from '../src/components/App';

const { describe, it, expect } = global;

describe('<App />', () => {
	it('should shallow mount for testing', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.exists()).toBe(true);
	});

	it('should render a div with id \'app\'', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('#app')).toHaveLength(1);
	});
});
