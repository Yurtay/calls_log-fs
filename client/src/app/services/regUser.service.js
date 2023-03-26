import httpService from "./http.servise";
import localStorageService from "./localStorage.service";

const reguserEndpoint = "reguser/";

const reguserService = {
  get: async () => {
    const { data } = await httpService.get(reguserEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      reguserEndpoint + payload.id,
      payload
    );
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      reguserEndpoint + localStorageService.getUserId()
    );
    return data;
  },
};
export default reguserService;
