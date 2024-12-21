import { Column, Row } from '@react-email/components';
import { Link } from 'src/components/Link';
import { MainText } from 'src/components/MainText';
import { ShadowText } from 'src/components/ShadowText';
import { SubTitle } from 'src/components/SubTitle';
export const WhatIsClairview = () => {
  return (
    <>
      <SubTitle value="What is Clairview?" />
      <MainText>
        It's a CRM, a software to help businesses manage their customer data and
        relationships efficiently.
      </MainText>
      <Row>
        <Column>
          <ShadowText>
            <Link href="https://clairview.io/" value="Website" />
          </ShadowText>
        </Column>
        <Column>
          <ShadowText>
            <Link href="https://github.com/digitranslab/clairview" value="Github" />
          </ShadowText>
        </Column>
        <Column>
          <ShadowText>
            <Link href="https://clairview.io/user-guide" value="User guide" />
          </ShadowText>
        </Column>
        <Column>
          <ShadowText>
            <Link href="https://docs.clairview.io/" value="Developers" />
          </ShadowText>
        </Column>
      </Row>
      <ShadowText>
        Clairview.io Public Benefit Corporation
      </ShadowText>
    </>
  );
};
