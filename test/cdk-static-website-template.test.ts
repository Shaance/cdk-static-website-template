import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CdkPersonalWebsite from '../lib/cdk-static-website-template';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CdkPersonalWebsite.CdkPersonalWebsiteStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
