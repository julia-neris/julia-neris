export type Lang = 'pt' | 'en';
export type Localized = Record<Lang, string>;
export const bi = (pt: string, en: string): Localized => ({pt,en});
export type Category = 'all' | 'ai' | 'nlp' | 'research' | 'data' | 'software' | 'automation';
export interface ProjectLink { label: string; url: string; }
export interface CaseSection { title: Localized; text: Localized; }
export interface Project {
  slug: string; number: string; title: string; category: Category[];
  summary: Localized; kind: Localized; status: Localized;
  tech: string[]; links: ProjectLink[]; sections: CaseSection[];
  pipeline: Localized[]; screenshot?: string;
}
