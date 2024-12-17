declare module "easy-ease" {
  interface EaseOptions {
    startValue?: number;
    endValue?: number;
    durationMs?: number;
    onStep: (value: number) => void;
    onComplete?: () => void;
  }

  export default function ease(options: EaseOptions): void
}
