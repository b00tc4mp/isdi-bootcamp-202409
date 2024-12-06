"use client"
import jwt from "jsonwebtoken";

function getToken() {
  const token = localStorage.token;
  return token;
}


export {getToken}