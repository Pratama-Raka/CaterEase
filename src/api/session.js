// Remember me -> localStorage, otherwise sessionStorage
function getStorage() {
  if (localStorage.getItem("token")) return localStorage;
  if (sessionStorage.getItem("token")) return sessionStorage;
  return null;
}

export function getSession() {
  const storage = getStorage();
  if (!storage) return null;
  try {
    return {
      token: storage.getItem("token"),
      user: JSON.parse(storage.getItem("user")),
    };
  } catch {
    return null;
  }
}

export function updateSessionUser(changes) {
  const storage = getStorage();
  if (!storage) return;
  try {
    const user = JSON.parse(storage.getItem("user") || "{}");
    storage.setItem("user", JSON.stringify({ ...user, ...changes }));
  } catch {
    /* ignore */
  }
}

export function clearSession() {
  ["token", "user"].forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}
