import React from 'react';
import PropTypes from 'prop-types';
import {v4 as uuid} from 'uuid'

const Abilities = ({ abilities }) => {
	return (
		<div className='card p-3'>
			<h5 className='card-title mx-auto'>Abilities</h5>
			<div className='container d-flex align-items-center text-capitalize'>
				{abilities.map(ability => {
					return (
						<span
							key={uuid()}
							className='btn btn btn-primary mx-auto'
						>
							{ability.ability.name}
						</span>
					);
				})}
			</div>
		</div>
	);
};

Abilities.propTypes = {
	abilities: PropTypes.array.isRequired
};

export default Abilities;