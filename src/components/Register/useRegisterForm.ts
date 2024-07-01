import { useReducer, useState, useEffect, ChangeEvent, FormEvent } from "react";
import { validateUsername, validateFullname, validateEmail, validatePassword } from "../Additional/validators";
import { createUser } from "../../API/User";

export interface RegisterForm {
    username: string;
    fullname: string;
    email: string;
    password: string;
    errors: {
        username: string;
        fullname: string;
        email: string;
        password: string;
    };
    isFormValid: boolean;
}

const initialState: RegisterForm = {
    username: "",
    fullname: "",
    email: "",
    password: "",
    errors: {
        username: "",
        fullname: "",
        email: "",
        password: "",
    },
    isFormValid: false,
};

type Action =
    | { type: "SET_FIELD"; field: keyof RegisterForm; payload: string }
    | { type: "SET_ERRORS"; payload: RegisterForm["errors"] }
    | { type: "SET_FORM_VALIDITY"; payload: boolean };

const registerFormReducer = (state: RegisterForm, action: Action): RegisterForm => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.payload };
        case "SET_ERRORS":
            return { ...state, errors: action.payload };
        case "SET_FORM_VALIDITY":
            return { ...state, isFormValid: action.payload };
        default:
            return state;
    }
};

const validateField = (field: keyof RegisterForm, value: string): string => {
    switch (field) {
        case "username":
            return validateUsername(value);
        case "fullname":
            return validateFullname(value);
        case "email":
            return validateEmail(value);
        case "password":
            return validatePassword(value);
        default:
            return "";
    }
};

export const useRegisterForm = () => {
    const [state, dispatch] = useReducer(registerFormReducer, initialState);
    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        const isFormValid = Object.values(state.errors).every(error => !error) &&
            state.username && state.fullname && state.email && state.password;
        dispatch({ type: "SET_FORM_VALIDITY", payload: Boolean(isFormValid) });
    }, [state.errors, state.username, state.fullname, state.email, state.password]);

    const handleFieldChange = (field: keyof RegisterForm) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        dispatch({ type: "SET_FIELD", field, payload: value });
        const error = value ? validateField(field, value) : "";
        dispatch({
            type: "SET_ERRORS",
            payload: { ...state.errors, [field]: error },
        });
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(state);
        if (state.isFormValid) {
            createUser(state);
        }
    };

    return {
        state,
        passwordVisible,
        setPasswordVisible,
        handleFieldChange,
        handleSubmit
    };
};
