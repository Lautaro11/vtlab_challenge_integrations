const axios = require("axios");

exports.handler = async (event, context) => {
  if (!(event.hasOwnProperty("baseUrl") && event.hasOwnProperty("myPets"))) {
    return generateResponse(400, "The event data is icorrect");
  }

  if (
    !(
      (await eventValidation(event, "baseUrl")) &&
      (await eventValidation(event, "myPets"))
    )
  ) {
    return generateResponse(400, "The event data is icorrect");
  }

  const { baseUrl, myPets } = event;

  try {
    const pets = await getPetsByType(baseUrl, myPets);
    console.log(pets);
    let totalPrice = 0;
    await pets.forEach((pet) => {
      totalPrice += pet.price;
    });
    return generateResponse(200, { totalPrice });
  } catch (err) {
    console.log(err);
    return generateResponse(400, err);
  }
};

async function getPetsByType(baseUrl, myPets) {
  let { data } = await axios.get(`${baseUrl}/pets/?type=${myPets[0].uuid}`);
  return data;
}

async function eventValidation(event, toValidate) {
  switch (toValidate) {
    case "baseUrl":
      return (
        typeof event[toValidate] === "string" &&
        event[toValidate].length >= 1 &&
        event[toValidate].length <= 300
      );
    case "myPets":
      let validateUuid = true;
      if (
        typeof Array.isArray(event[toValidate]) &&
        event[toValidate].length &&
        event[toValidate]
      ) {
        await event[toValidate].forEach((pet, i) => {
          validateUuid =
            validateUuid &&
            typeof pet === "object" &&
            pet !== null &&
            !Array.isArray(pet) &&
            pet.hasOwnProperty("uuid") &&
            pet["uuid"].length >= 1 &&
            pet["uuid"].length <= 50;
        });
      }
      return validateUuid;
    default:
      break;
  }
}

async function generateResponse(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message),
  };
}
