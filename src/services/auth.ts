// // auth.js
// // Example implementation using JWT (JSON Web Tokens)
// let authToken = null;

// export function setAuthToken(token) {
//   authToken = token;
// }

// export function getAuthToken() {
//   return authToken;
// }

// export function clearAuthToken() {
//   authToken = null;
// }

// export function isAuthenticated() {
//   return !!authToken;
// }

// // Example usage of authentication header
// export function authHeader() {
//   const token = getAuthToken();
//   if (token) {
//     return { Authorization: `Bearer ${token}` };
//   } else {
//     return {};
//   }
// }
