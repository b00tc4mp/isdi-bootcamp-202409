 const typeMapping = {
    date: "Date",
    depth: "Number",
    time: "Number",
    temperature: "Number",
    wetSuit: "Number",
    weight: "Number",
    tankSize: "Number",
    tankBar: "Number",
  };
  
  const castLogbookData = (data) => {
    const parsedData = { ...data };
  
    for (const key in parsedData) {
      if (typeMapping[key]) {
        // Convertir según el tipo especificado en el mapeo
        switch (typeMapping[key]) {
          case "Date":
            parsedData[key] = new Date(parsedData[key]);
            break;
          case "Number":
            parsedData[key] = Number(parsedData[key]);
            break;
          default:
            break;
        }
      }
    }
  
    return parsedData;
  };

  export default castLogbookData