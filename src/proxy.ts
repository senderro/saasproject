"use server";

import prisma from "../lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

const API_URL = process.env.API_URL as string;
const API_KEY = process.env.API_KEY as string;

if (!API_KEY) {
  throw new Error("API_KEY não definida. Verifique o arquivo .env.");
}

/**
 * Função para criar um deployment.
 * Envia uma requisição para a API externa e salva os dados no banco de dados.
 * @returns O resultado da operação.
 */
export async function createDeployment() {
  try {
    const email = await getUserEmail();
    if (!email) throw new Error("Email do usuário não encontrado.");

    const normalizedEmail = normalizeEmail(email);

    const response = await sendRequisitionAndReturnResponse(normalizedEmail);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro na API externa:", errorData);
      throw new Error("Erro ao criar deployment na API externa.");
    }

    // Resposta da API externa
    const deploymentId = await response.text(); // Use .text() para obter o ID corretamente como string

    // Salva os dados no banco de dados usando Prisma
    const newDeployment = await prisma.deployments.create({
      data: {
        client_id: normalizedEmail, // Usando o email normalizado
        service_name: `Deployment-${deploymentId}`, // Concatenando corretamente
        image_tag: "latest",
        status: "Pending",
        rpc_endpoint: `https://${deploymentId}.rpc.endpoint`,
        ws_endpoint: `wss://${deploymentId}.ws.endpoint`,
        access_token: API_KEY,
        created_at: new Date(),
      },
    });

    return newDeployment;
  } catch (error) {
    console.error("Erro ao criar deployment:", error);
    throw new Error("Erro ao criar deployment.");
  }
}

/**
 * Função para buscar deployments no banco de dados.
 * Usa o email normalizado do cliente.
 */
export async function getClientDeployments() {
  try {
    const email = await getUserEmail();
    if (!email) {
      throw new Error("Usuário não autenticado ou sem email válido.");
    }

    const normalizedEmail = normalizeEmail(email);

    const deployments = await prisma.deployments.findMany({
      where: {
        client_id: normalizedEmail, // Usando o email normalizado para busca
      },
    });

    return deployments;
  } catch (error) {
    console.error("Erro ao buscar deployments:", error);
    throw new Error("Erro ao buscar deployments do banco de dados.");
  }
}

/**
 * Função para obter o email do usuário atual.
 */
async function getUserEmail() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  return email;
}

/**
 * Envia a requisição para criar um deployment na API externa.
 */
async function sendRequisitionAndReturnResponse(email: string) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
      Accept: "application/json",
    },
    body: JSON.stringify({ client_id: email }), // Usando o email normalizado
  });

  return response;
}

/**
 * Normaliza o email substituindo "@" e "." por "_".
 */
function normalizeEmail(email: string): string {
  return email.replace(/[@.]/g, "_").toLowerCase();
}
