import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  redirectUri: string;
  querystring = require('querystring');
  constructor(private readonly appService: AppService) {
    this.redirectUri = process.env.REDIRECT_URI;
  }

  @Get('login')
  loginSpotify(@Res() res): void {
    let redirect_uri: string = this.redirectUri;
    res.redirect(
      'https://accounts.spotify.com/authorize?' +
        this.querystring.stringify({
          response_type: 'code',
          client_id: process.env.CLIENT_ID,
          scope: 'user-top-read',
          redirect_uri,
        }),
    );
  }

  @Get('callback')
  callback(@Req() req, @Res() res): any {
    return this.appService.getAuthData(req.query.code,res)
  }

  @Get('search')
  async searchTracks(@Query() query){ 
    const tracks =  await this.appService.searchTracks(query.access_token,query.q,query.offset,query.limit)
    return tracks;
   
  }
}
