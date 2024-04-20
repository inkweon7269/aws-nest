import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepo: Repository<BoardEntity>,
  ) {}

  async getBoards() {
    return await this.boardRepo.find();
  }

  async createBoard(title: string) {
    return await this.boardRepo.save(
      this.boardRepo.create({
        title,
      }),
    );
  }

  async deleteBoard(id: number) {
    return await this.boardRepo.delete(id);
  }
}
