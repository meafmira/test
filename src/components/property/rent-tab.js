import React from 'react'
import { translate } from 'react-i18next'

import FacebookButton from '../common/facebook-button'
import Button from '../common/button'
import AuthShow from '../common/auth-show'
import PriceLabel from '../common/price-label'
import OrderInput from '../common/order-input'
import OrLabel from '../common/or-label'
import TabContainer from '../common/tab-container'
import currencyFormat from '../../utils/currency-format'

const RentTab = ({ t }) =>
  <TabContainer>
    <div className="row">
      <div className="col-md-5 text-center">
        <PriceLabel>
          {t('price.from', { value: currencyFormat(39) })}
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

export default translate()(RentTab)
