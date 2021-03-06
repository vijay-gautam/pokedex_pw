import React, { Component, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {v4 as uuid} from 'uuid'
import {
	getPokemonDetail,
	getPokemonSpecies,
	clearCurrent
} from '../../actions/pokemonAction';
import { parseId } from '../HelpFuncs';
import Spinner from '../layout/Spinner';
import Types from './PokemonDetail/Types';
import Stats from './PokemonDetail/Stats';
import Abilities from './PokemonDetail/Abilities';
import Bio from './PokemonDetail/Bio';
import Moves from './PokemonDetail/Moves';
import Varieties from './PokemonDetail/Varieties';
import EvolutionChain from './PokemonDetail/EvolutionChain';

const PokemonDetail = ({ clearCurrent, getPokemonDetail, pokemons, match }) => {
	const PokeId = Number(match.params.id);
	useEffect(() => {
		clearCurrent();
		getPokemonDetail(PokeId);
	}, [match]);
	const nextPokemon = () => {
		clearCurrent();
		getPokemonDetail(match.params.id + 1);
	};
	const prevPokemon = () => {
		clearCurrent();
		getPokemonDetail(match.params.id - 1);
	};
	const { loading, current_pokemon, current_pokemon_species } = pokemons;
	if (
		current_pokemon === null ||
		current_pokemon_species === null ||
		loading
	) {
		return <Spinner />;
	}
	const {
		id,
		name,
		types,
		stats,
		height,
		weight,
		abilities,
		moves
	} = current_pokemon;
	const {
		flavor_text_entries,
		capture_rate,
		gender_rate,
		varieties,
		evolution_chain
	} = current_pokemon_species;
	const bio = { height, weight, capture_rate, gender_rate };
	return (
		<Fragment>
			<div
				id='carouselExampleControls'
				className='carousel slide'
				data-ride='carousel'
			>
				<div className='card align-items-center'>
					<Varieties varieties={varieties} />

					<img
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
						onError={e => {
							e.target.onerror = null;
							e.target.src =
								'https://ih1.redbubble.net/image.731955024.9007/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg';
						}}
						alt={name}
						className='card-img-top pokeimg'
					/>
					<div className='card-body'>
						<h1 className='card-title text-center text-capitalize'>
							{name}
						</h1>
						<p className='card-text poke-desc'>
							{flavor_text_entries[1].language.name === 'en'
								? flavor_text_entries[1].flavor_text
								: flavor_text_entries[2].flavor_text}
						</p>
					</div>
				</div>
				<Link
					className='carousel-control-prev'
					style={{ color: '#030e12', fontSize: '2rem' }}
					to={`/pokemon/${PokeId - 1}`}
					role='button'
					data-slide='prev'
				>
					<i className='fas fa-chevron-left'></i>
				</Link>
				<Link
					className='carousel-control-next'
					style={{ color: '#030e12', fontSize: '2rem' }}
					to={`/pokemon/${PokeId + 1}`}
					role='button'
					data-slide='next'
				>
					<i className='fas fa-chevron-right'></i>
				</Link>
			</div>
			<EvolutionChain evolutionURL={evolution_chain.url} />
			<Abilities key={uuid()} abilities={abilities} />
			<Bio key={uuid()} bio={bio} />
			<Types key={uuid()} types={types} />
			<Stats key={uuid()} stats={stats} />
			<Moves key={uuid()} moves={moves} />
		</Fragment>
	);
};

PokemonDetail.propTypes = {
	pokemons: PropTypes.object.isRequired,
	getPokemonDetail: PropTypes.func.isRequired,
	getPokemonSpecies: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	pokemons: state.pokemons
});
export default connect(
	mapStateToProps,
	{ getPokemonDetail, getPokemonSpecies, clearCurrent }
)(PokemonDetail);