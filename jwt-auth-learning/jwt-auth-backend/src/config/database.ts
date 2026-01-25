import { User , LogInRequest } from "../types/types";

type userDetails = User & LogInRequest;

export const users: userDetails[] = [
    {id: 'u01', name: "Akarshan", password: "pass01"},
    {id: 'u02', name: "Batman", password: "pass02"},
    {id: 'u03', name: "Him", password: "pass03"},
    {id: 'u04', name: "God", password: "pass04"},
];

export const findUserByName = (name:string) : userDetails | undefined => {
    return users.find(u => u.name === name);
};
export const findUserById = (id:string) : userDetails | undefined => {
    return users.find(u => u.id === id);
};