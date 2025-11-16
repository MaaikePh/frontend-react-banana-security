function InputComponent({inputType, inputId, inputLabel, register, errors, inputName, validationRules}) {
    return (
        <>
            <label htmlFor={inputId}>
                {inputLabel}
                <input
                    type={inputType}
                    id={inputId}
                    {...register(inputName, validationRules)}
                />
                {errors[inputName] && <p>{errors[inputName].message}</p>}
            </label>
        </>
    )
}

export default InputComponent;