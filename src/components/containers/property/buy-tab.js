import React from 'react'
import { connect } from 'react-redux'
import BuyTab from '../../property/buy-tab'
import LayoutActions from '../../../actions/layout'

const mapStateToProps = ({ layout }) => layout

class BuyTabContainer extends React.Component {
  handleHide = e => {
    e.preventDefault()
    this.props.showFinancingOptions(false)
  }

  handleShow = e => {
    e.preventDefault()
    this.props.showFinancingOptions(true)
  }

  render() {
    return (
      <BuyTab
        {...this.props}
        onHideFinancing={this.handleHide}
        onShowFinancing={this.handleShow}
      />
    )
  }
}

export default connect(mapStateToProps, LayoutActions)(BuyTabContainer)
