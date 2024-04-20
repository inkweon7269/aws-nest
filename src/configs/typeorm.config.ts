import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function TypeormConfig(configService: ConfigService) {
  const option: TypeOrmModuleOptions = {
    type: '', // DB 종류
    host: '', // HOST 정보
    port: 5432, // PORT 정보
    username: '', // DB 아이디
    password: '', // DB 비밀번호
    database: '', // 데이터베이스명
    autoLoadEntities: true,
    synchronize: true,
    useUTC: false,
  };

  return option;
}
