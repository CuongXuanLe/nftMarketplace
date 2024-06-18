import { BaseServices } from "./baseService";

export class ManageService extends BaseServices {
    constructor() {
        super();
    }
    register = (formData) => {
        return this.post('signup', formData);
    }
}

export const manageService = new ManageService();