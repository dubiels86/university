import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, getManager } from "typeorm";
import { Group } from "../entities/group.entity";
import { GroupDto } from "./dto/group.dto";
import { GroupRepository } from "./group.repository";
import { status } from "../shared/entity-status.enum";
import { plainToClass } from "class-transformer";

@Injectable()
export class GroupService {
  manager = getManager();
  constructor(
    @InjectRepository(GroupRepository)
    private readonly _groupRepository: GroupRepository
  ) {}

  async getOne(id: number): Promise<GroupDto> {
    if (!id) {
      throw new BadRequestException("id must be sent");
    }

    const group: Group = await this._groupRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!group) {
      throw new NotFoundException();
    }

    return plainToClass(GroupDto, group);
  }

  async getAll(): Promise<any[]> {
    return await getConnection()
    .createQueryBuilder()
    .select('group')
    .from(Group, 'group')
    .innerJoinAndSelect('group.students', 's')
    .orderBy('group.name')         
    .getMany()
  }

  async create(g: Group) {
    const p = await this._groupRepository.findOne({ name: g.name });
    if (p) {
      throw new HttpException("El grupo ya existe.", HttpStatus.CONFLICT);
    }
    await this._groupRepository.save(g);
  }

  async update(id: number, g: Partial<GroupDto>): Promise<GroupDto> {
    const foundGroup: Group = await this._groupRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });
    if (!foundGroup) {
      throw new NotFoundException("This Group does not exist");
    }

    foundGroup.name = g.name;
    foundGroup.teacher = g.teacher;

    const savedGroup = await this._groupRepository.save(foundGroup);

    return plainToClass(GroupDto, savedGroup);
  }

  async delete(id: number): Promise<void> {
    const groupExists = await this._groupRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!groupExists) {
      throw new NotFoundException();
    }

    await this._groupRepository.update(id, { status: status.INACTIVE });
  }
}
