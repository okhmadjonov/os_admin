export const CookieManager = {
  setCookie(name: string, value: string, days: number = 7): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `; expires=${date.toUTCString()}`;
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
    // Fallback sync to localStorage for universal fallback
    try {
      localStorage.setItem(name, value);
    } catch (_) {}
  },

  getCookie(name: string): string | null {
    const nameEQ = `${encodeURIComponent(name)}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    // Fallback sync read from localStorage if cookie is unavailable
    try {
      return localStorage.getItem(name);
    } catch (_) {
      return null;
    }
  },

  deleteCookie(name: string): void {
    document.cookie = `${encodeURIComponent(name)}=; Max-Age=-99999999; path=/; SameSite=Lax`;
    try {
      localStorage.removeItem(name);
    } catch (_) {}
  },

  setAuthToken(token: string, expiresDays: number = 1): void {
    this.setCookie("auth_token", token, expiresDays);
  },

  getAuthToken(): string | null {
    return this.getCookie("auth_token");
  },

  setRefreshToken(token: string, expiresDays: number = 7): void {
    this.setCookie("refresh_token", token, expiresDays);
  },

  getRefreshToken(): string | null {
    return this.getCookie("refresh_token");
  },

  setAuthUser(user: any, expiresDays: number = 7): void {
    this.setCookie("auth_user", JSON.stringify(user), expiresDays);
  },

  getAuthUser<T = any>(): T | null {
    const data = this.getCookie("auth_user");
    if (!data) return null;
    try {
      return JSON.parse(data) as T;
    } catch (_) {
      return null;
    }
  },

  clearAuthCookies(): void {
    this.deleteCookie("auth_token");
    this.deleteCookie("refresh_token");
    this.deleteCookie("auth_user");
  },
};

export default CookieManager;
