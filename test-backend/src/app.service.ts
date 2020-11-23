import { CacheTTL, HttpService, Injectable, Req, Res } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { Cache } from 'cache-manager';
import requestClient = require('request');

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getAuthData(code: any, @Res() res): any {
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.CLIENT_ID + ':' + process.env.SECRET,
          ).toString('base64'),
      },
      json: true,
    };
    requestClient.post(authOptions, async function (error, response, body) {
      var access_token = body.access_token;
      var refresh_token = body.refresh_token;
      let uri = process.env.FRONTEND_URI || 'http://localhost:3000';
      res.redirect(
        uri +
          '?access_token=' +
          access_token +
          '&refresh_token=' +
          refresh_token,
      );
    });
  }

  async searchTracks(
    accessToken: string,
    input: string,
    offset?: string,
    limit?: string,
  ): Promise<any> {
    const url: string =
      'https://api.spotify.com/v1/search?q=' +
      encodeURIComponent(input) +
      '&type=track&limit=' +
      limit +
      '&offset=' +
      offset;
    return this.httpService
      .get(url, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .toPromise()
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        throw new BadRequestException('Invalid user');
      });
  }
}
