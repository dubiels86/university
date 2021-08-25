import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Res } from '@nestjs/common';
import { Group } from '../entities/group.entity';
import { GroupDto } from './dto/group.dto';
import { GroupService } from './group.service';
import { Response } from 'express';

@Controller('groups')
export class GroupController {
    constructor(private readonly _gService: GroupService) {}

    @Get(':id')
    async getGroup(@Param('id', ParseIntPipe) id: number) {
      const group = await this._gService.getOne(id);
      return group;
    }
  
    @Get()
    async getGroups(): Promise<GroupDto[]> {
      const groups = await this._gService.getAll();
      return groups;
    }
  
  
    @Post()
    async create(@Body() Group: Group, @Res() res: Response) {
    
      try {
        await this._gService.create(Group);
        return res.send({message: 'Grupo creado satisfactoriamente'});
      } catch (error) {
        
          throw new HttpException('El grupo ya existe.', HttpStatus.CONFLICT);
      }
          
    }
      
    @Patch(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() g: Group, @Res() res: Response
    ){
      await this._gService.update(id, g);
      return res.send({message: 'Grupo actualizado satisfactoriamente'});
    }
  
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
      await this._gService.delete(id);
    }

}
