import { BaseServices } from "./baseService";

export class ManageService extends BaseServices {
  constructor() {
    super();
  }
  register = (formData) => {
    return this.post("signup", formData);
  };
  login = (formData) => {
    return this.post("login", formData);
  };
  updateProfile = (formData, token) => {
    return this.patch("updateMe", formData, token);
  }
  logout = () => {
    return this.post("logout");
  };
  
}

export const manageService = new ManageService();
