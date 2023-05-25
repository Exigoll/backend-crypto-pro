import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateAssetResponse {
  @ApiProperty()
  @IsNumber()
  user: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  assetId: string;
}

export class GetUserAssetsResponse {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  name: string;

  @ApiProperty()
  @IsString()
  assetId: string;

  @ApiProperty()
  @IsString()
  createAt: string;

  @ApiProperty()
  @IsString()
  updateAt: string;

  @ApiProperty()
  @IsNumber()
  user: number;
}
