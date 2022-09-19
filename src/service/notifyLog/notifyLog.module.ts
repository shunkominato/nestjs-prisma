import { Module } from '@nestjs/common';
import { NotifyLogService } from './notifyLog.service';

@Module({
  providers: [NotifyLogService],
  exports: [NotifyLogService],
})
export class NotifyLogModule {}
