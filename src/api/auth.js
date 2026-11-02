export async function loginRequest(email) {
  const res = await fetch(`${"https://jsonplaceholder.typicode.com"}/users`);
  if (!res.ok) throw new Error("Unable to reach the server. Please try again.");

  const users = await res.json();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (!user) throw new Error("Invalid email or password.");

  // Fake token, since JSONPlaceholder has no auth
  return { token: `mock-token-${user.id}`, user };
}