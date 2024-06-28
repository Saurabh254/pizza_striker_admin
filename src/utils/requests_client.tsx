
import { redirect } from 'react-router-dom';
import { API_BASE } from '../config.js'
import { get_auth_token } from './localStorageManager';
import { RequestBody } from '../types/utils.js';



class Request {

    static async get<T>(path: string, query: string = '', isAuthRequest: Boolean = false): Promise<T> {
        if (query) {
            query = '?' + query
        }
        const _url: string = API_BASE + path + query
        if (isAuthRequest) {
            const auth_token = get_auth_token()
            if (!auth_token) {
                redirect('/auth/login')
            }
            const response = await fetch(_url, {
                method: "GET", headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth_token}`
                }
            })
            return response.json()
        } else {
            const response = await fetch(_url, {
                method: "GET", headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.json()
        }
    }

    static async post<T>(path: string, body: RequestBody, isAuthRequest: Boolean = false): Promise<T> {
        const _url: string = API_BASE + path
        if (isAuthRequest) {
            const auth_token = get_auth_token()
            if (!auth_token) {
                redirect('/auth/login')
            }
            const response = await fetch(_url, {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth_token}`
                },
                body: JSON.stringify(body)
            })
            return response.json()
        } else {
            const response = await fetch(_url, {
                method: "POST", headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            return response.json()
        }
    }
    static async delete<T>(path: string, isAuthRequest: Boolean = false): Promise<T> {
        const _url: string = API_BASE + path
        if (isAuthRequest) {
            const auth_token = get_auth_token()
            if (!auth_token) {
                redirect('/auth/login')
            }
            const response = await fetch(_url, {
                method: "DELETE", headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth_token}`
                }
            })
            return response.json()
        } else {
            const response = await fetch(_url, {
                method: "DELETE", headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.json()
        }
    }
}

export default Request;