import AuthService from "../../services/AuthService";

class PermissionManager {

    checkPermission = (menu, element) => {
    let user = AuthService.getCurrentUser();
    if(user != null) {
        let permissions = user.permissions;
        if(permissions != null) {
                for (var i = 0; i < permissions.length; i++) {
                let permission = permissions[i];
                let pagePermissionName  = permission.name;
                let menuPermissionName = permission.menu;
                let menuItem = null;
                }
            }
        }
    }
}
export default new PermissionManager();