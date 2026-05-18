// @pagesmith/runtime - Bundled SSR utilities
// Auto-injected by PageSmith at build time - DO NOT EDIT

// ============================================
// Types
// ============================================

export interface RuntimeEnv {
  DATA: Fetcher;
  ASSETS: R2Bucket;
  SITE_ID: string;
  SITE_TOKEN: string;
  ENV: 'prod' | 'preview';
}

export interface SiteCapabilities {
  hasDatabase: boolean;
  hasCollections: boolean;
  hasForms: boolean;
  hasAuth: boolean;
  hasPayments: boolean;
}

export interface ContactSubmission {
  id: string;
  formName: string;
  name: string;
  email: string;
  message: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  schema?: Record<string, unknown>;
}

export interface CollectionItem {
  id: string;
  collectionId: string;
  slug: string | null;
  title: string;
  content: string | null;
  data: Record<string, unknown>;
  published: boolean;
  publishedAt: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  metadata?: Record<string, unknown>;
}

// ============================================
// Environment
// ============================================

export function getEnv(locals: any): RuntimeEnv {
  const runtime = locals?.runtime;
  if (!runtime?.env) {
    throw new Error('Runtime environment not available. Is this an SSR site?');
  }

  return {
    DATA: runtime.env.DATA,
    ASSETS: runtime.env.ASSETS,
    SITE_ID: runtime.env.SITE_ID,
    SITE_TOKEN: runtime.env.SITE_TOKEN,
    ENV: runtime.env.ENV || 'prod',
  };
}

export function getSiteCapabilities(env: RuntimeEnv): SiteCapabilities {
  return {
    hasDatabase: !!env.DATA,
    hasCollections: !!env.DATA,
    hasForms: !!env.DATA,
    hasAuth: false,
    hasPayments: false,
  };
}

// ============================================
// Database Client
// ============================================

export interface SiteDb {
  createContactSubmission(data: {
    formName?: string;
    name: string;
    email: string;
    message: string;
    metadata?: Record<string, unknown>;
  }): Promise<string>;

  listContactSubmissions(options?: {
    formName?: string;
    limit?: number;
    offset?: number;
  }): Promise<ContactSubmission[]>;

  getCollection(slug: string): Promise<Collection | null>;
  listCollections(): Promise<Collection[]>;

  getCollectionItem(
    collectionSlug: string,
    itemSlug: string,
  ): Promise<CollectionItem | null>;
  listCollectionItems(
    collectionSlug: string,
    options?: {
      published?: boolean;
      limit?: number;
      offset?: number;
    },
  ): Promise<CollectionItem[]>;
}

export function getDb(env: RuntimeEnv): SiteDb {
  const dataService = env.DATA;
  const token = env.SITE_TOKEN;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  return {
    async createContactSubmission(data) {
      const res = await dataService.fetch('http://internal/forms/submit', {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to submit form');
      const json = (await res.json()) as { id: string };
      return json.id;
    },

    async listContactSubmissions(options = {}) {
      const params = new URLSearchParams({
        limit: String(options?.limit || 100),
        offset: String(options?.offset || 0),
      });
      if (options.formName) {
        params.append('formName', options.formName);
      }

      const res = await dataService.fetch(
        `http://internal/forms/submissions?${params}`,
        { headers },
      );

      if (!res.ok) throw new Error('Failed to fetch contact submissions');
      return res.json() as Promise<ContactSubmission[]>;
    },

    async getCollection(slug) {
      const res = await dataService.fetch(
        `http://internal/collections/${slug}`,
        { headers },
      );
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('Failed to fetch collection');
      return res.json() as Promise<Collection>;
    },

    async listCollections() {
      const res = await dataService.fetch(`http://internal/collections`, {
        headers,
      });
      if (!res.ok) throw new Error('Failed to fetch collections');
      return res.json() as Promise<Collection[]>;
    },

    async getCollectionItem(collectionSlug, itemSlug) {
      const res = await dataService.fetch(
        `http://internal/collections/${collectionSlug}/items/${itemSlug}`,
        { headers },
      );
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('Failed to fetch collection item');
      return res.json() as Promise<CollectionItem>;
    },

    async listCollectionItems(collectionSlug, options) {
      const params = new URLSearchParams({
        limit: String(options?.limit || 100),
        offset: String(options?.offset || 0),
      });
      if (options?.published !== undefined) {
        params.append('published', options.published ? 'true' : 'false');
      }

      const res = await dataService.fetch(
        `http://internal/collections/${collectionSlug}/items?${params}`,
        { headers },
      );

      if (!res.ok) throw new Error('Failed to fetch data');
      return res.json() as Promise<CollectionItem[]>;
    },
  };
}

// ============================================
// Form Validation
// ============================================

export function parseFormData<T extends Record<string, unknown>>(
  formData: FormData,
  requiredFields: (keyof T)[],
): { success: true; data: T } | { success: false; errors: string[] } {
  const obj: Record<string, unknown> = {};
  const errors: string[] = [];

  formData.forEach((value, key) => {
    obj[key] = value;
  });

  for (const field of requiredFields) {
    const value = obj[field as string];
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      errors.push(`${String(field)} is required`);
    }
  }

  // Basic email validation if email field exists
  if (obj.email && typeof obj.email === 'string') {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(obj.email)) {
      errors.push('Invalid email address');
    }
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return { success: true, data: obj as T };
}
