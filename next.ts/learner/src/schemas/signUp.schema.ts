import { z } from 'zod';

export const usernameValidation = z
    .string()
    .min(2,'At-least 2 char')
    .max(16,'Maximum 16 char')
    .regex(/^[a-zA-Z0-9_]{3,16}$/,'Username must not contain special character');

export const passwordValidation = z
    .string()
    .min(6 , {message : 'Password must me at lease 6 char'})
    .max(14 , {message : 'Password must be at most 14 char'});

export const emailValidation = z.
    email({message:'Invalid Email Address'});

export const signUpSchema = z.object({
    username : usernameValidation,
    email : emailValidation,
    password : passwordValidation
});