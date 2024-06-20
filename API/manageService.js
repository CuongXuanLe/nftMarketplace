import { BaseServices } from "./baseService";

export class ManageService extends BaseServices {
  constructor() {
    super();
  }
  register = (formData) => {
    return this.post("users/signup", formData);
  };
  login = (formData) => {
    return this.post("users/login", formData);
  };
  updateProfile = (formData, token) => {
    return this.patch("users/updateMe", formData, token);
  }
  logout = () => {
    return this.post("users/logout");
  };
  getUsers = () => {
    return this.get("users");
  }
}

export const manageService = new ManageService();
