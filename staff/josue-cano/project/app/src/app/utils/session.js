"use client";

function getToken() {
  const token = localStorage.token;
  return token;
}

function getUserId() {
  const tokenJWT = getToken();
  if (!tokenJWT) return null;
  const base64Url = tokenJWT.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const token = JSON.parse(atob(base64));

  return token.sub;
}

export { getToken, getUserId };
