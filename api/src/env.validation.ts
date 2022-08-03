import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  /**
   * Database configuration
   */

  @IsString()
  DATABASE_URL: string;

  @IsString()
  REDIS_URL: string;

  /**
   * Twitter configuration
   * Twitter configuration is optional, the bot will not start if the values are not set
   */

  @IsString()
  @IsOptional()
  TWITTER_API_KEY?: string;

  @IsString()
  @IsOptional()
  TWITTER_API_SECRET_KEY?: string;

  @IsString()
  @IsOptional()
  TWITTER_ACCESS_TOKEN?: string;

  @IsString()
  @IsOptional()
  TWITTER_ACCESS_TOKEN_SECRET?: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
