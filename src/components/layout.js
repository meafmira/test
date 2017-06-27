import React from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next'
import styled from 'styled-components'
import i18n from 'i18next'
import AuthShow from './common/auth-show'
import UserName from './common/user-name'

const changeLanguage = e => {
  i18n.changeLanguage(e.target.value)
  e.preventDefault()
}

const NavBar = styled.nav`
  height: 70px;
	background-color: #333333;
`

const BrandLink = styled(Link)`
	font-size: 36px;
  width: 160px;
  font-weight: normal;
	color: #ffffff !important;
  @media(max-width: 720px) {
    padding: 0;
    width: 120px;
  }
`

const Footer = styled.footer`
  flex: 0 0 auto;
  height: 100px;
  line-height: 100px;
  text-align: center;
	background-color: #333333;
  color: #ffffff;
  & a {
  	font-family: .SF NS Text;
  	font-size: 18px;
  	font-weight: normal;
  	font-style: normal;
  	font-stretch: normal;
  	line-height: 1.33;
  	letter-spacing: 0.8px;
  	text-align: center;
  	color: #ffffff;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const Content = styled.div`
  flex: 1 0 auto;
  flex-direction: column;
  display: flex;
`

function Layout({ children, t, i18n, user, onLogout }) {
  return (
    <Wrapper>
      <Content>
        <NavBar className="navbar navbar-toggleable-md navbar-inverse bg-inverse bg-faded">
          <div className="container">
            <BrandLink className="navbar-brand" to="/">
              <img
                alt="Mesta logo"
                src="/images/logo.png"
                className="img-fluid"
              />
            </BrandLink>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <AuthShow show className="mr-auto">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link"><UserName user={user} /></Link>
                  </li>
                  <li className="nav-item">
                    <a onClick={onLogout} href="#" className="nav-link">
                      {t('logout')}
                    </a>
                  </li>
                </ul>
              </AuthShow>
              <AuthShow className="mr-auto" />
              <form className="form-inline my-2 my-lg-0">
                <select
                  onChange={changeLanguage}
                  value={i18n.language}
                  className="form-control"
                >
                  <option value="en">English</option>
                  <option value="fi">Finnish</option>
                </select>
              </form>
            </div>
          </div>
        </NavBar>
        {children}
      </Content>
      <Footer>
        <a href="http://toughbyte.com">Toughbyte</a> |{' '}
        <a href="http://www.yit.fi/">YIT</a> |{' '}
        <a href="https://industryhack.com/challenges/hacktheliving/">
          #hacktheliving
        </a>
      </Footer>
    </Wrapper>
  )
}

export default translate()(Layout)
