export class EnergyItem {
  constructor(
    readonly timestamp: Date,
    readonly consumed: number,
    readonly produced: number,
    readonly unit: string
  ) {
  }
}

