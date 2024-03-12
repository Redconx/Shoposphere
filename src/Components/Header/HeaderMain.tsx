import React from 'react'

const HeaderMain = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid" style={{color:'white'}}>
          <a className="navbar-brand" href="/" style={{color:'white'}}>Shoposphere</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" style={{color:'white'}}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" style={{color:'white'}}>Conatct Us</a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true" style={{color:'white'}}>Disabled</a>
              </li> */}
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit" style={{color:'white'}}>Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HeaderMain
