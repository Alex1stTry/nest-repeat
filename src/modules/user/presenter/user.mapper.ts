import { UserEntity } from '../../../database/entities/user.entity';
import { IJwtPayload } from '../../auth/interfaces/jwt-payload.interface';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ResPrivateUserDto } from '../dto/res/res-private-user.dto';

export class UserMapper {
  public static toUserData(user: UserEntity, payload: IJwtPayload): IUserData {
    return {
      userId: payload.userId,
      deviceId: payload.deviceId,
      email: user.email,
    };
  }
  public static toPrivateDto(user: UserEntity): ResPrivateUserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      bio: user.bio,
      age: user.age,
      phone: user.phone,
      image: user.image,
    };
  }
}
