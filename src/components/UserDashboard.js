import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [flights, setFlights] = useState([]);
    const [searchCity, setSearchCity] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchFlightsByUserCity = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/flights/departure', {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                setFlights(response.data);
            } catch (error) {
                console.error("Kullanıcı şehri uçuşlarını alırken hata:", error);
                setErrorMessage('Kullanıcının şehrine ait uçuşları yüklerken bir hata oluştu.');
            }
        };

        fetchFlightsByUserCity();
    }, []);
    const searchFlights = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/flights/departure?departureCity=${searchCity}`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            setFlights(response.data);
        } catch (error) {
            console.error("Arama sonuçlarını alırken hata:", error);
            setErrorMessage('Uçuş araması yaparken bir hata oluştu.');
        }
    };

    return (
        <div>
            <h2>User Dashboard</h2>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div>
                <h3>Kullanıcının Şehrine Göre Kalkış Yapan Uçuşlar</h3>
                <ul>
                    {flights.length > 0 ? (
                        flights.map((flight, index) => (
                            <li key={index}>
                                <strong>{flight.departureCity} - {flight.arrivalCity}</strong><br />
                                Kalkış: {new Date(flight.departureTime).toLocaleString()}<br />
                                Varış: {new Date(flight.arrivalTime).toLocaleString()}<br />
                                Uçuş Kodu: {flight.flightCode}
                            </li>
                        ))
                    ) : (
                        <p>Bu şehirde kalkış yapan uçuş bulunamadı.</p>
                    )}
                </ul>
            </div>
            <div>
                <h3>Şehir İsmine Göre Uçuş Arama</h3>
                <form onSubmit={searchFlights}>
                    <label htmlFor="searchCity">Kalkış Şehri:</label>
                    <input
                        type="text"
                        id="searchCity"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        placeholder="Şehir adı girin"
                        required
                    />
                    <button type="submit">Uçuş Ara</button>
                </form>
            </div>
        </div>
    );
};

export default UserDashboard;


