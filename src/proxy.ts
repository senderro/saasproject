// app/actions/deployment-actions.ts
"use server";

import { deployDB } from "@/repositories/deploy-db";
import { dockerFactory } from "@/repositories/docker-factory";
import { currentUser } from "@clerk/nextjs/server";

function normalizeEmail(email: string): string {
  return email.replace(/[@.]/g, "_").toLowerCase();
}

export async function createDeployment() {
  try {
    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress;
    
    if (!email) {
      throw new Error("Email do usuário não encontrado.");
    }

    const normalizedEmail = normalizeEmail(email);
    console.log(normalizedEmail);
    
    // Cria deployment via Docker Factory
    const deploymentId = await dockerFactory.createDeployment({
      client_id: normalizedEmail
    });

    // Retorna o ID para manter compatibilidade com o código existente
    return deploymentId;

  } catch (error) {
    console.error("Erro ao criar deployment:", error);
    throw new Error("Erro ao criar deployment.");
  }
}

export async function getClientDeployments() {
  try {
    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress;
    
    if (!email) {
      throw new Error("Usuário não autenticado ou sem email válido.");
    }

    const normalizedEmail = normalizeEmail(email);
    
    // Usa o DeployDB mas retorna apenas os itens para manter compatibilidade
    const result = await deployDB.findByClientId(normalizedEmail, { 
      page: 1, 
      perPage: 100 // Mantém comportamento atual sem paginação
    });

    return result.data;

  } catch (error) {
    console.error("Erro ao buscar deployments:", error);
    throw new Error("Erro ao buscar deployments do banco de dados.");
  }
}