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
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectModel(USER_MODEL)
    private readonly userModel: Model<IUserDoc>,
    private readonly mailerService: MailerService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<IUserDoc> {
    const { username } = createUserDto;
    const user = await this.userModel.findOne({ username });
    if (user) {
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
    console.log(user);
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
    const text = `
    -----------------------------RESET PASSWORD-----------------------------
    Please click here to reset your password:   ${baseUrl}${token}
    `;
    this.sendMailer(forgotPasswordDto.email, subject, text);

    await user.updateOne({
      resetPasswordToken: token,
      resetPasswordExpired: moment().add(30, 'minutes').toDate(),
    });

    return {
      message: 'Send forgot password mail success!',
    };
  }

  //METHOD
  async checkPassword(loginPassword: string, user: any): Promise<boolean> {
    const match = await bcrypt.compare(loginPassword, user.password);
    if (!match) {
      throw new NotFoundException('Wrong email or password');
    }
    return match;
  }

  async sendMailer(email: string, subject: string, text: string): Promise<any> {
    try {
      return await this.mailerService.sendMail({
        to: email,
        subject,
        text: `${text}`,
      });
    } catch (err) {
      console.log('ERROR', err.message);
    }
  }
}
