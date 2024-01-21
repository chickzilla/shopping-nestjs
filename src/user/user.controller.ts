import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from 'src/guard/auth.guard';

// rounter ของ express --> /user
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {} //--> service ที่ใช้ใน user

  //http://localhost:3000/user/:id
  // ---> ใช้ guard กันไว้
  @UseGuards(AuthGuard)
  @Get(':id') //--> ใช้ params
  findById(@Param('id', new ParseIntPipe()) id: number) {
    // แปลง parmas เป็น int --> ParseIntPipe() -Nest
    return this.service.findById(id);
  }

  @Get('/username/:username')
  findByUsername(@Param('username') username: string) {
    return this.service.findByUsername(username);
  }

  @Post()
  create(@Body() dto: Omit<User, 'id'>) {
    // dto จาก Body
    //console.log(dto.username);
    return this.service.create(dto);
  }

  // PATCH เราแก้แค่บางส่วนของของเดิม
  // PUT ---> เราแก้หมดเลยทั้งหมด
  // แต่อะไรก็ได้
  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: Partial<Omit<User, 'id'>>,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.service.delete(id);
  }
}
