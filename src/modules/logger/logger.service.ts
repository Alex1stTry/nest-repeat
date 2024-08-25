import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

import { ConfigType, SentryConfig } from '../../config/config-type';

@Injectable()
export class LoggerService {
  private readonly isLocal: boolean;
  private readonly logger = new Logger();

  constructor(private readonly configService: ConfigService<ConfigType>) {
    const sentryConfig = configService.get<SentryConfig>('sentry');
    this.isLocal = sentryConfig.env === 'local';

    Sentry.init({
      dsn: sentryConfig.dsn,
      integrations: [nodeProfilingIntegration()],
      // Tracing
      tracesSampleRate: 1.0, //  Capture 100% of the transactions

      // Set sampling rate for profiling - this is relative to tracesSampleRate
      profilesSampleRate: 1.0,
    });
  }

  public log(message: string): void {
    if (this.isLocal) {
      this.logger.log(message);
    } else {
      Sentry.captureMessage(message, 'log');
    }
  }

  public warning(message: string): void {
    if (this.isLocal) {
      this.logger.warn(message);
    } else {
      Sentry.captureMessage(message, 'warning');
    }
  }

  public info(message: string): void {
    if (this.isLocal) {
      this.logger.log(message);
    } else {
      Sentry.captureMessage(message, 'info');
    }
  }

  public error(error: any): void {
    if (this.isLocal) {
      this.logger.error(error, error.stack);
    } else {
      Sentry.captureMessage(error, { level: 'error' });
    }
  }
}
