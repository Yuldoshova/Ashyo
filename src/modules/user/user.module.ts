import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UserController } from './user.controller';
import { MeController } from './me.controller';
import { UserService } from './user.service';
import { MeService } from './me.service';
import { UploadService } from '../upload';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController, MeController],
    providers: [UserService, MeService, UploadService],
})
export class UserModule { }
