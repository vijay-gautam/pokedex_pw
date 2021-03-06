import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Spinner from '../../layout/Spinner';
import { parseId } from '../../HelpFuncs';
import {v4 as uuid} from 'uuid'
const EvolutionChain = ({ evolutionURL }) => {
	const [evolutionChain, setevolutionChain] = useState(null);
	const getEvolutionChain = async evolutionURL => {
		const res = await axios.get(evolutionURL);
		const data = await res.data;
		setevolutionChain(data);
	};
	useEffect(() => {
		getEvolutionChain(evolutionURL);
	}, [evolutionURL]);
	if (evolutionChain === null) {
		return <Spinner />;
	} else {
		const { chain } = evolutionChain;
		const firstGen = chain;
		let Generation = [firstGen];
		if (Generation[0].evolves_to.length !== 0) {
			Generation[0].evolves_to.forEach(evol => {
				Generation.push(evol);
			});
			if (Generation[1].evolves_to.length !== 0) {
				Generation[1].evolves_to.forEach(evol => {
					Generation.push(evol);
				});
			}
		}

		return (
			<Fragment>
				<h5
					className='text-center p-3'
					style={{
						backgroundColor: '#3B4CCA',
						color: '#fff',
						margin: '0'
					}}
				>
					Evolution
				</h5>
				<div className='card-group p-4'>
					{Generation.map(gen => {
						const { name, url } = gen.species;
						return (
							<div
								className='card rounded-circle align-items-center  my-4 mx-auto'
								style={cardStyle}
								key={uuid()}
							>
								<img
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseId(
										url
									)}.png`}
									className='card-img-top pokeimg '
									alt={name}
								/>
								<Link
									to={`/pokemon/${parseId(url)}`}
									className='card-title h4 text-capitalize'
								>
									{name}
								</Link>
							</div>
						);
					})}
				</div>
			</Fragment>
		);
	}
};
const cardStyle = {
	width: '160px',
	height: '160px',
	maxWidth: '160px',
	maxHeight: '160px'
};
EvolutionChain.propTypes = {
	evolutionURL: PropTypes.string.isRequired
};

export default EvolutionChain;