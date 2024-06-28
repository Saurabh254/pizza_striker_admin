

export const storeMapObject = (mapObj: any, key: string) => {
    const mapString = JSON.stringify(Array.from(mapObj.entries()));
    localStorage.setItem(key, mapString);
}




export const get_auth_token = () => {
    return localStorage.getItem('access_token')
}

export const store_access_token = (token: string) => {
    localStorage.setItem('access_token', token)
}