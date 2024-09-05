import { UserEntity } from '../../../../database/entities/user.entity';
import { TokenPairResDto } from './token-pair.res.dto';

export class AuthResDto {
  user: UserEntity;
  tokens: TokenPairResDto;
}
