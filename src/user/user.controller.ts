import {
    All,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseFilePipeBuilder,
    Post,
    Put,
    Query,
    Res,
    StreamableFile,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { userService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadDto } from './upload.dto';
import { imageFileFilter, editFileName } from 'src/config/multer.config';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';
@Controller('users')
// @UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private userService: userService) { }

    @Get()
    getAllData() {
        let response = this.userService.getAll();
        return response;
        // res.status(HttpStatus.OK).json({payload:response})
    }

    // @Get(':id')
    // getById(@Param() params){
    //       const response=this.userService.getbyId(params.id)
    //       return response
    // }

    @Get('getuser')
    getByName(@Query() Name) {
        const response = this.userService.getbyName(Name.Name);
        return response;
    }

    @All()
    @HttpCode(204)
    async postUser(@Body() userDTO: UserEntity) {
        console.log(userDTO, ' dto');

        const user = await this.userService.create(userDTO);
        return user;
    }

    @Put(':id')
    updateUser(@Param() params, @Body() userDTO: UserEntity) {
        const response = this.userService.update(params.id, userDTO);
        return response;
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        console.log(params.id, ' id');

        const res = this.userService.deleteUser(params.id);
        return res;
    }

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file'))
    // async  uploadFile(
    //     @Body() body: UploadDto,
    //     @UploadedFile() file: Express.Multer.File) {

    //     console.log(file," file da upload");

    //     return {
    //         body,
    //         file: file?.buffer.toString(),
    //     }

    // }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadedFile(@UploadedFile() file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
     
        return response;
    }

    @Post('multiple')
    @UseInterceptors(
        FilesInterceptor('image', 20, {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadMultipleFiles(@UploadedFiles() files) {
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                filename: file.filename,
            };
            response.push(fileReponse);
        });
        console.log(response, " du lieu");

        return response;
    }


    @Get('upload/:imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(join(process.cwd(),'./uploads/'+image));
    }

  
    // @Get('stream-file')
    // getFile(): StreamableFile {
    //     const file = createReadStream(join(process.cwd(), 'package.json'));
    //     return new StreamableFile(file)
    // }


    //   @UseInterceptors(FileInterceptor('file'))
    //   @Post('file/fail-validation')
    //   uploadFileAndFailValidation(
    //     @Body() body: UploadDto,
    //     @UploadedFile(
    //       new ParseFilePipeBuilder()
    //         .addFileTypeValidator({
    //           fileType: 'jpg',
    //         })
    //         .build(),
    //     )
    //     file: Express.Multer.File,
    //   ) {
    //     return {
    //       body,
    //       file: file.buffer.toString(),
    //     };
    //   }
}
