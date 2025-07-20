export default token => {
    if (!token) return;
    
    const indexFrom = token.indexOf('.')
    const indexTo = token.lastIndexOf('.')

    const payloadB64 = token.slice(indexFrom + 1, indexTo)

    const payloadJSON = atob(payloadB64)

    const payload = JSON.parse(payloadJSON)

    return payload
}

/*     export const extractPayloadFromJWT = (token) => {
        // Check if token is a valid JWT format
        if (!token || typeof token !== 'string' || token.split('.').length !== 3) {
          console.error("Invalid token format:", token);
          return {};  // Return an empty object if the token is invalid
        }
      
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
              .join('')
          );
          return JSON.parse(jsonPayload); // Extract and return payload
        } catch (error) {
          console.error("Failed to parse token:", token, error);
          return {};  // Return empty object on failure
        }
      }; */