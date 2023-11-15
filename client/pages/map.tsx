import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/map.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';
import Link from 'next/link';

interface Location {
    id: number;
    title: string;
    email: string;
    phonenumber: number;
    latitude: number;
    longitude: number;
}

const MapPage: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [locations, setLocations] = useState<Location[]>([]);
    const mapInitialized = useRef(false);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8080/getlocations")
                setLocations(response.data);
                console.log("Map data :", response.data)
            } catch (error) {
                console.error('Error fetching locations', error);
            }
        }

        fetchLocations();
    }, []);

    useEffect(() => {
        if (!mapInitialized.current && locations.length > 0) {
            initMap();
        }
    }, [locations]);

    const initMap = async () => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
            version: 'weekly'
        });

        const { Map } = await loader.importLibrary('maps'); // Load the Google Maps library

        const position = {
            lat: -34.01495527459394,
            lng: 18.46961941122403
        }

        // Map options
        const mapOptions: google.maps.MapOptions = {
            center: position,
            zoom: 15,
            mapId: 'MY_NEXT_JS_MAPID'
        };

        const infoWindow = new google.maps.InfoWindow({
            ariaLabel: "Plumstead"
        });

        // Setup Map 
        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
        // Place markers for each location
        locations.forEach((location) => {
            console.log('Latitude:', location.latitude, 'Longitude:', location.longitude);
            const marker = new google.maps.Marker({
                map: map,
                position: { lat: location.latitude, lng: location.longitude },
                title: location.title,
                label: 'L',
                optimized: false
            });

            marker.addListener("click", () => {
                const contentString = `
                    <div id="content">
                        <div id="siteNotice"></div>
                        <h1 id="firstHeading" class="firstHeading">${location.title}</h1>
                        <div id="bodyContent">
                            <p>
                                <b>Email: </b>${location.email} <br />
                                <b>Phone Number: </b>${location.phonenumber}
                            </p>
                        </div>
                    </div>`;

                infoWindow.setContent(contentString);
                infoWindow.open({
                    anchor: marker,
                    map,
                });
            });
        });

        mapInitialized.current = true;
    }

    return (
        <div>
            <section className={`vh-100 ${styles['gradient-custom']}`}>
                <h1>MAP</h1>
                <div ref={mapRef} style={{ width: '100%', height: '800px' }} />
                <Link href="/marker"> <button className="btn btn-primary"> Add Marker</button></Link>
            </section>
        </div>
    );
};

export default MapPage;