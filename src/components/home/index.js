import React from 'react'
import styled from 'styled-components'
import { translate } from 'react-i18next'
import SearchBox from '../common/search-box'

const HomeTitle = styled.h1`
  font-family: "SFDisplay";
  font-size: 48px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 0.75;
  letter-spacing: 2px;
  text-align: center;
  color: inherit;
  margin: 50px 0 60px 0;
  @media(max-width: 720px) {
    & {
      text-align: left;
    }
  }
`

const HomeContent = styled.div`
  margin: 50px 0;
`

const HomeCol = styled.div`
  padding: 0 30px;
  @media(max-width: 720px) {
    & {
      padding-bottom: 20px;
    }
  }
  & h2 {
    text-transform: uppercase;
    font-family: SFText;
  	font-size: 30px;
    padding: 0;
    line-height: 60px;
    & img {
      height: 20px;
      vertical-align: baseline;
    }
  }
  & p {
  	font-family: SFText;
  	font-size: 24px;
  	font-weight: 600;
  }
`

const Jumbotron = styled.div`
  background: url(/images/front.jpg) center;
  text-shadow: #000 0px 0px 20px;
  background-size: cover;
  flex: 1;
  color: #fff;
`

const handleSelect = (item, value, props) => {
  props.router.push(`/search?query=${value}`)
}

function Home({ t, ...props }) {
  return (
    <Jumbotron>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <HomeTitle>{t('home.title')}</HomeTitle>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <SearchBox
              onSelect={(item, value) => handleSelect(item, value, props)}
              autoFocus
              searchButton
            />
          </div>
        </div>
      </div>
      <HomeContent>
        <div className="container">
          <div className="row">
            <div className="col-md">
              <HomeCol>
                <h2>
                  <img
                    role="presentation"
                    src="/images/search-home-icon.svg"
                  />{' '}
                  {t('home.col1.title')}
                </h2>
                <p>{t('home.col1.text')}</p>
              </HomeCol>
            </div>
            <div className="col-md">
              <HomeCol>
                <h2>
                  <img
                    role="presentation"
                    src="/images/rent-home-icon.svg"
                  />{' '}
                  {' '}
                  {t('home.col2.title')}
                </h2>
                <p>{t('home.col2.text')}</p>
              </HomeCol>
            </div>
            <div className="col-md">
              <HomeCol>
                <h2>
                  <img
                    role="presentation"
                    src="/images/buy-home-icon.svg"
                  />{' '}
                  {' '}
                  {t('home.col3.title')}
                </h2>
                <p>{t('home.col3.text')}</p>
              </HomeCol>
            </div>
          </div>
        </div>
      </HomeContent>
    </Jumbotron>
  )
}

export default translate()(Home)
