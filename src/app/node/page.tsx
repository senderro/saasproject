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
    return <div className="text-gray-900 dark:text-gray-100">Carregando deployments...</div>;
  }

  if (error) {
    return <div className="text-red-600 dark:text-red-400">Erro: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center transition-colors duration-200">
      <main className="w-full max-w-6xl py-8 md:py-12 px-4 flex flex-col items-center">
        <div className="mb-6 md:mb-8 w-full flex justify-center">
          <button
            onClick={handleDeployNewNode}
            disabled={deploying}
            className={`bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 
              text-white px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg text-base md:text-lg font-medium 
              transition-all duration-200 transform hover:scale-105 
              ${deploying ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {deploying ? "Deploying..." : "Deploy New Node"}
          </button>
        </div>

        <div className="w-full bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg p-4 md:p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            Your Deployments
          </h2>
          
          {deployments.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300 text-center">
              No deployments available. Deploy your first node now!
            </p>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {deployments.map((deployment) => (
                <div
                  key={deployment.id}
                  className={`p-4 border rounded-lg shadow-sm cursor-pointer transition-colors duration-200
                    ${selectedDeployment?.id === deployment.id
                      ? "bg-indigo-50 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700"
                      : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-700"
                    }`}
                  onClick={() => setSelectedDeployment(deployment)}
                >
                  <h3 className="text-lg md:text-xl font-semibold">
                    {deployment.service_name ?? `Deployment ${deployment.id}`}
                  </h3>
                  <p className={`text-sm ${
                    deployment.status === "Active" 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {deployment.status ?? "Unknown"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedDeployment && (
          <div className="w-full mt-6 md:mt-8 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg p-4 md:p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
              Manage Deployment: {selectedDeployment.service_name ?? `Deployment ${selectedDeployment.id}`}
            </h2>
            
            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-200">Status:</h3>
                <p className={`text-base md:text-lg font-medium ${
                  selectedDeployment.status === "Active" 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-red-600 dark:text-red-400"
                }`}>
                  {selectedDeployment.status ?? "Unknown"}
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-200">RPC Endpoint:</h3>
                <p className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md p-3 md:p-4 break-words">
                  {selectedDeployment.rpc_endpoint ?? "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-200">WebSocket Endpoint:</h3>
                <p className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md p-3 md:p-4 break-words">
                  {selectedDeployment.ws_endpoint ?? "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-200">Access Token:</h3>
                <p className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md p-3 md:p-4 break-words">
                  {selectedDeployment.access_token ?? "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-200">Created At:</h3>
                <p className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md p-3 md:p-4 break-words">
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