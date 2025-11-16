import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';

function Profile() {
    const {user} = useContext(AuthContext);
    const [secret, setSecret] = useState({});

    useEffect(() => {
        const controller = new AbortController();

        async function fetchSecret() {

            try {
                const token = localStorage.getItem('token');

                const response = await axios.get('https://novi-backend-api-wgsgz.ondigitalocean.app/api/secrets', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'novi-education-project-id': '07470393-2b91-4dbf-92b8-976e6532490b'
                    },
                    signal: controller.signal,
                })

                console.log(response.data[0]);
                setSecret(response.data[0]);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log('secret request cancelled');
                } else {
                    console.error(e);
                }
            }
        }

        if (user) {
            fetchSecret();
        }

        return () => controller.abort();

    }, [])

    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </section>
            <section>
                <h2>Strikt geheime profiel-content</h2>
                <p><strong>{secret.title}</strong></p>
                <p>{secret.content}</p>
            </section>
            <p>Terug naar de <Link to='/'>Homepagina</Link></p>
        </>
    );
}

export default Profile;