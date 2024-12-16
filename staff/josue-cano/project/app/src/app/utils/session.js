"use client";

function getToken() {
  const token = localStorage.token;
  return token;
}

export { getToken };
