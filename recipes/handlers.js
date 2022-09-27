exports.handler = async (event, context) => {
  if (!event.hasOwnProperty("recipes")) {
    return generateResponse(400, "The event data is icorrect");
  }

  if (!(typeof Array.isArray(event["recipes"]) && event["recipes"].length)) {
    return generateResponse(400, "The event data is icorrect");
  }

  console.log("PASE 1");
  const { recipes } = event;

  try {
    const csv = await generateCSV(recipes);
    console.log("PASE 2");
    const base64File = await encodeToBase64(csv);
    console.log("PASE 3");
    return generateResponse(200, base64File);
  } catch (err) {
    console.log(err);
    return generateResponse(400, err);
  }
};

async function generateCSV(data) {
  const items = data;
  const replacer = (key, value) => (value === null ? "" : value);
  const header = Object.keys(items[0]);
  const csv = [
    header.join(","),
    ...items.map((row) =>
      header
        .map((fieldName) => {
          let line;
          switch (fieldName) {
            case "batters":
              return JSON.stringify(row[fieldName].batter[0].type, replacer);
            case "topping":
              row[fieldName].map((top, i) => {
                if (i === 0) {
                  line = top.type;
                } else {
                  line = line + " | " + top.type;
                }
              });
              return JSON.stringify(line, replacer);
            default:
              return JSON.stringify(row[fieldName], replacer);
          }
        })
        .join(",")
    ),
  ].join("\r\n");

  console.log(csv);

  return csv;
}

async function encodeToBase64(file) {
  let buff = new Buffer(file);
  let base64data = buff.toString("base64");
  return base64data;
}

async function generateResponse(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message),
  };
}
