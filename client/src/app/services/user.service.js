import httpService from "./http.servise";

const userEndpoint = "user/";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);

    return data;
  },
  // + payload._id
  create: async (payload) => {
    const { data } = await httpService.post(userEndpoint, payload);
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(userEndpoint + id);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      userEndpoint + payload._id,
      payload
    );
    return data;
  },
};
export default userService;
