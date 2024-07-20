import { useReducer, useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { validateUsername, validatePassword } from "../Additional/validators";
import { loginUser } from "../../API/User";

export interface LoginForm {
    username: string;
    password: string;
    errors: {
        username: string;
        password: string;
    };
    isFormValid: boolean;
}

const initialState: LoginForm = {
    username: "",
    password: "",
    errors: {
        username: "",
        password: "",
    },
    isFormValid: false,
};

type Action =
    | { type: "SET_FIELD"; field: keyof LoginForm; payload: string }
    | { type: "SET_ERRORS"; payload: LoginForm["errors"] }
    | { type: "SET_FORM_VALIDITY"; payload: boolean };

const loginFormReducer = (state: LoginForm, action: Action): LoginForm => {
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

const validateField = (field: keyof LoginForm, value: string): string => {
    if (field === "username") return validateUsername(value);
    if (field === "password") return validatePassword(value);
    return "";
};

export const useLoginForm = () => {
    const [state, dispatch] = useReducer(loginFormReducer, initialState);
    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        const isFormValid = !state.errors.username && !state.errors.password && !!state.username && !!state.password;
        dispatch({ type: "SET_FORM_VALIDITY", payload: isFormValid });
    }, [state.errors, state.username, state.password]);

    const handleFieldChange = (field: keyof LoginForm) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        dispatch({ type: "SET_FIELD", field, payload: value });
        const error = value ? validateField(field, value) : "";
        dispatch({
            type: "SET_ERRORS",
            payload: { ...state.errors, [field]: error },
        });
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (state.isFormValid) {
            const loginResult = await loginUser(state)
            if (loginResult) {
                alert(loginResult);
            }
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

export default useLoginForm;
