
export interface ChunkPostion {
  chunk: number;
  position: number;
}

export interface PixelPostion {
  X: number;
  Y: number;
}

export interface Pixel {
  R: number;
  G: number;
  B: number;
  A: number;
  Array: number[];
}

export interface IteratorResponse {
  done: boolean;
  value: any;
}

export const CastPixel = function (Array: number[]) {
  const [R, G, B, A] = Array
  const P: Pixel = {
    R,
    G,
    B,
    A,
    Array,
  }
  return P
}
