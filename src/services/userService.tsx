import axios, {AxiosResponse} from "axios";
import Swal from "sweetalert2";


const BASE_URL = "http://localhost:3001/auth";

export const login = async (email: string, password: string): Promise<any> => {
    try {
        const res = await axios.post(`${BASE_URL}/login`, {email, password});
        return res;
    } catch (err) {
        return err;
    }
}

export const register = async (email: string, password: string) : Promise<AxiosResponse | any> => {
    try {
        return await axios.post(`${BASE_URL}/register`, {email, password});
    } catch (err){
        await Swal.fire(
            'Error',
            'Could not register user',
            'error'
        )
    }
}

export const getUser = async (token: string) => { 
    try {
        const res = await axios.get(`${BASE_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (err) {
        return err;
    }
}