export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  STREAMING = 'STREAMING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface Source {
  title: string;
  uri: string;
}

export interface SummaryResult {
  text: string;
  sources: Source[];
}

export interface SummaryState {
  status: AppStatus;
  result: SummaryResult | null;
  error: string | null;
}

export interface ArticleInputProps {
  onSummarize: (topic: string) => void;
  status: AppStatus;
}

export interface SummaryDisplayProps {
  summary: string;
  sources: Source[];
  onClear: () => void;
  isStreaming?: boolean;
}