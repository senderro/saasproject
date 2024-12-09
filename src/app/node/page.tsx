"use client";

import { useState, useEffect } from "react";
import { getClientDeployments, createDeployment } from "@/proxy";
import { Deployment } from "../../../lib/interface";

export default function NodePage() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [selectedDeployment, setSelectedDeployment] = useState<Deployment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deploying, setDeploying] = useState(false);

  useEffect(() => {
    async function fetchDeployments() {
      try {
        const fetchedDeployments = await getClientDeployments();

        const formattedDeployments = fetchedDeployments.map((deployment: Deployment) => ({
          id: deployment.id,
          service_name: deployment.service_name ?? `Deployment ${deployment.id}`,
          client_id: deployment.client_id ?? "N/A",
          image_tag: deployment.image_tag ?? "latest",
          status: deployment.status ?? "Unknown",
          rpc_endpoint: deployment.rpc_endpoint ?? "N/A",
          ws_endpoint: deployment.ws_endpoint ?? "N/A",
          access_token: deployment.access_token ?? "N/A",
          created_at: deployment.created_at ? new Date(deployment.created_at) : null, // Mantém como Date
        }));

        setDeployments(formattedDeployments);
      } catch (err) {
        console.error("Erro ao buscar deployments:", err);
        setError("Erro ao carregar os deployments.");
      } finally {
        setLoading(false);
      }
    }

    fetchDeployments();
  }, []);

  async function handleDeployNewNode() {
    try {
      setDeploying(true);

      // Faz a chamada para criar o deployment
      const newDeployment = await createDeployment();

      // Formata o deployment para corresponder à interface Deployment
      const formattedDeployment: Deployment = {
        id: newDeployment.id,
        service_name: newDeployment.service_name ?? `Deployment ${newDeployment.id}`,
        client_id: newDeployment.client_id ?? "Unknown",
        image_tag: newDeployment.image_tag ?? "latest",
        status: newDeployment.status ?? "Unknown",
        rpc_endpoint: newDeployment.rpc_endpoint ?? "N/A",
        ws_endpoint: newDeployment.ws_endpoint ?? "N/A",
        access_token: newDeployment.access_token ?? "N/A",
        created_at: newDeployment.created_at ? new Date(newDeployment.created_at) : null,
      };

      // Atualiza o estado adicionando o novo deployment
      setDeployments((prevDeployments) => [...prevDeployments, formattedDeployment]);
    } catch (err) {
      console.error("Erro ao criar novo deployment:", err);
      setError("Erro ao criar novo deployment.");
    } finally {
      setDeploying(false);
    }
  }

  if (loading) {
    return <div className="text-gray-900">Carregando deployments...</div>;
  }

  if (error) {
    return <div className="text-red-600">Erro: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center">
      {/* Main Content */}
      <main className="w-full max-w-6xl py-12 px-4 flex flex-col items-center">
        {/* Botão para Deploy */}
        <div className="mb-8 w-full flex justify-center">
          <button
            onClick={handleDeployNewNode}
            disabled={deploying}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full shadow-lg text-lg font-medium transition-transform transform hover:scale-105 ${
              deploying ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {deploying ? "Deploying..." : "Deploy New Node"}
          </button>
        </div>

        {/* Lista de Deployments */}
        <div className="w-full bg-gray-50 shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Deployments</h2>
          {deployments.length === 0 ? (
            <p className="text-gray-600 text-center">No deployments available. Deploy your first node now!</p>
          ) : (
            <div className="space-y-4">
              {deployments.map((deployment) => (
                <div
                  key={deployment.id}
                  className={`p-4 border rounded-lg shadow-sm cursor-pointer ${
                    selectedDeployment?.id === deployment.id
                      ? "bg-indigo-50 border-indigo-300"
                      : "bg-white border-gray-200"
                  }`}
                  onClick={() => setSelectedDeployment(deployment)}
                >
                  <h3 className="text-xl font-semibold">{deployment.service_name}</h3>
                  <p className={`text-sm ${deployment.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                    {deployment.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detalhes do Deployment Selecionado */}
        {selectedDeployment && (
          <div className="w-full mt-8 bg-gray-50 shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Manage Deployment: {selectedDeployment.service_name}
            </h2>
            <div className="space-y-6">
              {/* Status */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Status:</h3>
                <p
                  className={`text-lg font-medium ${
                    selectedDeployment.status === "Active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {selectedDeployment.status}
                </p>
              </div>

              {/* RPC Endpoint */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700">RPC Endpoint:</h3>
                <p className="text-gray-600 bg-gray-100 rounded-md p-4 break-words">
                  {selectedDeployment.rpc_endpoint}
                </p>
              </div>

              {/* WebSocket Endpoint */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700">WebSocket Endpoint:</h3>
                <p className="text-gray-600 bg-gray-100 rounded-md p-4 break-words">
                  {selectedDeployment.ws_endpoint}
                </p>
              </div>

              {/* Access Token */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Access Token:</h3>
                <p className="text-gray-600 bg-gray-100 rounded-md p-4 break-words">
                  {selectedDeployment.access_token}
                </p>
              </div>

              {/* Data de Criação */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Created At:</h3>
                <p className="text-gray-600 bg-gray-100 rounded-md p-4 break-words">
                  {selectedDeployment.created_at ? selectedDeployment.created_at.toDateString() : "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
