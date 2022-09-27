# Challenge NodeJS and AWS Lambda

#### Introduction

The present challenge pretends to evaluate the level of experience of a backend NodeJS developer that had worked with AWS Lambda.

This repository contains a microsservices sample project on which multiple lambdas can be created, and also a template.yaml file on which the different lambdas are defined as part of a common project.

#### Requirements to run

In order to be able to run this project on your local computer, you will need:

- [NodeJS](https://nodejs.org/es/download/) 14 or higher running in your computer
- [Docker](https://www.docker.com/get-started/) running in your computer
- [SAM AWS CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

You can find more instructions regarding how to add and test lambdas inside the "demo" folder, on the file README.md.

As an example, we had left a lambda named hello-world that you can use as a guide to create the ones that are required by this challenge.

## Challenge

You will have to create two lambdas and add them to the template.yaml definition:

#### Lambda 1

The first one will be named "pets". The goal of this lambda is to interact with this api: [PETS STORE API](https://u8cxo36m7k.execute-api.eu-west-1.amazonaws.com/production)

The function will receive as event the content of the file located on the root folder of this repository named "data.json", and will have to:

- validate that the key baseUrl exists and its a String of min 1 char and max 300 chars.
- validate that the key myPets exists, its an Array, has at least one element; the elements are Objects, and inside those objects, the key "uuid" exists, and the value is a String of min 1 char and max 50 chars.
- Do a GET request to the baseURL received, passing as URL parameter the key "type" and the value of the event.myPets[0].uuid. For example 'https://u8cxo36m7k.execute-api.eu-west-1.amazonaws.com/production/pets/?type=dog'
- From the response of your request you will receive an array of objects with some keys, one of those been "price". Please add up all the prices and store the value on a variable.
- The response of the lambda has to be the total price of the found items.

Example of response:

```
{
  status: 200,
  body: {
    totalPrice: 450
  }
}
```

We assume that a reasonable time for you to be able to solve this first task is 2 hours.

#### Lambda 2

The second one will be named "recipes". The goal of this lambda is to interact with the content of the file located on the root folder of this repository named "data.json"

The function will receive as event the content of the file and will have to:

- validate that the key recipes exists, its an array, and has at least one element.
- From all the items on the recipes array, we need to create a \*.csv file with the following columns:
  - id
  - type
  - name
  - ppu
  - batters
  - toppings
- The first row has to be the headers with the titles of the columns
- Then add one row for each element of the array recipes.
- The column batters, will have the value of batters.batter[0].type. For example: "Regular".
- The column toppings, will have as value a single string concatenating all the keys "type" insde the array topping. For example: "None | Glazed | Sugar | Powdered Sugar"
- Convert the csv file on to a base64 string.
- The response of the lambda has to be the base64 file string.

Example of response:

```
{
  status: 200,
  body: "aWQsIHR5cGUsIG5hbWUsIHBwdSwgYmF0dGVycywgdG9wcGluZ3MsCjAwMDEsIGRvbnV0LCBjYWtlLCAwLjU1LCBSZWd1bGFyLCBOb25lIHwgR2xhemVkIHwgU3VnYXIgfCBQb3dkZXJlZCBTdWdhciB8IENob2NvbGF0ZSB3aXRoIFNwcmlua2xlcyB8IENob2NvbGF0ZSB8IE1hcGxlLAowMDAyLCBkb251dCwgUmFpc2VkLCBSZWd1bGFyLCBOb25lIHwgR2xhemVkIHwgU3VnYXIgfCBDaG9jb2xhdGUgfCBNYXBsZQo="
}
```

We assume that a reasonable time for you to be able to solve this first task is 2 hours.
# vtlab-challenge
