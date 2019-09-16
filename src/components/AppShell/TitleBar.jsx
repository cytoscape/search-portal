import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HelpIcon from '@material-ui/icons/Help'
import Tooltip from '@material-ui/core/Tooltip'
import Button from "@material-ui/core/Button";


import classNames from 'classnames'

import logo from '../../assets/images/ndex-logo-mono-dark.svg'
import cytoLogo from '../../assets/images/cytoscape-logo-mono-dark.svg'
import nrnbLogo from '../../assets/images/nrnb-logo-mono-dark.svg'
import wpLogo from '../../assets/images/wp-logo-mono-dark.svg'
import idekerLogo from '../../assets/images/ideker-logo-mono-dark.svg'
import HomeIcon from '@material-ui/icons/Home'

import GeneTextBox from './GeneTextBox'

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  hide: {
    display: 'none'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 10
  },
  logo: {
    height: '1em',
    width: '1.5em',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  textBox: {
    paddingLeft: '1em',
    paddingRight: '1em'
  },
  noWrap: {
    display: "inline-block",
    whiteSpace: "nowrap"
  }
})

const titleStyle = {
  position: 'relative',
  left: '1em',
  textTransform: 'none'
}

class TitleBar extends React.Component {
  handleMenu = () => {
    this.props.uiStateActions.setSettingsOpen(
      !this.props.uiState.isSettingsOpen
    )
  }

  handleHomeButton = () => {
    this.props.searchActions.clearAll()
    this.props.uiStateActions.setSelectedSource("enrichment")
    this.props.networkActions.networkClear()
    this.props.history.push('/')
  }

  render() {
    const { classes, ...others } = this.props
    const open = this.props.uiState.isSettingsOpen

    return (
      <AppBar
        position="fixed"
        color="inherit"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
<div className={classes.noWrap}>
        <Toolbar disableGutters={!open}>
          <Tooltip title="Search by Pathway Enrichment / Protein-Protein Interactions / Gene Association" aria-label="NDEx_tooltip">
            <div>
              <Button style={titleStyle} onClick={this.handleHomeButton}>
              <HomeIcon fontSize="default" className={classes.logo}/>
              <Typography variant="h6" color="inherit" noWrap={true}>
                NDEx Integrated Query
              </Typography>
              </Button>
            </div>
          </Tooltip>

          {this.props.search.results === null ? (
            <div />
          ) : (
            <div className={classes.textBox}>
              <GeneTextBox {...others} />
             </div>
          )}

          <div className={classes.grow} />
          
          <div>
            {/*}
          <Tooltip title="Home" placement="bottom">
              <IconButton
                aria-haspopup="true"
                color="default"
                onClick={this.handleHomeButton}
              >
                <HomeIcon fontSize="default" className={classes.logo}/>
              </IconButton>
            </Tooltip>
          */}
            <Tooltip title="Help" placement="bottom" style={{paddingRight: "1em"}}>
              <IconButton
                aria-haspopup="true"
                color="default"
                onClick={() => openLink(HELP_URL)}
              >
                <HelpIcon fontSize="default" className={classes.logo}/>
              </IconButton>
            </Tooltip>
{/*}
            <Tooltip title="Ideker Lab" placement="bottom">
              <IconButton
                color='default'
                onClick={() => openLink(IL_URL)}
              >
                <img alt="Ideker Lab Logo" src={idekerLogo} className={classes.logo} />
              </IconButton>
            </Tooltip>

            <Tooltip title="NDEx" placement="bottom">
              <IconButton
                color="default"
                aria-label="Home"
                onClick={() => openLink(NDEX_URL)}
              >
                <img alt="NDEx logo" src={logo} className={classes.logo} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Cytoscape" placement="bottom">
              <IconButton
                color="default"
                onClick={() => openLink(CYTOSCAPE_URL)}
              >
                <img alt="Cytoscape Logo" src={cytoLogo} className={classes.logo}/>
              </IconButton>
            </Tooltip>

            <Tooltip title="NRNB" placement="bottom">
              <IconButton
                color="default"
                aria-label="Home"
                onClick={() => openLink(NRNB_URL)}
              >
                <img alt="NRNB logo" src={nrnbLogo} className={classes.logo} />
              </IconButton>
            </Tooltip>

            <Tooltip title="WikiPathways" placement="bottom">
              <IconButton
                color='default'
                onClick={()=> openLink(WP_URL)}
              >
                <img alt="WikiPathways Logo" src={wpLogo} className={classes.logo}/>
              </IconButton>
          </Tooltip>*/}
          </div>
        </Toolbar>
        </div>
      </AppBar>
    )
  }
}

// TODO: replace this to the actual help page
const HELP_URL = 'https://github.com/idekerlab/search-portal/wiki'
const NDEX_URL = 'https://www.ndexbio.org/'
const CYTOSCAPE_URL = 'https://cytoscape.org/'
const NRNB_URL = 'https://nrnb.org/'
const WP_URL = 'https://www.wikipathways.org/'
const IL_URL = 'http://idekerlab.ucsd.edu/'

const openLink = url => {
  window.open(url, '_blank')
}

TitleBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default (withStyles(styles, { withTheme: true})(TitleBar))