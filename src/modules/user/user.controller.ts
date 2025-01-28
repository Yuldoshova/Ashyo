import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Protected, Roles } from '@decorators';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@ApiTags('User')
@Controller({ version: "1", path: "users" })
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @ApiBearerAuth()
  // @Protected(true)
  // @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiConsumes("multipart/form-data")
  @Post('/add')
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.userService.create({ ...createUserDto, image });
  }

  // @ApiBearerAuth()
  // @Protected(true)
  // @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of all users retrieved successfully.' })
  @Get("/all")
  findAll() {
    return this.userService.findAll();
  }

  // @ApiBearerAuth()
  // @Protected(true)
  // @Roles([UserRoles.ADMIN, UserRoles.USER])
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'The user has been updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiConsumes("multipart/form-data")
  @Patch('/update/:id')
  @UseInterceptors(FileInterceptor("image"))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.userService.update(id, { ...updateUserDto, image });
  }

  // @ApiBearerAuth()
  // @Protected(true)
  // @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'The user has been deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Delete('/remove/:id')
  remove(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.userService.remove(id);
  }
}
