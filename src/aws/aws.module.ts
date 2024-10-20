import { Module } from '@nestjs/common';
import { S3Service } from './service/s3.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot()],
    providers:[S3Service],
    exports:[S3Service]
})
export class AwsModule {}
