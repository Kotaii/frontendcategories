import { Injectable } from '@angular/core';
import { S3, config, Credentials } from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  BUCKET_NAME: string = 'estoreprodimages';

  constructor() { 
    // AWS Credentials
    config.update({
      region: 'us-west-1',
      credentials: new Credentials('AKIAZZXC7YN7DJUTKV4A', 'rdXDokaJ6j32Le09d1DHA3De7aEOfTo8c4JGNgOq')
    })
  }

  getS3Ref() {
    return new S3({
      apiVersion: '2006-03-01',
      params: {
        Bucket: this.BUCKET_NAME
      }
    })
  }
}
