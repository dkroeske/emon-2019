export class P1Power {
  delivered: string;
  phase: string;
  value: number;
  unit: string;
}

export class S {
  unit: string;
  value: number;
}

export class P1 {
  timestamp: Date;
  instantaneous_active_power: P1Power[];
}

export class Power {

  p1: P1;
  s0: S;
  s1: S;
  created: Date;
  constructor() {}
}
