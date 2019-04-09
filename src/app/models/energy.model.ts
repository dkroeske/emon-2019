export class EnergyItem {
  constructor(
    readonly startDate: Date,
    readonly endDate: Date,
    readonly consumed: number,
    readonly produced: number,
    readonly unit: string
  ) {
  }
}

