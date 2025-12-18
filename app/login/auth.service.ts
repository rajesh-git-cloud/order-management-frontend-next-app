export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

export const logout = (router: any) => {
  clearToken();
  router.replace("/login");
};
