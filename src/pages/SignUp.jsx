import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import InputComponent from '../components/InputComponent';
import axios from 'axios';

function SignUp() {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [error, toggleError] = React.useState(false);
    const [loading, toggleLoading] = React.useState(false);
    const navigate = useNavigate();

    async function handleFormSubmit(data) {
        toggleLoading(true);
        try {
            const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/users', {
                email: data.email,
                password: data.password,
                roles: ['user']
            }, {
                headers: {
                    'novi-education-project-id': '07470393-2b91-4dbf-92b8-976e6532490b',
                }
                });
            console.log(response.data);
            reset();
            toggleLoading(false);
            navigate('/signin');
        } catch(error) {
            console.error(error);
            toggleError(true);
            toggleLoading(false);
        }
    }

    return (
        <>
            <h1>Registreren</h1>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

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

                <InputComponent
                    inputId='name-field'
                    inputLabel='Gebruikersnaam:'
                    inputName='username'
                    inputType='text'
                    validationRules={{
                        required: {
                            value: true,
                            message: '*Gebruikersnaam is vereist',
                        }
                    }}
                    register={register}
                    errors={errors}
                />
                
                <button type='submit' disabled={loading===true}>
                    Versturen
                </button>

                {error && <p>Er is helaas iets misgegaan bij het verzenden. Probeer het opnieuw.</p>}

            </form>

            <p>Heb je al een account? Je kunt je <Link to='/signin'>hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;