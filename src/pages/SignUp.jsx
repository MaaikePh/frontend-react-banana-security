import React from 'react';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import InputComponent from '../components/InputComponent';

function SignUp() {
    const {register, handleSubmit, formState: {errors}} = useForm();

    function handleFormSubmit(data) {
        console.log(data);
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
                    inputType='text'
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
                
                <button type='submit'>
                    Versturen
                </button>

            </form>

            <p>Heb je al een account? Je kunt je <Link to='/signin'>hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;