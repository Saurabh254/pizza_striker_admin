import { redirect, useNavigate } from "react-router-dom"
import { remove_auth_token } from "../../utils/localStorageManager"

export const CleanLogout = () => {
    remove_auth_token()
}
