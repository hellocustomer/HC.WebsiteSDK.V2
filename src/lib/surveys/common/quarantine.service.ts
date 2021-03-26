import { SurveyQuarantineConfig } from './survey-quarantine-config.interface';

export class QuarantineService {
  private static quarantineStartKey = 'hcSDK.SurveyQuarantineStart';
  private static daysToMillisecondsMultiplier = 24 * 60 * 60 * 1000;

  constructor(private quarantineConfig?: SurveyQuarantineConfig) {}

  isUnderQuarantine(): boolean {
    // verify quarantine only when its config is provided
    if (this.quarantineConfig) {
      const quarantineStartData = localStorage.getItem(
        QuarantineService.quarantineStartKey
      );
      const quarantineStart = quarantineStartData
        ? parseInt(quarantineStartData)
        : null;

      return (
        !!quarantineStart &&
        quarantineStart +
          this.quarantineConfig.period *
            QuarantineService.daysToMillisecondsMultiplier >
          Date.now()
      );
    }
    // no config - quarantine inactive
    return false;
  }

  startQuarantine(): void {
    if (this.quarantineConfig) {
      localStorage.setItem(
        QuarantineService.quarantineStartKey,
        Date.now().toString()
      );
    }
  }
}
