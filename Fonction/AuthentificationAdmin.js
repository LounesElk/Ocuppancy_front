  ////////LIBRARY/////////
import jwt_decode from "jwt-decode";

export default function isAuthenticatedAdmin() {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwt_decode(token);
        var Role = decoded.roleId
        if (Role !== 1) {
        localStorage.removeItem('token');
        return false;
        }
        return true;
    }
    return false;
}
