import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function TypeormConfig(configService: ConfigService) {
  const option: TypeOrmModuleOptions = {
    type: 'postgres', // DB 종류
    host: configService.get(`DB_HOST`), // HOST 정보
    port: +configService.get<number>(`DB_PORT`), // PORT 정보
    username: configService.get(`DB_USERNAME`), // DB 아이디
    password: configService.get(`DB_PASSWORD`), // DB 비밀번호
    database: configService.get(`DB_DATABASE`), // 데이터베이스명
    autoLoadEntities: true,
    synchronize: true,
    useUTC: false,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  };

  return option;
}
