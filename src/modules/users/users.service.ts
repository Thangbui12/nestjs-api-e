import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { AuthService } from '../auth/auth.service';
import { USER_MODEL } from './schemas/user.schema';
import { CreateUserDto } from './dtos/user.dto';
import { ForgotPasswordDto } from './dtos/forgotPassword.dto';
import { IUserDoc } from './interfaces/user.interface';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { ChangePasswordDto } from './dtos/user-password.dto';
import { EmailService } from '../email/email.service';
import { SendEmailDto } from '../email/dtos/sendEmail.dto';
import { IJwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectModel(USER_MODEL)
    private readonly userModel: Model<IUserDoc>,
    private readonly emailService: EmailService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<IUserDoc> {
    const { username, email } = createUserDto;
    const userExitsted = await this.userModel.findOne({ username });
    const emailExisted = await this.userModel.findOne({ email });

    if (!!userExitsted || !!emailExisted) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const userCreate = new this.userModel(createUserDto);
    const result = await userCreate.save();
    return result;
  }

  async findAll(): Promise<IUserDoc[]> {
    return this.userModel.find({});
  }

  async findOneById(id: string): Promise<IUserDoc> {
    const user = await this.userModel.findById({ _id: id });
    if (!user) {
      throw new NotFoundException('User not exists!');
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<IUserDoc> {
    const user = await this.userModel.findOne({ email: email, verified: true });
    if (!user) {
      throw new NotFoundException('User not exists or Email invalid!');
    }

    return user;
  }

  async deleteOneById(id: string): Promise<any> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not exists!');
    }

    await this.userModel.remove({ _id: id });

    return {
      message: 'Delete Success!',
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<any> {
    const user = await this.findOneByEmail(forgotPasswordDto.email);

    let token = crypto.randomBytes(32).toString('hex');
    let baseUrl = `${process.env.BASE_URL}:${process.env.PORT}/api/reset-password/`;
    //send link token to Email
    const subject = 'Reset Password';
    const content = `
    -----------------------------RESET PASSWORD-----------------------------
    Please click here to reset your password:   ${baseUrl}${token}
    `;
    const options: SendEmailDto = {
      recipient: forgotPasswordDto.email,
      subject,
      content,
    };
    this.emailService.sendMail(options);

    await user.updateOne({
      resetPasswordToken: token,
      resetPasswordExpired: moment().add(30, 'minutes').toDate(),
    });

    return {
      message: 'Send forgot password mail success!',
    };
  }

  async resetPassword(
    token: string,
    resetPasswordDto: ResetPasswordDto,
  ): Promise<any> {
    const user = await this.userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpired: { $gte: moment().toDate() },
    });

    if (!user) {
      throw new NotFoundException('Token not expires or User not existed');
    }

    const hashed = await bcrypt.hash(resetPasswordDto.password, 10);

    await user.updateOne({
      password: hashed,
    });

    return {
      message: 'Password has changed!',
    };
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    const user = await this.findOneById(id);

    await this.checkPassword(changePasswordDto.currentPassword, user.password);
    const { salt, hashed } = await this.hashPassword(
      changePasswordDto.newPassword,
    );

    await user.updateOne({ password: hashed, salt: salt });
    return {
      message: 'Password changed!',
    };
  }

  async findOne(payload: IJwtPayload) {
    const user = await this.userModel.findOne({
      username: payload.username,
      email: payload.email,
    });
    if (!user) {
      throw new NotFoundException('User not existed!');
    }

    return user;
  }

  //METHOD
  async checkPassword(
    passwordIn: string,
    currentPassword: string,
  ): Promise<boolean> {
    const match = await bcrypt.compare(passwordIn, currentPassword);
    if (!match) {
      throw new NotFoundException('Wrong current password');
    }
    return match;
  }

  async validatorUser(username: string, email: string): Promise<any> {
    return this.userModel.findOne({ username, email });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    return {
      salt,
      hashed,
    };
  }
}
