import React from 'react'
import { translate } from 'react-i18next'
import styled from 'styled-components'

import FacebookButton from '../common/facebook-button'
import Button from '../common/button'
import AuthShow from '../common/auth-show'
import TabTitle from '../common/tab-title'
import OrderItem from '../common/order-item'
import BankButton from '../common/bank-button'
import NoFinLink from '../common/no-fin-link'
import PriceLabel from '../common/price-label'
import OrderInput from '../common/order-input'
import OrLabel from '../common/or-label'
import TabContainer from '../common/tab-container'
import OrderContainer from '../common/order-container'
import currencyFormat from '../../utils/currency-format'

const ShowContainer = styled.div`
  margin: 38px 0;
`

const TotalContainer = styled.div`
  padding: 30px 7px;
  margin: 15px 0;
  border-radius: 5px;
	background-color: #ebebeb;
  line-height: 56px;
`

const TotalTitle = styled.div`
  display: inline-block;
  font-family: SFText;
  font-size: 36px;
  font-weight: bold;
  color: #4a4a4a;
  vertical-align: middle;
  margin-right: 15px;
  & strong {
    font-size: 48px;
  }
`

const BuyTab = ({
  t,
  onHideFinancing,
  onShowFinancing,
  financingOptionsVisible = true,
  property,
}) =>
  <div>
    {financingOptionsVisible
      ? <TabContainer>
          <div className="row">
            <div className="col-md">
              <TabTitle>
                {t('property.financingOptions')}{' '}
                <NoFinLink onClick={onHideFinancing} href="#">
                  {t('property.noThanks')}
                </NoFinLink>
              </TabTitle>
              <OrderItem>{t('property.chooseBanks')}</OrderItem>
              <OrderContainer>
                <p>
                  <BankButton href="#">{t('banks.nordea')}</BankButton>
                  <BankButton href="#">{t('banks.op')}</BankButton>
                </p>
              </OrderContainer>
              <OrderItem>{t('property.amountToPayUpfront')}</OrderItem>
              <OrderContainer>
                <OrderInput placeholder={currencyFormat(2500)} />
              </OrderContainer>
              <OrderItem>{t('property.loanPeriod')}</OrderItem>
              <OrderContainer>
                <OrderInput
                  placeholder={t('property.placeholders.loanPeriod')}
                />
              </OrderContainer>
            </div>
            <div className="col-md text-center">
              <PriceLabel topMargin>
                {t('price.from', { value: currencyFormat(property.rentPrice) })}
              </PriceLabel>
              <AuthShow>
                <FacebookButton>{t('facebook.loginToBuy')}</FacebookButton>
                <OrLabel block>{t('Or')}</OrLabel>
              </AuthShow>
              <p>
                <OrderInput
                  placeholder={t('property.placeholders.email')}
                  style={{ marginRight: 20 }}
                />
                <Button href primary>{t('property.getOffer')}</Button>
              </p>
            </div>
          </div>
        </TabContainer>
      : <ShowContainer>
          <NoFinLink onClick={onShowFinancing} href="#">
            {t('property.showFinancing')}
          </NoFinLink>
        </ShowContainer>}
    <TotalContainer>
      <TotalTitle>
        {t('property.yourTotal')}:{' '}
        <strong>{currencyFormat(property.purchasePrice)}</strong>
      </TotalTitle>
      <AuthShow>
        <FacebookButton style={{ marginRight: 15 }}>
          {t('facebook.loginToBuy')}
        </FacebookButton>
        <OrLabel style={{ marginRight: 15 }}>{t('Or')}</OrLabel>
      </AuthShow>
      <OrderInput
        placeholder={t('property.placeholders.email')}
        style={{ marginRight: 15, verticalAlign: 'middle' }}
      />
      <Button href primary>{t('property.buy')}</Button>
    </TotalContainer>
  </div>

export default translate()(BuyTab)
