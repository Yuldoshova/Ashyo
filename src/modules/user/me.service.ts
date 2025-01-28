import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities";

@Injectable()
export class MeService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async getMe(userId: number): Promise<User> {
        return await this.userRepository.findOne({ where: { id: userId } })
    }
}