export default async (account, endpoint, body) => {
  return await fetch(
    `${process.env.VUE_APP_API_URL}/webhook/${account.organisationName}/${
      endpoint.path
    }`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(JSON.parse(body))
    }
  );
};
