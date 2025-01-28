import { Controller, Get, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Protected, Roles } from '@decorators';
import { RequestInterface } from '@guards';
import { UserRoles } from '@utils';
import { MeService } from './me.service';
import { User } from './entities';

@ApiTags("Me")
@Controller({ version: "1", path: "me" })
export class MeController {

    constructor(private service: MeService) { }

    @ApiBearerAuth()
    @ApiOperation({ summary: "Barcha foydalanuvchiga tegishli ma'lumotlarni olish" })
    @Protected(true)
    @Roles([UserRoles.ADMIN, UserRoles.USER])
    @Get()
    async getMe(@Request() request: RequestInterface): Promise<User> {
        return await this.service.getMe(request.userId);
    }
}
