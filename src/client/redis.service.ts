import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private redis: Redis) {}

  async getValue(key: string): Promise<any> {
    return await this.redis.get(key);
  }

  async setValue(payload: {
    key: string;
    value: any;
    expireTime?: number;
  }): Promise<any> {
    if (payload.expireTime) {
      return await this.redis.setex(
        payload.key,
        payload.expireTime,
        payload.value,
      );
    }
    return await this.redis.set(payload.key, payload.value);
  }

  async deleteValue(key: string): Promise<any> {
    return await this.redis.del(key);
  }
}
