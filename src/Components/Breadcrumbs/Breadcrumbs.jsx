import React from 'react'
import { Link, Route } from 'react-router-dom'

const Breadcrumbs = () => <Route path="*" render={ props => {

    const hash = window.location.hash
    const parts = hash.split('/').filter(part => part.indexOf('#') === -1) // Removes first # part
    let path = ''

    return <p>{ parts.map((part, index) => {

      // Append part to current path
      path += '/' + part 

      return <Link key={index} to={path}>{part}</Link>
    }) }
    </p>
}} />

export default Breadcrumbs