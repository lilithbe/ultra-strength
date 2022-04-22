import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
const PageHeader = ({ pageTitle, breadcrumbList }) => {
  return (
    <div className="container-fluid page-header py-lg-3 py-lg-1 mb-lg-3 mb-sm-1 wow fadeIn" data-wow-delay="0.1s">
      <div className="container text-center py-lg-3 py-lg-1">
        <h1 className="display-3 text-white text-uppercase mb-3 animated slideInDown">{pageTitle}</h1>
        {breadcrumbList === false ? null :
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center text-uppercase mb-0">
              {
                breadcrumbList.map((item, i) => {
                  if (item.isCurrent) {
                    return <li key={i} className="breadcrumb-item text-primary active" aria-current="page">{item.label}</li>
                  } else {
                    return <li key={i} className={`breadcrumb-item`}><Link className="text-white" to={item.to}>{item.label}</Link></li>
                  }
                })}
            </ol>
          </nav>
        }
      </div>
    </div>
  )
}

export default PageHeader
PageHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  breadcrumbList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
}
PageHeader.defaultProps = {
  breadcrumbList: false,
}
