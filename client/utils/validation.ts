export function isEmailValid(email: string): boolean {
    return email.length > 3;
}

export function isPasswordValid(password: string): boolean {
    return password.length > 5;
}