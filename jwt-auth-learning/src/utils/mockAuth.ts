export const createMockToken = (name: string): string => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
        sub: 'user_' + Math.random().toString(36).substr(2, 9),
        name : name,
        exp : Math.floor(Date.now()/1000) + (7*24*60*60)
    }));

    const signature = 'mock_signature_' + Math.random().toString(36).substr(2,9);

    return `${header}.${payload}.${signature}`;
};

export const mockLogin = async (name:string , password:string): Promise<{token : string}> => {
    await new Promise(resolve => setTimeout(resolve,1000));
    if (!name || name.length < 3) {
        throw new Error('Name must be at least 3 characters');
    }
    if (!password || password.length < 6) {
        throw new Error('Password must be atleast 6 characters');
    }
    return {
        token : createMockToken(name)
    };
};