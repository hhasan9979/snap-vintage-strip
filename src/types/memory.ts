export interface Memory {
  id: string;
  title: string;
  date: string;
  photos: [string, string, string];
  description?: string;
  quote?: string;
}