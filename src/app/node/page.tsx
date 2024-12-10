"use client";

import { useState, useEffect } from "react";
import { getClientDeployments, createDeployment } from "@/proxy";
import type { deployments } from "@prisma/client";

export default function NodePage() {
  const [deployments, setDeployments] = useState<deployments[] | []>([]);
  const [selectedDeployment, setSelectedDeployment] = useState<deployments | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deploying, setDeploying] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchDeployments();
  }, []);

  async function fetchDeployments() {
    try {
      const fetchedDeployments = await getClientDeployments();
      
      const formattedDeployments = fetchedDeployments.map((deployment) => ({
        ...deployment,
        created_at: deployment.created_at ? new Date(deployment.created_at) : null,
      }));

      setDeployments(formattedDeployments);
    } catch (err) {
      console.error("Erro ao buscar deployments:", err);
      setError("Erro ao carregar os deployments.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeployNewNode() {
    try {
      setDeploying(true);
      await createDeployment();
      await fetchDeployments();
    } catch (err) {
      console.error("Erro ao criar novo deployment:", err);
      setError("Erro ao criar novo deployment.");
    } finally {
      setDeploying(false);
    }
  }

  if (!isClient) {
    return null;
  }

  if (loading) {
    return <div className="text-gray-900">Carregando deployments...</div>;
  }

  if (error) {
    return <div className="text-red-600">Erro: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center">
      <main className="w-full max-w-6xl py-12 px-4 flex flex-col items-center">
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
                  <h3 className="text-xl font-semibold">{deployment.service_name ?? `Deployment ${deployment.id}`}</h3>
                  <p className={`text-sm ${deployment.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                    {deployment.status ?? "Unknown"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedDeployment && (
          <div className="w-full mt-8 bg-gray-50 shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Manage Deployment: {selectedDeployment.service_name ?? `Deployment ${selectedDeployment.id}`}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Status:</h3>
                <p className={`text-lg font-medium ${
                  selectedDeployment.status === "Active" ? "text-green-600" : "text-red-600"
                }`}>
                  {selectedDeployment.status ?? "Unknown"}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-700">RPC Endpoint:</h3>
                <p className="text-gray-600 bg-gray-100 rounded-md p-4 break-words">
                  {selectedDeployment.rpc_endpoint ?? "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-700">WebSocket Endpoint:</h3>
                <p className="text-gray-600 bg-gray-100 rounded-md p-4 break-words">
                  {selectedDeployment.ws_endpoint ?? "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-700">Access Token:</h3>
                <p className="text-gray-600 bg-gray-100 rounded-md p-4 break-words">
                  {selectedDeployment.access_token ?? "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-700">Created At:</h3>
                <p className="text-gray-600 bg-gray-100 rounded-md p-4 break-words">
                  {selectedDeployment.created_at ? selectedDeployment.created_at.toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}