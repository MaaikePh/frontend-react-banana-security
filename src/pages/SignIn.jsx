import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import InputComponent from '../components/InputComponent';
import {useForm} from 'react-hook-form';
import axios from 'axios';

function SignIn() {
    const {login} = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}} = useForm();

    async function handleFormSubmit(data) {
        const controller = new AbortController();

        try {
            const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/login', {
                email: data.email,
                password: data.password,
            }, {
                headers: {
                    'novi-education-project-id': '07470393-2b91-4dbf-92b8-976e6532490b',
                },
                signal: controller.signal,
                });
            console.log("Received login response:", response.data);
            login(response.data);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Signin canceled');
            } else {
                console.error(error);
            }
        }

        return controller.abort();
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit(handleFormSubmit)}>

                <InputComponent
                    inputId='email-field'
                    inputLabel='Email:'
                    inputName='email'
                    inputType='text'
                    validationRules={{
                        required: {
                            value: true,
                            message: '*E-mailadres is vereist',
                        },
                        validate: (value) => String(value).includes('@') || '*Voer een geldig e-mailadres in',
                    }}
                    register={register}
                    errors={errors}
                />

                <InputComponent
                    inputId='password-field'
                    inputLabel='Wachtwoord:'
                    inputName='password'
                    inputType='password'
                    validationRules={{
                        required: {
                            value: true,
                            message: '*Wachtwoord is vereist',
                        }
                    }}
                    register={register}
                    errors={errors}
                />

                <button type='submit'>
                    Inloggen
                </button>

            </form>

            <p>Heb je nog geen account? <Link to='/signup'>Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;