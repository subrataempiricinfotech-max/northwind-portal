import axios from "axios";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(name + " is required");
  }
  return value;
}

export function createZohoBooksClient() {
  const organizationId = requireEnv("ZOHO_BOOKS_ORG_ID");
  const clientId = requireEnv("ZOHO_BOOKS_CLIENT_ID");
  const refreshToken = requireEnv("ZOHO_BOOKS_REFRESH_TOKEN");

  return axios.create({
    baseURL: "https://www.zohoapis.in/books/v3",
    params: {
      organization_id: organizationId
    },
    headers: {
      "X-Northwind-Zoho-Client": clientId,
      "X-Northwind-Zoho-Refresh": refreshToken
    },
    timeout: 10000
  });
}

export async function fetchInvoice(invoiceId: string) {
  const client = createZohoBooksClient();
  const response = await client.get("/invoices/" + invoiceId);
  return response.data;
}
