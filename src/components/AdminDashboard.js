import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CustomDatePicker from './CustomDatePicker';
import Dropdown from '../components/Dropdown';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminDashboard.css';

function AdminDashboard() {
    const [flights, setFlights] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newFlight, setNewFlight] = useState({
        flightCode: '',
        departureCity: '',
        arrivalCity: '',
        departureTime: null,
        arrivalTime: null
    });
    const [departureDate, setDepartureDate] = useState(null);
    const [arrivalDate, setArrivalDate] = useState(null);

    const token = localStorage.getItem('token');

    const [cities, setCities] = useState([]);
    const [airports, setAirports] = useState([]);

    const [selectedDepartureCity, setSelectedDepartureCity] = useState('');

    const handleDepartureCitySelect = (city) => {
        setSelectedDepartureCity(city);
        setNewFlight({...newFlight, departureCity: city})
    };

    const [selectedArrivalCity, setSelectedArrivalCity] = useState('');

    const handleArrivalCitySelect = (city) => {
        setSelectedArrivalCity(city);
        setNewFlight({...newFlight, arrivalCity: city})
    };


    useEffect(() => {
        fetchFlights();
        fetchCities();
    }, []);

    const fetchCities = async () => {
        axios.get('http://localhost:8080/api/cities')
            .then((response) => {
                setCities(response.data.map(item => item.cityName));
                setAirports(response.data);
            })
            .catch((error) => {
                console.error('Error fetching cities:', error);
            });
    }
    const fetchFlights = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/flights', {
                headers: {
                    Authorization: `${token}`
                }
            });
            setFlights(response.data);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    };

    const handleAddFlight = async (e) => {
        e.preventDefault();
        try {
            const airportDeparture = airports.find(airport => airport.cityName === selectedDepartureCity);
            const airportArrival = airports.find(airport => airport.cityName === selectedArrivalCity);
            const flightData = {
                flightCode: newFlight.flightCode,
                departureCity: newFlight.departureCity,
                arrivalCity: newFlight.arrivalCity,
                departureAirportCode: airportDeparture.airportCode,
                arrivalAirportCode: airportArrival.airportCode,
                departureTime: departureDate.toISOString(),
                arrivalTime: arrivalDate.toISOString()
            };

            await axios.post('http://localhost:8080/api/flights', flightData, {
                headers: {
                    Authorization: `${token}`
                }
            });
            fetchFlights();
            toast.success('Uçuş başarıyla eklendi!', {
                position: 'top-right'
            });
            setShowModal(false);
            setNewFlight({flightCode: '', departureCity: '', arrivalCity: '', departureTime: null, arrivalTime: null});
            setDepartureDate(null);
            setArrivalDate(null);
        } catch (error) {
            console.error('Error adding flight:', error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(`Uçuş eklenirken bir hata oluştu!: ${error.response.data.message}`, {
                    position: 'top-right'
                });
            } else {
                toast.error('Uçuş eklenirken bir hata oluştu!', {
                    position: 'top-right'
                });
            }
        }
    };

    return (
        <div>
            <ToastContainer /> {}
            <h2>Admin Dashboard</h2>
            <p>Welcome, Admin! You have full access.</p>

            <button onClick={() => {
                console.log('Butona tıklandı!');
                setShowModal(true);
            }}>
                Yeni Uçuş Ekle
            </button>

            <h3>Mevcut Uçuşlar</h3>
            <ul>
                {flights.map((flight) => (
                    <li key={flight.flightCode}>
                        {flight.flightCode} - {flight.departureCity} ➔ {flight.arrivalCity} ({flight.departureTime} - {flight.arrivalTime})
                    </li>
                ))}
            </ul>

            {showModal && (
                <div className="modals">
                    <div className="modal-contents">
                        <h3>Yeni Uçuş Ekle</h3>
                        <form onSubmit={handleAddFlight}>

                            <div>
                                <label>Uçuş Kodu:</label>
                                <input
                                    type="text"
                                    value={newFlight.flightCode}
                                    onChange={(e) => setNewFlight({...newFlight, flightCode: e.target.value})}
                                    required
                                />
                            </div>
                            <Dropdown
                                label="Kalkış Şehri:"
                                options={cities}
                                selected={selectedDepartureCity}
                                onSelect={handleDepartureCitySelect}
                            />
                            <Dropdown
                                label="Varış Şehri:"
                                options={cities}
                                selected={selectedArrivalCity}
                                onSelect={handleArrivalCitySelect}
                            />
                            <div>
                                <label>Kalkış Zamanı:</label>
                                <CustomDatePicker selected={departureDate} onChange={setDepartureDate}/>
                            </div>
                            <div>
                                <label>Varış Zamanı:</label>
                                <CustomDatePicker selected={arrivalDate} onChange={setArrivalDate}/>
                            </div>
                            <button className="buttons" type="submit">Uçuş Ekle</button>
                            <button className="buttons" type="button" onClick={() => setShowModal(false)}>İptal</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
