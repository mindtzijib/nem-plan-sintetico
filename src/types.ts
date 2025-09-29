// --- Type Definitions from data.json ---
export interface Data {
  fases: Fase[];
  campos_formativos: CampoFormativo[];
  grados: Grado[];
  contenidos: Contenido[];
  pdas: Pda[];
}

export interface Fase {
  id: number;
  numero: number;
  nombre: string;
  descripcion: string;
  grados_incluidos: string;
}

export interface CampoFormativo {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Grado {
  id: number;
  numero: number;
  nombre: string;
  fase_id: number;
}

export interface Contenido {
  id: number;
  numero: number;
  titulo: string;
  fase_id: number;
  campo_formativo_id: number;
}

export interface Pda {
  id: number;
  numero_pda: number;
  descripcion: string;
  contenido_id: number;
  grado_id: number;
}

export type View = 'home' | 'results' | 'resumen' | 'filtrar';