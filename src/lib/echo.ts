import { getEchoToken } from '@/echo';
import { ROUTER_BASE_URL } from '@merit-systems/echo-typescript-sdk';

const routerBaseUrl =
  process.env.ECHO_ROUTER_URL?.replace(/\/$/, '') ?? ROUTER_BASE_URL;

interface EchoImageData {
  url?: string;
  b64_json?: string;
}

interface EchoImageResponse {
  data?: EchoImageData[] | null;
}

const DEFAULT_IMAGE_MODEL = process.env.CATFORGE_IMAGE_MODEL ?? 'gpt-image-1';

function ensureModel(value: string | undefined, fallback: string) {
  return value && value.trim().length > 0 ? value : fallback;
}

async function ensureEchoToken() {
  const token = await getEchoToken();
  if (!token) {
    throw new Error('Echo authentication required before generating content.');
  }
  return token;
}

async function echoFetchJson<T>(
  path: string,
  init: RequestInit & { body?: unknown } = {}
): Promise<T> {
  const token = await ensureEchoToken();
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');

  const response = await fetch(`${routerBaseUrl}${path}`, {
    ...init,
    method: init.method ?? 'POST',
    headers,
    body:
      init.body && typeof init.body !== 'string'
        ? JSON.stringify(init.body)
        : (init.body as BodyInit | null | undefined),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorPayload = await response.text();
    throw new Error(
      `Echo request failed (${response.status} ${response.statusText}): ${errorPayload}`
    );
  }

  return response.json() as Promise<T>;
}

function extractImageUrl(payload: EchoImageResponse) {
  const candidates = payload?.data ?? [];
  if (Array.isArray(candidates)) {
    for (const item of candidates) {
      if (item && typeof item === 'object') {
        if (typeof item.url === 'string') {
          return item.url;
        }
        if (item.b64_json) {
          return `data:image/png;base64,${item.b64_json}`;
        }
      }
    }
  }
  throw new Error('Echo did not return an image URL.');
}

export async function generateEchoImage({
  prompt,
  model,
  size = '1024x1024',
}: {
  prompt: string;
  model?: string;
  size?: '1024x1024' | '768x768' | '512x512';
}) {
  const response = await echoFetchJson<EchoImageResponse>('/v1/images/generations', {
    body: {
      model: ensureModel(model, DEFAULT_IMAGE_MODEL),
      prompt,
      size,
    },
  });

  return {
    url: extractImageUrl(response),
    raw: response,
  };
}
