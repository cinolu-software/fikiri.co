export interface SearchResponseInterface {
  hits: SearchResult[];
  query: string;
  processingTimeMs: number;
  limit: number;
  offset: number;
  estimatedTotalHits: number;
}

export interface SearchResult {
  id: 5;
  name: string;
  description: string;
  created_at: Date;
  _formatted: SearchResult;
}
