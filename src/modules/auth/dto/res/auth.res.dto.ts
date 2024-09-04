import { ResPrivateUserDto } from '../../../user/dto/res/res-private-user.dto';
import { TokenPairResDto } from './token-pair.res.dto';

export class AuthResDto {
  user: ResPrivateUserDto;
  tokens: TokenPairResDto;
}
