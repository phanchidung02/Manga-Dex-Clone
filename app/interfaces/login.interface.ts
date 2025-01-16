export interface ILoginForm {
    username: string,
    password: string,
}

export interface IAuth {
    grant_type: string;
    username: string;
    password: string;
    client_id: string;
    client_secret: string;
}