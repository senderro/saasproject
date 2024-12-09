export interface Deployment {
    id: number;
    service_name: string | null;
    client_id: string | null;
    image_tag: string | null;
    status: string | null;
    rpc_endpoint: string | null;
    ws_endpoint: string | null;
    access_token: string | null;
    created_at: Date | null;
  }
  