import { validateUsername, validateFullname, validateEmail, validatePassword } from './validators';

describe('validateUsername', () => {
    it('should return an error message for invalid usernames', () => {
        expect(validateUsername('')).toBe("Username must contain only Latin letters and digits, start with a letter, and be between 4 and 20 characters long.");
        expect(validateUsername('1234')).toBe("Username must contain only Latin letters and digits, start with a letter, and be between 4 and 20 characters long.");
        expect(validateUsername('a')).toBe("Username must contain only Latin letters and digits, start with a letter, and be between 4 and 20 characters long.");
        expect(validateUsername('abc')).toBe("Username must contain only Latin letters and digits, start with a letter, and be between 4 and 20 characters long.");
        expect(validateUsername('a'.repeat(21))).toBe("Username must contain only Latin letters and digits, start with a letter, and be between 4 and 20 characters long.");
        expect(validateUsername('abcd@')).toBe("Username must contain only Latin letters and digits, start with a letter, and be between 4 and 20 characters long.");
    });

    it('should return an empty string for valid usernames', () => {
        expect(validateUsername('abcd')).toBe("");
        expect(validateUsername('a123')).toBe("");
        expect(validateUsername('user123')).toBe("");
        expect(validateUsername('UserName123')).toBe("");
    });
});

describe('validateFullname', () => {
    it('should return an error message for invalid fullnames', () => {
        expect(validateFullname('')).toBe("Fullname must contain only Latin letters and digits, and start with a letter.");
        expect(validateFullname('1abc')).toBe("Fullname must contain only Latin letters and digits, and start with a letter.");
        expect(validateFullname('ab@cd')).toBe("Fullname must contain only Latin letters and digits, and start with a letter.");
    });

    it('should return an empty string for valid fullnames', () => {
        expect(validateFullname('John')).toBe("");
        expect(validateFullname('JohnDoe')).toBe("");
        expect(validateFullname('JohnDoe123')).toBe("");
    });
});

describe('validateEmail', () => {
    it('should return an error message for invalid emails', () => {
        expect(validateEmail('')).toBe("Invalid email format.");
        expect(validateEmail('plainaddress')).toBe("Invalid email format.");
        expect(validateEmail('missingatsign.com')).toBe("Invalid email format.");
        expect(validateEmail('missingdomain@')).toBe("Invalid email format.");
        expect(validateEmail('missingdot@domain')).toBe("Invalid email format.");
    });

    it('should return an empty string for valid emails', () => {
        expect(validateEmail('test@example.com')).toBe("");
        expect(validateEmail('user.name+tag+sorting@example.com')).toBe("");
        expect(validateEmail('user.name@example.co.uk')).toBe("");
    });
});

describe('validatePassword', () => {
    it('should return an error message for invalid passwords', () => {
        expect(validatePassword('')).toBe("Password must be at least 6 characters long, contain at least one uppercase letter, one digit, and one special character.");
        expect(validatePassword('abcdef')).toBe("Password must be at least 6 characters long, contain at least one uppercase letter, one digit, and one special character.");
        expect(validatePassword('ABCDEF')).toBe("Password must be at least 6 characters long, contain at least one uppercase letter, one digit, and one special character.");
        expect(validatePassword('abc123')).toBe("Password must be at least 6 characters long, contain at least one uppercase letter, one digit, and one special character.");
        expect(validatePassword('ABC123')).toBe("Password must be at least 6 characters long, contain at least one uppercase letter, one digit, and one special character.");
        expect(validatePassword('abc!@#')).toBe("Password must be at least 6 characters long, contain at least one uppercase letter, one digit, and one special character.");
    });

    it('should return an empty string for valid passwords', () => {
        expect(validatePassword('Abc123!')).toBe("");
        expect(validatePassword('Password1$')).toBe("");
        expect(validatePassword('Valid1@Password')).toBe("");
    });
});
