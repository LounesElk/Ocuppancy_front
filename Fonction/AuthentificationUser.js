  ////////LIBRARY/////////
import jwt_decode from "jwt-decode";

export default function isAuthenticatedUser() {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwt_decode(token);
        var Role = decoded.roleId
        if (Role !== 2) {
        localStorage.removeItem('token');
        return false;
        }
        return true;
    }
    return false;
}
