export const validateUsername = (username: string): string => {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{3,19}$/;
    if (!usernameRegex.test(username)) {
        return "Username must contain only Latin letters and digits, start with a letter, and be between 4 and 20 characters long.";
    }
    return "";
};

export const validateFullname = (fullname: string): string => {
    const fullnameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
    if (!fullnameRegex.test(fullname)) {
        return "Fullname must contain only Latin letters and digits, and start with a letter.";
    }
    return "";
};

export const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Invalid email format.";
    }
    return "";
};

export const validatePassword = (password: string): string => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%-_*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
        return "Password must be at least 6 characters long, contain at least one uppercase letter, one digit, and one special character.";
    }
    return "";
};
