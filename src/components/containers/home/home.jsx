import React, { useState, useEffect } from 'react';
import { Header } from '../../../common/header';
import { Footer } from '../../../common/footer';
import Image from '../../../assets/images/bag.png';
import { getIdByLocalization } from '../../../config/grapqh-queries'
import { useQuery } from '@apollo/react-hooks';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { withRouter } from 'react-router-dom';
import './home.css'

let date = new Date();

export const Home = (props) => {
    const [address, setAddress] = useState('')
    const [id, SetID] = useState('')
    const [geo, setGeo] = useState([])
    let geodata = []
    let data
    useEffect(() => {
        if (geodata.lat) {
            setGeo(geodata);
        }
        if (data.data !== undefined) {
            SetID(data.data.pocSearch[0].id)
        }
    }, [geodata, data])
    const handleClick = () => {
        setGeo(geodata)
        if (id !== '') {
            props.history.push({
                pathname: '/products',
                state: `${id}`,
            })
        }
    }
    data = useQuery(
        getIdByLocalization, {
            variables: {
                algorithm: "NEAREST",
                lat: geo.lat,
                long: geo.lng,
                now: date.toISOString()
            }
        }
    );
    const handleChange = (address) => {
        setGeo(geodata)
        setAddress(address);
    };

    const handleSelect = (address) => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                geodata = latLng
                setGeo(geodata)
            }).catch(error =>
                console.error('Error', error
                ));
    };
    return (
        <div className="container">
            <Header />
            <div style={{ backgroundImage: `url(${Image})` }} className="main">
                <PlacesAutocomplete
                    value={address}
                    onChange={handleChange}
                    onSelect={handleSelect}
                    googleCallbackName="initPlacesAutocomplete"
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <h1 className="title"> Seu delivery de bebidas geladas a preço baixo</h1>
                            <input className="address-input"
                                {...getInputProps({
                                    placeholder: 'Write your address...',
                                })}
                            />
                            <button className="button-styles" onClick={handleClick}> SEARCH </button>
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', fontFamily: "Robotica", cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span className="suggestion" onClick={() =>setAddress(suggestion.description) }>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            </div>
            <Footer/>
        </div>
    )
}

export default withRouter(Home);
