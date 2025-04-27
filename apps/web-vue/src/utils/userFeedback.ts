// web-vue/src/utils/userFeedback.ts
import * as Sentry from '@sentry/vue';

export function collectFeedback(error: Error) {
  Sentry.showReportDialog({
    eventId: Sentry.captureException(error),
    title: "We're sorry!",
    subtitle: "An error occurred.",
    subtitle2: "Our team has been notified."
  });
}